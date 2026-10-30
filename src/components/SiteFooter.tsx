import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { LangSwitch, useLang } from "@/lib/i18n";
import { restaurant } from "@/data/restaurant";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="no-print bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-6 max-w-xs text-sm opacity-75">{restaurant.address}</p>
        </div>
        <div>
          <p className="eyebrow mb-4 text-accent">{t.footer.nav}</p>
          <ul className="space-y-2 text-sm opacity-85">
            <li>
              <a href="/#about">{t.nav.about}</a>
            </li>
            <li>
              <Link to="/menu">{t.nav.menu}</Link>
            </li>
            <li>
              <a href="/#gallery">{t.nav.gallery}</a>
            </li>
            <li>
              <a href="/#contact">{t.nav.contact}</a>
            </li>
          </ul>
        </div>
        <div>
          {Object.values(restaurant.social).some((url) => url !== "#") && (
            <p className="eyebrow mb-4 text-accent">{t.footer.follow}</p>
          )}
          <div className="flex gap-4">
            {/* Placeholder links — replace in src/data/restaurant.ts */}
            {restaurant.social.instagram !== "#" && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={restaurant.social.instagram}
                aria-label="Instagram"
                className="opacity-85 hover:opacity-100"
              >
                <Instagram />
              </a>
            )}
            {restaurant.social.facebook !== "#" && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={restaurant.social.facebook}
                aria-label="Facebook"
                className="opacity-85 hover:opacity-100"
              >
                <Facebook />
              </a>
            )}
          </div>
          <p className="eyebrow mb-3 mt-8 text-accent">{t.footer.lang}</p>
          <LangSwitch />
        </div>
      </div>
      <div className="border-t border-ink-foreground/15 px-5 py-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {restaurant.name}. {t.footer.rights}
      </div>
    </footer>
  );
}
