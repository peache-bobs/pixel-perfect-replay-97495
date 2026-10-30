import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import sharing from "@/assets/sharing.jpg";
import detail from "@/assets/detail.jpg";
import meze from "@/assets/meze.jpg";
import kebab from "@/assets/kebab.jpg";
import fish from "@/assets/fish.jpg";
import dessert from "@/assets/dessert.jpg";
import soup from "@/assets/soup.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useLang } from "@/lib/i18n";
import { menu, currency } from "@/data/menu";
import { restaurant, mapsUrl } from "@/data/restaurant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sempati Türk Mutfağı — Kaş, Antalya" },
      {
        name: "description",
        content:
          "Kaş'ın kalbinde geleneksel Türk mutfağı: meze, kebap, deniz ürünleri ve sıcak misafirperverlik.",
      },
      { property: "og:title", content: "Sempati Türk Mutfağı — Kaş, Antalya" },
      {
        property: "og:description",
        content: "Gerçek Türk mutfağının sıcaklığı. Lezzet, gelenek ve misafirperverlik bir arada.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useLang();
  const featured = menu.filter((m) => m.featured);

  return (
    <div id="top">
      <SiteHeader />

      {/* Hero */}
      <main id="main-content">
        <section className="relative flex min-h-[100svh] items-end overflow-hidden text-ink-foreground">
          <img
            src={hero}
            alt=""
            fetchPriority="high"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-20 md:px-8 md:pb-28">
            <p className="eyebrow rise text-accent">{t.hero.eyebrow}</p>
            <h1
              className="rise mt-5 max-w-4xl text-[clamp(2.5rem,11vw,3.5rem)] leading-[1.08] md:text-7xl lg:text-8xl"
              style={{ animationDelay: "120ms" }}
            >
              {t.hero.title}
            </h1>
            <p
              className="rise mt-6 max-w-xl text-lg opacity-90 md:text-xl"
              style={{ animationDelay: "240ms" }}
            >
              {t.hero.subtitle}
            </p>
            <div className="rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: "360ms" }}>
              <Link
                to="/menu"
                className="bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t.hero.explore}
              </Link>
              <a
                href="#about"
                className="border border-ink-foreground/70 px-7 py-3.5 font-semibold transition-colors hover:bg-ink-foreground hover:text-ink"
              >
                {t.hero.meet}
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32"
        >
          <div className="md:col-span-5">
            <p className="eyebrow text-primary">{t.about.eyebrow}</p>
            <h2 className="mt-4 text-5xl md:text-6xl">{t.about.title}</h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{t.about.p1}</p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t.about.p2}</p>
            <p className="mt-10 border-l-2 border-accent pl-5 font-display text-2xl italic text-olive">
              {t.about.quote}
            </p>
          </div>
          <div className="relative md:col-span-7">
            <img
              src={sharing}
              alt=""
              loading="lazy"
              width={1152}
              height={768}
              className="w-full object-cover md:ml-auto md:w-[88%]"
            />
            <img
              src={detail}
              alt=""
              loading="lazy"
              width={768}
              height={1152}
              className="relative -mt-24 ml-4 w-[42%] border-8 border-background object-cover md:-mt-40 md:ml-0"
            />
          </div>
        </section>

        {/* Featured dishes */}
        <section id="dishes" className="scroll-mt-20 bg-ink py-24 text-ink-foreground md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-accent">{t.dishes.eyebrow}</p>
                <h2 className="mt-4 text-5xl md:text-6xl">{t.dishes.title}</h2>
              </div>
              <p className="text-sm italic opacity-60">{t.demo}</p>
            </div>
            <div className="mt-16 divide-y divide-ink-foreground/15 border-y border-ink-foreground/15">
              {featured.map((d, i) => (
                <article key={d.id} className="group grid items-center gap-6 py-8 md:grid-cols-12">
                  <span className="font-display text-sm text-accent md:col-span-1">0{i + 1}</span>
                  <div className="overflow-hidden md:col-span-3">
                    <img
                      src={d.image}
                      alt={d.name[lang]}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="text-3xl md:text-4xl">{d.name[lang]}</h3>
                    <p className="mt-2 opacity-70">{d.description[lang]}</p>
                  </div>
                  <p className="font-display text-2xl text-accent md:col-span-2 md:text-right">
                    {d.price} {currency}
                  </p>
                </article>
              ))}
            </div>
            <Link
              to="/menu"
              className="mt-12 inline-flex items-center gap-3 bg-accent px-7 py-3.5 font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              {t.dishes.all} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Gallery */}
        <section
          id="gallery"
          className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8 md:py-32"
        >
          <p className="eyebrow text-primary">{t.gallery.eyebrow}</p>
          <h2 className="mt-4 text-5xl md:text-6xl">{t.gallery.title}</h2>
          <div className="mt-14 columns-2 gap-4 md:columns-3 [&>img]:mb-4">
            {[hero, meze, detail, kebab, sharing, dessert, fish, soup].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                className="w-full break-inside-avoid object-cover"
              />
            ))}
          </div>
        </section>

        {/* Location */}
        <section id="contact" className="scroll-mt-20 bg-olive text-olive-foreground">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:px-8">
            <div>
              <p className="eyebrow opacity-80">{t.location.eyebrow}</p>
              <h2 className="mt-4 text-5xl md:text-6xl">{t.location.title}</h2>
            </div>
            <div className="md:pt-6">
              <h3 className="font-display text-3xl italic">{restaurant.name}</h3>
              <p className="eyebrow mt-6 opacity-70">{t.location.address}</p>
              <p className="mt-2 text-lg">{restaurant.address}</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-3 bg-background px-7 py-3.5 font-semibold text-foreground transition-colors hover:bg-card"
              >
                <MapPin className="h-4 w-4" /> {t.location.button}
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
