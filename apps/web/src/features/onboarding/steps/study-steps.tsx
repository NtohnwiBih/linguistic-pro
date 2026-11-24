import { ChoiceCard } from "@/components/brand/choice-card";
import { daysUntil } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { DAYS, MINUTES, SKILLS, STEP, capitalise } from "@/lib/constants";
import { weeklyHours } from "@/lib/study";
import { Pill, Step, SummaryRow, type StepProps } from "../step-layout";

export function StudyTimeStep({ profile, setProfile }: StepProps) {
  return (
    <Step
      title="How much time can you study?"
      sub="Small, consistent sessions beat occasional marathons."
    >
      <p className="mb-3 text-sm font-semibold">Minutes per day</p>
      <div className="flex flex-wrap gap-2">
        {MINUTES.map((minutes) => (
          <Pill
            key={minutes}
            on={profile.minutesPerDay === minutes}
            onClick={() => setProfile({ minutesPerDay: minutes })}
          >
            {minutes} min
          </Pill>
        ))}
      </div>

      <p className="mb-3 mt-8 text-sm font-semibold">Preferred days</p>
      <div className="grid grid-cols-7 gap-1.5">
        {DAYS.map((day) => {
          const on = profile.days.includes(day);
          return (
            <button
              key={day}
              type="button"
              aria-pressed={on}
              onClick={() =>
                setProfile({
                  days: on ? profile.days.filter((d) => d !== day) : [...profile.days, day],
                })
              }
              className={cn(
                "h-14 rounded-xl border text-xs font-semibold transition active:scale-95",
                on
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              {day.slice(0, 2)}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        That&apos;s about{" "}
        <span className="font-semibold text-foreground">{weeklyHours(profile)} hours</span> a week.
      </p>
    </Step>
  );
}

export function FocusStep({ profile, setProfile }: StepProps) {
  return (
    <Step title="Which skills need the most work?" sub="Choose one or more. We'll prioritise them.">
      <div className="space-y-3">
        {SKILLS.map(({ k, label, icon: Icon, v, d }) => {
          const on = profile.focus.includes(k);
          return (
            <ChoiceCard
              key={k}
              selected={on}
              title={label}
              description={d}
              icon={<Icon className="size-5" style={on ? undefined : { color: `var(${v})` }} />}
              onClick={() =>
                setProfile({
                  focus: on ? profile.focus.filter((x) => x !== k) : [...profile.focus, k],
                })
              }
            />
          );
        })}
      </div>
    </Step>
  );
}

export function PlanStep({
  profile,
  onEdit,
}: {
  profile: StepProps["profile"];
  onEdit: (step: number) => void;
}) {
  const remaining = daysUntil(profile.testDate);
  const testDate = profile.testDate
    ? `${new Date(profile.testDate).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })} · ${remaining} days`
    : "Not booked yet";

  return (
    <Step title="Your personal study plan" sub="Here's what we'll focus on. Tap any item to edit.">
      <div className="surface overflow-hidden">
        <div className="flex items-center justify-between bg-primary p-5 text-primary-foreground">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
              {profile.ieltsType === "general" ? "IELTS General" : "IELTS Academic"}
            </p>
            <p className="mt-1 font-display text-4xl font-semibold">
              Band {profile.targetBand?.toFixed(1)}
            </p>
          </div>
          <div className="text-right text-sm">
            <p className="opacity-80">from</p>
            <p className="font-display text-2xl font-semibold">
              {profile.currentLevel ? profile.currentLevel.toFixed(1) : "—"}
            </p>
          </div>
        </div>
        <ul className="divide-y divide-border">
          <SummaryRow label="Test date" value={testDate} onEdit={() => onEdit(STEP.testDate)} />
          <SummaryRow
            label="Study time"
            value={`${profile.minutesPerDay} min · ${profile.days.length} day${profile.days.length === 1 ? "" : "s"} a week`}
            onEdit={() => onEdit(STEP.studyTime)}
          />
          <SummaryRow
            label="Focus"
            value={profile.focus.map(capitalise).join(", ")}
            onEdit={() => onEdit(STEP.focus)}
          />
        </ul>
      </div>

      <p className="mb-3 mt-6 text-sm font-semibold">A typical week</p>
      <div className="flex gap-2">
        {DAYS.map((day, i) => {
          const on = profile.days.includes(day);
          const skill =
            SKILLS.find((s) => s.k === profile.focus[i % Math.max(1, profile.focus.length)]) ??
            SKILLS[0];
          return (
            <div
              key={day}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 rounded-xl py-3",
                on ? "bg-card border border-border" : "opacity-40",
              )}
            >
              <span className="text-[11px] font-semibold text-muted-foreground">
                {day.slice(0, 1)}
              </span>
              {on ? (
                <skill.icon className="size-4" style={{ color: `var(${skill.v})` }} />
              ) : (
                <span className="size-4" />
              )}
            </div>
          );
        })}
      </div>
    </Step>
  );
}
