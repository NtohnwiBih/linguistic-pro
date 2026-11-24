import { BookOpen, BookOpenCheck, Headphones, Mic, PenLine, type LucideIcon } from "lucide-react";

export type SkillSlug = "reading" | "listening" | "writing" | "speaking";
export const SKILLS: SkillSlug[] = ["reading", "listening", "writing", "speaking"];
export const skills: Record<SkillSlug, { title: string; tagline: string; intro: string; color: string; features: { t: string; d: string }[]; tasks: string[] }> = {
  reading: { title: "Reading", tagline: "Read between the lines.", color: "text-skill-reading", intro: "Find meaning fast, follow complex arguments and answer exam-style questions with confidence.", features: [{ t: "Skimming & scanning drills", d: "Train your eye to find key information in seconds." }, { t: "Real exam passages", d: "Academic and General Training texts modelled on IELTS." }, { t: "Vocabulary in context", d: "Tap any word to see meaning, examples and save it." }], tasks: ["True / False / Not Given", "Matching headings", "Sentence completion", "Multiple choice"] },
  listening: { title: "Listening", tagline: "Hear every detail.", color: "text-skill-listening", intro: "Tune into conversations, lectures and different accents, and catch the details that matter.", features: [{ t: "Many accents", d: "British, American, Australian and more." }, { t: "Replay with transcript", d: "Review exactly what you missed, line by line." }, { t: "Timed sections", d: "Practise under real exam conditions." }], tasks: ["Form completion", "Map labelling", "Multiple choice", "Note completion"] },
  writing: { title: "Writing", tagline: "Shape clear ideas.", color: "text-skill-writing", intro: "Build stronger sentences, organise your thoughts and write confident exam responses.", features: [{ t: "Task 1 & Task 2 practice", d: "Charts, letters and essays with model answers." }, { t: "Structure guides", d: "Step-by-step plans for every essay type." }, { t: "Band-style feedback", d: "See how your coherence, grammar and vocabulary score." }], tasks: ["Opinion essays", "Graph descriptions", "Formal letters", "Problem & solution"] },
  speaking: { title: "Speaking", tagline: "Be understood.", color: "text-skill-speaking", intro: "Build the fluency and confidence to express yourself clearly in any conversation.", features: [{ t: "Record & review", d: "Hear yourself and track your fluency over time." }, { t: "Cue card practice", d: "Hundreds of Part 2 topics with prep timers." }, { t: "Pronunciation tips", d: "Focus on the sounds that matter most for you." }], tasks: ["Introduction & interview", "Long turn (cue card)", "Two-way discussion", "Pronunciation drills"] },
};

export type IeltsType = "academic" | "general";

export type Profile = {
  ieltsType: IeltsType | null;
  targetBand: number | null;
  currentLevel: number | null;
  /** ISO date (YYYY-MM-DD) or null when the test isn't booked. */
  testDate: string | null;
  minutesPerDay: number;
  days: string[];
  focus: SkillSlug[];
  /** ISO country code, drives local pricing. */
  country: string | null;
};

export interface SkillMeta {
  label: string;
  /** Compact icon used in the dashboard. */
  icon: LucideIcon;
  /** Emphasised icon used on marketing and onboarding screens. */
  emblem: LucideIcon;
  /** Tailwind text colour class. */
  tone: string;
  /** Tailwind soft background class. */
  soft: string;
  /** CSS custom property holding the skill colour. */
  cssVar: `--skill-${SkillSlug}`;
  /** What the learner practises, shown during onboarding. */
  focusHint: string;
  /** Example study-plan task. */
  sampleTask: string;
}

export const skillMeta: Record<SkillSlug, SkillMeta> = {
  reading: {
    label: "Reading",
    icon: BookOpen,
    emblem: BookOpenCheck,
    tone: "text-skill-reading",
    soft: "bg-skill-reading/10",
    cssVar: "--skill-reading",
    focusHint: "Skimming, scanning, True/False/Not Given",
    sampleTask: "Matching headings",
  },
  listening: {
    label: "Listening",
    icon: Headphones,
    emblem: Headphones,
    tone: "text-skill-listening",
    soft: "bg-skill-listening/10",
    cssVar: "--skill-listening",
    focusHint: "Accents, note completion, maps",
    sampleTask: "Note completion",
  },
  writing: {
    label: "Writing",
    icon: PenLine,
    emblem: PenLine,
    tone: "text-skill-writing",
    soft: "bg-skill-writing/10",
    cssVar: "--skill-writing",
    focusHint: "Task 1 reports and Task 2 essays",
    sampleTask: "Task 2 structure",
  },
  speaking: {
    label: "Speaking",
    icon: Mic,
    emblem: Mic,
    tone: "text-skill-speaking",
    soft: "bg-skill-speaking/10",
    cssVar: "--skill-speaking",
    focusHint: "Fluency, pronunciation, Part 2 cue cards",
    sampleTask: "Part 2 fluency",
  },
};

