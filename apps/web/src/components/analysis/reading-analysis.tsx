"use client";

import { useState } from "react";
import { AnalysisShell, Card } from "./shell";
import { AnswerList } from "./answer-list";
import { readingParas, readingAnswers } from "@/lib/analysis";

export function ReadingAnalysis() {
  const [active, setActive] = useState(1);
  const ref = readingAnswers[active]?.ref ?? -1;
  return (
    <AnalysisShell slug="reading" firstTab="Passage & answers">
      <Card slug="reading" eyebrow="Evidence-linked review" title="Urban trees and cooler cities" sub="Select a question to highlight the evidence in the passage.">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            {readingParas.map((p, i) => (
              <div key={p.id} className={`rounded-xl border-l-4 px-4 py-3 transition ${i === ref ? "border-accent bg-accent/10" : "border-transparent"}`}>
                <p className="text-xs font-bold text-muted-foreground">{p.id}</p>
                <p className="mt-1 leading-relaxed">{p.t}</p>
              </div>
            ))}
          </div>
          <AnswerList answers={readingAnswers} active={active} onSelect={setActive} />
        </div>
      </Card>
    </AnalysisShell>
  );
}
