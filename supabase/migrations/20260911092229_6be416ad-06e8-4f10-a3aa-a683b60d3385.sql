CREATE OR REPLACE FUNCTION public.unlock_lesson_hint(p_user uuid, p_lesson_id text, p_hint_index integer)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile public.profiles%ROWTYPE;
  v_already boolean;
  v_pro boolean;
BEGIN
  IF p_user IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;
  IF length(trim(p_lesson_id)) < 1 OR length(p_lesson_id) > 100 OR p_hint_index NOT BETWEEN 0 AND 2 THEN
    RAISE EXCEPTION 'INVALID_HINT';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.hint_unlocks
    WHERE user_id = p_user AND lesson_id = p_lesson_id AND hint_index = p_hint_index
  ) INTO v_already;

  SELECT * INTO v_profile FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'PROFILE_NOT_FOUND'; END IF;
  v_pro := v_profile.is_pro AND (v_profile.pro_expires_at IS NULL OR v_profile.pro_expires_at > now());

  IF v_already THEN
    RETURN jsonb_build_object('unlocked', true, 'consumed', false, 'remaining', v_profile.hint_credits, 'is_pro', v_pro);
  END IF;

  IF NOT v_pro THEN
    IF v_profile.hint_credits < 1 THEN RAISE EXCEPTION 'NO_HINT_CREDITS'; END IF;
    UPDATE public.profiles
      SET hint_credits = hint_credits - 1,
          total_hints_used = total_hints_used + 1,
          updated_at = now()
      WHERE id = p_user
      RETURNING * INTO v_profile;
  END IF;

  INSERT INTO public.hint_unlocks (user_id, lesson_id, hint_index)
  VALUES (p_user, p_lesson_id, p_hint_index)
  ON CONFLICT (user_id, lesson_id, hint_index) DO NOTHING;

  RETURN jsonb_build_object('unlocked', true, 'consumed', NOT v_pro, 'remaining', v_profile.hint_credits, 'is_pro', v_pro);
END;
$$;
REVOKE ALL ON FUNCTION public.unlock_lesson_hint(uuid, text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.unlock_lesson_hint(uuid, text, integer) TO service_role;