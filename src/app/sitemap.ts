import { MetadataRoute } from "next";
import { getAllDeals, getCategories } from "@/lib/deals";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();

  const staticPages = ["", "/sobre", "/aviso-afiliado", "/como-alimentar"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryPages = getCategories().map((categoria) => ({
    url: `${baseUrl}/categoria/${categoria}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const dealPages = getAllDeals().map((deal) => ({
    url: `${baseUrl}/oferta/${deal.slug}`,
    lastModified: new Date(deal.updatedAt),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...dealPages];
}
