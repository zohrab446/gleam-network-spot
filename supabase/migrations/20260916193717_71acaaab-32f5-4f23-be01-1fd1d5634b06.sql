REVOKE ALL ON FUNCTION public.get_leaderboard(text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(text, integer) TO service_role;

DROP FUNCTION IF EXISTS public.energy_sync();
DROP FUNCTION IF EXISTS public.energy_spend(integer, text, jsonb);
DROP FUNCTION IF EXISTS public.energy_claim_daily_login();
DROP FUNCTION IF EXISTS public.energy_spin();
DROP FUNCTION IF EXISTS public.energy_watch_ad();
DROP FUNCTION IF EXISTS public.energy_claim_badge(text);
DROP FUNCTION IF EXISTS public.energy_claim_milestone(text);
DROP FUNCTION IF EXISTS public.referral_apply(text);
DROP FUNCTION IF EXISTS public.referral_check();
DROP FUNCTION IF EXISTS public.pro_start_trial();
DROP FUNCTION IF EXISTS public.unlock_lesson_hint(text, integer);