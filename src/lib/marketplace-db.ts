import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { AffiliateUser, Deal, PartnerPromotion, SessionUser } from "@/lib/types";
import { hashPassword } from "@/lib/auth";

type Store = {
  affiliates: AffiliateUser[];
  promotions: PartnerPromotion[];
};

type GlobalStore = typeof globalThis & {
  __ltRadarMarketplaceStore?: Store;
};

const globalStore = globalThis as GlobalStore;

const DB_FILE_PATH = path.join(process.cwd(), "data", "marketplace-db.json");
let persistenceEnabled = true;

function createEmptyStore(): Store {
  return {
    affiliates: [],
    promotions: [],
  };
}

function ensureStoreLoaded() {
  if (globalStore.__ltRadarMarketplaceStore) {
    return globalStore.__ltRadarMarketplaceStore;
  }

  if (!persistenceEnabled) {
    const empty = createEmptyStore();
    globalStore.__ltRadarMarketplaceStore = empty;
    return empty;
  }

  const dir = path.dirname(DB_FILE_PATH);
  try {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  } catch {
    persistenceEnabled = false;
    const empty = createEmptyStore();
    globalStore.__ltRadarMarketplaceStore = empty;
    return empty;
  }

  if (!existsSync(DB_FILE_PATH)) {
    const empty = createEmptyStore();
    try {
      writeFileSync(DB_FILE_PATH, JSON.stringify(empty, null, 2), "utf8");
    } catch {
      persistenceEnabled = false;
    }
    globalStore.__ltRadarMarketplaceStore = empty;
    return empty;
  }

  try {
    const parsed = JSON.parse(readFileSync(DB_FILE_PATH, "utf8")) as Store;
    const normalized: Store = {
      affiliates: Array.isArray(parsed?.affiliates) ? parsed.affiliates : [],
      promotions: Array.isArray(parsed?.promotions) ? parsed.promotions : [],
    };

    globalStore.__ltRadarMarketplaceStore = normalized;
    return normalized;
  } catch {
    const empty = createEmptyStore();
    writeFileSync(DB_FILE_PATH, JSON.stringify(empty, null, 2), "utf8");
    globalStore.__ltRadarMarketplaceStore = empty;
    return empty;
  }
}

function saveStore() {
  const store = ensureStoreLoaded();
  if (!persistenceEnabled) {
    return;
  }
  const dir = path.dirname(DB_FILE_PATH);
  try {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(DB_FILE_PATH, JSON.stringify(store, null, 2), "utf8");
  } catch {
    persistenceEnabled = false;
  }
}

const allowedCategories: Deal["category"][] = [
  "mercado-livre",
  "amazon",
  "shein",
  "shopee",
  "magalu",
  "aliexpress",
  "apps",
];

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  const name = process.env.ADMIN_NAME?.trim() || "Administrador LT Radar";

  if (!email || !password) {
    return null;
  }

  return {
    email,
    password,
    name,
  };
}

export function registerAffiliate(input: {
  name: string;
  cpf: string;
  email: string;
  password: string;
}) {
  const store = ensureStoreLoaded();
  const cpf = input.cpf.replace(/\D/g, "");
  const email = input.email.trim().toLowerCase();

  const emailExists = store.affiliates.some((item) => item.email === email);
  if (emailExists) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const cpfExists = store.affiliates.some((item) => item.cpf === cpf);
  if (cpfExists) {
    throw new Error("Este CPF já está cadastrado.");
  }

  const affiliate: AffiliateUser = {
    id: randomUUID(),
    name: input.name.trim(),
    cpf,
    email,
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString(),
    status: "active",
  };

  store.affiliates.push(affiliate);
  saveStore();

  const session: SessionUser = {
    id: affiliate.id,
    name: affiliate.name,
    email: affiliate.email,
    role: "affiliate",
  };

  return { affiliate, session };
}

export function authenticateUser(emailInput: string, password: string) {
  const store = ensureStoreLoaded();
  const email = emailInput.trim().toLowerCase();

  const admin = getAdminCredentials();
  if (admin && email === admin.email.toLowerCase() && password === admin.password) {
    const session: SessionUser = {
      id: "admin-1",
      name: admin.name,
      email: admin.email,
      role: "admin",
    };

    return session;
  }

  const affiliate = store.affiliates.find((item) => item.email === email && item.status === "active");
  if (!affiliate) return null;

  const passwordMatches = affiliate.passwordHash === hashPassword(password);
  if (!passwordMatches) return null;

  const session: SessionUser = {
    id: affiliate.id,
    name: affiliate.name,
    email: affiliate.email,
    role: "affiliate",
  };

  return session;
}

export function createPromotionByAffiliate(
  affiliate: SessionUser,
  input: {
    title: string;
    description: string;
    category: string;
    merchant: string;
    originalPrice: number;
    currentPrice: number;
    image: string;
    affiliateUrl: string;
    coupon?: string;
  },
) {
  const store = ensureStoreLoaded();
  if (affiliate.role !== "affiliate") {
    throw new Error("Somente afiliado pode cadastrar promoção.");
  }

  if (!allowedCategories.includes(input.category as Deal["category"])) {
    throw new Error("Categoria inválida.");
  }

  const baseSlug = slugify(input.title) || "promocao";
  const id = randomUUID();

  const promotion: PartnerPromotion = {
    id,
    slug: `${baseSlug}-${id.slice(0, 6)}`,
    title: input.title.trim(),
    description: input.description.trim(),
    category: input.category as Deal["category"],
    merchant: input.merchant.trim(),
    originalPrice: input.originalPrice,
    currentPrice: input.currentPrice,
    coupon: input.coupon?.trim() || undefined,
    image: input.image.trim(),
    affiliateUrl: input.affiliateUrl.trim(),
    affiliateId: affiliate.id,
    affiliateName: affiliate.name,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.promotions.unshift(promotion);
  saveStore();
  return promotion;
}

export function getAffiliatePromotions(affiliateId: string) {
  const store = ensureStoreLoaded();
  return store.promotions.filter((item) => item.affiliateId === affiliateId);
}

export function getPendingPromotions() {
  const store = ensureStoreLoaded();
  return store.promotions.filter((item) => item.status === "pending");
}

export function approvePromotion(promotionId: string) {
  const store = ensureStoreLoaded();
  const promotion = store.promotions.find((item) => item.id === promotionId);
  if (!promotion) {
    throw new Error("Promoção não encontrada.");
  }

  promotion.status = "approved";
  promotion.updatedAt = new Date().toISOString();
  saveStore();
  return promotion;
}

export function getAffiliates() {
  const store = ensureStoreLoaded();
  return [...store.affiliates].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getApprovedPromotionsAsDeals(): Deal[] {
  const store = ensureStoreLoaded();
  return store.promotions
    .filter((item) => item.status === "approved")
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description,
      category: item.category,
      merchant: item.merchant,
      originalPrice: item.originalPrice,
      currentPrice: item.currentPrice,
      coupon: item.coupon,
      image: item.image,
      affiliateUrl: item.affiliateUrl,
      submittedBy: item.affiliateName,
      updatedAt: item.updatedAt.slice(0, 10),
    }));
}
