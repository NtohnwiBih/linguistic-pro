import { existsSync } from "node:fs";
import path from "node:path";
import { ROUTES } from "./routes";

const appDir = path.resolve(import.meta.dirname, "../app/[locale]");
const groups = ["(public)", "(auth)", "(onboarding)", "(learner)", ""];

describe("ROUTES", () => {
  it.each(Object.entries(ROUTES))("%s has a page", (_name, href) => {
    const segment = href === "/" ? "" : href.slice(1);
    const found = groups.some((group) => existsSync(path.join(appDir, group, segment, "page.tsx")));
    expect(found).toBe(true);
  });
});
