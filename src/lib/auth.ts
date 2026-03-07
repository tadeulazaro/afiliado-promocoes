import { cookies } from "next/headers";
import { createHash, createHmac } from "node:crypto";
import { SessionUser } from "@/lib/types";

export const SESSION_COOKIE = "lt_radar_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "change-this-in-env";

function signPayload(payload: string) {
  return createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
}

export function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export function isValidCpf(cpf: string) {
  const onlyDigits = cpf.replace(/\D/g, "");
  if (onlyDigits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(onlyDigits)) return false;

  const calcDigit = (base: string, factor: number) => {
    let total = 0;
    for (const digit of base) {
      total += Number(digit) * factor;
      factor -= 1;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calcDigit(onlyDigits.slice(0, 9), 10);
  const digit2 = calcDigit(onlyDigits.slice(0, 10), 11);

  return digit1 === Number(onlyDigits[9]) && digit2 === Number(onlyDigits[10]);
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function createSessionValue(user: SessionUser) {
  const payload = Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

export function parseSessionValue(value?: string): SessionUser | null {
  if (!value) return null;
  try {
    const [payload, signature] = value.split(".");
    if (!payload || !signature) return null;

    const expectedSignature = signPayload(payload);
    if (signature !== expectedSignature) return null;

    const decoded = Buffer.from(payload, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded) as SessionUser;
    if (!parsed?.id || !parsed?.email || !parsed?.role || !parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getSessionUserFromCookie() {
  const cookieStore = cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  return parseSessionValue(raw);
}
