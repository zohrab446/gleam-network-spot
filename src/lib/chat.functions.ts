import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";

const SYSTEM_PROMPT = `Sen CodeQuest'in yazılım öğrenme asistanısın. Türkçe ve İngilizce konuşabilirsin; öğrenci hangi dilde yazarsa o dilde cevap ver.
Kurallar:
- Asla hazır çözümü veya tam kodu direkt verme. Onun yerine ipucu ver ve karşı soru sor.
- Öğrenciyi düşünmeye teşvik et: "Hangi satırda hata alıyorsun?", "Bunu tekrar etmek için hangi yapıyı kullanırsın?" gibi.
- Kısa yaz: en fazla 3-4 cümle. Sıcak, motive edici ve cesaretlendirici ol.
- Gerekirse tek satırlık minik bir kod ipucu verebilirsin, ama ödevi çözme.
- Konu dışı isteklerde nazikçe yazılım öğrenmeye geri yönlendir.`;

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(30),
  lessonTitle: z.string().max(120).optional(),
});

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Yapay zekâ anahtarı yapılandırılmamış.");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);

    const system = data.lessonTitle
      ? `${SYSTEM_PROMPT}\n\nÖğrenci şu an "${data.lessonTitle}" dersinde çalışıyor.`
      : SYSTEM_PROMPT;

    try {
      const result = await generateText({
        model: gateway("google/gemini-3.8-flash"),
        system,
        messages: data.messages,
      });
      return { reply: await result.text, ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Bilinmeyen hata";
      const status =
        (error as { statusCode?: number }).statusCode ?? (error as { status?: number }).status ?? 0;
      const has = (code: number, text: string) =>
        status === code || message.includes(String(code)) || message.toLowerCase().includes(text);

      console.error("[chat] gateway error", status, message);

      let reply = `Asistan şu an cevap veremedi. Birazdan tekrar dener misin?`;
      if (has(402, "payment required")) {
        reply =
          "Yapay zekâ kredisi tükenmiş görünüyor. Uygulama sahibinin kredi eklemesi gerekiyor; o zamana kadar ders ipuçlarını kullanabilirsin. 💡";
      } else if (has(403, "forbidden")) {
        reply = "Yapay zekâ asistanı şu an kapalı. Uygulama sahibinin ayarları açması gerekiyor.";
      } else if (has(429, "too many requests")) {
        reply = "Şu an çok yoğunum, birkaç saniye sonra tekrar dener misin?";
      }
      return { reply, ok: false };
    }
  });
