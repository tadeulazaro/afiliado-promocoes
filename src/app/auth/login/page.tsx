import Link from "next/link";

function messageFromParams(searchParams: Record<string, string | string[] | undefined>) {
  const error = searchParams.error;
  const ok = searchParams.ok;
  if (error) {
    return { kind: "error" as const, text: String(error).replaceAll("-", " ") };
  }
  if (ok) {
    return { kind: "ok" as const, text: String(ok).replaceAll("-", " ") };
  }
  return null;
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const message = messageFromParams(searchParams);

  return (
    <main className="page-wrap max-w-xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">Entrar</h1>
        <p className="mt-2 text-sm text-slate-600">Acesse sua conta para gerenciar promoções e painel.</p>

        {message ? (
          <p
            className={`mt-4 rounded-lg px-3 py-2 text-sm font-semibold ${
              message.kind === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {message.text}
          </p>
        ) : null}

        <form action="/api/auth/login" method="post" className="mt-5 space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            E-mail
            <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Senha
            <input name="password" type="password" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <button type="submit" className="w-full rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-orange-600">
            Entrar na conta
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Ainda não é afiliado?{" "}
          <Link href="/auth/cadastro-afiliado" className="font-bold text-orange-700 hover:underline">
            Criar cadastro
          </Link>
        </p>
      </div>
    </main>
  );
}
