import { BookOpenCheck, Headphones, Mic, PenLine, type LucideIcon } from "lucide-react";
import { SkillSlug } from "./skills";

/** Named step numbers, so no logic depends on a bare magic number. */
export const STEP = {
  intro: 1,
  language: 2,
  exam: 3,
  variant: 4,
  band: 5,
  level: 6,
  testDate: 7,
  studyTime: 8,
  focus: 9,
  plan: 10,
  country: 11,
  offer: 12,
  done: 13,
} as const;

export const TOTAL_STEPS = 13;
/** Steps shown in the progress bar (offer and done screens sit outside it). */
export const PROGRESS_STEPS = 11;

export const BANDS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];

export const LEVELS = [
  { v: 4.5, t: "Beginner", d: "Band 4 – 5 · I'm building the basics" },
  { v: 5.5, t: "Intermediate", d: "Band 5 – 6 · I can handle everyday English" },
  { v: 6.5, t: "Upper-intermediate", d: "Band 6 – 7 · I'm comfortable but make mistakes" },
  { v: 7.5, t: "Advanced", d: "Band 7+ · I want to polish and perfect" },
];

export const MINUTES = [15, 30, 45, 60, 90];
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type SkillMeta = { k: SkillSlug; label: string; icon: LucideIcon; v: string; d: string };

export const SKILLS = [
  {
    k: "reading",
    label: "Reading",
    icon: BookOpenCheck,
    v: "--skill-reading",
    d: "Skimming, scanning, True/False/Not Given",
  },
  {
    k: "listening",
    label: "Listening",
    icon: Headphones,
    v: "--skill-listening",
    d: "Accents, note completion, maps",
  },
  {
    k: "writing",
    label: "Writing",
    icon: PenLine,
    v: "--skill-writing",
    d: "Task 1 reports and Task 2 essays",
  },
  {
    k: "speaking",
    label: "Speaking",
    icon: Mic,
    v: "--skill-speaking",
    d: "Fluency, pronunciation, Part 2 cue cards",
  },
] as const satisfies readonly SkillMeta[];

export const capitalise = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
