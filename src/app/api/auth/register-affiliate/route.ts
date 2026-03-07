import { NextResponse } from "next/server";
import { createSessionValue, isValidCpf, isValidEmail, SESSION_COOKIE } from "@/lib/auth";
import { registerAffiliate } from "@/lib/marketplace-db";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim();
  const cpf = String(formData.get("cpf") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!name || name.length < 3) {
    return NextResponse.redirect(new URL("/auth/cadastro-afiliado?error=nome-invalido", request.url));
  }
  if (!isValidCpf(cpf)) {
    return NextResponse.redirect(new URL("/auth/cadastro-afiliado?error=cpf-invalido", request.url));
  }
  if (!isValidEmail(email)) {
    return NextResponse.redirect(new URL("/auth/cadastro-afiliado?error=email-invalido", request.url));
  }
  if (!password || password.length < 6) {
    return NextResponse.redirect(new URL("/auth/cadastro-afiliado?error=senha-fraca", request.url));
  }

  try {
    const { session } = registerAffiliate({ name, cpf, email, password });
    const response = NextResponse.redirect(new URL("/painel/afiliado?ok=cadastrado", request.url));
    response.cookies.set(SESSION_COOKIE, createSessionValue(session), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro-cadastro";
    const encoded = encodeURIComponent(message.toLowerCase().replace(/\s+/g, "-"));
    return NextResponse.redirect(new URL(`/auth/cadastro-afiliado?error=${encoded}`, request.url));
  }
}
