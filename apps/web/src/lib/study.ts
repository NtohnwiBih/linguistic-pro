import { Profile } from "./skills";

/** Weekly study time in hours, rounded to one decimal. */
export function weeklyHours(p: Pick<Profile, "minutesPerDay" | "days">): number {
  return Math.round((p.minutesPerDay * p.days.length) / 6) / 10;
}
