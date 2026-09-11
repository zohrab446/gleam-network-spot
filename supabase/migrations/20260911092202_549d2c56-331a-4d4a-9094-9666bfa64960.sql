REVOKE EXECUTE ON FUNCTION public.unlock_lesson_hint(text, integer) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.unlock_lesson_hint(text, integer) TO service_role;