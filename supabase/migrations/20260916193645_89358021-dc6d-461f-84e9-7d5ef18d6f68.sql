-- 1) Kullanıcı adı doğrulama (XSS / regex)
CREATE OR REPLACE FUNCTION public.profiles_validate_username()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.username IS NOT NULL THEN
    NEW.username := btrim(NEW.username);
    IF TG_OP = 'INSERT' THEN
      NEW.username := left(regexp_replace(NEW.username, '[^A-Za-z0-9._]', '', 'g'), 20);
      IF length(NEW.username) < 3 THEN
        NEW.username := 'kodcu' || substr(replace(NEW.id::text, '-', ''), 1, 6);
      END IF;
    ELSIF NEW.username IS DISTINCT FROM OLD.username THEN
      IF NEW.username !~ '^[A-Za-z0-9._]{3,20}$' THEN
        RAISE EXCEPTION 'INVALID_USERNAME';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_validate_username_trg ON public.profiles;
CREATE TRIGGER profiles_validate_username_trg
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.profiles_validate_username();

-- 2) Mass assignment engeli: sütun bazlı UPDATE yetkisi
REVOKE UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (username, avatar_shape, avatar_color, sound_enabled, theme, language, onboarded)
  ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- İlerleme ve rozet yazımı yalnızca sunucu fonksiyonlarıyla
REVOKE INSERT, UPDATE, DELETE ON public.lesson_progress FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.user_badges FROM authenticated;
GRANT SELECT ON public.lesson_progress TO authenticated;
GRANT SELECT ON public.user_badges TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;
GRANT ALL ON public.user_badges TO service_role;

-- 3) Çift kayıt engeli: aynı ders bir kez
DELETE FROM public.lesson_progress a
USING public.lesson_progress b
WHERE a.user_id = b.user_id AND a.lesson_id = b.lesson_id AND a.ctid > b.ctid;

ALTER TABLE public.lesson_progress
  DROP CONSTRAINT IF EXISTS lesson_progress_user_lesson_key;
ALTER TABLE public.lesson_progress
  ADD CONSTRAINT lesson_progress_user_lesson_key UNIQUE (user_id, lesson_id);

-- 4) Ödül talep kayıtları (race condition / mükerrer istek)
CREATE TABLE IF NOT EXISTS public.reward_claims (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_id text NOT NULL,
  claim_date date NOT NULL DEFAULT ((now() AT TIME ZONE 'utc')::date),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT reward_claims_unique UNIQUE (user_id, action_id, claim_date)
);
GRANT SELECT ON public.reward_claims TO authenticated;
GRANT ALL ON public.reward_claims TO service_role;
ALTER TABLE public.reward_claims ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own reward claims" ON public.reward_claims;
CREATE POLICY "Users can view their own reward claims"
  ON public.reward_claims FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.reward_claim_once(p_user uuid, p_action text, p_date date)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.reward_claims (user_id, action_id, claim_date)
  VALUES (p_user, p_action, coalesce(p_date, (now() AT TIME ZONE 'utc')::date));
EXCEPTION WHEN unique_violation THEN
  RAISE EXCEPTION 'ALREADY_CLAIMED';
END;
$$;

-- 5) Giriş denemesi kilidi
CREATE TABLE IF NOT EXISTS public.auth_login_attempts (
  email text NOT NULL PRIMARY KEY,
  failed_count integer NOT NULL DEFAULT 0,
  locked_until timestamp with time zone,
  last_failed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT ALL ON public.auth_login_attempts TO service_role;
ALTER TABLE public.auth_login_attempts ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS auth_login_attempts_set_updated_at ON public.auth_login_attempts;
CREATE TRIGGER auth_login_attempts_set_updated_at
BEFORE UPDATE ON public.auth_login_attempts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 6) Rozet ödülü: sunucu tarafında yeniden hesaplanır
CREATE OR REPLACE FUNCTION public.game_award_badges(p_user uuid)
RETURNS text[] LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  pr public.profiles;
  v_cnt integer; v_langs integer; v_fast integer;
  v_ids text[] := '{}'; v_new text[] := '{}';
  t record;
