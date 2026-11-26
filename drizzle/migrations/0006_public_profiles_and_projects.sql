CREATE TABLE public.user_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 120),
  description text NOT NULL CHECK (char_length(description) BETWEEN 1 AND 2000),
  tech text[] NOT NULL DEFAULT '{}',
  category text NOT NULL DEFAULT 'Web',
  status text NOT NULL DEFAULT 'Geliştirme Aşamasında',
  github text NOT NULL DEFAULT '' CHECK (github = '' OR github ~* '^https?://'),
  demo text NOT NULL DEFAULT '' CHECK (demo = '' OR demo ~* '^https?://'),
  cover text NOT NULL DEFAULT '' CHECK (cover = '' OR cover ~* '^https?://'),
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_projects TO authenticated;
GRANT ALL ON public.user_projects TO service_role;
ALTER TABLE public.user_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY projects_read ON public.user_projects FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
CREATE POLICY projects_insert ON public.user_projects FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY projects_update ON public.user_projects FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY projects_delete ON public.user_projects FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX user_projects_user_idx ON public.user_projects(user_id, created_at DESC);
CREATE TRIGGER user_projects_updated BEFORE UPDATE ON public.user_projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.get_public_profile(p_username text)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE WHEN auth.uid() IS NULL THEN NULL ELSE (
    SELECT jsonb_build_object(
      'id', p.id, 'username', p.username, 'avatar_shape', p.avatar_shape, 'avatar_color', p.avatar_color,
      'level', p.level, 'xp', p.xp, 'streak', p.streak, 'longest_streak', p.longest_streak,
      'favorite_language', p.favorite_language, 'is_pro', p.is_pro, 'created_at', p.created_at,
      'badges', COALESCE((SELECT jsonb_agg(b.badge_id ORDER BY b.earned_at) FROM public.user_badges b WHERE b.user_id = p.id), '[]'::jsonb),
      'lessons', (SELECT count(*) FROM public.lesson_progress l WHERE l.user_id = p.id)
    ) FROM public.profiles p WHERE lower(p.username) = lower(p_username) LIMIT 1
  ) END
$$;
REVOKE ALL ON FUNCTION public.get_public_profile(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.get_public_profile(text) TO authenticated;