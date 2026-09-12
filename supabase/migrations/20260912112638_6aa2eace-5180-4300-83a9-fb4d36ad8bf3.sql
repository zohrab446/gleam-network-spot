CREATE OR REPLACE FUNCTION public.redeem_promo_code(p_user uuid, p_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_promo public.promo_codes;
  v_profile public.profiles;
  v_base timestamptz;
  v_expires timestamptz;
BEGIN
  SELECT * INTO v_promo FROM public.promo_codes
   WHERE upper(code) = upper(btrim(p_code)) FOR UPDATE;

  IF v_promo.id IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'invalid'); END IF;
  IF NOT v_promo.is_active THEN RETURN jsonb_build_object('ok', false, 'error', 'inactive'); END IF;
  IF v_promo.used_count >= v_promo.max_uses THEN RETURN jsonb_build_object('ok', false, 'error', 'exhausted'); END IF;
  IF EXISTS (SELECT 1 FROM public.promo_redemptions r
              WHERE r.promo_code_id = v_promo.id AND r.user_id = p_user) THEN
    RETURN jsonb_build_object('ok', false, 'error', 'already_used');
  END IF;

  SELECT * INTO v_profile FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF v_profile.id IS NULL THEN RETURN jsonb_build_object('ok', false, 'error', 'no_profile'); END IF;

  v_base := GREATEST(COALESCE(v_profile.pro_expires_at, now()), now());
  v_expires := v_base + make_interval(months => v_promo.duration_months);

  PERFORM set_config('app.trusted', 'on', true);
  UPDATE public.profiles
     SET is_pro = true,
         pro_plan = v_promo.pro_plan,
         pro_started_at = COALESCE(pro_started_at, now()),
         pro_expires_at = v_expires,
         updated_at = now()
   WHERE id = p_user;

  UPDATE public.promo_codes SET used_count = used_count + 1 WHERE id = v_promo.id;

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
$function$;

DO $$
DECLARE r record;
BEGIN
  PERFORM set_config('app.trusted', 'on', true);
  FOR r IN
    SELECT pr.user_id, pr.pro_plan, pr.duration_months, pr.created_at
      FROM public.promo_redemptions pr
      JOIN public.profiles p ON p.id = pr.user_id
     WHERE p.pro_plan IS DISTINCT FROM pr.pro_plan
  LOOP
    UPDATE public.profiles
       SET is_pro = true,
           pro_plan = r.pro_plan,
           pro_started_at = COALESCE(pro_started_at, now()),
           pro_expires_at = GREATEST(COALESCE(pro_expires_at, now()), now()) + make_interval(months => r.duration_months),
           updated_at = now()
     WHERE id = r.user_id;
  END LOOP;
END $$;