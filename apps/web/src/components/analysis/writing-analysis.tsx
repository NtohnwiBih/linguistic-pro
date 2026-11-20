"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";
import { AnalysisShell, Card } from "./shell";
import { writingSentences, tone } from "@/lib/analysis";

export function WritingAnalysis() {
  const [mode, setMode] = useState<"o" | "r">("o");
  const [sel, setSel] = useState(0);
  const s = writingSentences[sel] ?? writingSentences[0]!;
  return (
    <AnalysisShell slug="writing" firstTab="Your essay">
      <Card slug="writing" eyebrow="Essay review" title="A clearer version of your argument" sub="Tap a sentence to see the AI's correction and why it matters.">
        <div className="mb-5 inline-flex rounded-full bg-muted p-1">
          {(["o", "r"] as const).map((k) => <button key={k} onClick={() => setMode(k)} className={`rounded-full px-4 py-1.5 text-sm font-medium ${mode === k ? "bg-card shadow-soft" : "text-muted-foreground"}`}>{k === "o" ? "Original" : "Revised"}</button>)}
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-2">
            {writingSentences.map((x, i) => (
              <button key={i} onClick={() => setSel(i)} className={`block w-full rounded-xl border-l-4 px-4 py-3 text-left leading-relaxed transition ${sel === i ? `${tone.writing.border} ${tone.writing.bg}` : "border-transparent hover:bg-muted"}`}>
                {mode === "o" ? x.o : x.r}
              </button>
            ))}
          </div>
          <div className="h-fit rounded-2xl border border-border p-5 lg:sticky lg:top-24">
            <p className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${tone.writing.text}`}><PenLine className="h-4 w-4" />Sentence {sel + 1} · {s.type}</p>
            <div className="mt-4 rounded-xl bg-muted p-4 text-sm">
              {s.o !== s.r && <p className="text-muted-foreground line-through">{s.o}</p>}
              <p className="mt-1 font-medium">{s.r}</p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{s.note}</p>
          </div>
        </div>
      </Card>
    </AnalysisShell>
  );
}
