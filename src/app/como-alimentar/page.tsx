import Link from "next/link";

export default function ComoAlimentarPage() {
  return (
    <main className="page-wrap">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">Como alimentar o site de ofertas</h1>
        <p className="mt-2 text-slate-600">
          Você atualiza tudo no arquivo <strong>src/data/deals.ts</strong>. É só duplicar um item e trocar os dados.
        </p>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-800">Exemplo de item:</p>
          <pre className="mt-2 overflow-x-auto text-xs text-slate-700">{`{
  slug: "notebook-gamer-xpto",
  title: "Notebook Gamer XPTO em promoção",
  description: "Descrição curta e clara da oferta.",
  category: "amazon",
  merchant: "Amazon",
  originalPrice: 5999.9,
  currentPrice: 4899.9,
  coupon: "GAMER10",
  image: "https://...",
  affiliateUrl: "https://site-parceiro.com/?seu-link",
  updatedAt: "2026-03-07",
}`}</pre>
        </div>

        <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Abra <strong>src/data/deals.ts</strong>.</li>
          <li>Copie um objeto já existente e cole abaixo.</li>
          <li>Troque título, preço, cupom, imagem e principalmente <strong>affiliateUrl</strong>.</li>
          <li>Salve o arquivo e publique novamente na Vercel.</li>
        </ol>

        <div className="mt-6 flex gap-2">
          <Link href="/" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600">
            Voltar para ofertas
          </Link>
          <Link href="/aviso-afiliado" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Ver aviso de afiliado
          </Link>
        </div>
      </div>
    </main>
  );
}
