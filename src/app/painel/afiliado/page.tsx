import { redirect } from "next/navigation";
import { getSessionUserFromCookie } from "@/lib/auth";
import { getAffiliatePromotions } from "@/lib/marketplace-db";

export const dynamic = "force-dynamic";

const categoryOptions = [
  "mercado-livre",
  "amazon",
  "shein",
  "shopee",
  "magalu",
  "aliexpress",
  "apps",
] as const;

function statusBadge(status: string) {
  if (status === "approved") {
    return <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">Aprovada</span>;
  }
  return <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700">Pendente</span>;
}

export default function PainelAfiliadoPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const user = getSessionUserFromCookie();
  if (!user || user.role !== "affiliate") {
    redirect("/auth/login?error=login-obrigatorio");
  }

  const promotions = getAffiliatePromotions(user.id);
  const feedback = searchParams.error || searchParams.ok;

  return (
    <main className="page-wrap max-w-5xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Painel do Afiliado</h1>
            <p className="text-sm text-slate-600">Olá, {user.name}. Cadastre suas promoções para aprovação do admin.</p>
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

        <form action="/api/promotions" method="post" className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
            Título da promoção
            <input name="title" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
            Descrição
            <textarea name="description" required rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Categoria
            <select name="category" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Empresa / Loja
            <input name="merchant" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Preço original
            <input name="originalPrice" type="number" step="0.01" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Preço atual
            <input name="currentPrice" type="number" step="0.01" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
            URL da imagem
            <input name="image" type="url" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
            Link de afiliado
            <input name="affiliateUrl" type="url" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
            Cupom (opcional)
            <input name="coupon" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <button type="submit" className="md:col-span-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-orange-600">
            Enviar promoção para aprovação
          </button>
        </form>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Minhas promoções</h2>
        <div className="mt-4 space-y-3">
          {promotions.length === 0 ? (
            <p className="text-sm text-slate-600">Você ainda não cadastrou promoções.</p>
          ) : (
            promotions.map((promotion) => (
              <article key={promotion.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-slate-900">{promotion.title}</p>
                  {statusBadge(promotion.status)}
                </div>
                <p className="text-xs text-slate-500">{promotion.category} • {promotion.merchant}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
