import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { sendChatMessage } from "@/lib/chat.functions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/hooks/useGameData";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { playSound } from "@/store/settings";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string };

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Selam! 👋 Ben CodeQuest asistanınım. Takıldığın yeri anlat — cevabı doğrudan vermem ama doğru soruyu sormana yardım ederim.",
};

export function ChatWidget({ lessonTitle }: { lessonTitle?: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const ask = useServerFn(sendChatMessage);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open || !user || messages.length > 1) return;
    void supabase
      .from("chat_messages")
      .select("role, content")
      .order("created_at", { ascending: true })
      .limit(30)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setMessages([GREETING, ...(data as ChatMessage[])]);
        }
      });
  }, [open, user, messages.length]);

  async function submit() {
    const text = input.trim();
    if (!text || typing) return;
    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setTyping(true);
    playSound("click");

    if (user) {
      void supabase.from("chat_messages").insert({ user_id: user.id, role: "user", content: text });
    }

    try {
      const history = nextMessages.filter((m) => m !== GREETING).slice(-12);
      const result = await ask({ data: { messages: history, lessonTitle } });
      setMessages((prev) => [...prev, { role: "assistant", content: result.reply }]);
      if (user && result.ok) {
        void supabase
          .from("chat_messages")
          .insert({ user_id: user.id, role: "assistant", content: result.reply });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: error instanceof Error ? error.message : "Bir şeyler ters gitti, tekrar dener misin?",
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Asistanı kapat" : "Asistanla sohbet et"}
        className="bg-brand-gradient fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-card transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <aside
        aria-label="Yapay zekâ öğrenme asistanı"
        className={cn(
          "card-surface fixed bottom-0 right-0 z-40 flex h-[min(560px,85vh)] w-full max-w-[26rem] flex-col overflow-hidden rounded-b-none transition-transform duration-300 sm:bottom-24 sm:right-5 sm:rounded-2xl",
          open ? "translate-y-0" : "pointer-events-none translate-y-[120%] opacity-0",
        )}
      >
        <header className="bg-brand-gradient flex items-center gap-3 px-4 py-3 text-primary-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card/25 text-lg">🦉</span>
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold">CodeQuest Asistanı</p>
            <p className="truncate text-xs opacity-90">İpucu verir, cevabı sana buldurur</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Sohbeti kapat"
            className="ml-auto rounded-full p-1 hover:bg-card/20"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn("flex items-start gap-2", message.role === "user" && "flex-row-reverse")}
            >
              {message.role === "user" ? (
                <PlayerAvatar
                  size="sm"
                  shape={profile?.avatar_shape ?? "star"}
                  color={profile?.avatar_color ?? "indigo"}
                />
              ) : (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-base">
                  🦉
                </span>
              )}
              <div
                className={cn(
                  "max-w-[76%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft">🦉</span>
              <span className="flex gap-1 rounded-2xl bg-secondary px-3 py-3">
                <i className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                <i className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" />
                <i className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" />
              </span>
            </div>
          )}
        </div>

        <div className="flex items-end gap-2 border-t border-border p-3">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void submit();
              }
            }}
            rows={2}
            placeholder="Takıldığın yeri yaz..."
            aria-label="Asistana mesaj yaz"
            className="min-h-11 resize-none"
          />
          <Button
            type="button"
            size="icon"
            onClick={() => void submit()}
            disabled={typing || input.trim().length === 0}
            aria-label="Mesajı gönder"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </aside>
    </>
  );
}