BEGIN
  SELECT * INTO pr FROM public.profiles WHERE id = p_user;
  IF pr.id IS NULL THEN RETURN v_new; END IF;

  SELECT count(DISTINCT level), count(DISTINCT language)
    INTO v_cnt, v_langs
    FROM public.lesson_progress WHERE user_id = p_user;
  SELECT min(duration_seconds) INTO v_fast
    FROM public.lesson_progress
   WHERE user_id = p_user AND xp_earned > 0 AND duration_seconds IS NOT NULL AND duration_seconds > 0;

  v_cnt := coalesce(v_cnt, 0);
  v_langs := coalesce(v_langs, 0);

  IF v_cnt >= 1 THEN v_ids := v_ids || 'first-step'; END IF;
  IF pr.streak >= 7 THEN v_ids := v_ids || 'week-warrior'; END IF;
  IF pr.xp >= 100 THEN v_ids := v_ids || 'century'; END IF;
  IF v_fast IS NOT NULL AND v_fast <= 120 THEN v_ids := v_ids || 'speedrunner'; END IF;
  IF v_cnt >= 10 THEN v_ids := v_ids || 'level-10'; END IF;
  IF v_cnt >= 50 THEN v_ids := v_ids || 'level-50'; END IF;
  IF v_cnt >= 100 THEN v_ids := v_ids || 'level-100'; END IF;
  IF pr.streak >= 30 THEN v_ids := v_ids || 'consistent-coder'; END IF;
  IF v_langs >= 4 THEN v_ids := v_ids || 'polyglot'; END IF;
  IF v_cnt >= 320 THEN v_ids := v_ids || 'grandmaster'; END IF;

  FOR t IN
    SELECT * FROM (VALUES
      ('html', 1, 20), ('css', 21, 70), ('javascript', 71, 120), ('react', 121, 170),
      ('python', 171, 220), ('cpp', 221, 270), ('java', 271, 320)
    ) AS x(tid, lo, hi)
  LOOP
    IF (SELECT count(DISTINCT level) FROM public.lesson_progress
         WHERE user_id = p_user AND level BETWEEN t.lo AND t.hi) >= (t.hi - t.lo + 1) THEN
      v_ids := v_ids || (t.tid || '-master');
    END IF;
  END LOOP;

  WITH ins AS (
    INSERT INTO public.user_badges (user_id, badge_id)
    SELECT p_user, b FROM unnest(v_ids) AS b
    ON CONFLICT (user_id, badge_id) DO NOTHING
    RETURNING badge_id
  )
  SELECT coalesce(array_agg(badge_id), '{}') INTO v_new FROM ins;

  RETURN v_new;
END;
$$;

