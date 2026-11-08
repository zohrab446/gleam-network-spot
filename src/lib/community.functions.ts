import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { humanAction } from "./turnstile-middleware";
import { CommunityAction } from "./community-schema";

export const getCommunity = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { supabase, userId } = context;
  const results = await Promise.all([
    supabase.from("community_posts").select("*").order("created_at", { ascending: false }).limit(100),
    supabase.from("community_comments").select("*").order("created_at", { ascending: true }).limit(1000),
    supabase.from("community_reactions").select("*"),
    supabase.from("community_event_registrations").select("*").eq("user_id", userId),
  ]);
  for (const result of results) if (result.error) throw new Error("Topluluk yüklenemedi.");
  return { posts: results[0].data ?? [], comments: results[1].data ?? [], reactions: results[2].data ?? [], registrations: results[3].data ?? [], userId };
});

export const updateCommunity = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth, humanAction("community_action")]).inputValidator((input: unknown) => CommunityAction.parse(input)).handler(async ({ data, context }) => {
  const { userId, supabase } = context;
  const { data: profile, error } = await supabase.from("profiles").select("username").eq("id", userId).single();
  if (error || !profile) throw new Error("Hesap doğrulanamadı.");
  // Privileged writes happen only after authenticated identity and fresh challenge verification.
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const author = profile.username ?? "Kodcu";
  if (data.action === "post") {
    const result = await supabaseAdmin.from("community_posts").insert({ ...data.post, user_id: userId, author_name: author }).select("id").single();
    if (result.error) throw new Error("Gönderi kaydedilemedi.");
    return { postId: result.data.id };
  }
  if (data.action === "register") {
    const result = data.active ? await supabaseAdmin.from("community_event_registrations").upsert({ event_id: data.eventId, user_id: userId }) : await supabaseAdmin.from("community_event_registrations").delete().eq("event_id", data.eventId).eq("user_id", userId);
    if (result.error) throw new Error("Kayıt güncellenemedi.");
    return { postId: null };
  }
  const { data: post } = await supabase.from("community_posts").select("user_id").eq("id", data.postId).maybeSingle();
  if (!post) throw new Error("Gönderi bulunamadı.");
  if (data.action === "delete") {
    if (post.user_id !== userId) throw new Error("Bu gönderiyi silemezsin.");
    const result = await supabaseAdmin.from("community_posts").delete().eq("id", data.postId).eq("user_id", userId);
    if (result.error) throw new Error("Gönderi silinemedi.");
  } else if (data.action === "comment") {
    const result = await supabaseAdmin.from("community_comments").insert({ post_id: data.postId, user_id: userId, author_name: author, body: data.body });
    if (result.error) throw new Error("Yorum kaydedilemedi.");
  } else {
    const result = data.active ? await supabaseAdmin.from("community_reactions").upsert({ post_id: data.postId, user_id: userId, kind: data.kind }) : await supabaseAdmin.from("community_reactions").delete().eq("post_id", data.postId).eq("user_id", userId).eq("kind", data.kind);
    if (result.error) throw new Error("İşlem kaydedilemedi.");
  }
  return { postId: data.postId };
});