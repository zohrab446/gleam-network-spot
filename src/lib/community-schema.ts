import { z } from "zod";

export const COMMUNITY_CATEGORIES = ["Soru-Cevap", "Kod İnceleme", "Takım Bul", "Etkinlikler", "Duyuru"] as const;
export const PostInput = z.object({ category: z.enum(COMMUNITY_CATEGORIES), title: z.string().trim().min(5).max(180), body: z.string().trim().min(10).max(10000), tags: z.array(z.string().trim().regex(/^[\p{L}\p{N}_-]{1,30}$/u)).max(5) });
export const CommunityAction = z.discriminatedUnion("action", [
  z.object({ action: z.literal("post"), post: PostInput }),
  z.object({ action: z.literal("comment"), postId: z.string().uuid(), body: z.string().trim().min(1).max(3000) }),
  z.object({ action: z.literal("reaction"), postId: z.string().uuid(), kind: z.enum(["like", "save"]), active: z.boolean() }),
  z.object({ action: z.literal("delete"), postId: z.string().uuid() }),
  z.object({ action: z.literal("register"), eventId: z.literal("community-preview-meetup"), active: z.boolean() }),
]);