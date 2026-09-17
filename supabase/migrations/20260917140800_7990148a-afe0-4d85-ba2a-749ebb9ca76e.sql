-- 1) Aynı kullanıcı adını kullanan mevcut hesapları ayır
WITH dupes AS (
  SELECT id, row_number() OVER (PARTITION BY lower(username) ORDER BY created_at) AS rn
  FROM public.profiles
  WHERE username IS NOT NULL
)
UPDATE public.profiles p
SET username = left(p.username, 14) || substr(replace(p.id::text, '-', ''), 1, 5)
FROM dupes d
WHERE d.id = p.id AND d.rn > 1;

-- 2) Kullanıcı adı benzersizliği (büyük/küçük harf duyarsız)
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_unique_lower
  ON public.profiles (lower(username));

-- 3) Yeni kayıtta ad zaten alınmışsa otomatik benzersizleştir
CREATE OR REPLACE FUNCTION public.profiles_validate_username()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v_suffix text;
BEGIN
  IF NEW.username IS NOT NULL THEN
    NEW.username := btrim(NEW.username);
    IF TG_OP = 'INSERT' THEN
      NEW.username := left(regexp_replace(NEW.username, '[^A-Za-z0-9._]', '', 'g'), 20);
      IF length(NEW.username) < 3 THEN
        NEW.username := 'kodcu' || substr(replace(NEW.id::text, '-', ''), 1, 6);
      END IF;
      IF EXISTS (SELECT 1 FROM public.profiles WHERE lower(username) = lower(NEW.username)) THEN
        v_suffix := substr(replace(NEW.id::text, '-', ''), 1, 5);
        NEW.username := left(NEW.username, 20 - length(v_suffix)) || v_suffix;
      END IF;
    ELSIF NEW.username IS DISTINCT FROM OLD.username THEN
      IF NEW.username !~ '^[A-Za-z0-9._]{3,20}$' THEN
        RAISE EXCEPTION 'INVALID_USERNAME';
      END IF;
      IF EXISTS (
        SELECT 1 FROM public.profiles
        WHERE lower(username) = lower(NEW.username) AND id <> NEW.id
      ) THEN
        RAISE EXCEPTION 'USERNAME_TAKEN';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;