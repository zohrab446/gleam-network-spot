DROP FUNCTION IF EXISTS public.get_leaderboard(text, integer);

CREATE FUNCTION public.get_leaderboard(p_scope text DEFAULT 'all'::text, p_limit integer DEFAULT 50)
 RETURNS TABLE(user_id uuid, username text, avatar_shape text, avatar_color text, level integer, xp integer, weekly_xp integer, coins integer, streak integer, longest_streak integer, rank_position bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT * FROM (
    SELECT
      p.id AS user_id,
      COALESCE(p.username, 'Kodcu') AS username,
      p.avatar_shape,
      p.avatar_color,
      p.level,
      p.xp,
      CASE WHEN p.week_start = date_trunc('week', now())::date THEN p.weekly_xp ELSE 0 END AS weekly_xp,
      p.coins,
      p.streak,
      p.longest_streak,
      ROW_NUMBER() OVER (
        ORDER BY CASE WHEN p_scope = 'weekly'
          THEN (CASE WHEN p.week_start = date_trunc('week', now())::date THEN p.weekly_xp ELSE 0 END)
          ELSE p.xp END DESC, p.level DESC, p.created_at ASC
      ) AS rank_position
    FROM public.profiles p
  ) ranked
  ORDER BY ranked.rank_position
  LIMIT GREATEST(p_limit, 1);
$function$;

REVOKE ALL ON FUNCTION public.get_leaderboard(text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(text, integer) TO authenticated;