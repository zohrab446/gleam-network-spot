-- 1) Profil kolonları
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS energy INTEGER NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS max_energy INTEGER NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS energy_updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS energy_day DATE NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  ADD COLUMN IF NOT EXISTS total_energy_spent INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_energy_gained INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_pro BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS pro_plan TEXT,
  ADD COLUMN IF NOT EXISTS pro_started_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS pro_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS pro_trial_used BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS referral_code TEXT,
  ADD COLUMN IF NOT EXISTS referred_by UUID,
  ADD COLUMN IF NOT EXISTS referral_rewarded BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS completed_referrals INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS referral_energy_earned INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS daily_login_streak INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_login_reward_date DATE,
  ADD COLUMN IF NOT EXISTS last_spin_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS ads_watched_today INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ads_day DATE,
  ADD COLUMN IF NOT EXISTS last_ad_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS energy_badges_claimed TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS milestones_claimed TEXT[] NOT NULL DEFAULT '{}';

CREATE OR REPLACE FUNCTION public.gen_referral_code()
RETURNS TEXT LANGUAGE sql VOLATILE SET search_path = public AS $$
  SELECT upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
$$;

UPDATE public.profiles SET referral_code = public.gen_referral_code() WHERE referral_code IS NULL;
ALTER TABLE public.profiles ALTER COLUMN referral_code SET DEFAULT public.gen_referral_code();
CREATE UNIQUE INDEX IF NOT EXISTS profiles_referral_code_key ON public.profiles (referral_code);

-- 2) Enerji hareketleri
CREATE TABLE IF NOT EXISTS public.energy_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  before_energy INTEGER NOT NULL,
  after_energy INTEGER NOT NULL,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.energy_transactions TO authenticated;
GRANT ALL ON public.energy_transactions TO service_role;
ALTER TABLE public.energy_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own energy history" ON public.energy_transactions;
CREATE POLICY "Users can view their own energy history"
ON public.energy_transactions FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS energy_transactions_user_idx
  ON public.energy_transactions (user_id, created_at DESC);

-- 3) Korumalı kolon bekçisi: yalnız güvenilir fonksiyonlar değiştirebilir
CREATE OR REPLACE FUNCTION public.profiles_guard_protected()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF coalesce(current_setting('app.trusted', true), '') = 'on' THEN
    RETURN NEW;
  END IF;
  NEW.energy := OLD.energy;
  NEW.max_energy := OLD.max_energy;
  NEW.energy_updated_at := OLD.energy_updated_at;
  NEW.energy_day := OLD.energy_day;
  NEW.total_energy_spent := OLD.total_energy_spent;
  NEW.total_energy_gained := OLD.total_energy_gained;
  NEW.is_pro := OLD.is_pro;
  NEW.pro_plan := OLD.pro_plan;
  NEW.pro_started_at := OLD.pro_started_at;
  NEW.pro_expires_at := OLD.pro_expires_at;
  NEW.pro_trial_used := OLD.pro_trial_used;
  NEW.referral_code := OLD.referral_code;
  NEW.referred_by := OLD.referred_by;
  NEW.referral_rewarded := OLD.referral_rewarded;
  NEW.completed_referrals := OLD.completed_referrals;
  NEW.referral_energy_earned := OLD.referral_energy_earned;
  NEW.daily_login_streak := OLD.daily_login_streak;
  NEW.last_login_reward_date := OLD.last_login_reward_date;
  NEW.last_spin_at := OLD.last_spin_at;
  NEW.ads_watched_today := OLD.ads_watched_today;
  NEW.ads_day := OLD.ads_day;
  NEW.last_ad_at := OLD.last_ad_at;
  NEW.energy_badges_claimed := OLD.energy_badges_claimed;
  NEW.milestones_claimed := OLD.milestones_claimed;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_guard_protected_trg ON public.profiles;
CREATE TRIGGER profiles_guard_protected_trg
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_guard_protected();

-- 4) Dahili yardımcılar
CREATE OR REPLACE FUNCTION public.energy_log(p_user UUID, p_type TEXT, p_amount INTEGER, p_before INTEGER, p_after INTEGER, p_meta JSONB)
RETURNS VOID LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  INSERT INTO public.energy_transactions (user_id, type, amount, before_energy, after_energy, meta)
  VALUES (p_user, p_type, p_amount, p_before, p_after, coalesce(p_meta, '{}'::jsonb));
