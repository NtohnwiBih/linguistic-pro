import type { SkillSlug } from "@/lib/skills";

export type IeltsVariant = "academic" | "general";

export interface LearnerUser {
  name: string;
  email: string;
}

export interface LearnerProfile {
  ieltsType: IeltsVariant | null;
  targetBand: number | null;
  currentLevel: number | null;
  /** ISO date, or null when the test is not booked. */
  testDate: string | null;
  minutesPerDay: number;
  days: string[];
  focus: SkillSlug[];
}
