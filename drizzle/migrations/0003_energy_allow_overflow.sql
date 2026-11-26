CREATE OR REPLACE FUNCTION public.energy_grant(p_user uuid, p_amount integer, p_type text, p_meta jsonb DEFAULT '{}'::jsonb)
 RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE v_before INTEGER; v_after INTEGER; v_max INTEGER;
BEGIN
  PERFORM set_config('app.trusted', 'on', true);
  SELECT energy, max_energy INTO v_before, v_max FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF v_before IS NULL THEN RETURN 0; END IF;
  v_after := least(greatest(v_before + p_amount, 0), 999);
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

CREATE OR REPLACE FUNCTION public.energy_sync(p_user uuid)
 RETURNS profiles LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE pr public.profiles; v_today date := (now() AT TIME ZONE 'utc')::date; v_ticks integer; v_new integer; v_before integer;
BEGIN
  IF p_user IS NULL THEN RAISE EXCEPTION 'NOT_AUTHENTICATED'; END IF;
  PERFORM set_config('app.trusted', 'on', true);
  SELECT * INTO pr FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF pr.id IS NULL THEN RAISE EXCEPTION 'NO_PROFILE'; END IF;
  IF pr.is_pro AND pr.pro_expires_at IS NOT NULL AND pr.pro_expires_at < now() THEN
    UPDATE public.profiles SET is_pro=false, pro_plan=NULL WHERE id=pr.id RETURNING * INTO pr;
  END IF;
  IF pr.energy_day IS DISTINCT FROM v_today THEN
    v_before:=pr.energy;
    UPDATE public.profiles SET energy=greatest(energy,max_energy), energy_day=v_today, energy_updated_at=now(), ads_watched_today=0, ads_day=v_today,
      total_energy_gained=total_energy_gained+greatest(max_energy-v_before,0) WHERE id=pr.id RETURNING * INTO pr;
    PERFORM public.energy_log(pr.id,'daily_reset',pr.energy-v_before,v_before,pr.energy,jsonb_build_object('day',v_today));
  ELSIF pr.energy < pr.max_energy THEN
    v_ticks:=floor(extract(epoch FROM (now()-pr.energy_updated_at))/5400)::int;
    IF v_ticks>0 THEN
      v_before:=pr.energy; v_new:=least(pr.max_energy,pr.energy+v_ticks);
      UPDATE public.profiles SET energy=v_new,total_energy_gained=total_energy_gained+(v_new-v_before),
        energy_updated_at=CASE WHEN v_new>=pr.max_energy THEN now() ELSE pr.energy_updated_at+(v_ticks*interval '90 minutes') END
        WHERE id=pr.id RETURNING * INTO pr;
      PERFORM public.energy_log(pr.id,'time_refill',v_new-v_before,v_before,v_new,'{}'::jsonb);
    END IF;
  END IF;
  RETURN pr;
END $function$;