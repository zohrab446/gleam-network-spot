CREATE TABLE public.bot_incidents (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  kind text NOT NULL,
  detail jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT ALL ON public.bot_incidents TO service_role;
ALTER TABLE public.bot_incidents ENABLE ROW LEVEL SECURITY;

CREATE INDEX bot_incidents_user_created_idx ON public.bot_incidents (user_id, created_at DESC);
CREATE INDEX lesson_progress_user_completed_idx ON public.lesson_progress (user_id, completed_at DESC);

CREATE OR REPLACE FUNCTION public.antibot_report(p_kind text, p_detail jsonb DEFAULT '{}'::jsonb)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  INSERT INTO public.bot_incidents (user_id, kind, detail)
  SELECT auth.uid(), left(coalesce(p_kind, 'unknown'), 60), coalesce(p_detail, '{}'::jsonb)
  WHERE auth.uid() IS NOT NULL;
$$;
GRANT EXECUTE ON FUNCTION public.antibot_report(text, jsonb) TO authenticated;

CREATE OR REPLACE FUNCTION public.antibot_guard_progress()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
  v_last timestamptz;
  v_dup integer;
  v_min1 integer;
  v_min10 integer;
  v_day integer;
  v_reason text;
BEGIN
  SELECT max(completed_at) INTO v_last FROM public.lesson_progress WHERE user_id = NEW.user_id;
  SELECT count(*) INTO v_dup FROM public.lesson_progress
    WHERE user_id = NEW.user_id AND lesson_id = NEW.lesson_id AND completed_at > now() - interval '30 seconds';
  SELECT count(*) INTO v_min1 FROM public.lesson_progress
    WHERE user_id = NEW.user_id AND completed_at > now() - interval '1 minute';
  SELECT count(*) INTO v_min10 FROM public.lesson_progress
    WHERE user_id = NEW.user_id AND completed_at > now() - interval '10 minutes';
  SELECT count(*) INTO v_day FROM public.lesson_progress
    WHERE user_id = NEW.user_id AND completed_at > now() - interval '24 hours';

  IF NEW.xp_earned > 0 AND coalesce(NEW.duration_seconds, 0) < 3 THEN v_reason := 'too_fast';
  ELSIF v_last IS NOT NULL AND v_last > now() - interval '2 seconds' THEN v_reason := 'burst';
  ELSIF v_dup > 0 THEN v_reason := 'duplicate';
  ELSIF v_min1 >= 5 THEN v_reason := 'rate_1m';
  ELSIF v_min10 >= 25 THEN v_reason := 'rate_10m';
  ELSIF v_day >= 300 THEN v_reason := 'rate_24h';
  END IF;

  IF v_reason IS NOT NULL THEN
    RAISE EXCEPTION 'BOT_BLOCKED:%', v_reason;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS antibot_guard_progress_trg ON public.lesson_progress;
CREATE TRIGGER antibot_guard_progress_trg
BEFORE INSERT ON public.lesson_progress
FOR EACH ROW EXECUTE FUNCTION public.antibot_guard_progress();

CREATE OR REPLACE FUNCTION public.profiles_guard_protected()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
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
  NEW.hint_credits := OLD.hint_credits;
  NEW.total_hints_used := OLD.total_hints_used;

  -- Anti-bot: tek seferde makul olmayan puan/coin artislarini yok say
  IF NEW.xp - OLD.xp > 3000 THEN NEW.xp := OLD.xp; END IF;
  IF NEW.weekly_xp - OLD.weekly_xp > 3000 THEN NEW.weekly_xp := OLD.weekly_xp; END IF;
  IF NEW.coins - OLD.coins > 3000 THEN NEW.coins := OLD.coins; END IF;
  IF NEW.streak - OLD.streak > 1 THEN NEW.streak := OLD.streak; END IF;
  IF NEW.longest_streak - OLD.longest_streak > 1 THEN NEW.longest_streak := OLD.longest_streak; END IF;

  RETURN NEW;
END;
$$;