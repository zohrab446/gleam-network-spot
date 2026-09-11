import { createHmac, timingSafeEqual } from "crypto";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const callbackSchema = z.object({
  merchant_oid: z.string().regex(/^[A-Za-z0-9]+$/).max(100),
  status: z.enum(["success", "failed"]),
  total_amount: z.coerce.number().int().positive(),
  hash: z.string().min(20).max(200),
  failed_reason_code: z.string().max(100).optional(),
  failed_reason_msg: z.string().max(500).optional(),
});

export const Route = createFileRoute("/api/public/paytr/callback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const merchantKey = process.env["PAYTR_MERCHANT_KEY"];
        const merchantSalt = process.env["PAYTR_MERCHANT_SALT"];
        if (!merchantKey || !merchantSalt) return new Response("Configuration error", { status: 503 });

        const raw = Object.fromEntries((await request.formData()).entries());
        const parsed = callbackSchema.safeParse(raw);
        if (!parsed.success) return new Response("Invalid callback", { status: 400 });
        const input = parsed.data;
        const expected = createHmac("sha256", merchantKey)
          .update(`${input.merchant_oid}${merchantSalt}${input.status}${input.total_amount}`)
          .digest();
        let received: Buffer;
        try { received = Buffer.from(input.hash, "base64"); } catch { return new Response("Invalid hash", { status: 400 }); }
        if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
          return new Response("Invalid hash", { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.rpc("fulfill_paytr_order", {
          p_merchant_oid: input.merchant_oid,
          p_status: input.status,
          p_total_amount: input.total_amount,
          p_failure_code: input.failed_reason_code ?? null,
          p_failure_message: input.failed_reason_msg ?? null,
        });
        if (error) {
          console.error("PayTR fulfillment error", error.message);
          return new Response("Processing error", { status: 500 });
        }
        return new Response("OK", { status: 200, headers: { "content-type": "text/plain; charset=utf-8" } });
      },
    },
  },
});