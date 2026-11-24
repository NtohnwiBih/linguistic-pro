import { describe, expect, it } from "vitest";
import { INITIAL_PROFILE } from "@/stores/onboarding-store";
import { STEP } from "./constants";
import { momentAfter } from "./moments";
import { Profile } from "./skills";

const profile = (over: Partial<Profile> = {}): Profile => ({ ...INITIAL_PROFILE, ...over });

describe("momentAfter", () => {
  it("returns nothing for steps without an interstitial", () => {
    expect(momentAfter(STEP.language, profile(), "Amara")).toBeNull();
    expect(momentAfter(STEP.focus, profile(), "Amara")).toBeNull();
  });

  it("needs an IELTS variant before celebrating it", () => {
    expect(momentAfter(STEP.variant, profile(), "Amara")).toBeNull();
    expect(momentAfter(STEP.variant, profile({ ieltsType: "academic" }), "Amara")?.kicker).toBe(
      "English · IELTS Academic",
    );
    expect(momentAfter(STEP.variant, profile({ ieltsType: "general" }), "Amara")?.kicker).toBe(
      "English · IELTS General",
    );
  });

  it("tiers the copy by target band", () => {
    const text = (band: number) => momentAfter(STEP.band, profile({ targetBand: band }), "A")?.text;
    expect(text(8)).toContain("expert territory");
    expect(text(7)).toContain("ambitious");
    expect(text(6)).toContain("step by step");
  });

  it("handles an unknown, equal and lower starting level", () => {
    const at = (currentLevel: number | null) =>
      momentAfter(STEP.level, profile({ targetBand: 7, currentLevel }), "A")?.text;
    expect(at(null)).toContain("find your level");
    expect(at(7.5)).toContain("close to Band 7.0");
    expect(at(5.5)).toContain("1.5-band climb");
  });

  it("describes the weekly rhythm, singular and plural", () => {
    const text = (days: string[]) =>
      momentAfter(STEP.studyTime, profile({ minutesPerDay: 60, days }), "A")?.text;
    expect(text(["Mon"])).toContain("1 session a week");
    expect(text(["Mon", "Wed", "Fri"])).toContain("3 sessions a week");
    expect(text(["Mon", "Wed", "Fri"])).toContain("3 hours");
  });
});
