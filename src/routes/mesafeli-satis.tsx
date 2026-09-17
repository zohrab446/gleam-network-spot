import { createFileRoute, Link } from "@tanstack/react-router";
import { useThemeSync } from "@/components/AppShell";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";

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
  email: "nhrcoding@nhrcoding.com",
  phone: "+90 533 466 80 11",
  address: "Çankaya / Ankara, Türkiye",
};

function DistanceSalesPage() {
  useThemeSync();
  const t = useT();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
        <div className="pop-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-accent">
            {t("Yasal", "Legal")}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl">{t("Mesafeli Satış Sözleşmesi", "Distance Sales Agreement")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("Son güncelleme: 15 Eylül 2026", "Last updated: September 15, 2026")}</p>
        </div>

        <article className="prose-legal mt-8 space-y-6">
          <Section title={t("Madde 1 — Taraflar", "Article 1 — Parties")}>
            <p>
              <strong>{t("Satıcı:", "Seller:")}</strong> {SELLER.company}
              <br />
              {t("E-posta:", "Email:")} {SELLER.email}
              <br />
              {t("Telefon:", "Phone:")} {SELLER.phone}
              <br />
              {t("Adres:", "Address:")} {t(SELLER.address, "Çankaya / Ankara, Turkey")}
              <br />
              {t("Web sitesi:", "Website:")}{" "}
              <a href={SELLER.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {SELLER.website}
              </a>
            </p>
            <p>
              <strong>{t("Alıcı:", "Buyer:")}</strong>{" "}
              <a href={SELLER.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {SELLER.website}
              </a>{" "}
              {t(
                "veya CodeQuest platformuna üye olan ve dijital abonelik/ürün satın alan kullanıcı (\u201cKullanıcı\u201d).",
                "or the user who becomes a member of the CodeQuest platform and purchases a digital subscription/product (the \u201cUser\u201d).",
              )}
            </p>
          </Section>

          <Section title={t("Madde 2 — Konu", "Article 2 — Subject")}>
            <p>
              {t(
                "İşbu sözleşmenin konusu, Satıcı\u2019nın CodeQuest platformu üzerinden sunduğu dijital abonelikler (Pro üyelik), enerji ve ipucu paketleri gibi dijital ürünlerin Kullanıcıya satışına ve 6502 sayılı Tüketicinin Korunması Hakkında Kanun ile Mesafeli Sözleşmeler Yönetmeliği kapsamındaki hak ve yükümlülüklere ilişkindir.",
                "The subject of this agreement is the sale to the User of digital products offered by the Seller through the CodeQuest platform — such as digital subscriptions (Pro membership), energy packs, and hint packs — and the rights and obligations under Turkish Consumer Protection Law No. 6502 and the Distance Contracts Regulation.",
              )}
            </p>
          </Section>

          <Section title={t("Madde 3 — Dijital Ürün ve Hizmetler", "Article 3 — Digital Products and Services")}>
            <p>
              {t(
                "Satın alınan dijital ürünler CodeQuest hesabına anında tanımlanır. Ürün kapsamı:",
                "Purchased digital products are credited to the CodeQuest account instantly. Product scope:",
              )}
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>{t("Pro üyelik paketleri (aylık, 3 aylık, yıllık)", "Pro membership plans (monthly, 3-monthly, yearly)")}</li>
              <li>{t("Enerji paketleri (5, 15, 30 enerji)", "Energy packs (5, 15, 30 energy)")}</li>
              <li>{t("İpucu paketleri (10, 25, 50 ipucu)", "Hint packs (10, 25, 50 hints)")}</li>
              <li>{t("Promosyon koduyla kazanılan Pro süreleri", "Pro periods earned through promo codes")}</li>
            </ul>
          </Section>

          <Section title={t("Madde 4 — Ödeme", "Article 4 — Payment")}>
            <p>
              {t(
                "Ödemeler PayTR ödeme altyapısı üzerinden güvenli olarak işlenir. Kart bilgileri Satıcı tarafından tutulmaz; kart işlemleri doğrudan PayTR tarafından gerçekleştirilir. Ödemenin başarılı şekilde tamamlanmasının ardından dijital ürün Kullanıcı hesabına tanımlanır.",
                "Payments are processed securely through the PayTR payment infrastructure. Card details are not stored by the Seller; card transactions are carried out directly by PayTR. Once payment is completed successfully, the digital product is credited to the User's account.",
              )}
            </p>
          </Section>

          <Section title={t("Madde 5 — Cayma Hakkı", "Article 5 — Right of Withdrawal")}>
            <p>
              {t(
                "Dijital içerikler anında teslim edildiği ve kullanılmaya başlandığı için, 6502 sayılı Kanun\u2019un cayma hakkına ilişkin istisnaları uyarınca dijital ürünlerde cayma hakkı kullanılamaz. Kullanıcı, dijital içeriğin teslimini kabul ettiğini beyan eder.",
                "Since digital content is delivered instantly and begins to be used immediately, the right of withdrawal cannot be exercised for digital products, pursuant to the exceptions to the right of withdrawal under Law No. 6502. The User acknowledges and accepts the delivery of the digital content.",
              )}
            </p>
          </Section>

          <Section title={t("Madde 6 — İade ve Talep", "Article 6 — Refunds and Requests")}>
            <p>
              {t(
                "Teknik bir hata nedeniyle ürün tanımlanmadıysa veya yanlış ücretlendirme yapıldıysa, Kullanıcı destek saatleri içinde Satıcı\u2019ya",
                "If the product was not credited due to a technical error or an incorrect charge was made, the User can contact the Seller during support hours at",
              )}{" "}
              <a href={`mailto:${SELLER.email}`} className="text-primary hover:underline">
                {SELLER.email}
              </a>{" "}
              {t(
                "adresinden ulaşarak talebini iletebilir. Haklı talepler en geç 14 iş günü içinde değerlendirilir.",
                "to submit their request. Valid requests are reviewed within 14 business days at the latest.",
              )}
            </p>
          </Section>

          <Section title={t("Madde 7 — Yürürlük", "Article 7 — Effective Date")}>
            <p>
              {t(
                "İşbu sözleşme, Kullanıcı\u2019nın dijital ürün satın alımını onaylamasıyla yürürlüğe girer. Sözleşmenin elektronik ortamda onaylanması, yazılı imza hükmündedir.",
                "This agreement takes effect once the User confirms the purchase of the digital product. Electronic confirmation of the agreement has the same effect as a written signature.",
              )}
            </p>
          </Section>
        </article>

        <div className="card-surface mt-10 p-6">
          <h2 className="text-lg font-bold">{t("Satıcı Bilgileri", "Seller Information")}</h2>
          <dl className="mt-3 grid gap-2 text-sm">
            <Row label={t("Satıcı", "Seller")} value={SELLER.company} />
            <Row label={t("Web Sitesi", "Website")} value={SELLER.website} />
            <Row label={t("E-posta", "Email")} value={SELLER.email} />
            <Row label={t("Telefon", "Phone")} value={SELLER.phone} />
            <Row label={t("Adres", "Address")} value={t(SELLER.address, "Çankaya / Ankara, Turkey")} />
          </dl>
          <Button asChild className="mt-5 font-bold">
            <Link to="/iletisim">{t("İletişim sayfası", "Contact page")}</Link>
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
