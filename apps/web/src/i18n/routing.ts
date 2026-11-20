import { defineRouting } from "next-intl/routing";

/**
 * Interface languages. English only for now; add "fr" here and create
 * `messages/fr.json` to ship a French interface. The default locale has no URL
 * prefix (`/home`), other locales do (`/fr/home`).
 *
 * Note: this is the *interface* language. The language a learner is *studying*
 * lives on their enrollment, not here.
 */
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
