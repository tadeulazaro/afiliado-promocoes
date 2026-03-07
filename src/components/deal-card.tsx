import Link from "next/link";
import { Deal } from "@/lib/types";
import { getDiscountPercent } from "@/lib/deals";
import { formatBrl } from "@/lib/format";

export function DealCard({ deal }: { deal: Deal }) {
  const discount = getDiscountPercent(deal.originalPrice, deal.currentPrice);
  const isMercadoLivre = deal.category === "mercado-livre";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <img src={deal.image} alt={deal.title} className="h-44 w-full object-cover" loading="lazy" />

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{deal.merchant}</p>
            {isMercadoLivre ? (
              <img
                src="/images/mercado-livre-logo.svg"
                alt="Mercado Livre"
                className="h-5 w-auto"
                loading="lazy"
              />
            ) : null}
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">-{discount}%</span>
        </div>

        <h3 className="mt-2 text-lg font-extrabold leading-tight text-slate-900">{deal.title}</h3>
        <p className="mt-1 text-sm text-slate-600">{deal.description}</p>
        {deal.submittedBy ? (
          <p className="mt-1 text-xs font-semibold text-orange-700">Afiliado: {deal.submittedBy}</p>
        ) : null}

        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm text-slate-400 line-through">{formatBrl(deal.originalPrice)}</span>
          <span className="text-xl font-black text-emerald-700">{formatBrl(deal.currentPrice)}</span>
        </div>

        <div className="mt-4 space-y-2">
          <Link
            href={`/go/${deal.slug}`}
            rel="nofollow sponsored"
            className="flex w-full items-center justify-center rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-orange-600"
          >
            Ver oferta agora
          </Link>
          <Link
            href={`/oferta/${deal.slug}`}
            className="flex w-full items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Ver detalhes
          </Link>
          <p className="text-center text-[11px] font-medium text-orange-700">Oferta com desconto ativo • clique e confira no parceiro</p>
        </div>
      </div>
    </article>
  );
}
