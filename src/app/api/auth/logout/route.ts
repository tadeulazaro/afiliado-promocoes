import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/auth/login?ok=logout", request.url));
  response.cookies.set(SESSION_COOKIE, "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}
