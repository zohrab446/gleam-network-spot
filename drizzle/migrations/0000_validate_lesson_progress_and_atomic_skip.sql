CREATE OR REPLACE FUNCTION public.validate_canonical_progress()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE v_language text; v_prefix text; v_first integer;
BEGIN
  PERFORM 1 FROM public.profiles WHERE id=NEW.user_id FOR UPDATE;
  SELECT language,prefix,first_level INTO v_language,v_prefix,v_first
  FROM (VALUES ('html','html',1,20),('css','css',21,70),('javascript','js',71,120),('react','react',121,170),('python','python',171,220),('cpp','cpp',221,270),('java','java',271,320)) AS tracks(language,prefix,first_level,last_level)
  WHERE NEW.level BETWEEN first_level AND last_level;
  IF v_language IS NULL OR NEW.language IS DISTINCT FROM v_language OR NEW.lesson_id IS DISTINCT FROM v_prefix||'-'||NEW.level::text THEN RAISE EXCEPTION 'BOT_BLOCKED:lesson'; END IF;
  IF NEW.level>v_first AND NOT EXISTS(SELECT 1 FROM public.lesson_progress WHERE user_id=NEW.user_id AND lesson_id=v_prefix||'-'||(NEW.level-1)::text AND level=NEW.level-1 AND language=v_language) THEN RAISE EXCEPTION 'BOT_BLOCKED:locked_lesson'; END IF;
  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.validate_canonical_progress() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.validate_canonical_progress() TO service_role;
CREATE TRIGGER validate_canonical_progress_before_insert BEFORE INSERT ON public.lesson_progress FOR EACH ROW EXECUTE FUNCTION public.validate_canonical_progress();

CREATE OR REPLACE FUNCTION public.game_skip_level(p_user uuid,p_lesson_id text,p_level integer,p_language text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE pr public.profiles; v_new_level integer; v_language text; v_prefix text; v_first integer; v_pro boolean;
BEGIN
  IF p_user IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;
  SELECT language,prefix,first_level INTO v_language,v_prefix,v_first
  FROM (VALUES ('html','html',1,20),('css','css',21,70),('javascript','js',71,120),('react','react',121,170),('python','python',171,220),('cpp','cpp',221,270),('java','java',271,320)) AS tracks(language,prefix,first_level,last_level)
  WHERE p_level BETWEEN first_level AND last_level;
  IF v_language IS NULL OR p_language IS DISTINCT FROM v_language OR p_lesson_id IS DISTINCT FROM v_prefix||'-'||p_level::text THEN RAISE EXCEPTION 'BOT_BLOCKED:lesson'; END IF;
  SELECT * INTO pr FROM public.profiles WHERE id=p_user FOR UPDATE;
  IF pr.id IS NULL THEN RAISE EXCEPTION 'NO_PROFILE'; END IF;
  IF EXISTS(SELECT 1 FROM public.lesson_progress WHERE user_id=p_user AND lesson_id=p_lesson_id) THEN RETURN jsonb_build_object('new_level',pr.level); END IF;
  IF p_level>v_first AND NOT EXISTS(SELECT 1 FROM public.lesson_progress WHERE user_id=p_user AND lesson_id=v_prefix||'-'||(p_level-1)::text AND level=p_level-1 AND language=v_language) THEN RAISE EXCEPTION 'BOT_BLOCKED:locked_lesson'; END IF;
  pr:=public.energy_sync(p_user);
  v_pro:=pr.is_pro AND (pr.pro_expires_at IS NULL OR pr.pro_expires_at>now());
  IF NOT v_pro AND pr.energy<2 THEN RAISE EXCEPTION 'NO_ENERGY'; END IF;
  PERFORM public.energy_spend(p_user,2,'skip_level',jsonb_build_object('level',p_level));
  INSERT INTO public.lesson_progress(user_id,lesson_id,level,language,xp_earned,coins_earned,duration_seconds,code) VALUES(p_user,p_lesson_id,p_level,p_language,0,0,0,NULL);
  SELECT least(320,greatest(pr.level,count(DISTINCT level)::integer+1)) INTO v_new_level FROM public.lesson_progress WHERE user_id=p_user;
  PERFORM set_config('app.trusted','on',true);
  UPDATE public.profiles SET level=v_new_level WHERE id=p_user;
  RETURN jsonb_build_object('new_level',v_new_level);
END $$;
REVOKE ALL ON FUNCTION public.game_skip_level(uuid,text,integer,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.game_skip_level(uuid,text,integer,text) TO service_role;