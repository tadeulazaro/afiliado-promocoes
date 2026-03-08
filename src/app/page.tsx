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
                <div key={category} className="flex items-center gap-2">
                  <img src={brand.logo} alt={brand.name} className="h-8" />
                  <span className="text-xs font-bold text-slate-700">{brand.name}</span>
                </div>
              );
            })}
          </div>
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
            {/* Cards Magalu padronizados */}
            {[
              {
                title: "Borrifador de Azeite e Óleo 100ml em Vidro Spray Pulverizador Gourmet para Cozinha, Salada, Churrasco e Temperos",
                desc: "4.3 (349 avaliações)\nPreço original: R$ 9,99\nPreço promocional: R$ 6,99\nSpray gourmet para cozinha, salada, churrasco e temperos. Recomendado pelo Influenciador Magalu.",
                url: "https://www.magazineluiza.com.br/borrifador-de-azeite-e-oleo-100ml-em-vidro-spray-pulverizador-gourmet-para-cozinha-salada-churrasco-e-temperos-importado/divulgador/oferta/cd2b4gakc8/ud/azvn/?promoter_id=5626446&partner_id=3440"
              },
              {
                title: "Magazine LT Radar - Loja Oficial",
                desc: "Acesse a loja Magazine LT Radar e encontre as melhores ofertas Magalu, cupons de desconto e promoções exclusivas. Produtos Magalu com entrega rápida e garantia.",
                url: "https://www.magazinevoce.com.br/magazineltradar/"
              },
              {
                title: "Promoção Magalu: Produto Especial 1",
                desc: "Aproveite descontos Magalu e cupom de desconto exclusivo neste produto. Clique e confira a oferta!",
                url: "https://divulgador.magalu.com/fxkiwehP"
              },
              {
                title: "Promoção Magalu: Produto Especial 2",
                desc: "Desconto exclusivo Magalu para afiliados. Confira o preço especial e garanta seu produto!",
                url: "https://divulgador.magalu.com/Y0NQtCs4"
              },
              {
                title: "Promoção Magalu: Produto Especial 3",
                desc: "Oferta Magalu com cupom de desconto. Produto selecionado para você economizar ainda mais.",
                url: "https://divulgador.magalu.com/o_95nSND"
              },
              {
                title: "Promoção Magalu: Produto Especial 4",
                desc: "Desconto Magalu exclusivo para afiliados LT Radar. Clique e aproveite a promoção!",
                url: "https://divulgador.magalu.com/whBntrAq"
              },
              {
                title: "Promoção Magalu: Produto Especial 5",
                desc: "Oferta Magalu com preço especial e cupom de desconto. Produto selecionado para você economizar.",
                url: "https://divulgador.magalu.com/jSlja6wI"
              }
            ].map((prod, idx) => (
              <div key={idx} className="promo-card border border-blue-300 rounded-xl p-4 bg-blue-50 flex flex-col justify-between">
                <h3 className="text-lg font-bold text-blue-900 mb-2">{prod.title}</h3>
                <p className="text-sm text-blue-800 mb-2">{prod.desc}</p>
                <a href={prod.url} target="_blank" rel="noopener" className="btn btn-blue">Ver produto Magalu</a>
              </div>
            ))}
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