$$;
REVOKE ALL ON FUNCTION public.energy_log(UUID, TEXT, INTEGER, INTEGER, INTEGER, JSONB) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.energy_grant(p_user UUID, p_amount INTEGER, p_type TEXT, p_meta JSONB DEFAULT '{}'::jsonb)
RETURNS INTEGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_before INTEGER; v_after INTEGER; v_max INTEGER;
BEGIN
  PERFORM set_config('app.trusted', 'on', true);
  SELECT energy, max_energy INTO v_before, v_max FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF v_before IS NULL THEN RETURN 0; END IF;
  v_after := least(greatest(v_before + p_amount, 0), greatest(v_max, v_before + p_amount));
  IF p_amount > 0 THEN v_after := least(v_before + p_amount, v_max + p_amount); END IF;
  UPDATE public.profiles
     SET energy = v_after,
         total_energy_gained = total_energy_gained + greatest(p_amount, 0),
         energy_updated_at = CASE WHEN v_before = 0 THEN now() ELSE energy_updated_at END
   WHERE id = p_user;
  PERFORM public.energy_log(p_user, p_type, p_amount, v_before, v_after, p_meta);
  RETURN v_after;
END;
$$;
REVOKE ALL ON FUNCTION public.energy_grant(UUID, INTEGER, TEXT, JSONB) FROM PUBLIC, anon, authenticated;

-- 5) Enerji senkronizasyonu (zaman dolumu + günlük reset + pro süre kontrolü)
CREATE OR REPLACE FUNCTION public.energy_sync()
RETURNS public.profiles LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_today DATE := (now() AT TIME ZONE 'utc')::date; v_ticks INTEGER; v_new INTEGER;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'NOT_AUTHENTICATED'; END IF;
  PERFORM set_config('app.trusted', 'on', true);
  SELECT * INTO pr FROM public.profiles WHERE id = auth.uid() FOR UPDATE;
  IF pr.id IS NULL THEN RAISE EXCEPTION 'NO_PROFILE'; END IF;

  IF pr.is_pro AND pr.pro_expires_at IS NOT NULL AND pr.pro_expires_at < now() THEN
    UPDATE public.profiles SET is_pro = false, pro_plan = NULL WHERE id = pr.id;
    pr.is_pro := false; pr.pro_plan := NULL;
  END IF;

  IF pr.energy_day IS DISTINCT FROM v_today THEN
    UPDATE public.profiles
       SET energy = greatest(pr.energy, pr.max_energy),
           energy_day = v_today,
           energy_updated_at = now(),
           ads_watched_today = 0,
           ads_day = v_today
     WHERE id = pr.id
    RETURNING * INTO pr;
    PERFORM public.energy_log(pr.id, 'daily_reset', pr.energy, pr.energy, pr.energy, jsonb_build_object('day', v_today));
  ELSIF pr.energy < pr.max_energy THEN
    v_ticks := floor(extract(epoch FROM (now() - pr.energy_updated_at)) / 14400)::int;
    IF v_ticks > 0 THEN
      v_new := least(pr.max_energy, pr.energy + v_ticks);
      UPDATE public.profiles
         SET energy = v_new,
             total_energy_gained = total_energy_gained + (v_new - pr.energy),
             energy_updated_at = CASE WHEN v_new >= pr.max_energy THEN now()
                                      ELSE pr.energy_updated_at + (v_ticks * interval '4 hours') END
       WHERE id = pr.id
      RETURNING * INTO pr;
      PERFORM public.energy_log(pr.id, 'time_refill', v_new - (v_new - v_ticks), pr.energy - (v_new - pr.energy), v_new, '{}'::jsonb);
    END IF;
  END IF;

  RETURN pr;
END;
$$;
REVOKE ALL ON FUNCTION public.energy_sync() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.energy_sync() TO authenticated;

