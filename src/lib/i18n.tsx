import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tr" | "en";

const dict = {
  tr: {
    nav: { home: "Ana Sayfa", about: "Hakkımızda", menu: "Menü", gallery: "Galeri", contact: "İletişim", cta: "Menüyü Gör" },
    hero: { eyebrow: "Kaş · Antalya", title: "Gerçek Türk Mutfağının Sıcaklığı", subtitle: "Lezzet, gelenek ve misafirperverlik bir arada.", explore: "Menüyü Keşfet", meet: "Bizi Tanıyın" },
    about: {
      eyebrow: "Hakkımızda", title: "Bizim Hikâyemiz",
      p1: "Türk mutfağı bir sofrada başlar: ortaya konan mezeler, közden yeni inmiş kebaplar, sıcak pide ve sohbetle uzayan akşamlar. Sempati'de bu geleneği Kaş'ın dar, çiçekli sokaklarından birinde yaşatıyoruz.",
      p2: "Mevsimin taze ürünleri, sabırla pişen yemekler ve kapıdan giren herkesi misafir gibi karşılayan bir sıcaklık. Burada yemek paylaşmak içindir.",
      quote: "“Sofra paylaşıldıkça güzelleşir.”",
    },
    dishes: { eyebrow: "Öne Çıkanlar", title: "Sofradan Seçmeler", all: "Tüm Menüyü Gör" },
    demo: "Örnek içerik — gerçek menü ve fiyatlar eklenecektir.",
    gallery: { eyebrow: "Galeri", title: "Kaş'ta Bir Akşam" },
    location: { eyebrow: "İletişim", title: "Bizi Ziyaret Edin", button: "Haritada Aç", address: "Adres" },
    footer: { nav: "Gezinti", follow: "Takip Edin", lang: "Dil", rights: "Tüm hakları saklıdır." },
    menuPage: { title: "Menü", search: "Yemek ara…", all: "Tümü", empty: "Aramanızla eşleşen yemek bulunamadı.", back: "Ana Sayfa" },
    qr: {
      title: "QR Menü Kodu", intro: "Masalar için QR kod. Bu kod, sitenin şu anki adresindeki menü sayfasına yönlendirir.",
      png: "PNG İndir", svg: "SVG İndir", print: "Yazdır", scan: "Menü için okutun", admin: "Yönetim · Demo",
    },
  },
  en: {
    nav: { home: "Home", about: "About", menu: "Menu", gallery: "Gallery", contact: "Contact", cta: "View Menu" },
    hero: { eyebrow: "Kaş · Antalya", title: "The Warmth of Real Turkish Cuisine", subtitle: "Flavour, tradition and hospitality, together.", explore: "Explore the Menu", meet: "Get to Know Us" },
    about: {
      eyebrow: "About", title: "Our Story",
      p1: "Turkish cuisine begins at the table: meze set out to share, kebabs fresh from the coals, warm pide and evenings that stretch on with conversation. At Sempati we keep this tradition alive on one of Kaş's narrow, flower-lined streets.",
      p2: "Fresh seasonal produce, dishes cooked with patience, and a warmth that welcomes everyone who walks in as a guest. Here, food is for sharing.",
      quote: "“A table grows richer the more it is shared.”",
    },
    dishes: { eyebrow: "Highlights", title: "From Our Table", all: "View Full Menu" },
    demo: "Sample content — the real menu and prices will be added.",
    gallery: { eyebrow: "Gallery", title: "An Evening in Kaş" },
    location: { eyebrow: "Contact", title: "Visit Us", button: "Open in Maps", address: "Address" },
    footer: { nav: "Navigate", follow: "Follow", lang: "Language", rights: "All rights reserved." },
    menuPage: { title: "Menu", search: "Search dishes…", all: "All", empty: "No dishes match your search.", back: "Home" },
    qr: {
      title: "QR Menu Code", intro: "A QR code for your tables. It points to the menu page at this website's current address.",
      png: "Download PNG", svg: "Download SVG", print: "Print", scan: "Scan for the menu", admin: "Admin · Demo",
    },
  },
} as const;

type Dict = (typeof dict)["tr"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "tr",
  setLang: () => {},
  t: dict.tr,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "tr") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] as Dict }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex items-center gap-1 text-xs font-semibold tracking-widest ${className}`}>
      {(["tr", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">/</span>}
          <button
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`px-1 py-1 uppercase transition-opacity ${lang === l ? "opacity-100 underline underline-offset-4" : "opacity-60 hover:opacity-100"}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
