import Link from "next/link";
import { notFound } from "next/navigation";
import { getDealBySlug, getDiscountPercent } from "@/lib/deals";
import { formatBrl } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function OfertaDetalhePage({ params }: { params: { slug: string } }) {
  const deal = getDealBySlug(params.slug);
  if (!deal) {
    notFound();
  }

  const discount = getDiscountPercent(deal.originalPrice, deal.currentPrice);
  const isMercadoLivre = deal.category === "mercado-livre";

  return (
    <main className="page-wrap max-w-3xl">
      <Link href="/" className="text-sm font-semibold text-slate-600 hover:underline">← Voltar para home</Link>

      <article className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{deal.merchant}</p>
          {isMercadoLivre ? (
            <img src="/images/mercado-livre-logo.svg" alt="Mercado Livre" className="h-5 w-auto" loading="lazy" />
          ) : null}
        </div>
        <h1 className="mt-1 text-3xl font-black text-slate-900">{deal.title}</h1>
        <p className="mt-2 text-slate-600">{deal.description}</p>
        {deal.submittedBy ? <p className="mt-2 text-sm font-semibold text-orange-700">Afiliado responsável: {deal.submittedBy}</p> : null}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-sm text-slate-400 line-through">{formatBrl(deal.originalPrice)}</span>
          <span className="text-3xl font-extrabold text-emerald-700">{formatBrl(deal.currentPrice)}</span>
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">-{discount}%</span>
        </div>

        {deal.coupon ? (
          <p className="mt-3 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-700">
            Cupom: <strong>{deal.coupon}</strong>
          </p>
        ) : null}

        <div className="mt-5 space-y-2">
          <Link
            href={`/go/${deal.slug}`}
            rel="nofollow sponsored"
            className="inline-flex items-center rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-orange-600"
          >
            Aproveitar oferta agora
          </Link>
          <p className="text-xs font-medium text-orange-700">Clique para ver preço final e frete direto no parceiro.</p>
        </div>

        <p className="mt-5 text-xs text-slate-500">
          Transparência: este link pode gerar comissão para nós se você finalizar compra/cadastro.
        </p>
      </article>
    </main>
  );
}