-- 6) Enerji harcama
CREATE OR REPLACE FUNCTION public.energy_spend(p_amount INTEGER, p_reason TEXT, p_meta JSONB DEFAULT '{}'::jsonb)
RETURNS public.profiles LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_after INTEGER;
BEGIN
  pr := public.energy_sync();
  PERFORM set_config('app.trusted', 'on', true);
  IF pr.is_pro THEN
    PERFORM public.energy_log(pr.id, p_reason, 0, pr.energy, pr.energy, coalesce(p_meta, '{}'::jsonb) || '{"pro": true}'::jsonb);
    RETURN pr;
  END IF;
  IF p_amount <= 0 THEN RETURN pr; END IF;
  v_after := greatest(pr.energy - p_amount, 0);
  UPDATE public.profiles
     SET energy = v_after,
         total_energy_spent = total_energy_spent + (pr.energy - v_after),
         energy_updated_at = CASE WHEN pr.energy >= pr.max_energy THEN now() ELSE energy_updated_at END
   WHERE id = pr.id
  RETURNING * INTO pr;
  PERFORM public.energy_log(pr.id, p_reason, -(p_amount), pr.energy + p_amount, v_after, p_meta);
  RETURN pr;
END;
$$;
REVOKE ALL ON FUNCTION public.energy_spend(INTEGER, TEXT, JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.energy_spend(INTEGER, TEXT, JSONB) TO authenticated;

-- 7) Günlük giriş ödülü
CREATE OR REPLACE FUNCTION public.energy_claim_daily_login()
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_today DATE := (now() AT TIME ZONE 'utc')::date; v_day INTEGER; v_energy INTEGER; v_coins INTEGER;
BEGIN
  pr := public.energy_sync();
  IF pr.last_login_reward_date = v_today THEN RAISE EXCEPTION 'ALREADY_CLAIMED'; END IF;
  IF pr.last_login_reward_date = v_today - 1 THEN
    v_day := (pr.daily_login_streak % 7) + 1;
  ELSE
    v_day := 1;
  END IF;
  v_energy := CASE WHEN v_day >= 7 THEN 5 WHEN v_day >= 4 THEN 3 ELSE 2 END;
  v_coins := CASE WHEN pr.is_pro THEN 150 ELSE 50 END;
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles
     SET daily_login_streak = v_day,
         last_login_reward_date = v_today,
         coins = coins + v_coins
   WHERE id = pr.id;
  PERFORM public.energy_grant(pr.id, v_energy, 'daily_login', jsonb_build_object('day', v_day));
  RETURN jsonb_build_object('day', v_day, 'energy', v_energy, 'coins', v_coins);
END;
$$;
REVOKE ALL ON FUNCTION public.energy_claim_daily_login() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.energy_claim_daily_login() TO authenticated;

-- 8) Şans çarkı
CREATE OR REPLACE FUNCTION public.energy_spin()
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; r DOUBLE PRECISION := random(); v_amount INTEGER;
BEGIN
  pr := public.energy_sync();
  IF pr.last_spin_at IS NOT NULL AND pr.last_spin_at > now() - interval '24 hours' THEN
    RAISE EXCEPTION 'SPIN_COOLDOWN';
  END IF;
  v_amount := CASE
    WHEN r < 0.20 THEN 0
    WHEN r < 0.50 THEN 1
    WHEN r < 0.75 THEN 2
    WHEN r < 0.90 THEN 3
    ELSE 5 END;
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles SET last_spin_at = now() WHERE id = pr.id;
  IF v_amount > 0 THEN PERFORM public.energy_grant(pr.id, v_amount, 'spin_wheel', '{}'::jsonb); END IF;
  RETURN jsonb_build_object('energy', v_amount);
END;
$$;
REVOKE ALL ON FUNCTION public.energy_spin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.energy_spin() TO authenticated;

-- 9) Reklam ödülü
CREATE OR REPLACE FUNCTION public.energy_watch_ad()
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_today DATE := (now() AT TIME ZONE 'utc')::date; v_count INTEGER;
BEGIN
  pr := public.energy_sync();
  v_count := CASE WHEN pr.ads_day = v_today THEN pr.ads_watched_today ELSE 0 END;
  IF v_count >= 2 THEN RAISE EXCEPTION 'AD_LIMIT'; END IF;
  IF pr.last_ad_at IS NOT NULL AND pr.last_ad_at > now() - interval '4 hours' THEN RAISE EXCEPTION 'AD_COOLDOWN'; END IF;
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles SET ads_day = v_today, ads_watched_today = v_count + 1, last_ad_at = now() WHERE id = pr.id;
  PERFORM public.energy_grant(pr.id, 1, 'video_ad', '{}'::jsonb);
  RETURN jsonb_build_object('energy', 1, 'watched_today', v_count + 1);
