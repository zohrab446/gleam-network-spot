import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Mail, MapPin, Phone, Clock } from "lucide-react";
import { useThemeSync } from "@/components/AppShell";
import { PublicHeader } from "@/components/PublicHeader";
import { PublicFooter } from "@/components/PublicFooter";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/iletisim")({
  head: () => ({
    meta: [
      { title: "İletişim — CodeQuest (NHR Yazılım)" },
      {
        name: "description",
        content:
          "CodeQuest / NHR Yazılım iletişim bilgileri: Çankaya/Ankara, +90 533 466 80 11, nhrcoding@nhrcoding.com. Hafta içi 09:00–18:00 destek.",
        },
        { property: "og:title", content: "İletişim — CodeQuest (NHR Yazılım)" },
        {
          property: "og:description",
          content:
            "NHR Yazılım iletişim: Çankaya/Ankara, +90 533 466 80 11, nhrcoding@nhrcoding.com.",
      },
    ],
  }),
  component: ContactPage,
});

const CONTACT = {
  company: "NHR Yazılım",
  website: "https://www.nhryazilim.com",
  websiteLabel: "www.nhryazilim.com",
  email: "info@nhryazilim.com",
  phone: "+90 533 466 80 11",
  phoneHref: "tel:+905334668011",
  address: "Çankaya / Ankara, Türkiye",
  supportHours: "Hafta içi 09:00 - 18:00",
};

function ContactPage() {
  useThemeSync();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
        <div className="pop-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-accent">
            İletişim
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl">
            Bize <span className="text-gradient-brand">ulaşın</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            CodeQuest ürünleriyle ilgili sorularınız, satın alma desteği ve iş birlikleri için aşağıdaki
            kanallardan bize ulaşabilirsiniz.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ContactCard
            icon={<Mail className="h-5 w-5 text-primary" />}
            label="E-posta"
            value={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
          />
          <ContactCard
            icon={<Phone className="h-5 w-5 text-primary" />}
            label="Telefon"
            value={CONTACT.phone}
            href={CONTACT.phoneHref}
          />
          <ContactCard
            icon={<MapPin className="h-5 w-5 text-primary" />}
            label="Adres"
            value={CONTACT.address}
          />
          <ContactCard
            icon={<Globe className="h-5 w-5 text-primary" />}
            label="Web Sitesi"
            value={CONTACT.websiteLabel}
            href={CONTACT.website}
          />
        </div>

        <div className="card-surface mt-6 flex items-start gap-3 p-5">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="text-sm font-bold text-foreground">Destek Saatleri</p>
            <p className="mt-1 text-sm text-muted-foreground">{CONTACT.supportHours}</p>
          </div>
        </div>

        <div className="card-surface mt-6 p-6">
          <h2 className="text-lg font-bold">Firma Bilgileri</h2>
          <dl className="mt-3 grid gap-2 text-sm">
            <Row label="Firma / Marka" value={CONTACT.company} />
            <Row label="Web Sitesi" value={CONTACT.websiteLabel} />
            <Row label="E-posta" value={CONTACT.email} />
            <Row label="Telefon" value={CONTACT.phone} />
            <Row label="Adres" value={CONTACT.address} />
          </dl>
          <Button asChild className="mt-5 font-bold">
            <Link to="/auth">CodeQuest'e başla</Link>
          </Button>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="card-surface flex items-center gap-3 p-5 transition-colors hover:border-primary/50">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">{icon}</span>
      <div>
        <p className="text-xs font-bold uppercase text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    ) : (
      <a href={href}>{inner}</a>
    );
  }
  return inner;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border pb-2 last:border-0 last:pb-0 sm:flex-row sm:justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}
