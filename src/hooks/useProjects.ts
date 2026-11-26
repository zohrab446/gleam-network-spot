import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const PROJECT_COVERS = "project-covers";
const SIGNED_URL_SECONDS = 60 * 60;

export type DbProject = {
  id: string; user_id: string; title: string; description: string; tech: string[];
  category: string; status: string; github: string; demo: string; cover: string;
  coverPath?: string; featured: boolean; created_at: string; updated_at: string;
};
export type ProjectInput = Pick<DbProject, "title" | "description" | "tech" | "category" | "status" | "github" | "demo" | "cover">;

function isStoredCover(cover: string) {
  return !!cover && !/^https?:\/\//i.test(cover) && !cover.startsWith("data:");
}

export function useUserProjects(userId: string | undefined) {
  return useQuery({
    queryKey: ["user-projects", userId],
    enabled: !!userId,
    staleTime: 30 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_user_projects", { p_user: userId! });
      if (error) throw error;
      const projects = (data ?? []) as DbProject[];
      return Promise.all(projects.map(async (project) => {
        if (!isStoredCover(project.cover)) return project;
        const { data: signed, error: signError } = await supabase.storage
          .from(PROJECT_COVERS)
          .createSignedUrl(project.cover, SIGNED_URL_SECONDS);
        if (signError) return { ...project, cover: "", coverPath: project.cover };
        return { ...project, cover: signed.signedUrl, coverPath: project.cover };
      }));
    },
  });
}

export function useProjectMutations(userId: string | undefined) {
  const qc = useQueryClient();
  const done = () => qc.invalidateQueries({ queryKey: ["user-projects", userId] });
  const save = useMutation({
    mutationFn: async ({ id, input, coverFile }: { id?: string | null; input: ProjectInput; coverFile?: File | null }) => {
      if (!userId) throw new Error("Oturum bulunamadı.");
      let cover = input.cover;
      let uploadedPath: string | null = null;

      if (coverFile) {
        const extension = coverFile.type === "image/png" ? "png" : coverFile.type === "image/webp" ? "webp" : "jpg";
        uploadedPath = `${userId}/${crypto.randomUUID()}.${extension}`;
        const { error } = await supabase.storage.from(PROJECT_COVERS).upload(uploadedPath, coverFile, { contentType: coverFile.type });
        if (error) throw new Error("Kapak görseli yüklenemedi. Tekrar dene.");
        cover = uploadedPath;
      }

      const values = { ...input, cover };
      const res = id
        ? await supabase.from("user_projects").update(values).eq("id", id)
        : await supabase.from("user_projects").insert({ ...values, user_id: userId });
      if (res.error) {
        if (uploadedPath) await supabase.storage.from(PROJECT_COVERS).remove([uploadedPath]);
        throw res.error;
      }

      if (id && uploadedPath && isStoredCover(input.cover) && input.cover !== uploadedPath) {
        await supabase.storage.from(PROJECT_COVERS).remove([input.cover]);
      }
    }, onSuccess: done,
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { data: project, error: readError } = await supabase.from("user_projects").select("cover").eq("id", id).single();
      if (readError) throw readError;
      const { error } = await supabase.from("user_projects").delete().eq("id", id);
      if (error) throw error;
      if (isStoredCover(project.cover)) await supabase.storage.from(PROJECT_COVERS).remove([project.cover]);
    }, onSuccess: done,
  });
  const feature = useMutation({
    mutationFn: async (id: string) => {
      const a = await supabase.from("user_projects").update({ featured: false }).eq("user_id", userId!).neq("id", id); if (a.error) throw a.error;
      const b = await supabase.from("user_projects").update({ featured: true }).eq("id", id); if (b.error) throw b.error;
    }, onSuccess: done,
  });
  return { save, remove, feature };
}
