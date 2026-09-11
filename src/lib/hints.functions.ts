import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const inputSchema = z.object({
  lessonId: z.string().trim().min(1).max(100),
  hintIndex: z.number().int().min(0).max(2),
});

export const unlockLessonHint = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => inputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: result, error } = await supabaseAdmin.rpc("unlock_lesson_hint", {
      p_user: context.userId,
      p_lesson_id: data.lessonId,
      p_hint_index: data.hintIndex,
    });
    if (error) throw new Error(error.message.includes("NO_HINT_CREDITS") ? "NO_HINT_CREDITS" : "HINT_FAILED");
    return result as { unlocked: boolean; consumed: boolean; remaining: number; is_pro: boolean };
  });