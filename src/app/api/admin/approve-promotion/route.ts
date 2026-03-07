import { NextResponse } from "next/server";
import { getSessionUserFromCookie } from "@/lib/auth";
import { approvePromotion } from "@/lib/marketplace-db";

export async function POST(request: Request) {
  const user = getSessionUserFromCookie();
  if (!user || user.role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login?error=acesso-negado", request.url));
  }

  const formData = await request.formData();
  const promotionId = String(formData.get("promotionId") || "").trim();

  if (!promotionId) {
    return NextResponse.redirect(new URL("/painel/admin?error=id-invalido", request.url));
  }

  try {
    approvePromotion(promotionId);
    return NextResponse.redirect(new URL("/painel/admin?ok=promocao-aprovada", request.url));
  } catch {
    return NextResponse.redirect(new URL("/painel/admin?error=nao-encontrada", request.url));
  }
}
