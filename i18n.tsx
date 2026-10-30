import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "tr" | "en" | "ru";

const dict = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      about: "Hakkımızda",
      menu: "Menü",
      gallery: "Galeri",
      contact: "İletişim",
      cta: "Menüyü Gör",
    },
    hero: {
      eyebrow: "Kaş · Antalya",
      title: "Gerçek Türk Mutfağının Sıcaklığı",
      subtitle: "Lezzet, gelenek ve misafirperverlik bir arada.",
      explore: "Menüyü Keşfet",
      meet: "Bizi Tanıyın",
    },
    about: {
      eyebrow: "Hakkımızda",
      title: "Bizim Hikâyemiz",
      p1: "Türk mutfağı bir sofrada başlar: ortaya konan mezeler, közden yeni inmiş kebaplar, sıcak pide ve sohbetle uzayan akşamlar. Sempati'de bu geleneği Kaş'ın dar, çiçekli sokaklarından birinde yaşatıyoruz.",
      p2: "Mevsimin taze ürünleri, sabırla pişen yemekler ve kapıdan giren herkesi misafir gibi karşılayan bir sıcaklık. Burada yemek paylaşmak içindir.",
      quote: "“Sofra paylaşıldıkça güzelleşir.”",
    },
    dishes: { eyebrow: "Öne Çıkanlar", title: "Sofradan Seçmeler", all: "Tüm Menüyü Gör" },
    demo: "Demo: yemekler, fiyatlar, fotoğraflar ve açıklamalar restoran tarafından doğrulanmalıdır.",
    gallery: { eyebrow: "Galeri", title: "Kaş'ta Bir Akşam" },
    location: {
      eyebrow: "İletişim",
      title: "Bizi Ziyaret Edin",
      button: "Haritada Aç",
      address: "Adres",
    },
    footer: { nav: "Gezinti", follow: "Takip Edin", lang: "Dil", rights: "Tüm hakları saklıdır." },
    menuPage: {
      title: "Menü",
      search: "Yemek ara…",
      all: "Tümü",
      empty: "Aramanızla eşleşen yemek bulunamadı.",
      back: "Ana Sayfa",
    },
    qr: {
      error: "QR kod oluşturulamadı. Sayfayı yenileyip tekrar deneyin.",
      title: "QR Menü Kodu",
      intro:
        "Bu kod mevcut sitenin menüsüne yönlendirir. Yalnızca kalıcı alan adında yayınladıktan sonra yazdırın.",
      png: "PNG İndir",
      svg: "SVG İndir",
      print: "Yazdır",
      scan: "Menü için okutun",
      admin: "Yönetim · Demo",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      menu: "Menu",
      gallery: "Gallery",
      contact: "Contact",
      cta: "View Menu",
    },
    hero: {
      eyebrow: "Kaş · Antalya",
      title: "The Warmth of Real Turkish Cuisine",
      subtitle: "Flavour, tradition and hospitality, together.",
      explore: "Explore the Menu",
      meet: "Get to Know Us",
    },
    about: {
      eyebrow: "About",
      title: "Our Story",
      p1: "Turkish cuisine begins at the table: meze set out to share, kebabs fresh from the coals, warm pide and evenings that stretch on with conversation. At Sempati we keep this tradition alive on one of Kaş's narrow, flower-lined streets.",
      p2: "Fresh seasonal produce, dishes cooked with patience, and a warmth that welcomes everyone who walks in as a guest. Here, food is for sharing.",
      quote: "“A table grows richer the more it is shared.”",
    },
    dishes: { eyebrow: "Highlights", title: "From Our Table", all: "View Full Menu" },
    demo: "Demo: dishes, prices, photos and descriptions require restaurant confirmation.",
    gallery: { eyebrow: "Gallery", title: "An Evening in Kaş" },
    location: { eyebrow: "Contact", title: "Visit Us", button: "Open in Maps", address: "Address" },
    footer: { nav: "Navigate", follow: "Follow", lang: "Language", rights: "All rights reserved." },
    menuPage: {
      title: "Menu",
      search: "Search dishes…",
      all: "All",
      empty: "No dishes match your search.",
      back: "Home",
    },
    qr: {
      error: "Could not generate the QR code. Refresh and try again.",
      title: "QR Menu Code",
      intro:
        "This code points to the menu at the current website address. Print only after publishing on your permanent domain.",
      png: "Download PNG",
      svg: "Download SVG",
      print: "Print",
      scan: "Scan for the menu",
      admin: "Admin · Demo",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      about: "О нас",
      menu: "Меню",
      gallery: "Галерея",
      contact: "Контакты",
      cta: "Смотреть меню",
    },
    hero: {
      eyebrow: "Каш · Анталья",
      title: "Тепло настоящей турецкой кухни",
      subtitle: "Вкус, традиции и гостеприимство за одним столом.",
      explore: "Открыть меню",
      meet: "Познакомиться с нами",
    },
    about: {
      eyebrow: "О нас",
      title: "Наша история",
      p1: "Турецкая кухня начинается за общим столом: мезе, кебабы с углей, тёплые пиде и долгие разговоры. В Sempati эта традиция живёт на одной из узких цветущих улиц Каша.",
      p2: "Свежие сезонные продукты, неспешно приготовленные блюда и тёплый приём. Здесь еда создана, чтобы ею делиться.",
      quote: "«Общий стол делает нас ближе.»",
    },
    dishes: { eyebrow: "Избранное", title: "К нашему столу", all: "Полное меню" },
    demo: "Демонстрация: блюда, цены, фотографии и описание требуют подтверждения ресторана.",
    gallery: { eyebrow: "Галерея", title: "Вечер в Каше" },
    location: {
      eyebrow: "Контакты",
      title: "Приходите в гости",
      button: "Открыть карту",
      address: "Адрес",
    },
    footer: {
      nav: "Навигация",
      follow: "Социальные сети",
      lang: "Язык",
      rights: "Все права защищены.",
    },
    menuPage: {
      title: "Меню",
      search: "Поиск блюд…",
      all: "Всё",
      empty: "Блюда не найдены.",
      back: "Главная",
    },
    qr: {
      error: "Не удалось создать QR-код. Обновите страницу и повторите попытку.",
      title: "QR-код меню",
      intro:
        "Код ведёт на меню по текущему адресу сайта. Печатайте его только после публикации на постоянном домене.",
      png: "Скачать PNG",
      svg: "Скачать SVG",
      print: "Печать",
      scan: "Отсканируйте для меню",
      admin: "QR-код · Демо",
    },
  },
} as const;

type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };
type Dict = Widen<(typeof dict)["tr"]>;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "tr",
  setLang: () => {},
  t: dict.tr,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "tr" || saved === "ru") setLangState(saved);
    } catch {
      /* Storage may be disabled; language switching still works. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* Optional persistence. */
    }
  };
  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] as Dict }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`inline-flex items-center gap-1 text-xs font-semibold tracking-widest ${className}`}
    >
      {(["tr", "en", "ru"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">/</span>}
          <button
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            aria-label={{ tr: "Türkçe", en: "English", ru: "Русский" }[l]}
            lang={l}
            className={`min-h-11 min-w-8 px-1 py-1 uppercase transition-opacity ${lang === l ? "opacity-100 underline underline-offset-4" : "opacity-60 hover:opacity-100"}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
