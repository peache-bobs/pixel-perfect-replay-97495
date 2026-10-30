import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download, Printer } from "lucide-react";
import { LangSwitch, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/qr")({
  head: () => ({
    meta: [
      { title: "QR Menü Kodu — Sempati Türk Mutfağı" },
      { name: "description", content: "Masalar için yazdırılabilir QR menü kodu oluşturun." },
      { property: "og:title", content: "QR Menü Kodu — Sempati" },
      { property: "og:description", content: "Masalar için yazdırılabilir QR menü kodu." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: QrPage,
});

const qrOpts = { margin: 1, color: { dark: "#352820", light: "#F6EFE3" }, errorCorrectionLevel: "M" as const };

function download(href: string, name: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  a.click();
}

function QrPage() {
  const { t } = useLang();
  const [url, setUrl] = useState("");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    const u = `${window.location.origin}/menu`;
    setUrl(u);
    QRCode.toString(u, { ...qrOpts, type: "svg" }).then(setSvg);
  }, []);

  const png = async () => download(await QRCode.toDataURL(url, { ...qrOpts, width: 1200 }), "sempati-menu-qr.png");
  const svgDl = () => download(URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })), "sempati-menu-qr.svg");

  return (
    <div className="min-h-screen bg-secondary px-4 py-10">
      <div className="no-print mx-auto mb-8 flex max-w-xl items-center justify-between">
        <Link to="/" className="font-display text-xl italic">Sempati</Link>
        <LangSwitch />
      </div>
      <div className="no-print mx-auto max-w-xl text-center">
        <p className="eyebrow text-primary">{t.qr.admin}</p>
        <h1 className="mt-2 text-4xl">{t.qr.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.qr.intro}</p>
        <p className="mt-2 break-all font-mono text-xs text-muted-foreground">{url}</p>
      </div>

      {/* Printable table card */}
      <div className="mx-auto mt-8 max-w-sm border border-border bg-background p-10 text-center shadow-sm">
        <p className="font-display text-3xl italic">Sempati</p>
        <p className="eyebrow mt-1 text-[0.6rem] text-muted-foreground">Türk Mutfağı · Kaş</p>
        <div className="mx-auto mt-6 w-56" dangerouslySetInnerHTML={{ __html: svg }} />
        <p className="eyebrow mt-6 text-primary">{t.qr.scan}</p>
        <p className="mt-1 text-xs text-muted-foreground">Scan for the menu · Menü için okutun</p>
      </div>

      <div className="no-print mx-auto mt-8 flex max-w-sm flex-wrap justify-center gap-3">
        <button onClick={png} disabled={!url} className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"><Download className="h-4 w-4" />{t.qr.png}</button>
        <button onClick={svgDl} disabled={!svg} className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground"><Download className="h-4 w-4" />{t.qr.svg}</button>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-sm font-semibold"><Printer className="h-4 w-4" />{t.qr.print}</button>
      </div>
    </div>
  );
}
