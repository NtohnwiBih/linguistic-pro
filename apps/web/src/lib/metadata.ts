import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type messages from "@/messages/en.json";
import type { Locale } from "@/i18n/routing";

export type MetaKey = keyof (typeof messages)["meta"];

interface LocaleParams {
  params: Promise<{ locale: string }>;
}

/**
 * Builds `generateMetadata` for a page from the `meta.<key>` messages.
 * Titles get the " — linguisticPro" suffix from the root title template;
 * pass `absolute` to use the message title verbatim (e.g. the landing page).
 */
export function metadataFor(key: MetaKey, options: { absolute?: boolean } = {}) {
  return async ({ params }: LocaleParams): Promise<Metadata> => {
    const { locale } = await params;
    const t = await getTranslations({ locale: locale as Locale, namespace: `meta.${key}` });
    const title = t("title");
    const description = t("description");
    const fullTitle = options.absolute ? title : `${title} — linguisticPro`;

    return {
      title: options.absolute ? { absolute: title } : title,
      description,
      openGraph: { title: fullTitle, description, type: "website" },
      twitter: { card: "summary_large_image", title: fullTitle, description },
    };
  };
}

export type LocalePageProps = LocaleParams;
