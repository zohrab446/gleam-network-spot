CREATE TABLE public.promo_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  pro_plan text NOT NULL,
  duration_months integer NOT NULL CHECK (duration_months > 0),
  max_uses integer NOT NULL CHECK (max_uses > 0),
  used_count integer NOT NULL DEFAULT 0 CHECK (used_count >= 0),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.promo_codes TO service_role;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.promo_redemptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  promo_code_id uuid NOT NULL REFERENCES public.promo_codes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code text NOT NULL,
  pro_plan text NOT NULL,
  duration_months integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (promo_code_id, user_id)
);

GRANT SELECT ON public.promo_redemptions TO authenticated;
GRANT ALL ON public.promo_redemptions TO service_role;
ALTER TABLE public.promo_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own promo redemptions"
ON public.promo_redemptions FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE TRIGGER promo_codes_set_updated_at
BEFORE UPDATE ON public.promo_codes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.redeem_promo_code(p_user uuid, p_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_promo public.promo_codes;
  v_profile public.profiles;
  v_base timestamptz;
  v_expires timestamptz;
BEGIN
  SELECT * INTO v_promo FROM public.promo_codes
   WHERE upper(code) = upper(btrim(p_code)) FOR UPDATE;

  IF v_promo.id IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'invalid');
  END IF;
  IF NOT v_promo.is_active THEN
    RETURN jsonb_build_object('ok', false, 'error', 'inactive');
  END IF;
  IF v_promo.used_count >= v_promo.max_uses THEN
    RETURN jsonb_build_object('ok', false, 'error', 'exhausted');
  END IF;
  IF EXISTS (SELECT 1 FROM public.promo_redemptions r
              WHERE r.promo_code_id = v_promo.id AND r.user_id = p_user) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_used');
  END IF;

  SELECT * INTO v_profile FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF v_profile.id IS NULL THEN
    RETURN jsonb_build_object('ok', false, 'error', 'no_profile');
  END IF;

  v_base := GREATEST(COALESCE(v_profile.pro_expires_at, now()), now());
  v_expires := v_base + make_interval(months => v_promo.duration_months);

  UPDATE public.profiles
     SET is_pro = true,
         pro_plan = v_promo.pro_plan,
         pro_started_at = COALESCE(pro_started_at, now()),
         pro_expires_at = v_expires,
         updated_at = now()
   WHERE id = p_user;

  UPDATE public.promo_codes
     SET used_count = used_count + 1
   WHERE id = v_promo.id;

  INSERT INTO public.promo_redemptions (promo_code_id, user_id, code, pro_plan, duration_months)
  VALUES (v_promo.id, p_user, v_promo.code, v_promo.pro_plan, v_promo.duration_months);

  RETURN jsonb_build_object(
    'ok', true,
    'code', v_promo.code,
    'pro_plan', v_promo.pro_plan,
    'duration_months', v_promo.duration_months,
    'pro_expires_at', v_expires
  );
END;
$$;

REVOKE ALL ON FUNCTION public.redeem_promo_code(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.redeem_promo_code(uuid, text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_promo_code(uuid, text) TO service_role;

INSERT INTO public.promo_codes (code, pro_plan, duration_months, max_uses) VALUES
  ('NHR1', 'yearly', 12, 2),
  ('NHR3', 'quarterly', 3, 3),
  ('NHR01', 'monthly', 1, 3),
  ('WINNIE', 'yearly', 12, 1);