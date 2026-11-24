import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/routes";
import { SKILLS, skillMeta } from "@/lib/skills";
import { Logo } from "@/components/site/logo";

export function WelcomeView() {
  return (
    <div className="bg-glow min-h-dvh">
      <div className="pt-safe pb-safe mx-auto flex min-h-dvh max-w-md flex-col px-6">
        <header className="flex h-14 items-center">
          <Logo />
        </header>

        <div className="flex flex-1 flex-col justify-center py-8">
          <div className="surface animate-rise relative overflow-hidden p-5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
                Target band
              </span>
              <span className="bg-accent-soft text-accent inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
                <Sparkles className="size-3" /> Personal plan
              </span>
            </div>
            <p className="font-display mt-2 text-6xl font-semibold">7.5</p>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {SKILLS.map((skill, i) => {
                const { emblem: Icon, label, cssVar } = skillMeta[skill];
                return (
                  <div key={skill} className="bg-muted rounded-xl p-2.5 text-center">
                    <Icon className="mx-auto size-5" style={{ color: `var(${cssVar})` }} />
                    <p className="text-muted-foreground mt-1.5 text-[11px] font-medium">{label}</p>
                    <div className="bg-background mt-2 h-1 overflow-hidden rounded-full">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${55 + i * 10}%`, background: `var(${cssVar})` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <h1 className="font-display animate-rise mt-10 text-[2.4rem] leading-[1.05] font-semibold [animation-delay:120ms]">
            Practice with purpose.
            <br />
            <span className="text-primary italic">Score with confidence.</span>
          </h1>
          <p className="text-muted-foreground animate-rise mt-4 text-[15px] leading-relaxed [animation-delay:200ms]">
            A calm, focused way to prepare for IELTS — a plan built around you, practice that
            explains every mistake, and progress you can actually see.
          </p>
        </div>

        <div className="animate-rise space-y-2 [animation-delay:300ms]">
          <Button asChild variant="brand" size="xl">
            <Link href={ROUTES.signUp}>Get started</Link>
          </Button>
          <Button asChild variant="quiet" size="xl">
            <Link href={ROUTES.signIn}>I already have an account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
