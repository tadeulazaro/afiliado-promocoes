import Link from "next/link";

const partnerBrands = [
  { name: "Mercado Livre", logo: "/images/mercado-livre-logo.svg", href: "/categoria/mercado-livre" },
  { name: "Amazon", logo: "/images/amazon-logo.svg", href: "/categoria/amazon" },
  { name: "Shein", logo: "/images/shein-logo.svg", href: "/categoria/shein" },
  { name: "Shopee", logo: "/images/shopee-logo.svg", href: "/categoria/shopee" },
  { name: "Magalu", logo: "/images/magalu-logo.svg", href: "/categoria/magalu" },
  { name: "AliExpress", logo: "/images/aliexpress-logo.svg", href: "/categoria/aliexpress" },
];

export default function SobrePage() {
  return (
    <main className="page-wrap max-w-4xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 inline-flex items-center rounded-full border border-orange-300 bg-orange-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-orange-700">
          🚀 Curadoria focada em clique e economia real
        </div>
        <h1 className="text-3xl font-black text-slate-900">Sobre Nós</h1>
        <p className="mt-3 text-slate-600">
          O LT Radar 2100 é um portal de curadoria de ofertas criado para ajudar você a encontrar promoções úteis,
          preços atrativos e cupons em lojas conhecidas.
        </p>

        <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4">
          <p className="text-sm font-extrabold text-amber-800">Nosso foco é simples:</p>
          <p className="mt-1 text-sm text-amber-700">
            chamar atenção para as melhores oportunidades e direcionar você rapidamente para a página de compra.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/categoria/mercado-livre" className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-extrabold text-white hover:bg-orange-600">
              Ver ofertas mais quentes
            </Link>
            <Link href="/" className="rounded-lg border border-amber-300 bg-white px-4 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100">
              Ir para a home
            </Link>
          </div>
        </div>

        <section className="mt-6">
          <h2 className="text-lg font-extrabold text-slate-900">Empresas em destaque</h2>
          <p className="mt-1 text-sm text-slate-600">Clique no logo para abrir as ofertas de cada empresa.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {partnerBrands.map((brand) => (
              <Link
                key={brand.name}
                href={brand.href}
                className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
              >
                <img src={brand.logo} alt={`Logo ${brand.name}`} className="h-10 w-auto" loading="lazy" />
                <p className="mt-2 text-sm font-bold text-slate-700">{brand.name}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-lg font-extrabold text-slate-900">O que proporcionamos</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Seleção diária de ofertas em marketplaces populares.</li>
              <li>Organização por categorias para achar produtos mais rápido.</li>
              <li>Comparação simples entre preço original e preço promocional.</li>
              <li>Conteúdo transparente com aviso claro de links de afiliado.</li>
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-lg font-extrabold text-slate-900">Nosso compromisso</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Priorizar ofertas relevantes para o público brasileiro.</li>
              <li>Atualizar informações com frequência para manter o site útil.</li>
              <li>Indicar a origem das ofertas com clareza.</li>
              <li>Melhorar continuamente experiência, velocidade e confiança.</li>
            </ul>
          </section>
        </div>

        <p className="mt-6 text-sm text-slate-600">
          Transparência: parte dos links pode gerar comissão de afiliado sem custo extra para você.
          Sempre confira preço final, frete e regras no site parceiro antes de concluir a compra.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            Ver ofertas
          </Link>
          <Link href="/aviso-afiliado" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Aviso de afiliado
          </Link>
        </div>
      </div>
    </main>
  );
}
