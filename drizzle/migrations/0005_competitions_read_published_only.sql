DROP POLICY IF EXISTS competitions_read ON public.competitions;
CREATE POLICY competitions_read ON public.competitions FOR SELECT TO authenticated
USING (auth.uid() IS NOT NULL AND status IN ('active','soon','past'));