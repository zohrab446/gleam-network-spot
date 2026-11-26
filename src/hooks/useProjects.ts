import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type DbProject = {
  id: string; user_id: string; title: string; description: string; tech: string[];
  category: string; status: string; github: string; demo: string; cover: string;
  featured: boolean; created_at: string; updated_at: string;
};
export type ProjectInput = Pick<DbProject, "title" | "description" | "tech" | "category" | "status" | "github" | "demo" | "cover">;

export function useUserProjects(userId: string | undefined) {
  return useQuery({
    queryKey: ["user-projects", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_user_projects", { p_user: userId! });
      if (error) throw error;
      return (data ?? []) as DbProject[];
    },
  });
}

export function useProjectMutations(userId: string | undefined) {
  const qc = useQueryClient();
  const done = () => qc.invalidateQueries({ queryKey: ["user-projects", userId] });
  const save = useMutation({
    mutationFn: async ({ id, input }: { id?: string | null; input: ProjectInput }) => {
      const res = id ? await supabase.from("user_projects").update(input).eq("id", id) : await supabase.from("user_projects").insert({ ...input, user_id: userId! });
      if (res.error) throw res.error;
    }, onSuccess: done,
  });
  const remove = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("user_projects").delete().eq("id", id); if (error) throw error; }, onSuccess: done,
  });
  const feature = useMutation({
    mutationFn: async (id: string) => {
      const a = await supabase.from("user_projects").update({ featured: false }).eq("user_id", userId!).neq("id", id); if (a.error) throw a.error;
      const b = await supabase.from("user_projects").update({ featured: true }).eq("id", id); if (b.error) throw b.error;
    }, onSuccess: done,
  });
  return { save, remove, feature };
}
