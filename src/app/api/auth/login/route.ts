import { NextResponse } from "next/server";
import { createSessionValue, SESSION_COOKIE } from "@/lib/auth";
import { authenticateUser } from "@/lib/marketplace-db";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const user = authenticateUser(email, password);
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login?error=credenciais-invalidas", request.url));
  }

  const nextPath = user.role === "admin" ? "/painel/admin?ok=login" : "/painel/afiliado?ok=login";
  const response = NextResponse.redirect(new URL(nextPath, request.url));
  response.cookies.set(SESSION_COOKIE, createSessionValue(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
