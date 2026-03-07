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

export default function CadastroAfiliadoPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const message = messageFromParams(searchParams);

  return (
    <main className="page-wrap max-w-2xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900">Cadastro de Afiliado</h1>
        <p className="mt-2 text-sm text-slate-600">Preencha CPF, e-mail válido e senha para acessar seu painel.</p>

        {message ? (
          <p
            className={`mt-4 rounded-lg px-3 py-2 text-sm font-semibold ${
              message.kind === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {message.text}
          </p>
        ) : null}

        <form action="/api/auth/register-affiliate" method="post" className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
            Nome completo
            <input name="name" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            CPF
            <input name="cpf" required placeholder="000.000.000-00" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            E-mail
            <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
            Senha (mínimo 6 caracteres)
            <input name="password" type="password" minLength={6} required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <button type="submit" className="md:col-span-2 w-full rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-orange-600">
            Cadastrar e entrar
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Já tem conta?{" "}
          <Link href="/auth/login" className="font-bold text-orange-700 hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </main>
  );
}
