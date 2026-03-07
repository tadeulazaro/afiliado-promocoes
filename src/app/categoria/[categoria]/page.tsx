import { notFound } from "next/navigation";
import Link from "next/link";
import { DealCard } from "@/components/deal-card";
import { getCategories, getDealsByCategory } from "@/lib/deals";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getCategories().map((categoria) => ({ categoria }));
}

export default function CategoriaPage({ params }: { params: { categoria: string } }) {
  const categoria = params.categoria;
  const deals = getDealsByCategory(categoria);
  if (deals.length === 0) {
    notFound();
  }

  return (
    <main className="page-wrap">
      <Link href="/" className="text-sm font-semibold text-slate-600 hover:underline">← Voltar para home</Link>
      <h1 className="mt-3 text-3xl font-black uppercase text-slate-900">Ofertas: {categoria.replace("-", " ")}</h1>
      <p className="mt-1 text-slate-600">Lista atualizada de promoções nesta categoria.</p>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {deals.map((deal) => (
          <DealCard key={deal.slug} deal={deal} />
        ))}
      </section>
    </main>
  );
}
