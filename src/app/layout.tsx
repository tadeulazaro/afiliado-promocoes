import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUserFromCookie } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://seu-dominio.com"),
  title: {
    default: "LT Radar 2100",
    template: "%s | LT Radar 2100",
  },
  description: "Ofertas e cupons atualizados com links de afiliados do Mercado Livre e parceiros.",
  openGraph: {
    title: "LT Radar 2100",
    description: "Compare ofertas, use cupons e aproveite promoções reais.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sessionUser = getSessionUserFromCookie();

  return (
    <html lang="pt-BR">
      <body>
        <div className="site-shell bg-slate-50 text-slate-900">
          <header className="sticky top-0 z-30 border-b border-orange-200/80 bg-orange-50/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo-mascote-ideias.svg" alt="Lâmpada gênio LT Radar" className="h-14 w-auto" />
                <img src="/logo-lt-radar-label.svg" alt="LT Radar 2100" className="h-12 w-auto rounded-md" />
              </Link>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-bold text-orange-700">TECH 2100</span>
                <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                  <Link href="/" className="rounded-full px-3 py-1.5 text-slate-700 hover:bg-orange-100">Início</Link>
                  <Link href="/sobre" className="rounded-full px-3 py-1.5 text-slate-700 hover:bg-orange-100">Sobre Nós</Link>
                  <Link href="/auth/cadastro-afiliado" className="rounded-full px-3 py-1.5 text-slate-700 hover:bg-orange-100">Cadastro Afiliado</Link>
                  <Link href="/auth/login" className="rounded-full px-3 py-1.5 text-slate-700 hover:bg-orange-100">Login</Link>
                  <Link href="/painel/afiliado" className="rounded-full px-3 py-1.5 text-slate-700 hover:bg-orange-100">Painel Afiliado</Link>
                  {sessionUser?.role === "admin" ? (
                    <Link href="/painel/admin" className="rounded-full px-3 py-1.5 text-slate-700 hover:bg-orange-100">Admin</Link>
                  ) : null}
                  <Link href="/como-alimentar" className="rounded-full px-3 py-1.5 text-slate-700 hover:bg-orange-100">Como Alimentar</Link>
                  <Link href="/aviso-afiliado" className="rounded-full px-3 py-1.5 text-slate-700 hover:bg-orange-100">Aviso Afiliado</Link>
                </nav>
              </div>
            </div>
          </header>

          <main className="site-main">{children}</main>

          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-5 py-4 text-xs text-slate-500">
              LT Radar 2100 • Divulgação de ofertas e cupons com links de afiliados.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
