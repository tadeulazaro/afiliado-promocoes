import Link from "next/link";
import { DealCard } from "@/components/deal-card";
import { getAllDeals, getCategories, getTopDealsByDiscount } from "@/lib/deals";

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
  const topDeals = getTopDealsByDiscount(6);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seu-dominio.com";
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LT Promo Radar",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/categoria/{categoria}`,
      "query-input": "required name=categoria",
    },
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top ofertas do dia",
    itemListElement: topDeals.map((deal, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${baseUrl}/oferta/${deal.slug}`,
      name: deal.title,
    })),
  };

  return (
    <main className="page-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

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
              return (
                <main className="page-wrap">
                  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
                  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

                  <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex-1">
                        <h1 className="text-2xl font-black text-orange-700 md:text-3xl">
                          LT Promo Radar: Promoções, Cupons e Descontos Mercado Livre, Amazon, Shopee, Shein, Magalu, AliExpress
                        </h1>
                        <p className="mt-2 text-sm text-slate-700">
                          Encontre as melhores ofertas online, cupom de desconto, promoções Mercado Livre, cupons Shopee, descontos Amazon, cashback Brasil e promoções de afiliados. Radar de promoções atualizado diariamente para você economizar!
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <img src="/images/logo-mercado-livre.png" alt="promoções Mercado Livre" className="h-8" />
                        <img src="/images/logo-amazon.png" alt="ofertas Amazon" className="h-8" />
                        <img src="/images/logo-shopee.png" alt="descontos Shopee" className="h-8" />
                        <img src="/images/logo-shein.png" alt="cupons Shein" className="h-8" />
                        <img src="/images/logo-magalu.png" alt="promoções Magalu" className="h-8" />
                        <img src="/images/logo-aliexpress.png" alt="descontos AliExpress" className="h-8" />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="chip chip-orange">Cupom de desconto</span>
                      <span className="chip chip-yellow">Cashback Brasil</span>
                      <span className="chip chip-green">Promoções afiliados</span>
                      <span className="chip chip-blue">melhores ofertas online</span>
                      <span className="chip chip-lime">promoções Mercado Livre</span>
                      <span className="chip chip-pink">cupons Shopee</span>
                    </div>
                  </header>
      <section className="mt-6 rounded-2xl border border-orange-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-black text-slate-900">Top ofertas do dia</h2>
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">Mais desconto agora</p>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {topDeals.map((deal) => (
            <DealCard key={`top-${deal.slug}`} deal={deal} />
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-blue-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-black text-blue-700">Promoções Magalu Exclusivas</h2>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Cupons, descontos e produtos Magalu</p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* Produto 1: Magazine Você LT Radar */}
          <div className="promo-card border border-blue-300 rounded-xl p-4 bg-blue-50">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Magazine LT Radar - Loja Oficial</h3>
            <p className="text-sm text-blue-800 mb-2">Acesse a loja Magazine LT Radar e encontre as melhores ofertas Magalu, cupons de desconto e promoções exclusivas. Produtos Magalu com entrega rápida e garantia.</p>
            <a href="https://www.magazinevoce.com.br/magazineltradar/" target="_blank" rel="noopener" className="btn btn-blue">Ver ofertas Magalu</a>
          </div>

          {/* Produto 2: Divulgador Magalu - fxkiwehP */}
          <div className="promo-card border border-blue-300 rounded-xl p-4 bg-blue-50">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Promoção Magalu: Produto Especial 1</h3>
            <p className="text-sm text-blue-800 mb-2">Aproveite descontos Magalu e cupom de desconto exclusivo neste produto. Clique e confira a oferta!</p>
            <a href="https://divulgador.magalu.com/fxkiwehP" target="_blank" rel="noopener" className="btn btn-blue">Ver produto Magalu</a>
          </div>

          {/* Produto 3: Divulgador Magalu - Y0NQtCs4 */}
          <div className="promo-card border border-blue-300 rounded-xl p-4 bg-blue-50">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Promoção Magalu: Produto Especial 2</h3>
            <p className="text-sm text-blue-800 mb-2">Desconto exclusivo Magalu para afiliados. Confira o preço especial e garanta seu produto!</p>
            <a href="https://divulgador.magalu.com/Y0NQtCs4" target="_blank" rel="noopener" className="btn btn-blue">Ver produto Magalu</a>
          </div>

          {/* Produto 4: Divulgador Magalu - o_95nSND */}
          <div className="promo-card border border-blue-300 rounded-xl p-4 bg-blue-50">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Promoção Magalu: Produto Especial 3</h3>
            <p className="text-sm text-blue-800 mb-2">Oferta Magalu com cupom de desconto. Produto selecionado para você economizar ainda mais.</p>
            <a href="https://divulgador.magalu.com/o_95nSND" target="_blank" rel="noopener" className="btn btn-blue">Ver produto Magalu</a>
          </div>

          {/* Produto 5: Divulgador Magalu - whBntrAq */}
          <div className="promo-card border border-blue-300 rounded-xl p-4 bg-blue-50">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Promoção Magalu: Produto Especial 4</h3>
            <p className="text-sm text-blue-800 mb-2">Desconto Magalu exclusivo para afiliados LT Radar. Clique e aproveite a promoção!</p>
            <a href="https://divulgador.magalu.com/whBntrAq" target="_blank" rel="noopener" className="btn btn-blue">Ver produto Magalu</a>
          </div>

          {/* Produto 6: Divulgador Magalu - jSlja6wI */}
          <div className="promo-card border border-blue-300 rounded-xl p-4 bg-blue-50">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Promoção Magalu: Produto Especial 5</h3>
            <p className="text-sm text-blue-800 mb-2">Oferta Magalu com preço especial e cupom de desconto. Produto selecionado para você economizar.</p>
            <a href="https://divulgador.magalu.com/jSlja6wI" target="_blank" rel="noopener" className="btn btn-blue">Ver produto Magalu</a>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {allDeals.map((deal) => (
          <DealCard key={deal.slug} deal={deal} />
        ))}
      </section>
    </main>
  );
}
