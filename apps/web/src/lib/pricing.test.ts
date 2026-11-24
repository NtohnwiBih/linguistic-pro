import { describe, it, expect } from "vitest";
import { buildOffer, COUNTRIES } from "./pricing";
import type { Profile } from "@/lib/skills";

const base: Profile = {
  ieltsType: "academic",
  targetBand: 7,
  currentLevel: 6.5,
  testDate: null,
  minutesPerDay: 30,
  days: ["Mon", "Wed"],
  focus: [],
  country: "GB",
};
const gb = COUNTRIES.find((c) => c.code === "GB")!;

describe("buildOffer", () => {
  it("uses focused monthly price when test is soon and gap is small", () => {
    const o = buildOffer(base, gb, 30);
    expect(o.track).toBe("focused");
    expect(o.interval).toBe("month");
    expect(o.price).toBe(12.99);
  });
  it("goes intensive when band gap is 1.5 or more", () => {
    expect(buildOffer({ ...base, targetBand: 8, currentLevel: 6.5 }, gb, 30).track).toBe(
      "intensive",
    );
  });
  it("bills quarterly with 15% off when test is unbooked", () => {
    const o = buildOffer(base, gb, null);
    expect(o.interval).toBe("3 months");
    expect(o.price).toBe(33.12);
  });
});