-- 7) Ders tamamlama: ödül sunucuda hesaplanır, satır kilidi ile
CREATE OR REPLACE FUNCTION public.game_complete_lesson(
  p_user uuid, p_lesson_id text, p_level integer, p_language text, p_code text, p_seconds integer
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  pr public.profiles;
  v_pro boolean; v_mult integer; v_xp integer; v_coins integer;
  v_already boolean; v_rows integer; v_levels integer; v_new_level integer;
  v_week date := date_trunc('week', now())::date;
  v_month date := date_trunc('month', now())::date;
  v_weekly integer; v_monthly integer; v_fav text; v_badges text[];
BEGIN
  IF p_user IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;
  IF p_level < 1 OR p_level > 320 THEN RAISE EXCEPTION 'INVALID_LEVEL'; END IF;

  SELECT * INTO pr FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF pr.id IS NULL THEN RAISE EXCEPTION 'NO_PROFILE'; END IF;

  v_pro := pr.is_pro AND (pr.pro_expires_at IS NULL OR pr.pro_expires_at > now());
  v_mult := CASE WHEN pr.streak >= 7 THEN 2 ELSE 1 END;

  SELECT EXISTS (SELECT 1 FROM public.lesson_progress
                  WHERE user_id = p_user AND lesson_id = p_lesson_id) INTO v_already;

  v_xp := CASE WHEN v_already THEN 0 ELSE (100 + (p_level - 1) * 10) * v_mult END;
  v_coins := CASE WHEN v_already THEN 0
                  ELSE (50 + floor((p_level - 1) / 5)::int * 10) * (CASE WHEN v_pro THEN 2 ELSE 1 END) END;

  IF NOT v_already THEN
    INSERT INTO public.lesson_progress
      (user_id, lesson_id, level, language, xp_earned, coins_earned, duration_seconds, code)
    VALUES (p_user, p_lesson_id, p_level, p_language, v_xp, v_coins,
            greatest(coalesce(p_seconds, 0), 0), left(coalesce(p_code, ''), 20000))
    ON CONFLICT (user_id, lesson_id) DO NOTHING;
    GET DIAGNOSTICS v_rows = ROW_COUNT;
    IF v_rows = 0 THEN
      v_already := true; v_xp := 0; v_coins := 0;
    END IF;
  END IF;

  SELECT count(DISTINCT level) INTO v_levels FROM public.lesson_progress WHERE user_id = p_user;
  v_new_level := least(320, greatest(pr.level, coalesce(v_levels, 0) + 1));
  v_weekly := (CASE WHEN pr.week_start = v_week THEN pr.weekly_xp ELSE 0 END) + v_xp;
  v_monthly := (CASE WHEN pr.month_start = v_month THEN pr.monthly_xp ELSE 0 END) + v_xp;

  SELECT language INTO v_fav FROM public.lesson_progress
   WHERE user_id = p_user GROUP BY language ORDER BY count(*) DESC LIMIT 1;

  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles
     SET xp = pr.xp + v_xp,
         coins = pr.coins + v_coins,
         weekly_xp = v_weekly, week_start = v_week,
         monthly_xp = v_monthly, month_start = v_month,
         level = v_new_level,
         favorite_language = coalesce(v_fav, p_language),
         last_active_date = (now() AT TIME ZONE 'utc')::date
   WHERE id = p_user;

  v_badges := public.game_award_badges(p_user);

  RETURN jsonb_build_object(
    'xp', v_xp, 'coins', v_coins, 'multiplier', v_mult,
    'new_level', v_new_level, 'already_completed', v_already,
    'new_badges', to_jsonb(v_badges)
  );
END;
$$;

-- 8) Seviye atlama
CREATE OR REPLACE FUNCTION public.game_skip_level(
  p_user uuid, p_lesson_id text, p_level integer, p_language text
)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_new_level integer;
BEGIN
  IF p_user IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;
  IF p_level < 1 OR p_level > 320 THEN RAISE EXCEPTION 'INVALID_LEVEL'; END IF;

  SELECT * INTO pr FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF pr.id IS NULL THEN RAISE EXCEPTION 'NO_PROFILE'; END IF;

  INSERT INTO public.lesson_progress
    (user_id, lesson_id, level, language, xp_earned, coins_earned, duration_seconds, code)
  VALUES (p_user, p_lesson_id, p_level, p_language, 0, 0, 0, NULL)
  ON CONFLICT (user_id, lesson_id) DO NOTHING;

  v_new_level := least(320, greatest(pr.level, p_level + 1));
  IF v_new_level <> pr.level THEN
    PERFORM set_config('app.trusted', 'on', true);
    UPDATE public.profiles SET level = v_new_level WHERE id = p_user;
  END IF;

  RETURN jsonb_build_object('new_level', v_new_level);
END;
$$;

-- 9) Günlük seri
CREATE OR REPLACE FUNCTION public.game_touch_streak(p_user uuid)
RETURNS public.profiles LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  pr public.profiles;
  v_today date := (now() AT TIME ZONE 'utc')::date;
  v_week date := date_trunc('week', now())::date;
  v_month date := date_trunc('month', now())::date;
  v_streak integer;
