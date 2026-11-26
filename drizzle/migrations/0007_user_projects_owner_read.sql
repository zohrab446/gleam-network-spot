DROP POLICY IF EXISTS projects_read ON public.user_projects;
CREATE POLICY projects_owner_read ON public.user_projects FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE OR REPLACE FUNCTION public.get_user_projects(p_user uuid)
RETURNS TABLE(id uuid, user_id uuid, title text, description text, tech text[], category text, status text, github text, demo text, cover text, featured boolean, created_at timestamptz, updated_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT p.id, p.user_id, p.title, p.description, p.tech, p.category, p.status, p.github, p.demo, p.cover, p.featured, p.created_at, p.updated_at
  FROM public.user_projects p WHERE auth.uid() IS NOT NULL AND p.user_id = p_user ORDER BY p.created_at DESC LIMIT 100
$$;
REVOKE ALL ON FUNCTION public.get_user_projects(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.get_user_projects(uuid) TO authenticated;