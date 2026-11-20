import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`.
// Handles locale negotiation and rewrites for the default locale.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and files with an extension (assets, favicon, etc.).
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
