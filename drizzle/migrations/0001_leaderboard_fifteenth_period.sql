CREATE OR REPLACE FUNCTION public.leaderboard_period_start(p_at timestamptz DEFAULT now())
RETURNS date LANGUAGE sql STABLE SET search_path = public
AS $$
  SELECT (date_trunc('month', (p_at AT TIME ZONE 'Europe/Istanbul') - interval '14 days') + interval '14 days')::date;
$$;
REVOKE ALL ON FUNCTION public.leaderboard_period_start(timestamptz) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.leaderboard_period_start(timestamptz) TO service_role;
COMMENT ON FUNCTION public.leaderboard_period_start(timestamptz) IS 'Leaderboard periods begin at midnight Istanbul time on the 15th; end is exclusive.';
ALTER TABLE public.profiles ALTER COLUMN month_start SET DEFAULT public.leaderboard_period_start();
DO $$
DECLARE v_function regprocedure; v_definition text;
BEGIN
  FOREACH v_function IN ARRAY ARRAY[
    'public.game_complete_lesson(uuid,text,integer,text,text,integer)'::regprocedure,
    'public.game_touch_streak(uuid)'::regprocedure,
    'public.get_leaderboard(text,integer)'::regprocedure
  ] LOOP
    v_definition := pg_get_functiondef(v_function);
    IF position('date_trunc(''month'', now())::date' in v_definition) = 0 THEN
      RAISE EXCEPTION 'Expected calendar-month expression missing in %', v_function;
    END IF;
    EXECUTE replace(v_definition, 'date_trunc(''month'', now())::date', 'public.leaderboard_period_start()');
  END LOOP;
END;
$$;
REVOKE ALL ON FUNCTION public.game_complete_lesson(uuid,text,integer,text,text,integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.game_complete_lesson(uuid,text,integer,text,text,integer) TO service_role;
REVOKE ALL ON FUNCTION public.game_touch_streak(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.game_touch_streak(uuid) TO service_role;
REVOKE ALL ON FUNCTION public.get_leaderboard(text,integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(text,integer) TO service_role;
DO $$
BEGIN
  IF public.leaderboard_period_start('2026-11-01 00:00:00+03') <> date '2026-10-15' THEN RAISE EXCEPTION 'Must not reset on the first'; END IF;
  IF public.leaderboard_period_start('2026-11-14 23:59:59+03') <> date '2026-10-15' THEN RAISE EXCEPTION 'Must retain points before the fifteenth'; END IF;
  IF public.leaderboard_period_start('2026-11-15 00:00:00+03') <> date '2026-11-15' THEN RAISE EXCEPTION 'Must reset on the fifteenth in Istanbul'; END IF;
  IF public.leaderboard_period_start('2027-01-01 00:00:00+03') <> date '2026-12-15' THEN RAISE EXCEPTION 'Year rollover must not reset points'; END IF;
END;
$$;