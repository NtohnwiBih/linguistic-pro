"use client";

import { Check, X } from "lucide-react";
import type { Answer } from "@/lib/analysis";

export function AnswerList({ answers, active, onSelect }: { answers: Answer[]; active: number; onSelect: (i: number) => void }) {
  const a = answers[active] ?? answers[0]!;
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Answer review</p>
      {answers.map((x, i) => {
        const ok = !x.correct;
        return (
          <button key={i} onClick={() => onSelect(i)} className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${active === i ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}>
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${ok ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"}`}>{i + 1}</span>
            <div className="flex-1">
              <p className="text-sm font-medium">{x.q}</p>
              <p className="mt-1 text-xs"><span className={ok ? "text-primary" : "text-destructive"}>Your answer: <b>{x.yours}</b></span>{x.correct && <span className="ml-3 text-primary">Correct: <b>{x.correct}</b></span>}</p>
            </div>
            {ok ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-destructive" />}
          </button>
        );
      })}
      <div className="rounded-2xl border border-accent bg-accent/10 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-accent-foreground">AI explanation · Question {active + 1}</p>
        <p className="mt-2 text-sm">{a.why}</p>
      </div>
    </div>
  );
}
