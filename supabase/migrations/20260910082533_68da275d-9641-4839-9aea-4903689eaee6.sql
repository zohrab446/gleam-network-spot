CREATE OR REPLACE FUNCTION public.energy_grant(p_user uuid, p_amount integer, p_type text, p_meta jsonb DEFAULT '{}'::jsonb)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE v_before INTEGER; v_after INTEGER; v_max INTEGER;
BEGIN
  PERFORM set_config('app.trusted', 'on', true);
  SELECT energy, max_energy INTO v_before, v_max FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF v_before IS NULL THEN RETURN 0; END IF;
  v_after := least(greatest(v_before + p_amount, 0), greatest(v_max, 0));
  IF v_after = v_before THEN
    PERFORM public.energy_log(p_user, p_type, 0, v_before, v_after, coalesce(p_meta, '{}'::jsonb) || '{"capped": true}'::jsonb);
    RETURN v_after;
  END IF;
  UPDATE public.profiles
     SET energy = v_after,
         total_energy_gained = total_energy_gained + greatest(v_after - v_before, 0),
         energy_updated_at = CASE WHEN v_after >= v_max THEN now() ELSE energy_updated_at END
   WHERE id = p_user;
  PERFORM public.energy_log(p_user, p_type, v_after - v_before, v_before, v_after, coalesce(p_meta, '{}'::jsonb));
  RETURN v_after;
END;
$function$;

REVOKE ALL ON FUNCTION public.energy_grant(uuid, integer, text, jsonb) FROM PUBLIC, anon, authenticated;

UPDATE public.profiles SET energy = max_energy WHERE energy > max_energy;