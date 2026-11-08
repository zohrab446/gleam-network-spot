import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { CommunityPost } from "@/components/CommunityPost";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { communityOptions, useCommunity } from "@/hooks/useCommunity";
export const Route = createFileRoute("/_authenticated/topluluk_/$postId")({ loader: ({ context }) => context.queryClient.ensureQueryData(communityOptions), head: ({ loaderData, params }) => { const title = loaderData?.posts.find((p) => p.id === params.postId)?.title ?? "Gönderi bulunamadı"; return { meta: [{ title: `${title} — CodeQuest Topluluk` }, { name: "description", content: "CodeQuest topluluk tartışması ve yorumları." }, { property: "og:title", content: `${title} — CodeQuest` }, { property: "og:description", content: "Sor, paylaş ve birlikte üret." }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] }; }, component: PostDetail });
function PostDetail() {
  const { postId } = Route.useParams(); const { data, mutation } = useCommunity(); const [body, setBody] = useState("");
  const post = data.posts.find((p) => p.id === postId);
  return <AppShell dashboard><div className="mx-auto max-w-4xl space-y-5"><Button asChild variant="ghost"><Link to="/topluluk"><ArrowLeft />Topluluğa dön</Link></Button>{post ? <><CommunityPost post={post} detail /><h2 className="text-lg">Yorumlar</h2>{data.comments.filter((c) => c.post_id === postId).map((c) => <article key={c.id} className="card-surface p-5"><strong className="text-sm">{c.author_name}</strong><span className="ml-3 text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString("tr-TR")}</span><p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6">{c.body}</p></article>)}<form className="space-y-3" onSubmit={(e) => { e.preventDefault(); if (!body.trim()) return; mutation.mutate({ action: "comment", postId, body }, { onSuccess: () => setBody(""), onError: () => toast.error("Yorum kaydedilemedi; doğrulamayı tamamla.") }); }}><label className="text-sm font-semibold" htmlFor="comment">Yorumun</label><Textarea id="comment" value={body} onChange={(e) => setBody(e.target.value)} maxLength={3000} required placeholder="Düşüncelerini paylaş…" /><Button type="submit" disabled={mutation.isPending || !body.trim()}><Send />Yorum Gönder</Button></form></> : <h1 className="py-12 text-center text-2xl">Gönderi bulunamadı</h1>}</div></AppShell>;
}