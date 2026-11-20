import { WebsiteShell } from "@/components/layout/website-shell";
import { EntryRedirect } from "@/features/marketing/entry-redirect";
import { Landing } from "@/features/marketing/landing";
// import { SplashScreen } from "@/features/marketing/splash-screen";
import { initPage } from "@/lib/locale";
import { metadataFor, type LocalePageProps } from "@/lib/metadata";

export const generateMetadata = metadataFor("landing", { absolute: true });

export default async function RootPage({ params }: LocalePageProps) {
  await initPage(params);

  return (
    <>
      <EntryRedirect />
      <div className="hidden md:block">
        <WebsiteShell>
          <Landing />
        </WebsiteShell>
      </div>
      {/* <SplashScreen /> */}
    </>
  );
}
