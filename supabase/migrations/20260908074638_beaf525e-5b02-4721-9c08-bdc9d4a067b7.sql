CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  username TEXT,
  avatar_shape TEXT NOT NULL DEFAULT 'star',
  avatar_color TEXT NOT NULL DEFAULT 'indigo',
  level INT NOT NULL DEFAULT 1,
  xp INT NOT NULL DEFAULT 0,
  weekly_xp INT NOT NULL DEFAULT 0,
  week_start DATE NOT NULL DEFAULT date_trunc('week', now())::date,
  coins INT NOT NULL DEFAULT 0,
  streak INT NOT NULL DEFAULT 0,
  longest_streak INT NOT NULL DEFAULT 0,
  last_active_date DATE,
  favorite_language TEXT,
  sound_enabled BOOLEAN NOT NULL DEFAULT true,
  theme TEXT NOT NULL DEFAULT 'light',
  language TEXT NOT NULL DEFAULT 'tr',
  onboarded BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  level INT NOT NULL,
  language TEXT NOT NULL,
  xp_earned INT NOT NULL DEFAULT 0,
  coins_earned INT NOT NULL DEFAULT 0,
  duration_seconds INT,
  code TEXT,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own progress" ON public.lesson_progress
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_badges TO authenticated;
GRANT ALL ON public.user_badges TO service_role;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own badges" ON public.user_badges
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own chat" ON public.chat_messages
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(COALESCE(NEW.email, 'kodcu'), '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.get_leaderboard(p_scope TEXT DEFAULT 'all', p_limit INT DEFAULT 50)
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  avatar_shape TEXT,
  avatar_color TEXT,
  level INT,
  xp INT,
  weekly_xp INT,
  streak INT,
  rank_position BIGINT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM (
    SELECT
      p.id AS user_id,
      COALESCE(p.username, 'Kodcu') AS username,
      p.avatar_shape,
      p.avatar_color,
      p.level,
      p.xp,
      CASE WHEN p.week_start = date_trunc('week', now())::date THEN p.weekly_xp ELSE 0 END AS weekly_xp,
      p.streak,
      ROW_NUMBER() OVER (
        ORDER BY CASE WHEN p_scope = 'weekly'
          THEN (CASE WHEN p.week_start = date_trunc('week', now())::date THEN p.weekly_xp ELSE 0 END)
          ELSE p.xp END DESC, p.level DESC, p.created_at ASC
      ) AS rank_position
    FROM public.profiles p
  ) ranked
  ORDER BY ranked.rank_position
  LIMIT GREATEST(p_limit, 1);
$$;

GRANT EXECUTE ON FUNCTION public.get_leaderboard(TEXT, INT) TO authenticated;