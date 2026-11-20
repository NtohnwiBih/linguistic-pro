"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sparkles, Check, Target, Clock3 } from "lucide-react";
import { type SkillSlug } from "@/lib/skills";
import { headers, patterns, nextSteps, tone } from "@/lib/analysis";
import { Button } from "@/components/ui/button";
import { skillCards } from "./data";

export function AnalysisPreview() {
  const [selected, setSelected] = useState<SkillSlug>("writing");
  const report = headers[selected];
  const focus = patterns[selected][0];
  const exercise = nextSteps[selected][0];
  return (
      <section className="container-site grid items-center gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 md:py-24">
        <div>
          <p className="eyebrow flex items-center gap-2"><Sparkles className="h-4 w-4" /> A closer look at your progress</p>
          <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight md:text-5xl">A score is a start.<br /><em className="text-primary">Insight is the next step.</em></h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">The most useful feedback doesn’t just tell you what went wrong. It helps you understand why — and what to practise next.</p>
          <div className="mt-7 space-y-4 text-sm"><p className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Clear explanations for individual answers</p><p className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Patterns you might not notice yourself</p><p className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Practical, skill-specific recommendations</p></div>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4"><span className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-primary" /> Answer insights</span><span className="text-xs text-muted-foreground">Sample analysis</span></div>
          <div role="tablist" aria-label="Analysis skill" className="grid grid-cols-4 border-b border-border p-2">
            {skillCards.map(({ slug, icon: Icon, title }) => <Button key={slug} id={`tab-${slug}`} role="tab" aria-selected={selected === slug} aria-controls="analysis-preview" variant={selected === slug ? "secondary" : "ghost"} onClick={() => setSelected(slug)} className="h-10 gap-1 px-1 text-xs"><Icon className="hidden h-3.5 w-3.5 sm:block" />{title}</Button>)}
          </div>
          <div id="analysis-preview" role="tabpanel" aria-labelledby={`tab-${selected}`} className="p-5 md:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs text-muted-foreground">{report.eyebrow}</p><h3 className="mt-2 min-h-14 max-w-xs text-xl font-semibold">{report.title}</h3></div><div className="shrink-0 text-right"><p className={`font-display text-4xl ${tone[selected].text}`}>{report.band.toFixed(1)}</p><p className="mt-1 text-[10px] text-muted-foreground">Estimated band</p></div></div>
            <div className="my-5 grid grid-cols-2 gap-4 border-y border-border py-4">{report.stats.slice(0, 2).map(stat => <div key={stat.label}><p className="text-xs text-muted-foreground">{stat.label}</p><p className="mt-1 text-sm font-semibold">{stat.value}</p></div>)}</div>
            {focus && <div className="flex gap-3"><Target className={`mt-0.5 h-4 w-4 shrink-0 ${tone[selected].text}`} /><div><p className="text-xs font-semibold text-muted-foreground">YOUR NEXT FOCUS</p><h4 className="mt-1 text-sm font-semibold">{focus.title}</h4><p className="mt-1 min-h-16 text-sm leading-relaxed text-muted-foreground">{focus.detail}</p></div></div>}
            {exercise && <div className="mt-5 flex items-start gap-3 border-t border-border pt-4"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><div className="flex-1"><p className="text-sm font-semibold">{exercise.title}</p><p className="mt-1 text-xs text-muted-foreground">Recommended exercise · {exercise.minutes} minutes</p></div></div>}
            <Button asChild variant="link" className="mt-5 h-auto px-0"><Link href={`/${selected}`}>View full {selected} analysis <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>
  );
}
