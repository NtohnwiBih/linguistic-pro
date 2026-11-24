import { useTranslations } from "next-intl";
import { Logo } from "@/components/site/logo";

/** Full-screen placeholder shown while client state hydrates or a redirect is pending. */
export function AppLoader() {
  const t = useTranslations("errors");

  return (
    <div role="status" aria-label={t("loading")} className="grid min-h-dvh place-items-center">
      <Logo/>
    </div>
  );
}
