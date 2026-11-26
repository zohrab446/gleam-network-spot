ALTER TABLE public.user_projects DROP CONSTRAINT user_projects_cover_check;

ALTER TABLE public.user_projects
ADD CONSTRAINT user_projects_cover_check CHECK (
  cover = ''
  OR cover ~* '^https?://'
  OR cover ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$'
);