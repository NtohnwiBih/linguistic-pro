"use client";

import { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";

const bars = Array.from({ length: 90 }, (_, i) => 20 + Math.abs(Math.sin(i * 1.7) * 50 + Math.cos(i * 0.6) * 25));
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function Player({ duration, onTime, note }: { duration: number; onTime?: (t: number) => void; note: string }) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((x) => { const n = Math.min(duration, x + 0.5); if (n >= duration) setPlaying(false); return n; }), 250);
    return () => clearInterval(id);
  }, [playing, duration]);
  useEffect(() => { onTime?.(t); }, [t, onTime]);
  const pct = t / duration;
  return (
    <div className="rounded-2xl bg-muted p-4">
      <div className="flex items-center gap-4">
        <button aria-label={playing ? "Pause" : "Play"} onClick={() => { if (t >= duration) setT(0); setPlaying(!playing); }} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">{playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</button>
        <div className="flex h-12 flex-1 cursor-pointer items-center gap-[2px]" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setT(((e.clientX - r.left) / r.width) * duration); }}>
          {bars.map((h, i) => <span key={i} className={`flex-1 rounded-full ${i / bars.length <= pct ? "bg-primary" : "bg-border"}`} style={{ height: `${h}%` }} />)}
        </div>
      </div>
      <div className="mt-2 flex justify-between font-mono text-xs text-muted-foreground"><span>{fmt(t)} / {fmt(duration)}</span><span className="font-sans">{note}</span></div>
    </div>
  );
}
