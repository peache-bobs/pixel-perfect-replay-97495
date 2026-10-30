import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { LangSwitch, useLang } from "@/lib/i18n";
import { categories, menu, currency, type CategoryId } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menü — Sempati Türk Mutfağı" },
      { name: "description", content: "Sempati Türk Mutfağı dijital QR menüsü: çorbalar, mezeler, kebaplar, deniz ürünleri ve tatlılar." },
      { property: "og:title", content: "Menü — Sempati Türk Mutfağı" },
      { property: "og:description", content: "Dijital menü — Türkçe ve İngilizce." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t, lang } = useLang();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">("all");

  const filtered = useMemo(() => {
    const s = q.trim().toLocaleLowerCase(lang);
    return menu.filter(
      (m) =>
        (cat === "all" || m.category === cat) &&
        (!s || `${m.name[lang]} ${m.description[lang]}`.toLocaleLowerCase(lang).includes(s)),
    );
  }, [q, cat, lang]);

  const groups = categories
    .map((c) => ({ ...c, items: filtered.filter((m) => m.category === c.id) }))
    .filter((g) => g.items.length);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 pt-4">
          <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" />{t.menuPage.back}</Link>
          <span className="font-display text-xl italic">Sempati</span>
          <LangSwitch />
        </div>
        <div className="mx-auto max-w-2xl px-4 pt-4">
          <label className="flex items-center gap-2 border bg-card px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.menuPage.search} className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground" />
          </label>
        </div>
        <nav className="no-scrollbar mx-auto flex max-w-2xl gap-2 overflow-x-auto px-4 py-3">
          {[{ id: "all" as const, name: { tr: t.menuPage.all, en: t.menuPage.all } }, ...categories].map((c) => (
            <button
              key={c.id}
              onClick={() => { setCat(c.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`shrink-0 border px-4 py-1.5 text-sm transition-colors ${cat === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}
            >
              {c.name[lang]}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-16">
        <div className="py-8 text-center">
          <p className="eyebrow text-primary">Sempati Türk Mutfağı</p>
          <h1 className="mt-2 text-5xl">{t.menuPage.title}</h1>
          <p className="mt-3 text-xs italic text-muted-foreground">{t.demo}</p>
        </div>

        {groups.length === 0 && <p className="py-16 text-center text-muted-foreground">{t.menuPage.empty}</p>}

        {groups.map((g) => (
          <section key={g.id} className="mb-10">
            <h2 className="mb-4 flex items-center gap-3 text-3xl">
              {g.name[lang]}
              <span className="h-px flex-1 bg-border" />
            </h2>
            <ul className="divide-y">
              {g.items.map((m) => (
                <li key={m.id} className="flex gap-4 py-4">
                  {m.image && <img src={m.image} alt="" loading="lazy" width={96} height={96} className="h-20 w-20 shrink-0 object-cover" />}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-display text-xl">{m.name[lang]}</h3>
                      <span className="flex-1 border-b border-dotted border-muted-foreground/40" />
                      <span className="font-semibold text-primary">{m.price} {currency}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{m.description[lang]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
