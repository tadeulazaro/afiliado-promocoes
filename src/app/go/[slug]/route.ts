import { NextResponse } from "next/server";
import { getDealBySlug } from "@/lib/deals";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const deal = getDealBySlug(params.slug);
  if (!deal) {
    return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  }

  return NextResponse.redirect(deal.affiliateUrl, {
    status: 307,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, s-maxage=600",
    },
  });
}
