import { createFileRoute, Link } from "@tanstack/react-router";
import { useThemeSync } from "@/components/AppShell";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/mesafeli-satis")({
  head: () => ({
    meta: [
      { title: "Mesafeli Satış Sözleşmesi — CodeQuest (NHR Yazılım)" },
      {
        name: "description",
        content:
          "CodeQuest dijital abonelik ve ürün satışlarına ilişkin Mesafeli Satış Sözleşmesi. Satıcı: NHR Yazılım, Çankaya/Ankara.",
      },
      { property: "og:title", content: "Mesafeli Satış Sözleşmesi — CodeQuest" },
      {
        property: "og:description",
        content:
          "CodeQuest dijital ürünleri için Mesafeli Satış Sözleşmesi. Satıcı NHR Yazılım.",
      },
    ],
  }),
  component: DistanceSalesPage,
});

const SELLER = {
  company: "NHR Yazılım",
  website: "https://www.nhryazilim.com",
  email: "info@nhryazilim.com",
  phone: "+90 533 466 80 11",
  address: "Çankaya / Ankara, Türkiye",
};

function DistanceSalesPage() {
  useThemeSync();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
        <div className="pop-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-accent">
            Yasal
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl">Mesafeli Satış Sözleşmesi</h1>
          <p className="mt-2 text-sm text-muted-foreground">Son güncelleme: 15 Eylül 2026</p>
        </div>

        <article className="prose-legal mt-8 space-y-6">
          <Section title="Madde 1 — Taraflar">
            <p>
              <strong>Satıcı:</strong> {SELLER.company}
              <br />
              E-posta: {SELLER.email}
              <br />
              Telefon: {SELLER.phone}
              <br />
              Adres: {SELLER.address}
              <br />
              Web sitesi:{" "}
              <a href={SELLER.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {SELLER.website}
              </a>
            </p>
            <p>
              <strong>Alıcı:</strong>{" "}
              <a href={SELLER.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {SELLER.website}
              </a>{" "}
              veya CodeQuest platformuna üye olan ve dijital abonelik/ürün satın alan kullanıcı
              (&ldquo;Kullanıcı&rdquo;).
            </p>
          </Section>

          <Section title="Madde 2 — Konu">
            <p>
              İşbu sözleşmenin konusu, Satıcı&rsquo;nın CodeQuest platformu üzerinden sunduğu dijital
              abonelikler (Pro üyelik), enerji ve ipucu paketleri gibi dijital ürünlerin Kullanıcıya
              satışına ve 6502 sayılı Tüketicinin Korunması Hakkında Kanun ile Mesafeli Sözleşmeler
              Yönetmeliği kapsamındaki hak ve yükümlülüklere ilişkindir.
            </p>
          </Section>

          <Section title="Madde 3 — Dijital Ürün ve Hizmetler">
            <p>
              Satın alınan dijital ürünler CodeQuest hesabına anında tanımlanır. Ürün kapsamı:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Pro üyelik paketleri (aylık, 3 aylık, yıllık)</li>
              <li>Enerji paketleri (5, 15, 30 enerji)</li>
              <li>İpucu paketleri (10, 25, 50 ipucu)</li>
              <li>Promosyon koduyla kazanılan Pro süreleri</li>
            </ul>
          </Section>

          <Section title="Madde 4 — Ödeme">
            <p>
              Ödemeler PayTR ödeme altyapısı üzerinden güvenli olarak işlenir. Kart bilgileri Satıcı
              tarafından tutulmaz; kart işlemleri doğrudan PayTR tarafından gerçekleştirilir. Ödemenin
              başarılı şekilde tamamlanmasının ardından dijital ürün Kullanıcı hesabına tanımlanır.
            </p>
          </Section>

          <Section title="Madde 5 — Cayma Hakkı">
            <p>
              Dijital içerikler anında teslim edildiği ve kullanılmaya başlandığı için, 6502 sayılı
              Kanun&rsquo;un cayma hakkına ilişkin istisnaları uyarınca dijital ürünlerde cayma hakkı
              kullanılamaz. Kullanıcı, dijital içeriğin teslimini kabul ettiğini beyan eder.
            </p>
          </Section>

          <Section title="Madde 6 — İade ve Talep">
            <p>
              Teknik bir hata nedeniyle ürün tanımlanmadıysa veya yanlış ücretlendirme yapıldıysa,
              Kullanıcı destek saatleri içinde Satıcı&rsquo;ya{" "}
              <a href={`mailto:${SELLER.email}`} className="text-primary hover:underline">
                {SELLER.email}
              </a>{" "}
              adresinden ulaşarak talebini iletebilir. Haklı talepler en geç 14 iş günü içinde
              değerlendirilir.
            </p>
          </Section>

          <Section title="Madde 7 — Yürürlük">
            <p>
              İşbu sözleşme, Kullanıcı&rsquo;nın dijital ürün satın alımını onaylamasıyla yürürlüğe
              girer. Sözleşmenin elektronik ortamda onaylanması, yazılı imza hükmündedir.
            </p>
          </Section>
        </article>

        <div className="card-surface mt-10 p-6">
          <h2 className="text-lg font-bold">Satıcı Bilgileri</h2>
          <dl className="mt-3 grid gap-2 text-sm">
            <Row label="Satıcı" value={SELLER.company} />
            <Row label="Web Sitesi" value={SELLER.website} />
            <Row label="E-posta" value={SELLER.email} />
            <Row label="Telefon" value={SELLER.phone} />
            <Row label="Adres" value={SELLER.address} />
          </dl>
          <Button asChild className="mt-5 font-bold">
            <Link to="/iletisim">İletişim sayfası</Link>
          </Button>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_a]:font-semibold">
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border pb-2 last:border-0 last:pb-0 sm:flex-row sm:justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}
