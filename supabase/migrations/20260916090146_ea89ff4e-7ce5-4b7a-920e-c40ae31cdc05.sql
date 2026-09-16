ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS monthly_xp integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS month_start date NOT NULL DEFAULT (date_trunc('month', now()))::date;

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

  IF NEW.xp - OLD.xp > 3000 THEN NEW.xp := OLD.xp; END IF;
  IF NEW.weekly_xp - OLD.weekly_xp > 3000 THEN NEW.weekly_xp := OLD.weekly_xp; END IF;
  IF NEW.monthly_xp - OLD.monthly_xp > 3000 THEN NEW.monthly_xp := OLD.monthly_xp; END IF;
  IF NEW.coins - OLD.coins > 3000 THEN NEW.coins := OLD.coins; END IF;
  IF NEW.streak - OLD.streak > 1 THEN NEW.streak := OLD.streak; END IF;
  IF NEW.longest_streak - OLD.longest_streak > 1 THEN NEW.longest_streak := OLD.longest_streak; END IF;

  RETURN NEW;
END;
$$;

DROP FUNCTION IF EXISTS public.get_leaderboard(text, integer);

CREATE OR REPLACE FUNCTION public.get_leaderboard(p_scope text DEFAULT 'all', p_limit integer DEFAULT 50)
RETURNS TABLE(user_id uuid, username text, avatar_shape text, avatar_color text, level integer, xp integer, weekly_xp integer, monthly_xp integer, coins integer, streak integer, longest_streak integer, is_pro boolean, rank_position bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT
    p.id,
    p.username,
    p.avatar_shape,
    p.avatar_color,
    p.level,
    p.xp,
    CASE WHEN p.week_start = date_trunc('week', now())::date THEN p.weekly_xp ELSE 0 END,
    CASE WHEN p.month_start = date_trunc('month', now())::date THEN p.monthly_xp ELSE 0 END,
    p.coins,
    p.streak,
    p.longest_streak,
    p.is_pro AND (p.pro_expires_at IS NULL OR p.pro_expires_at > now()),
    rank() OVER (
      ORDER BY (
        CASE
          WHEN p_scope = 'weekly'
            THEN (CASE WHEN p.week_start = date_trunc('week', now())::date THEN p.weekly_xp ELSE 0 END)
          WHEN p_scope = 'monthly'
            THEN (CASE WHEN p.month_start = date_trunc('month', now())::date THEN p.monthly_xp ELSE 0 END)
          ELSE p.xp
        END
      ) DESC, p.xp DESC, p.created_at ASC
    )
  FROM public.profiles p
  ORDER BY (
    CASE
      WHEN p_scope = 'weekly'
        THEN (CASE WHEN p.week_start = date_trunc('week', now())::date THEN p.weekly_xp ELSE 0 END)
      WHEN p_scope = 'monthly'
        THEN (CASE WHEN p.month_start = date_trunc('month', now())::date THEN p.monthly_xp ELSE 0 END)
      ELSE p.xp
    END
  ) DESC, p.xp DESC, p.created_at ASC
  LIMIT least(greatest(coalesce(p_limit, 50), 1), 100);
$$;

REVOKE ALL ON FUNCTION public.get_leaderboard(text, integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_leaderboard(text, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(text, integer) TO service_role;