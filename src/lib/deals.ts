import { deals } from "@/data/deals";
import { getApprovedPromotionsAsDeals } from "@/lib/marketplace-db";

export function getAllDeals() {
  return [...getApprovedPromotionsAsDeals(), ...deals];
}

export function getDealBySlug(slug: string) {
  return getAllDeals().find((item) => item.slug === slug) || null;
}

export function getDealsByCategory(category: string) {
  return getAllDeals().filter((item) => item.category === category);
}

export function getCategories() {
  return Array.from(new Set(getAllDeals().map((item) => item.category)));
}

export function getDiscountPercent(originalPrice: number, currentPrice: number) {
  if (!originalPrice || originalPrice <= 0) return 0;
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.max(0, Math.round(discount));
}
