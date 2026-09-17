CREATE OR REPLACE FUNCTION public.game_award_badges(p_user uuid)
 RETURNS text[]
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  pr public.profiles;
  v_cnt integer; v_langs integer; v_fast integer;
  v_ids text[] := '{}'; v_new text[] := '{}';
  t record;
BEGIN
  SELECT * INTO pr FROM public.profiles WHERE id = p_user;
  IF pr.id IS NULL THEN RETURN v_new; END IF;

  SELECT count(DISTINCT level), count(DISTINCT language)
    INTO v_cnt, v_langs
    FROM public.lesson_progress WHERE user_id = p_user;
  SELECT min(duration_seconds) INTO v_fast
    FROM public.lesson_progress
   WHERE user_id = p_user AND xp_earned > 0 AND duration_seconds IS NOT NULL AND duration_seconds > 0;

  v_cnt := coalesce(v_cnt, 0);
  v_langs := coalesce(v_langs, 0);

  IF v_cnt >= 1 THEN v_ids := array_append(v_ids, 'first-step'); END IF;
  IF pr.streak >= 7 THEN v_ids := array_append(v_ids, 'week-warrior'); END IF;
  IF pr.xp >= 100 THEN v_ids := array_append(v_ids, 'century'); END IF;
  IF v_fast IS NOT NULL AND v_fast <= 120 THEN v_ids := array_append(v_ids, 'speedrunner'); END IF;
  IF v_cnt >= 10 THEN v_ids := array_append(v_ids, 'level-10'); END IF;
  IF v_cnt >= 50 THEN v_ids := array_append(v_ids, 'level-50'); END IF;
  IF v_cnt >= 100 THEN v_ids := array_append(v_ids, 'level-100'); END IF;
  IF pr.streak >= 30 THEN v_ids := array_append(v_ids, 'consistent-coder'); END IF;
  IF v_langs >= 4 THEN v_ids := array_append(v_ids, 'polyglot'); END IF;
  IF v_cnt >= 320 THEN v_ids := array_append(v_ids, 'grandmaster'); END IF;

  FOR t IN
    SELECT * FROM (VALUES
      ('html', 1, 20), ('css', 21, 70), ('javascript', 71, 120), ('react', 121, 170),
      ('python', 171, 220), ('cpp', 221, 270), ('java', 271, 320)
    ) AS x(tid, lo, hi)
  LOOP
    IF (SELECT count(DISTINCT level) FROM public.lesson_progress
         WHERE user_id = p_user AND level BETWEEN t.lo AND t.hi) >= (t.hi - t.lo + 1) THEN
      v_ids := array_append(v_ids, t.tid || '-master');
    END IF;
  END LOOP;

  WITH ins AS (
    INSERT INTO public.user_badges (user_id, badge_id)
    SELECT p_user, b FROM unnest(v_ids) AS b
    ON CONFLICT (user_id, badge_id) DO NOTHING
    RETURNING badge_id
  )
  SELECT coalesce(array_agg(badge_id), '{}') INTO v_new FROM ins;

  RETURN v_new;
END;
$function$;