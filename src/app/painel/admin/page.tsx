import { redirect } from "next/navigation";
import { getSessionUserFromCookie } from "@/lib/auth";
import { getAffiliates, getPendingPromotions } from "@/lib/marketplace-db";
import { formatBrl, maskCpf } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function PainelAdminPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const user = getSessionUserFromCookie();
  if (!user || user.role !== "admin") {
    redirect("/auth/login?error=acesso-admin");
  }

  const affiliates = getAffiliates();
  const pendingPromotions = getPendingPromotions();
  const feedback = searchParams.error || searchParams.ok;

  return (
    <main className="page-wrap max-w-6xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Painel Admin</h1>
            <p className="text-sm text-slate-600">Aprove ou recuse promoções antes de publicar no marketplace.</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Sair</button>
          </form>
        </div>

        {feedback ? (
          <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
            {String(feedback).replaceAll("-", " ")}
          </p>
        ) : null}
      </div>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Promoções pendentes</h2>
        <div className="mt-4 space-y-3">
          {pendingPromotions.length === 0 ? (
            <p className="text-sm text-slate-600">Nenhuma promoção pendente no momento.</p>
          ) : (
            pendingPromotions.map((promotion) => (
              <article key={promotion.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">{promotion.title}</p>
                    <p className="text-sm text-slate-600">Afiliado: {promotion.affiliateName} • {promotion.category}</p>
                    <p className="text-xs text-slate-500">{formatBrl(promotion.originalPrice)} → {formatBrl(promotion.currentPrice)}</p>
                  </div>
                  <form action="/api/admin/approve-promotion" method="post">
                    <input type="hidden" name="promotionId" value={promotion.id} />
                    <button className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-700">
                      Aprovar promoção
                    </button>
                  </form>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Afiliados cadastrados</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 pr-3">Nome</th>
                <th className="py-2 pr-3">E-mail</th>
                <th className="py-2 pr-3">CPF</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((affiliate) => (
                <tr key={affiliate.id} className="border-b border-slate-100 text-slate-700">
                  <td className="py-2 pr-3 font-semibold">{affiliate.name}</td>
                  <td className="py-2 pr-3">{affiliate.email}</td>
                  <td className="py-2 pr-3">{maskCpf(affiliate.cpf)}</td>
                  <td className="py-2">Ativo</td>
                </tr>
              ))}
            </tbody>
          </table>
          {affiliates.length === 0 ? <p className="mt-2 text-sm text-slate-600">Nenhum afiliado cadastrado ainda.</p> : null}
        </div>
      </section>
    </main>
  );
}
