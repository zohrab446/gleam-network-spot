CREATE POLICY "Authenticated users can view project covers"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'project-covers');

CREATE POLICY "Users can upload own project covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-covers'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update own project covers"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'project-covers'
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'project-covers'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete own project covers"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-covers'
  AND (storage.foldername(name))[1] = auth.uid()::text
);