END;
$$;
REVOKE ALL ON FUNCTION public.energy_watch_ad() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.energy_watch_ad() TO authenticated;

-- 10) Rozet enerji ödülü
CREATE OR REPLACE FUNCTION public.energy_claim_badge(p_badge_id TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_amount INTEGER;
BEGIN
  pr := public.energy_sync();
  IF NOT EXISTS (SELECT 1 FROM public.user_badges WHERE user_id = pr.id AND badge_id = p_badge_id) THEN
    RAISE EXCEPTION 'BADGE_NOT_EARNED';
  END IF;
  IF p_badge_id = ANY (pr.energy_badges_claimed) THEN RAISE EXCEPTION 'ALREADY_CLAIMED'; END IF;
  v_amount := CASE
    WHEN p_badge_id IN ('grandmaster', 'level-100') THEN 10
    WHEN p_badge_id IN ('level-50', 'week-warrior', 'consistent-coder', 'polyglot') THEN 5
    WHEN p_badge_id LIKE '%-master' THEN 5
    WHEN p_badge_id = 'level-10' THEN 3
    ELSE 2 END;
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles SET energy_badges_claimed = array_append(energy_badges_claimed, p_badge_id) WHERE id = pr.id;
  PERFORM public.energy_grant(pr.id, v_amount, 'badge_reward', jsonb_build_object('badge_id', p_badge_id));
  RETURN jsonb_build_object('energy', v_amount, 'badge_id', p_badge_id);
END;
$$;
REVOKE ALL ON FUNCTION public.energy_claim_badge(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.energy_claim_badge(TEXT) TO authenticated;

-- 11) Kilometre taşı ödülü
CREATE OR REPLACE FUNCTION public.energy_claim_milestone(p_id TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_done INTEGER; v_amount INTEGER; v_ok BOOLEAN := false;
BEGIN
  pr := public.energy_sync();
  IF p_id = ANY (pr.milestones_claimed) THEN RAISE EXCEPTION 'ALREADY_CLAIMED'; END IF;
  SELECT count(DISTINCT level) INTO v_done FROM public.lesson_progress WHERE user_id = pr.id;
  IF p_id = 'levels-50' THEN v_ok := v_done >= 50; v_amount := 10;
  ELSIF p_id = 'levels-100' THEN v_ok := v_done >= 100; v_amount := 15;
  ELSIF p_id = 'xp-500000' THEN v_ok := pr.xp >= 500000; v_amount := 20;
  ELSIF p_id = 'streak-30' THEN v_ok := pr.longest_streak >= 30; v_amount := 25;
  ELSE RAISE EXCEPTION 'UNKNOWN_MILESTONE'; END IF;
  IF NOT v_ok THEN RAISE EXCEPTION 'NOT_ELIGIBLE'; END IF;
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles SET milestones_claimed = array_append(milestones_claimed, p_id) WHERE id = pr.id;
  PERFORM public.energy_grant(pr.id, v_amount, 'milestone', jsonb_build_object('milestone', p_id));
  RETURN jsonb_build_object('energy', v_amount, 'milestone', p_id);
END;
$$;
REVOKE ALL ON FUNCTION public.energy_claim_milestone(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.energy_claim_milestone(TEXT) TO authenticated;

-- 12) Davet kodu uygula
CREATE OR REPLACE FUNCTION public.referral_apply(p_code TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_ref UUID;
BEGIN
  pr := public.energy_sync();
  IF pr.referred_by IS NOT NULL THEN RAISE EXCEPTION 'ALREADY_REFERRED'; END IF;
  SELECT id INTO v_ref FROM public.profiles WHERE referral_code = upper(trim(p_code));
  IF v_ref IS NULL THEN RAISE EXCEPTION 'INVALID_CODE'; END IF;
  IF v_ref = pr.id THEN RAISE EXCEPTION 'SELF_REFERRAL'; END IF;
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles SET referred_by = v_ref WHERE id = pr.id;
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.referral_apply(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.referral_apply(TEXT) TO authenticated;

-- 13) Davet başarısı kontrolü (5 ders sonrası iki tarafa ödül)
CREATE OR REPLACE FUNCTION public.referral_check()
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_done INTEGER; v_count INTEGER; v_bonus INTEGER := 0;
BEGIN
  pr := public.energy_sync();
  IF pr.referred_by IS NULL OR pr.referral_rewarded THEN RETURN jsonb_build_object('rewarded', false); END IF;
  SELECT count(DISTINCT level) INTO v_done FROM public.lesson_progress WHERE user_id = pr.id;
  IF v_done < 5 THEN RETURN jsonb_build_object('rewarded', false, 'completed', v_done); END IF;

  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles
     SET referral_rewarded = true,
         referral_energy_earned = referral_energy_earned + 5
   WHERE id = pr.id;
  PERFORM public.energy_grant(pr.id, 5, 'referral_bonus', jsonb_build_object('role', 'invitee'));

  UPDATE public.profiles
     SET completed_referrals = completed_referrals + 1,
         referral_energy_earned = referral_energy_earned + 5
   WHERE id = pr.referred_by
  RETURNING completed_referrals INTO v_count;
  PERFORM public.energy_grant(pr.referred_by, 5, 'referral_bonus', jsonb_build_object('role', 'referrer'));

  IF v_count = 3 THEN v_bonus := 10; ELSIF v_count = 5 THEN v_bonus := 20; END IF;
  IF v_bonus > 0 THEN
    UPDATE public.profiles SET referral_energy_earned = referral_energy_earned + v_bonus WHERE id = pr.referred_by;
    PERFORM public.energy_grant(pr.referred_by, v_bonus, 'referral_milestone', jsonb_build_object('count', v_count));
  END IF;

  RETURN jsonb_build_object('rewarded', true, 'energy', 5);
END;
$$;
REVOKE ALL ON FUNCTION public.referral_check() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.referral_check() TO authenticated;

-- 14) Pro deneme
CREATE OR REPLACE FUNCTION public.pro_start_trial()
RETURNS public.profiles LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles;
BEGIN
  pr := public.energy_sync();
  IF pr.pro_trial_used THEN RAISE EXCEPTION 'TRIAL_USED'; END IF;
  IF pr.is_pro THEN RAISE EXCEPTION 'ALREADY_PRO'; END IF;
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles
     SET is_pro = true,
         pro_plan = 'trial',
         pro_trial_used = true,
         pro_started_at = now(),
         pro_expires_at = now() + interval '7 days',
         energy = greatest(energy, max_energy)
   WHERE id = pr.id
  RETURNING * INTO pr;
  RETURN pr;
END;
$$;
REVOKE ALL ON FUNCTION public.pro_start_trial() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.pro_start_trial() TO authenticated;

-- 15) Liderlik tablosuna Pro durumu
DROP FUNCTION IF EXISTS public.get_leaderboard(TEXT, INT);
CREATE OR REPLACE FUNCTION public.get_leaderboard(p_scope TEXT DEFAULT 'all', p_limit INT DEFAULT 50)
RETURNS TABLE(
  user_id UUID, username TEXT, avatar_shape TEXT, avatar_color TEXT, level INTEGER,
  xp INTEGER, weekly_xp INTEGER, coins INTEGER, streak INTEGER, longest_streak INTEGER,
  is_pro BOOLEAN, rank_position BIGINT
) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT * FROM (
    SELECT
      p.id AS user_id,
      COALESCE(p.username, 'Kodcu') AS username,
      p.avatar_shape,
      p.avatar_color,
      p.level,
      p.xp,
      CASE WHEN p.week_start = date_trunc('week', now())::date THEN p.weekly_xp ELSE 0 END AS weekly_xp,
      p.coins,
      p.streak,
      p.longest_streak,
      (p.is_pro AND (p.pro_expires_at IS NULL OR p.pro_expires_at > now())) AS is_pro,
      ROW_NUMBER() OVER (
        ORDER BY CASE WHEN p_scope = 'weekly'
          THEN (CASE WHEN p.week_start = date_trunc('week', now())::date THEN p.weekly_xp ELSE 0 END)
          ELSE p.xp END DESC, p.level DESC, p.created_at ASC
      ) AS rank_position
    FROM public.profiles p
  ) ranked
  ORDER BY ranked.rank_position
  LIMIT GREATEST(p_limit, 1);
$$;
REVOKE ALL ON FUNCTION public.get_leaderboard(TEXT, INT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(TEXT, INT) TO authenticated;
