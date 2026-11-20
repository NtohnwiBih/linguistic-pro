"use client";

import { useState } from "react";
import { AnalysisShell, Card } from "./shell";
import { AnswerList } from "./answer-list";
import { Player } from "./player";
import { listeningLines, listeningAnswers } from "@/lib/analysis";

export function ListeningAnalysis() {
  const [active, setActive] = useState(1);
  const ref = listeningAnswers[active]?.ref ?? -1;
  return (
    <AnalysisShell slug="listening" firstTab="Transcript & answers">
      <Card slug="listening" eyebrow="Transcript-linked review" title="The final detail is the one that counts" sub="Select a question to jump to the moment the answer was given.">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <Player duration={102} note="Demo playback · no audio track" />
            {listeningLines.map((l, i) => (
              <div key={i} className={`rounded-xl border-l-4 px-4 py-3 transition ${i === ref ? "border-accent bg-accent/10" : "border-transparent"}`}>
                <p className="font-mono text-xs text-muted-foreground">L{i + 1} <span className="ml-2 text-primary">{l.time}</span></p>
                <p className="mt-1 leading-relaxed">{l.t}</p>
              </div>
            ))}
          </div>
          <AnswerList answers={listeningAnswers} active={active} onSelect={setActive} />
        </div>
      </Card>
    </AnalysisShell>
  );
}
