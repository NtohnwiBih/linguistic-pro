import {
  Briefcase,
  GraduationCap,
  Languages,
  Lightbulb,
  LineChart,
  Lock,
  Target,
} from "lucide-react";
import { ChoiceCard } from "@/components/brand/choice-card";
import { Step, type StepProps } from "../step-layout";

const INTRO_POINTS = [
  {
    icon: Target,
    title: "Practice what matters",
    text: "Exam-style questions focused on your weak spots.",
  },
  {
    icon: Lightbulb,
    title: "Understand every mistake",
    text: "Clear explanations, not just right or wrong.",
  },
  {
    icon: LineChart,
    title: "See yourself improve",
    text: "Track your estimated band, skill by skill.",
  },
];

export function IntroStep({ first }: { first: string }) {
  return (
    <Step
      title={
        <>
          Hi {first}, let&apos;s build <span className="italic text-primary">your</span> plan.
        </>
      }
      sub="A few quick questions so linguisticPro can shape every session around you."
    >
      <div className="space-y-3">
        {INTRO_POINTS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="surface flex items-start gap-4 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </Step>
  );
}

export function LanguageStep() {
  return (
    <Step title="Which language do you want to practice?" sub="More languages are on the way.">
      <div className="space-y-3">
        <ChoiceCard
          selected
          title="English"
          description="British & international English"
          icon={<Languages className="size-5" />}
        />
        {["French", "Spanish", "German"].map((name) => (
          <ChoiceCard
            key={name}
            disabled
            title={name}
            badge="Soon"
            icon={<Lock className="size-4" />}
          />
        ))}
      </div>
    </Step>
  );
}

export function ExamStep() {
  return (
    <Step title="Which exam are you preparing for?">
      <div className="space-y-3">
        <ChoiceCard
          selected
          title="IELTS"
          description="International English Language Testing System"
          icon={<GraduationCap className="size-5" />}
        />
        {["TOEFL iBT", "PTE Academic", "Cambridge C1 Advanced"].map((name) => (
          <ChoiceCard
            key={name}
            disabled
            title={name}
            badge="Soon"
            icon={<Lock className="size-4" />}
          />
        ))}
      </div>
    </Step>
  );
}

export function VariantStep({ profile, setProfile }: StepProps) {
  return (
    <Step
      title="Which IELTS test are you taking?"
      sub="Listening and Speaking are the same. Reading and Writing differ."
    >
      <div className="space-y-3">
        <ChoiceCard
          selected={profile.ieltsType === "academic"}
          onClick={() => setProfile({ ieltsType: "academic" })}
          title="IELTS Academic"
          description="For university study or professional registration"
          icon={<GraduationCap className="size-5" />}
        />
        <ChoiceCard
          selected={profile.ieltsType === "general"}
          onClick={() => setProfile({ ieltsType: "general" })}
          title="IELTS General Training"
          description="For work, migration or secondary education"
          icon={<Briefcase className="size-5" />}
        />
      </div>
    </Step>
  );
}
