"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor, Globe } from "lucide-react";

type Theme = "light" | "dark" | "system";
const themes = [{ v: "light", I: Sun, l: "Light" }, { v: "system", I: Monitor, l: "System" }, { v: "dark", I: Moon, l: "Dark" }] as const;
const languages = [{ v: "en", l: "English" }, { v: "fr", l: "Français" }, { v: "es", l: "Español" }, { v: "de", l: "Deutsch" }];

function applyTheme(t: Theme) {
  const dark = t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

export function FooterControls() {
  const [theme, setTheme] = useState<Theme>("system");
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setTheme((localStorage.getItem("theme") as Theme) || "system");
    setLang(localStorage.getItem("lang") || "en");
  }, []);

  useEffect(() => {
    applyTheme(theme);
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => applyTheme("system");
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [theme]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 rounded-full border border-footer-foreground/20 px-3 py-1.5">
        <Globe className="h-4 w-4 opacity-70" />
        <span className="sr-only">Language</span>
        <select
          value={lang}
          onChange={(e) => { setLang(e.target.value); localStorage.setItem("lang", e.target.value); document.documentElement.lang = e.target.value; }}
          className="bg-transparent text-sm outline-none [&>option]:bg-footer"
        >
          {languages.map((l) => <option key={l.v} value={l.v}>{l.l}</option>)}
        </select>
      </label>
      <div role="radiogroup" aria-label="Theme" className="flex rounded-full border border-footer-foreground/20 p-1">
        {themes.map(({ v, I, l }) => (
          <button
            key={v}
            role="radio"
            aria-checked={theme === v}
            aria-label={l}
            title={l}
            onClick={() => { setTheme(v); localStorage.setItem("theme", v); }}
            className={`grid h-7 w-7 place-items-center rounded-full transition ${theme === v ? "bg-footer-foreground text-footer" : "opacity-60 hover:opacity-100"}`}
          >
            <I className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
