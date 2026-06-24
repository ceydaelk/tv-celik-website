import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  // Skip locale routing for admin, API, and static asset paths
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    /^\/[^/]+\.[^/]+$/.test(pathname) // files with extensions at root
  ) {
    return;
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|api|assets|.*\\..*).*)"],
};
