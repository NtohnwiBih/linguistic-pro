import { WelcomeView } from "@/features/marketing/welcome-view";
import { initPage } from "@/lib/locale";
import { metadataFor, type LocalePageProps } from "@/lib/metadata";

export const generateMetadata = metadataFor("welcome");

export default async function WelcomePage({ params }: LocalePageProps) {
  await initPage(params);
  return <WelcomeView />;
}
