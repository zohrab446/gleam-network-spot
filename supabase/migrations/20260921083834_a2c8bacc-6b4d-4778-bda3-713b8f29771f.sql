-- Make server-only access explicit for internal tables
REVOKE ALL ON public.auth_login_attempts FROM anon, authenticated;
REVOKE ALL ON public.bot_incidents FROM anon, authenticated;
REVOKE ALL ON public.promo_codes FROM anon, authenticated;

GRANT ALL ON public.auth_login_attempts TO service_role;
GRANT ALL ON public.bot_incidents TO service_role;
GRANT ALL ON public.promo_codes TO service_role;

ALTER TABLE public.auth_login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.auth_login_attempts FORCE ROW LEVEL SECURITY;
ALTER TABLE public.bot_incidents FORCE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "No client access to login attempts" ON public.auth_login_attempts;
CREATE POLICY "No client access to login attempts"
  ON public.auth_login_attempts
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "No client access to bot incidents" ON public.bot_incidents;
CREATE POLICY "No client access to bot incidents"
  ON public.bot_incidents
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "No client access to promo codes" ON public.promo_codes;
CREATE POLICY "No client access to promo codes"
  ON public.promo_codes
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

COMMENT ON TABLE public.auth_login_attempts IS 'Server-only: login throttling state, accessed via service role / security definer functions.';
COMMENT ON TABLE public.bot_incidents IS 'Server-only: bot incident log, written via service role server functions.';
COMMENT ON TABLE public.promo_codes IS 'Server-only: promo codes, validated/redeemed via redeem_promo_code security definer function.';