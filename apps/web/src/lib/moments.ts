import { daysUntil } from "@/lib/dates";
import type { Profile } from "@/lib/skills";
import { STEP } from "./constants";
import { weeklyHours } from "./study";

export type MomentImage = "academic" | "goal" | "climb" | "journey";
export type Moment = { kicker: string; text: string; image: MomentImage };

/**
 * Personalised interstitial shown after the given step, built from the learner's answers.
 * Wrap emphasis in *stars*.
 */
export function momentAfter(step: number, p: Profile, first: string): Moment | null {
  switch (step) {
    case STEP.variant: {
      if (!p.ieltsType) return null;
      return p.ieltsType === "academic"
        ? {
            kicker: "English · IELTS Academic",
            text: `Amazing, ${first}! You're preparing for an *important academic milestone*. Let's get you *ready*.`,
            image: "academic",
          }
        : {
            kicker: "English · IELTS General",
            text: `A new chapter of *work or life abroad* is calling. Let's make your English *open that door*.`,
            image: "academic",
          };
    }

    case STEP.band: {
      if (!p.targetBand) return null;
      const b = p.targetBand.toFixed(1);
      const kicker = `Target band ${b}`;
      if (p.targetBand >= 8)
        return {
          kicker,
          text: `*Band ${b}!* That's expert territory. Bold — and *absolutely within reach*.`,
          image: "goal",
        };
      if (p.targetBand >= 7)
        return {
          kicker,
          text: `*Band ${b}!* That's an *ambitious goal*. Let's make it happen.`,
          image: "goal",
        };
      return {
        kicker,
        text: `*Band ${b}* — a clear, focused target. We'll get you there *step by step*.`,
        image: "goal",
      };
    }

    case STEP.level: {
      const kicker = "Starting point";
      const target = p.targetBand ?? 7;
      if (p.currentLevel === null)
        return {
          kicker,
          text: `No problem — your first sessions will *find your level* for you. Every journey to *Band ${target.toFixed(1)}* starts somewhere.`,
          image: "climb",
        };
      const gap = Math.max(0, target - p.currentLevel);
      if (gap === 0)
        return {
          kicker,
          text: `You're already *close to Band ${target.toFixed(1)}*. Now we *polish the details* that seal it.`,
          image: "climb",
        };
      return {
        kicker,
        text: `From around *${p.currentLevel.toFixed(1)}* to *${target.toFixed(1)}* — a ${gap.toFixed(1)}-band climb. *Very doable* with the right focus.`,
        image: "climb",
      };
    }

    case STEP.studyTime: {
      const kicker = "Your journey is taking shape";
      const hours = weeklyHours(p);
      const sessions = `${p.days.length} session${p.days.length === 1 ? "" : "s"}`;
      const days = daysUntil(p.testDate);
      return days !== null
        ? {
            kicker,
            text: `*${days} days*, ${sessions} a week, about *${hours} hours* weekly. Your *roadmap is forming*.`,
            image: "journey",
          }
        : {
            kicker,
            text: `${sessions} a week, about *${hours} hours* weekly. A *steady rhythm* that adapts when you book.`,
            image: "journey",
          };
    }

    default:
      return null;
  }
}
