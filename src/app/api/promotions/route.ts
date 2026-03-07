import { NextResponse } from "next/server";
import { getSessionUserFromCookie } from "@/lib/auth";
import { createPromotionByAffiliate } from "@/lib/marketplace-db";

export async function POST(request: Request) {
  const user = getSessionUserFromCookie();
  if (!user || user.role !== "affiliate") {
    return NextResponse.redirect(new URL("/auth/login?error=acesso-negado", request.url));
  }

  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const merchant = String(formData.get("merchant") || "").trim();
  const originalPrice = Number(String(formData.get("originalPrice") || "0"));
  const currentPrice = Number(String(formData.get("currentPrice") || "0"));
  const image = String(formData.get("image") || "").trim();
  const affiliateUrl = String(formData.get("affiliateUrl") || "").trim();
  const coupon = String(formData.get("coupon") || "").trim();

  if (!title || !description || !category || !merchant || !image || !affiliateUrl) {
    return NextResponse.redirect(new URL("/painel/afiliado?error=campos-obrigatorios", request.url));
  }

  if (!Number.isFinite(originalPrice) || !Number.isFinite(currentPrice) || originalPrice <= 0 || currentPrice <= 0) {
    return NextResponse.redirect(new URL("/painel/afiliado?error=preco-invalido", request.url));
  }

  try {
    createPromotionByAffiliate(user, {
      title,
      description,
      category,
      merchant,
      originalPrice,
      currentPrice,
      image,
      affiliateUrl,
      coupon: coupon || undefined,
    });

    return NextResponse.redirect(new URL("/painel/afiliado?ok=promocao-enviada", request.url));
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro-promocao";
    const encoded = encodeURIComponent(message.toLowerCase().replace(/\s+/g, "-"));
    return NextResponse.redirect(new URL(`/painel/afiliado?error=${encoded}`, request.url));
  }
}
