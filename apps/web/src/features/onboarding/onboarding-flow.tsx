"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { BackButton } from "@/components/brand/back-button";
import { BrandButton } from "@/components/brand/brand-button";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { cn } from "@/lib/utils";
import { PROGRESS_STEPS, STEP, TOTAL_STEPS } from "@/lib/constants";
import { momentAfter, type Moment } from "@/lib/moments";
import { PersonalMoment } from "./personal-moment";
import { CountryStep, DoneStep, OfferStep } from "./steps/checkout-steps";
import { ExamStep, IntroStep, LanguageStep, VariantStep } from "./steps/catalog-steps";
import { BandStep, LevelStep, TestDateStep } from "./steps/goal-steps";
import { FocusStep, PlanStep, StudyTimeStep } from "./steps/study-steps";
import { Profile } from "@/lib/skills";

/** Whether the learner may leave a step. Steps not listed here are always passable. */
function canContinue(step: number, p: Profile): boolean {
  switch (step) {
    case STEP.variant:
      return !!p.ieltsType;
    case STEP.band:
      return !!p.targetBand;
    case STEP.studyTime:
      return p.days.length > 0;
    case STEP.focus:
      return p.focus.length > 0;
    case STEP.country:
      return !!p.country;
    default:
      return true;
  }
}

function continueLabel(step: number): string {
  if (step === STEP.intro) return "Let's begin";
  if (step === STEP.plan) return "Looks good";
  if (step === STEP.country) return "Reveal my plan";
  return "Continue";
}

export function OnboardingFlow() {
  const user = useOnboardingStore((s) => s.user);
  const profile = useOnboardingStore((s) => s.profile);
  const setProfile = useOnboardingStore((s) => s.setProfile);

  const [step, setStep] = useState<number>(STEP.intro);
  const [moment, setMoment] = useState<Moment | null>(null);

  const first = user.name.split(" ")[0] ?? "there";

  const advance = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const back = () => setStep((s) => Math.max(STEP.intro, s - 1));

  /** `answers` lets a caller pass a profile that hasn't reached the store yet. */
  const next = (answers: Profile = profile) => {
    const interstitial = momentAfter(step, answers, first);
    if (interstitial) setMoment(interstitial);
    else advance();
  };

  const closeMoment = () => {
    setMoment(null);
    advance();
  };

  const skipLevel = () => {
    setProfile({ currentLevel: null });
    next({ ...profile, currentLevel: null });
  };

  const finish = () => {
    // TODO: persist the profile through the API, then route into the app.
    setStep(STEP.intro);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-glow">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="animate-orb absolute -left-20 top-24 size-72 rounded-full bg-mint/20 blur-3xl" />
        <span
          className="animate-orb absolute -right-24 bottom-20 size-80 rounded-full bg-highlight/10 blur-3xl"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      {moment && <PersonalMoment moment={moment} onContinue={closeMoment} />}

      <div
        inert={!!moment}
        aria-hidden={!!moment}
        className="relative mx-auto flex min-h-dvh max-w-md flex-col px-6 pb-6 pt-4"
      >
        {step < STEP.offer && (
          <header className="flex h-14 items-center gap-4">
            {step > STEP.intro ? <BackButton onClick={back} /> : <span className="size-11" />}
            <div
              role="progressbar"
              aria-label="Onboarding progress"
              aria-valuemin={1}
              aria-valuemax={PROGRESS_STEPS}
              aria-valuenow={step}
              className="flex flex-1 gap-1"
            >
              {Array.from({ length: PROGRESS_STEPS }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-all duration-700",
                    i < step ? "bg-primary" : "bg-muted",
                    i === step - 1 && "shadow-glow",
                  )}
                />
              ))}
            </div>
            <span className="w-11 text-right text-xs font-semibold tabular-nums text-muted-foreground">
              {step}/{PROGRESS_STEPS}
            </span>
          </header>
        )}

        <main key={step} className="flex-1 animate-rise py-8">
          {step === STEP.intro && <IntroStep first={first} />}
          {step === STEP.language && <LanguageStep />}
          {step === STEP.exam && <ExamStep />}
          {step === STEP.variant && <VariantStep profile={profile} setProfile={setProfile} />}
          {step === STEP.band && <BandStep profile={profile} setProfile={setProfile} />}
          {step === STEP.level && (
            <LevelStep profile={profile} setProfile={setProfile} onSkip={skipLevel} />
          )}
          {step === STEP.testDate && <TestDateStep profile={profile} setProfile={setProfile} />}
          {step === STEP.studyTime && <StudyTimeStep profile={profile} setProfile={setProfile} />}
          {step === STEP.focus && <FocusStep profile={profile} setProfile={setProfile} />}
          {step === STEP.plan && <PlanStep profile={profile} onEdit={setStep} />}
          {step === STEP.country && (
            <CountryStep profile={profile} setProfile={setProfile} first={first} />
          )}
          {step === STEP.offer && <OfferStep profile={profile} first={first} />}
          {step === STEP.done && <DoneStep profile={profile} first={first} />}
        </main>

        <div className="pt-2">
          {step < STEP.offer ? (
            <BrandButton onClick={() => next()} disabled={!canContinue(step, profile)}>
              {continueLabel(step)} <ArrowRight />
            </BrandButton>
          ) : step === STEP.offer ? (
            <BrandButton onClick={advance} className="text-lg">
              <Sparkles /> Start my journey
            </BrandButton>
          ) : (
            <BrandButton onClick={finish}>
              Enter linguisticPro <ArrowRight />
            </BrandButton>
          )}
        </div>
      </div>
    </div>
  );
}