BEGIN
  IF p_user IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;
  SELECT * INTO pr FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF pr.id IS NULL THEN RAISE EXCEPTION 'NO_PROFILE'; END IF;
  IF pr.last_active_date = v_today AND pr.week_start = v_week AND pr.month_start = v_month THEN
    RETURN pr;
  END IF;

  v_streak := CASE
    WHEN pr.last_active_date = v_today THEN greatest(pr.streak, 1)
    WHEN pr.last_active_date = v_today - 1 THEN pr.streak + 1
    ELSE 1 END;

  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles
     SET streak = v_streak,
         longest_streak = greatest(longest_streak, v_streak),
         last_active_date = v_today,
         last_login_at = now(),
         weekly_xp = CASE WHEN week_start = v_week THEN weekly_xp ELSE 0 END,
         week_start = v_week,
         monthly_xp = CASE WHEN month_start = v_month THEN monthly_xp ELSE 0 END,
         month_start = v_month
   WHERE id = p_user
  RETURNING * INTO pr;

  PERFORM public.game_award_badges(p_user);
  RETURN pr;
END;
$$;

-- 10) Ödül fonksiyonlarına mükerrer istek kilidi
CREATE OR REPLACE FUNCTION public.energy_claim_daily_login(p_user uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_today date := (now() AT TIME ZONE 'utc')::date; v_day integer; v_energy integer; v_coins integer;
BEGIN
  pr := public.energy_sync(p_user);
  IF pr.last_login_reward_date = v_today THEN RAISE EXCEPTION 'ALREADY_CLAIMED'; END IF;
  PERFORM public.reward_claim_once(p_user, 'daily_login', v_today);
  v_day := CASE WHEN pr.last_login_reward_date = v_today - 1 THEN (pr.daily_login_streak % 7) + 1 ELSE 1 END;
  v_energy := CASE WHEN v_day >= 7 THEN 5 WHEN v_day >= 4 THEN 3 ELSE 2 END;
  v_coins := CASE WHEN pr.is_pro THEN 150 ELSE 50 END;
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles
     SET daily_login_streak = v_day, last_login_reward_date = v_today, coins = coins + v_coins
   WHERE id = pr.id;
  PERFORM public.energy_grant(pr.id, v_energy, 'daily_login', jsonb_build_object('day', v_day));
  RETURN jsonb_build_object('day', v_day, 'energy', v_energy, 'coins', v_coins);
END;
$$;

CREATE OR REPLACE FUNCTION public.energy_spin(p_user uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; r double precision := random(); v_amount integer;
BEGIN
  pr := public.energy_sync(p_user);
  IF pr.last_spin_at IS NOT NULL AND pr.last_spin_at > now() - interval '24 hours' THEN
    RAISE EXCEPTION 'SPIN_COOLDOWN';
  END IF;
  PERFORM public.reward_claim_once(p_user, 'spin_wheel', (now() AT TIME ZONE 'utc')::date);
  v_amount := CASE WHEN r < 0.20 THEN 0 WHEN r < 0.50 THEN 1 WHEN r < 0.75 THEN 2 WHEN r < 0.90 THEN 3 ELSE 5 END;
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles SET last_spin_at = now() WHERE id = pr.id;
  IF v_amount > 0 THEN PERFORM public.energy_grant(pr.id, v_amount, 'spin_wheel', '{}'::jsonb); END IF;
  RETURN jsonb_build_object('energy', v_amount);
END;
$$;

CREATE OR REPLACE FUNCTION public.energy_watch_ad(p_user uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_today date := (now() AT TIME ZONE 'utc')::date; v_count integer;
BEGIN
  pr := public.energy_sync(p_user);
  v_count := CASE WHEN pr.ads_day = v_today THEN pr.ads_watched_today ELSE 0 END;
  IF v_count >= 2 THEN RAISE EXCEPTION 'AD_LIMIT'; END IF;
  IF pr.last_ad_at IS NOT NULL AND pr.last_ad_at > now() - interval '4 hours' THEN RAISE EXCEPTION 'AD_COOLDOWN'; END IF;
  PERFORM public.reward_claim_once(p_user, 'video_ad_' || (v_count + 1)::text, v_today);
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles SET ads_day = v_today, ads_watched_today = v_count + 1, last_ad_at = now() WHERE id = pr.id;
  PERFORM public.energy_grant(pr.id, 1, 'video_ad', '{}'::jsonb);
  RETURN jsonb_build_object('energy', 1, 'watched_today', v_count + 1);
END;
$$;

CREATE OR REPLACE FUNCTION public.energy_claim_badge(p_user uuid, p_badge_id text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_amount integer;
BEGIN
  pr := public.energy_sync(p_user);
  IF NOT EXISTS (SELECT 1 FROM public.user_badges WHERE user_id = pr.id AND badge_id = p_badge_id) THEN
    RAISE EXCEPTION 'BADGE_NOT_EARNED';
  END IF;
  IF p_badge_id = ANY (pr.energy_badges_claimed) THEN RAISE EXCEPTION 'ALREADY_CLAIMED'; END IF;
  PERFORM public.reward_claim_once(p_user, 'badge:' || p_badge_id, DATE '1970-01-01');
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

CREATE OR REPLACE FUNCTION public.energy_claim_milestone(p_user uuid, p_id text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE pr public.profiles; v_done integer; v_amount integer; v_ok boolean := false;
BEGIN
  pr := public.energy_sync(p_user);
  IF p_id = ANY (pr.milestones_claimed) THEN RAISE EXCEPTION 'ALREADY_CLAIMED'; END IF;
  SELECT count(DISTINCT level) INTO v_done FROM public.lesson_progress WHERE user_id = pr.id;
  IF p_id = 'levels-50' THEN v_ok := v_done >= 50; v_amount := 10;
  ELSIF p_id = 'levels-100' THEN v_ok := v_done >= 100; v_amount := 15;
  ELSIF p_id = 'xp-500000' THEN v_ok := pr.xp >= 500000; v_amount := 20;
  ELSIF p_id = 'streak-30' THEN v_ok := pr.longest_streak >= 30; v_amount := 25;
  ELSE RAISE EXCEPTION 'UNKNOWN_MILESTONE'; END IF;
  IF NOT v_ok THEN RAISE EXCEPTION 'NOT_ELIGIBLE'; END IF;
  PERFORM public.reward_claim_once(p_user, 'milestone:' || p_id, DATE '1970-01-01');
  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles SET milestones_claimed = array_append(milestones_claimed, p_id) WHERE id = pr.id;
  PERFORM public.energy_grant(pr.id, v_amount, 'milestone', jsonb_build_object('milestone', p_id));
  RETURN jsonb_build_object('energy', v_amount, 'milestone', p_id);
END;
$$;

-- 11) p_user parametreli fonksiyonlar yalnızca sunucudan çağrılabilir
REVOKE ALL ON FUNCTION public.game_award_badges(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.game_complete_lesson(uuid, text, integer, text, text, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.game_skip_level(uuid, text, integer, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.game_touch_streak(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.reward_claim_once(uuid, text, date) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_sync(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_spend(uuid, integer, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_claim_daily_login(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_spin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_watch_ad(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_claim_badge(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_claim_milestone(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.referral_apply(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.referral_check(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.pro_start_trial(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.unlock_lesson_hint(uuid, text, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.redeem_promo_code(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_grant(uuid, integer, text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.energy_log(uuid, text, integer, integer, integer, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.fulfill_paytr_order(text, text, integer, text, text) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.game_award_badges(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.game_complete_lesson(uuid, text, integer, text, text, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.game_skip_level(uuid, text, integer, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.game_touch_streak(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.reward_claim_once(uuid, text, date) TO service_role;