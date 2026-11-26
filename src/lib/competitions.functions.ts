import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const CompetitionInput = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().max(1000).default(""),
  date_label: z.string().trim().max(80).default(""),
  participation: z.string().trim().max(60).default("Bireysel / Takım"),
  categories: z.array(z.string().trim().min(1).max(40)).max(6).default([]),
  icon: z.string().trim().min(1).max(8).default("🏆"),
  status: z.enum(["active", "soon", "past"]),
  featured: z.boolean().default(false),
  prize: z.string().trim().max(80).default(""),
});

export const listCompetitions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data, error } = await context.supabase.from("competitions").select("*").order("created_at", { ascending: false }).limit(200);
  if (error) throw new Error("Yarışmalar yüklenemedi.");
  return data ?? [];
});

export const getMyRoles = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId);
  return (data ?? []).map((r) => r.role);
});

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error || data !== true) throw new Error("Bu işlem için admin yetkisi gerekiyor.");
}

export const createCompetition = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i: unknown) => CompetitionInput.parse(i)).handler(async ({ data, context }) => {
  await assertAdmin(context.supabase, context.userId);
  if (data.featured) await context.supabase.from("competitions").update({ featured: false }).eq("featured", true);
  const { error } = await context.supabase.from("competitions").insert({ ...data, created_by: context.userId });
  if (error) throw new Error("Yarışma kaydedilemedi.");
  return { ok: true };
});

export const deleteCompetition = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i)).handler(async ({ data, context }) => {
  await assertAdmin(context.supabase, context.userId);
  const { error } = await context.supabase.from("competitions").delete().eq("id", data.id);
  if (error) throw new Error("Yarışma silinemedi.");
  return { ok: true };
});
