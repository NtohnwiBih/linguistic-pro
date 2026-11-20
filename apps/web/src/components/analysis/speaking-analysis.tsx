"use client";

import { useState } from "react";
import { AnalysisShell, Card } from "./shell";
import { Player } from "./player";
import { speakingTranscript, pronunciation, tone } from "@/lib/analysis";

const style = {
  pron: "underline decoration-wavy decoration-skill-speaking underline-offset-4",
  rep: "underline decoration-accent decoration-2 underline-offset-4 font-semibold",
  filler: "rounded bg-accent/25 px-1",
  pause: "italic text-muted-foreground",
};
const label = { pron: "Pronunciation", rep: "Repetition", filler: "Filler", pause: "Long pause" };

export function SpeakingAnalysis() {
  const [sel, setSel] = useState<number | null>(null);
  const m = sel !== null ? speakingTranscript[sel] : null;
  const recording = (
    <Card slug="speaking" eyebrow="Audio & transcript" title="Your recording, analysed line by line" sub="Tap any marked word or pause to see what the AI detected.">
      <Player duration={112} note="Demo playback · synced to transcript" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <p className="leading-9">
          {speakingTranscript.map((x, i) => x.kind
            ? <button key={i} onClick={() => setSel(i)} className={`${style[x.kind]} ${sel === i ? "ring-2 ring-ring rounded" : ""}`}>{x.t}</button>
            : <span key={i}>{x.t}</span>)}
        </p>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border p-4 text-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Legend</p>
            {(Object.keys(style) as (keyof typeof style)[]).map((k) => <p key={k} className="py-0.5"><span className={style[k]}>{k === "pause" ? "[pause]" : k === "filler" ? "erm" : "word"}</span> <span className="ml-2 text-muted-foreground">{label[k]}</span></p>)}
          </div>
          <div className={`rounded-2xl p-4 text-sm ${m ? "bg-accent/10 border border-accent" : "bg-muted text-muted-foreground"}`}>
            {m && m.kind ? <><p className="text-xs font-bold uppercase tracking-widest">{label[m.kind]} · “{m.t}”</p><p className="mt-2">{m.note}</p></> : "Tap a marked word or pause to see what the audio analysis detected."}
          </div>
        </div>
      </div>
    </Card>
  );
  const pron = (
    <Card slug="speaking" eyebrow="Pronunciation" title="Sounds to work on">
      <div className="grid gap-4 md:grid-cols-2">
        {pronunciation.map((p) => (
          <div key={p.word} className="rounded-2xl bg-muted p-5">
            <p className="font-display text-2xl">{p.word}</p>
            <p className="mt-2 text-sm">Heard: <span className="text-destructive">{p.heard}</span> · Target: <span className={tone.speaking.text}>{p.target}</span></p>
            <p className="mt-1 text-sm text-muted-foreground">{p.tip}</p>
          </div>
        ))}
      </div>
    </Card>
  );
  return <AnalysisShell slug="speaking" firstTab="Recording" extraTabs={[{ id: "pron", label: "Pronunciation", node: pron }]}>{recording}</AnalysisShell>;
}
