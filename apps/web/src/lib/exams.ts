/**
 * Exam catalog. The app launches with IELTS only; every other exam is planned and must
 * stay non-selectable until its `available` flag flips to true.
 *
 * Render exam lists from EXAMS — never a hardcoded list in a component.
 */

export type ExamId = "ielts" | "toefl" | "pte" | "cambridge";

export type Exam = {
  id: ExamId;
  /** Full name shown to the learner. */
  name: string;
  /** Short label for tight spaces (chips, sidebars). */
  shortName: string;
  /** Only true for exams a learner can actually start practising today. */
  available: boolean;
  /** One line of context under the name. */
  note: string;
};

export const IELTS: Exam = {
  id: "ielts",
  name: "IELTS",
  shortName: "IELTS",
  available: true,
  note: "Academic & General Training",
};

export const EXAMS: Exam[] = [
  IELTS,
  { id: "toefl", name: "TOEFL iBT", shortName: "TOEFL", available: false, note: "Coming soon" },
  { id: "pte", name: "PTE Academic", shortName: "PTE", available: false, note: "Coming soon" },
  { id: "cambridge", name: "Cambridge B2 First", shortName: "Cambridge", available: false, note: "Coming soon" },
];

/** Exams a learner can start today. */
export const AVAILABLE_EXAMS: Exam[] = EXAMS.filter((e) => e.available);

/** IELTS versions the learner chooses between. */
export const IELTS_TEST_TYPES = ["Academic", "General Training"] as const;
export type IeltsTestType = (typeof IELTS_TEST_TYPES)[number];

/** The four IELTS papers practised in the app. */
export const IELTS_SKILLS = ["Listening", "Reading", "Writing", "Speaking"] as const;
export type IeltsSkill = (typeof IELTS_SKILLS)[number];
