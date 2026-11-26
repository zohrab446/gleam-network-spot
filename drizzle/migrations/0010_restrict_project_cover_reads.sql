CREATE OR REPLACE FUNCTION public.can_view_project_cover(p_name text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.user_projects p
    WHERE p.cover = p_name
      AND split_part(p_name, '/', 1) = p.user_id::text
  );
$$;
REVOKE ALL ON FUNCTION public.can_view_project_cover(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_view_project_cover(text) TO authenticated, service_role;
ALTER POLICY "Authenticated users can view project covers"
ON storage.objects
USING (
  bucket_id = 'project-covers'
  AND auth.uid() IS NOT NULL
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.can_view_project_cover(name)
  )
);