export type Deal = {
  slug: string;
  title: string;
  description: string;
  category: "amazon" | "mercado-livre" | "shein" | "shopee" | "magalu" | "aliexpress" | "apps";
  merchant: string;
  originalPrice: number;
  currentPrice: number;
  coupon?: string;
  image: string;
  affiliateUrl: string;
  submittedBy?: string;
  updatedAt: string;
};

export type UserRole = "admin" | "affiliate";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type AffiliateUser = {
  id: string;
  name: string;
  cpf: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  status: "active";
};

export type PromotionStatus = "pending" | "approved";

export type PartnerPromotion = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Deal["category"];
  merchant: string;
  originalPrice: number;
  currentPrice: number;
  coupon?: string;
  image: string;
  affiliateUrl: string;
  affiliateId: string;
  affiliateName: string;
  status: PromotionStatus;
  createdAt: string;
  updatedAt: string;
};
