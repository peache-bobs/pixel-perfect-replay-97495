import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { LangSwitch, useLang } from "@/lib/i18n";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex flex-col leading-none ${className}`}>
      <span className="font-display text-2xl italic">Sempati</span>
      <span className="eyebrow mt-1 text-[0.6rem] opacity-80">Türk Mutfağı</span>
    </Link>
  );
}

export function SiteHeader() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    { href: "/#top", label: t.nav.home },
    { href: "/#about", label: t.nav.about },
    { href: "/#dishes", label: t.nav.menu },
    { href: "/#gallery", label: t.nav.gallery },
    { href: "/#contact", label: t.nav.contact },
  ];

  const solid = scrolled || open;
  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-background/95 text-foreground shadow-sm backdrop-blur" : "bg-transparent text-ink-foreground"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="opacity-90 transition-opacity hover:opacity-100 hover:underline underline-offset-8">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LangSwitch className="hidden sm:inline-flex" />
          <Link
            to="/menu"
            className="hidden bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-block"
          >
            {t.nav.cta}
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t px-5 pb-6 lg:hidden">
          <nav className="flex flex-col py-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b py-3 font-display text-xl">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <LangSwitch />
            <Link to="/menu" className="bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              {t.nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
