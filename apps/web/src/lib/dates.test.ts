import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { daysUntil } from "./dates";

describe("daysUntil", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-22T10:00:00"));
  });
  afterEach(() => vi.useRealTimers());

  it("returns null when no date is set", () => {
    expect(daysUntil(null)).toBeNull();
  });

  it("counts whole days, rounding up", () => {
    expect(daysUntil("2026-11-23")).toBe(1);
    expect(daysUntil("2026-12-22")).toBe(30);
  });

  it("returns null for dates in the past", () => {
    expect(daysUntil("2026-11-01")).toBeNull();
  });
});
