import { CalendarDays, CalendarX } from "lucide-react";
import { ChoiceCard } from "@/components/brand/choice-card";
import { daysUntil } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { BANDS, LEVELS } from "@/lib/constants";
import { Step, type StepProps } from "../step-layout";

const bandLabel = (band: number) =>
  band >= 8 ? "Expert" : band >= 7 ? "Good" : band >= 6 ? "Competent" : "Modest";

export function BandStep({ profile, setProfile }: StepProps) {
  return (
    <Step title="What band score are you aiming for?" sub="You can change this at any time.">
      <div className="grid grid-cols-3 gap-3">
        {BANDS.map((band) => {
          const selected = profile.targetBand === band;
          return (
            <button
              key={band}
              type="button"
              onClick={() => setProfile({ targetBand: band })}
              aria-pressed={selected}
              className={cn(
                "flex aspect-square flex-col items-center justify-center rounded-2xl border bg-card transition-all active:scale-95",
                selected
                  ? "border-primary bg-primary text-primary-foreground ring-4 ring-ring/20"
                  : "border-border hover:border-muted-foreground/30",
              )}
            >
              <span className="font-display text-3xl font-semibold">{band.toFixed(1)}</span>
              <span
                className={cn(
                  "mt-0.5 text-[11px] font-medium",
                  selected ? "opacity-80" : "text-muted-foreground",
                )}
              >
                {bandLabel(band)}
              </span>
            </button>
          );
        })}
      </div>
    </Step>
  );
}

export function LevelStep({ profile, setProfile, onSkip }: StepProps & { onSkip: () => void }) {
  return (
    <Step
      title="Where would you place yourself today?"
      sub="A rough guess is fine — we'll refine it as you practice."
    >
      <div className="space-y-3">
        {LEVELS.map((level) => (
          <ChoiceCard
            key={level.v}
            selected={profile.currentLevel === level.v}
            onClick={() => setProfile({ currentLevel: level.v })}
            title={level.t}
            description={level.d}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="mt-4 w-full py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        I&apos;m not sure — skip
      </button>
    </Step>
  );
}

export function TestDateStep({ profile, setProfile }: StepProps) {
  const remaining = daysUntil(profile.testDate);
  return (
    <Step title="When is your test?" sub="We'll pace your plan to the date.">
      <div className="space-y-3">
        <label
          className={cn(
            "block rounded-2xl border bg-card p-4 transition",
            profile.testDate
              ? "border-primary bg-primary-soft ring-4 ring-ring/20"
              : "border-border",
          )}
        >
          <span className="flex items-center gap-3 font-semibold">
            <CalendarDays className="size-5 text-primary" /> I&apos;ve booked a date
          </span>
          <input
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            value={profile.testDate ?? ""}
            onChange={(e) => setProfile({ testDate: e.target.value || null })}
            className="mt-3 h-12 w-full rounded-xl border border-input bg-background px-3 text-base text-foreground outline-none focus:border-primary"
          />
          {profile.testDate && remaining !== null && (
            <span className="mt-2 block text-sm text-muted-foreground">{remaining} days to go</span>
          )}
        </label>
        <ChoiceCard
          selected={!profile.testDate}
          onClick={() => setProfile({ testDate: null })}
          title="Not booked yet"
          description="We'll build a flexible plan for now"
          icon={<CalendarX className="size-5" />}
        />
      </div>
    </Step>
  );
}
