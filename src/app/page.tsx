import Link from "next/link";
import { DealCard } from "@/components/deal-card";
import { getAllDeals, getCategories } from "@/lib/deals";

export const dynamic = "force-dynamic";

const brandByCategory: Record<string, { name: string; logo: string }> = {
  "mercado-livre": { name: "Mercado Livre", logo: "/images/mercado-livre-logo.svg" },
  amazon: { name: "Amazon", logo: "/images/amazon-logo.svg" },
  shein: { name: "Shein", logo: "/images/shein-logo.svg" },
  shopee: { name: "Shopee", logo: "/images/shopee-logo.svg" },
  magalu: { name: "Magalu", logo: "/images/magalu-logo.svg" },
  aliexpress: { name: "AliExpress", logo: "/images/aliexpress-logo.svg" },
};

export default function HomePage() {
  const allDeals = getAllDeals();
  const categories = getCategories();

  return (
    <main className="page-wrap">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-3 inline-flex items-center rounded-full border border-orange-300 bg-orange-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-orange-700">
          🔥 Ofertas quentes atualizadas
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">Comparador de Promoções</p>
        <h1 className="mt-2 text-4xl font-black text-slate-900">Ofertas reais para comprar melhor</h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Compare promoções de Amazon, Mercado Livre, Shein, Shopee, Magalu e AliExpress em um só lugar.
          Ao clicar em alguns links, podemos receber comissão de afiliado sem custo extra para você.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link href="/categoria/mercado-livre" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-extrabold text-white hover:bg-orange-600">
            Ver ofertas que mais convertem
          </Link>
          <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            {allDeals.length} ofertas ativas no radar
          </span>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Lojas parceiras</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const brand = brandByCategory[category];
              if (!brand) {
                return null;
              }

              return (
                <Link
                  key={category}
                  href={`/categoria/${category}`}
                  className="rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow"
                >
                  <img src={brand.logo} alt={`Logo ${brand.name}`} className="h-8 w-auto" loading="lazy" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/como-alimentar" className="rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase text-blue-700 hover:bg-blue-100">
            Como Alimentar
          </Link>
          <Link href="/sobre" className="rounded-full border border-orange-300 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase text-orange-700 hover:bg-orange-100">
            Sobre Nós
          </Link>
          <Link href="/aviso-afiliado" className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase text-amber-700 hover:bg-amber-100">
            Aviso de Afiliado
          </Link>
        </div>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {allDeals.map((deal) => (
          <DealCard key={deal.slug} deal={deal} />
        ))}
      </section>
    </main>
  );
}
