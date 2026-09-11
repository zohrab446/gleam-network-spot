REVOKE ALL ON FUNCTION public.energy_claim_badge(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_claim_daily_login() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_claim_milestone(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_spend(integer, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_spin() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_sync() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_watch_ad() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_leaderboard(text, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.pro_start_trial() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.referral_apply(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.referral_check() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.energy_claim_badge(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.energy_claim_daily_login() TO service_role;
GRANT EXECUTE ON FUNCTION public.energy_claim_milestone(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.energy_spend(integer, text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.energy_spin() TO service_role;
GRANT EXECUTE ON FUNCTION public.energy_sync() TO service_role;
GRANT EXECUTE ON FUNCTION public.energy_watch_ad() TO service_role;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(text, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.pro_start_trial() TO service_role;
GRANT EXECUTE ON FUNCTION public.referral_apply(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.referral_check() TO service_role;

CREATE OR REPLACE FUNCTION public.energy_sync(p_user uuid)
RETURNS public.profiles
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE pr public.profiles; v_today date := (now() AT TIME ZONE 'utc')::date; v_ticks integer; v_new integer; v_before integer;
BEGIN
  IF p_user IS NULL THEN RAISE EXCEPTION 'NOT_AUTHENTICATED'; END IF;
  PERFORM set_config('app.trusted', 'on', true);
  SELECT * INTO pr FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF pr.id IS NULL THEN RAISE EXCEPTION 'NO_PROFILE'; END IF;
  IF pr.is_pro AND pr.pro_expires_at IS NOT NULL AND pr.pro_expires_at < now() THEN
    UPDATE public.profiles SET is_pro=false, pro_plan=NULL WHERE id=pr.id RETURNING * INTO pr;
  END IF;
  IF pr.energy_day IS DISTINCT FROM v_today THEN
    v_before:=pr.energy;
    UPDATE public.profiles SET energy=max_energy, energy_day=v_today, energy_updated_at=now(), ads_watched_today=0, ads_day=v_today,
      total_energy_gained=total_energy_gained+greatest(max_energy-v_before,0) WHERE id=pr.id RETURNING * INTO pr;
    PERFORM public.energy_log(pr.id,'daily_reset',pr.energy-v_before,v_before,pr.energy,jsonb_build_object('day',v_today));
  ELSIF pr.energy > pr.max_energy THEN
    v_before:=pr.energy;
    UPDATE public.profiles SET energy=max_energy, energy_updated_at=now() WHERE id=pr.id RETURNING * INTO pr;
    PERFORM public.energy_log(pr.id,'cap_adjust',pr.energy-v_before,v_before,pr.energy,'{}'::jsonb);
  ELSIF pr.energy < pr.max_energy THEN
    v_ticks:=floor(extract(epoch FROM (now()-pr.energy_updated_at))/14400)::int;
    IF v_ticks>0 THEN
      v_before:=pr.energy; v_new:=least(pr.max_energy,pr.energy+v_ticks);
      UPDATE public.profiles SET energy=v_new,total_energy_gained=total_energy_gained+(v_new-v_before),
        energy_updated_at=CASE WHEN v_new>=pr.max_energy THEN now() ELSE pr.energy_updated_at+(v_ticks*interval '4 hours') END
        WHERE id=pr.id RETURNING * INTO pr;
      PERFORM public.energy_log(pr.id,'time_refill',v_new-v_before,v_before,v_new,'{}'::jsonb);
    END IF;
  END IF;
  RETURN pr;
END $$;
REVOKE ALL ON FUNCTION public.energy_sync(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.energy_sync(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.energy_spend(p_user uuid, p_amount integer, p_reason text, p_meta jsonb DEFAULT '{}') RETURNS public.profiles
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE pr public.profiles; v_after integer;
BEGIN
  pr:=public.energy_sync(p_user); PERFORM set_config('app.trusted','on',true);
  IF pr.is_pro THEN PERFORM public.energy_log(pr.id,p_reason,0,pr.energy,pr.energy,coalesce(p_meta,'{}')||'{"pro":true}'::jsonb); RETURN pr; END IF;
  IF p_amount<=0 THEN RETURN pr; END IF;
  v_after:=greatest(pr.energy-p_amount,0);
  UPDATE public.profiles SET energy=v_after,total_energy_spent=total_energy_spent+(pr.energy-v_after),energy_updated_at=CASE WHEN pr.energy>=pr.max_energy THEN now() ELSE energy_updated_at END WHERE id=pr.id RETURNING * INTO pr;
  PERFORM public.energy_log(pr.id,p_reason,-p_amount,pr.energy+p_amount,v_after,p_meta); RETURN pr;
END $$;
REVOKE ALL ON FUNCTION public.energy_spend(uuid,integer,text,jsonb) FROM PUBLIC,anon,authenticated; GRANT EXECUTE ON FUNCTION public.energy_spend(uuid,integer,text,jsonb) TO service_role;

CREATE OR REPLACE FUNCTION public.energy_claim_daily_login(p_user uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE pr public.profiles; v_today date:=(now() AT TIME ZONE 'utc')::date; v_day integer; v_energy integer; v_coins integer;
BEGIN pr:=public.energy_sync(p_user); IF pr.last_login_reward_date=v_today THEN RAISE EXCEPTION 'ALREADY_CLAIMED'; END IF;
v_day:=CASE WHEN pr.last_login_reward_date=v_today-1 THEN (pr.daily_login_streak%7)+1 ELSE 1 END; v_energy:=CASE WHEN v_day>=7 THEN 5 WHEN v_day>=4 THEN 3 ELSE 2 END; v_coins:=CASE WHEN pr.is_pro THEN 150 ELSE 50 END;
PERFORM set_config('app.trusted','on',true); UPDATE public.profiles SET daily_login_streak=v_day,last_login_reward_date=v_today,coins=coins+v_coins WHERE id=pr.id;
PERFORM public.energy_grant(pr.id,v_energy,'daily_login',jsonb_build_object('day',v_day)); RETURN jsonb_build_object('day',v_day,'energy',v_energy,'coins',v_coins); END $$;
REVOKE ALL ON FUNCTION public.energy_claim_daily_login(uuid) FROM PUBLIC,anon,authenticated; GRANT EXECUTE ON FUNCTION public.energy_claim_daily_login(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.energy_spin(p_user uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE pr public.profiles; r double precision:=random(); v_amount integer;
BEGIN pr:=public.energy_sync(p_user); IF pr.last_spin_at IS NOT NULL AND pr.last_spin_at>now()-interval '24 hours' THEN RAISE EXCEPTION 'SPIN_COOLDOWN'; END IF;
v_amount:=CASE WHEN r<0.20 THEN 0 WHEN r<0.50 THEN 1 WHEN r<0.75 THEN 2 WHEN r<0.90 THEN 3 ELSE 5 END; PERFORM set_config('app.trusted','on',true);
UPDATE public.profiles SET last_spin_at=now() WHERE id=pr.id; IF v_amount>0 THEN PERFORM public.energy_grant(pr.id,v_amount,'spin_wheel','{}'); END IF; RETURN jsonb_build_object('energy',v_amount); END $$;
REVOKE ALL ON FUNCTION public.energy_spin(uuid) FROM PUBLIC,anon,authenticated; GRANT EXECUTE ON FUNCTION public.energy_spin(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.energy_watch_ad(p_user uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE pr public.profiles; v_today date:=(now() AT TIME ZONE 'utc')::date; v_count integer;
BEGIN pr:=public.energy_sync(p_user); v_count:=CASE WHEN pr.ads_day=v_today THEN pr.ads_watched_today ELSE 0 END; IF v_count>=2 THEN RAISE EXCEPTION 'AD_LIMIT'; END IF; IF pr.last_ad_at IS NOT NULL AND pr.last_ad_at>now()-interval '4 hours' THEN RAISE EXCEPTION 'AD_COOLDOWN'; END IF;
PERFORM set_config('app.trusted','on',true); UPDATE public.profiles SET ads_day=v_today,ads_watched_today=v_count+1,last_ad_at=now() WHERE id=pr.id; PERFORM public.energy_grant(pr.id,1,'video_ad','{}'); RETURN jsonb_build_object('energy',1,'watched_today',v_count+1); END $$;
REVOKE ALL ON FUNCTION public.energy_watch_ad(uuid) FROM PUBLIC,anon,authenticated; GRANT EXECUTE ON FUNCTION public.energy_watch_ad(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.pro_start_trial(p_user uuid) RETURNS public.profiles LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE pr public.profiles; BEGIN pr:=public.energy_sync(p_user); IF pr.pro_trial_used THEN RAISE EXCEPTION 'TRIAL_USED'; END IF; IF pr.is_pro THEN RAISE EXCEPTION 'ALREADY_PRO'; END IF; PERFORM set_config('app.trusted','on',true);
UPDATE public.profiles SET is_pro=true,pro_plan='trial',pro_trial_used=true,pro_started_at=now(),pro_expires_at=now()+interval '7 days',energy=greatest(energy,max_energy) WHERE id=pr.id RETURNING * INTO pr; RETURN pr; END $$;
REVOKE ALL ON FUNCTION public.pro_start_trial(uuid) FROM PUBLIC,anon,authenticated; GRANT EXECUTE ON FUNCTION public.pro_start_trial(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.energy_claim_badge(p_user uuid,p_badge_id text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE pr public.profiles; v_amount integer; BEGIN pr:=public.energy_sync(p_user); IF NOT EXISTS(SELECT 1 FROM public.user_badges WHERE user_id=pr.id AND badge_id=p_badge_id) THEN RAISE EXCEPTION 'BADGE_NOT_EARNED'; END IF; IF p_badge_id=ANY(pr.energy_badges_claimed) THEN RAISE EXCEPTION 'ALREADY_CLAIMED'; END IF;
v_amount:=CASE WHEN p_badge_id IN('grandmaster','level-100') THEN 10 WHEN p_badge_id IN('level-50','week-warrior','consistent-coder','polyglot') THEN 5 WHEN p_badge_id LIKE '%-master' THEN 5 WHEN p_badge_id='level-10' THEN 3 ELSE 2 END; PERFORM set_config('app.trusted','on',true); UPDATE public.profiles SET energy_badges_claimed=array_append(energy_badges_claimed,p_badge_id) WHERE id=pr.id; PERFORM public.energy_grant(pr.id,v_amount,'badge_reward',jsonb_build_object('badge_id',p_badge_id)); RETURN jsonb_build_object('energy',v_amount,'badge_id',p_badge_id); END $$;
REVOKE ALL ON FUNCTION public.energy_claim_badge(uuid,text) FROM PUBLIC,anon,authenticated; GRANT EXECUTE ON FUNCTION public.energy_claim_badge(uuid,text) TO service_role;

CREATE OR REPLACE FUNCTION public.energy_claim_milestone(p_user uuid,p_id text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE pr public.profiles; v_done integer; v_amount integer; v_ok boolean:=false; BEGIN pr:=public.energy_sync(p_user); IF p_id=ANY(pr.milestones_claimed) THEN RAISE EXCEPTION 'ALREADY_CLAIMED'; END IF; SELECT count(DISTINCT level) INTO v_done FROM public.lesson_progress WHERE user_id=pr.id;
IF p_id='levels-50' THEN v_ok:=v_done>=50;v_amount:=10; ELSIF p_id='levels-100' THEN v_ok:=v_done>=100;v_amount:=15; ELSIF p_id='xp-500000' THEN v_ok:=pr.xp>=500000;v_amount:=20; ELSIF p_id='streak-30' THEN v_ok:=pr.longest_streak>=30;v_amount:=25; ELSE RAISE EXCEPTION 'UNKNOWN_MILESTONE'; END IF; IF NOT v_ok THEN RAISE EXCEPTION 'NOT_ELIGIBLE'; END IF; PERFORM set_config('app.trusted','on',true); UPDATE public.profiles SET milestones_claimed=array_append(milestones_claimed,p_id) WHERE id=pr.id; PERFORM public.energy_grant(pr.id,v_amount,'milestone',jsonb_build_object('milestone',p_id)); RETURN jsonb_build_object('energy',v_amount,'milestone',p_id); END $$;
REVOKE ALL ON FUNCTION public.energy_claim_milestone(uuid,text) FROM PUBLIC,anon,authenticated; GRANT EXECUTE ON FUNCTION public.energy_claim_milestone(uuid,text) TO service_role;

CREATE OR REPLACE FUNCTION public.referral_apply(p_user uuid,p_code text) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE pr public.profiles;v_ref uuid;BEGIN pr:=public.energy_sync(p_user);IF pr.referred_by IS NOT NULL THEN RAISE EXCEPTION 'ALREADY_REFERRED';END IF;SELECT id INTO v_ref FROM public.profiles WHERE referral_code=upper(trim(p_code));IF v_ref IS NULL THEN RAISE EXCEPTION 'INVALID_CODE';END IF;IF v_ref=pr.id THEN RAISE EXCEPTION 'SELF_REFERRAL';END IF;PERFORM set_config('app.trusted','on',true);UPDATE public.profiles SET referred_by=v_ref WHERE id=pr.id;RETURN jsonb_build_object('ok',true);END $$;
REVOKE ALL ON FUNCTION public.referral_apply(uuid,text) FROM PUBLIC,anon,authenticated; GRANT EXECUTE ON FUNCTION public.referral_apply(uuid,text) TO service_role;

CREATE OR REPLACE FUNCTION public.referral_check(p_user uuid) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE pr public.profiles;v_done integer;v_count integer;v_bonus integer:=0;BEGIN pr:=public.energy_sync(p_user);IF pr.referred_by IS NULL OR pr.referral_rewarded THEN RETURN jsonb_build_object('rewarded',false);END IF;SELECT count(DISTINCT level) INTO v_done FROM public.lesson_progress WHERE user_id=pr.id;IF v_done<5 THEN RETURN jsonb_build_object('rewarded',false,'completed',v_done);END IF;PERFORM set_config('app.trusted','on',true);UPDATE public.profiles SET referral_rewarded=true,referral_energy_earned=referral_energy_earned+5 WHERE id=pr.id;PERFORM public.energy_grant(pr.id,5,'referral_bonus',jsonb_build_object('role','invitee'));UPDATE public.profiles SET completed_referrals=completed_referrals+1,referral_energy_earned=referral_energy_earned+5 WHERE id=pr.referred_by RETURNING completed_referrals INTO v_count;PERFORM public.energy_grant(pr.referred_by,5,'referral_bonus',jsonb_build_object('role','referrer'));IF v_count=3 THEN v_bonus:=10;ELSIF v_count=5 THEN v_bonus:=20;END IF;IF v_bonus>0 THEN UPDATE public.profiles SET referral_energy_earned=referral_energy_earned+v_bonus WHERE id=pr.referred_by;PERFORM public.energy_grant(pr.referred_by,v_bonus,'referral_milestone',jsonb_build_object('count',v_count));END IF;RETURN jsonb_build_object('rewarded',true,'energy',5);END $$;
REVOKE ALL ON FUNCTION public.referral_check(uuid) FROM PUBLIC,anon,authenticated; GRANT EXECUTE ON FUNCTION public.referral_check(uuid) TO service_role;