CREATE TYPE public.app_role AS ENUM ('ogrenci','sirket','admin');
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own_roles_read" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE TABLE public.competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  date_label text NOT NULL DEFAULT '',
  participation text NOT NULL DEFAULT 'Bireysel / Takım',
  categories text[] NOT NULL DEFAULT '{}',
  icon text NOT NULL DEFAULT '🏆',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','soon','past')),
  featured boolean NOT NULL DEFAULT false,
  prize text NOT NULL DEFAULT '',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.competitions TO authenticated;
GRANT ALL ON public.competitions TO service_role;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "competitions_read" ON public.competitions FOR SELECT TO authenticated USING (true);
CREATE POLICY "competitions_admin_write" ON public.competitions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));