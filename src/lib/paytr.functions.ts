import { createHmac, randomUUID } from "crypto";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getStoreProduct } from "@/lib/store";

const checkoutSchema = z.object({ productId: z.string().min(1).max(40) });

export const createPaytrCheckout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => checkoutSchema.parse(input))
  .handler(async ({ data, context }) => {
    const product = getStoreProduct(data.productId);
    if (!product) throw new Error("Geçersiz paket.");

    const merchantId = process.env["PAYTR_MERCHANT_ID"]?.replace(/\D/g, "");
    const merchantKey = process.env["PAYTR_MERCHANT_KEY"]?.trim();
    const merchantSalt = process.env["PAYTR_MERCHANT_SALT"]?.trim();
    if (!merchantId || !merchantKey || !merchantSalt) throw new Error("PAYTR_NOT_CONFIGURED");

    const request = getRequest();
    const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const userIp = forwardedIp || "127.0.0.1";
    const email = typeof context.claims.email === "string" ? context.claims.email : "customer@codequest.app";
    const merchantOid = `CQ${randomUUID().replaceAll("-", "")}`;
    const userBasket = Buffer.from(JSON.stringify([[product.name, (product.amountKurus / 100).toFixed(2), 1]])).toString("base64");
    const origin = new URL(request.url).origin;
    const paymentAmount = String(product.amountKurus);
    const noInstallment = "0";
    const maxInstallment = "0";
    const currency = "TL";
    const testMode = "0";
    const hashStr = `${merchantId}${userIp}${merchantOid}${email}${paymentAmount}${userBasket}${noInstallment}${maxInstallment}${currency}${testMode}`;
    const paytrToken = createHmac("sha256", merchantKey).update(`${hashStr}${merchantSalt}`).digest("base64");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: orderError } = await supabaseAdmin.from("payment_orders").insert({
      merchant_oid: merchantOid,
      user_id: context.userId,
      product_id: product.id,
      product_type: product.type,
      quantity: product.quantity,
      amount_kurus: product.amountKurus,
    });
    if (orderError) throw new Error("Sipariş oluşturulamadı.");

    const form = new URLSearchParams({
      merchant_id: merchantId,
      user_ip: userIp,
      merchant_oid: merchantOid,
      email,
      payment_amount: paymentAmount,
      paytr_token: paytrToken,
      user_basket: userBasket,
      debug_on: "0",
      no_installment: noInstallment,
      max_installment: maxInstallment,
      user_name: typeof context.claims.user_metadata === "object" ? String((context.claims.user_metadata as Record<string, unknown>)["full_name"] ?? "CodeQuest Oyuncusu") : "CodeQuest Oyuncusu",
      user_address: "Türkiye",
      user_phone: "0000000000",
      merchant_ok_url: `${origin}/payment/success?order=${merchantOid}`,
      merchant_fail_url: `${origin}/payment/failed?order=${merchantOid}`,
      timeout_limit: "30",
      currency,
      test_mode: testMode,
      lang: "tr",
      iframe_v2: "1",
    });

    const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: form,
    });
    const result = (await response.json()) as { status?: string; token?: string; reason?: string };
    if (!response.ok || result.status !== "success" || !result.token) {
      console.error("PayTR token error", result.reason ?? response.status);
      throw new Error("Ödeme ekranı açılamadı.");
    }
    return { token: result.token, merchantOid, testMode: testMode === "1" };
  });