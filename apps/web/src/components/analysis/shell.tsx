"use client";

import { useState, type ReactNode } from "react";
import { Info, Sparkles, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { SkillSlug } from "@/lib/skills";
import { headers, tone, patterns, nextSteps, criteria } from "@/lib/analysis";

export function BandRing({ band, slug }: { band: number; slug: SkillSlug }) {
  const pct = band / 9, r = 44, c = 2 * Math.PI * r;
  return (
    <div className="relative grid h-28 w-28 shrink-0 place-items-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="6" className="stroke-border" />
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="6" strokeLinecap="round" className={tone[slug].stroke} strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
      </svg>
      <div className="text-center"><p className="font-display text-3xl font-semibold">{band.toFixed(1)}</p><p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Est. band</p></div>
    </div>
  );
}

export function Card({ eyebrow, title, sub, children, slug }: { eyebrow: string; title: string; sub?: string; children: ReactNode; slug: SkillSlug }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <p className={`text-xs font-bold uppercase tracking-widest ${tone[slug].text}`}>{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Criteria({ slug }: { slug: SkillSlug }) {
  return (
    <Card slug={slug} eyebrow="Band descriptors" title="How each criterion scored">
      <div className="grid gap-4 md:grid-cols-2">
        {criteria[slug]!.map((c) => (
          <div key={c.name} className="rounded-2xl bg-muted p-5">
            <div className="flex items-baseline justify-between"><p className="font-semibold">{c.name}</p><p className={`font-display text-2xl ${tone[slug].text}`}>{c.band.toFixed(1)}</p></div>
            <div className="mt-3 h-1.5 rounded-full bg-border"><div className={`h-full rounded-full ${tone[slug].fill}`} style={{ width: `${(c.band / 9) * 100}%` }} /></div>
            <p className="mt-3 text-sm text-muted-foreground">{c.note}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Patterns({ slug }: { slug: SkillSlug }) {
  return (
    <Card slug={slug} eyebrow="AI pattern detection" title="What keeps coming up" sub="Patterns found across this test and your recent sessions.">
      <div className="grid gap-4 md:grid-cols-3">
        {patterns[slug].map((p) => (
          <div key={p.title} className="rounded-2xl border border-border p-5">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone[slug].bg} ${tone[slug].text}`}>{p.count}</span>
            <p className="mt-4 font-semibold">{p.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function NextSteps({ slug }: { slug: SkillSlug }) {
  return (
    <Card slug={slug} eyebrow="Recommendations" title="Your next steps to improve" sub="A focused plan built from the gaps the AI found.">
      <ol className="space-y-3">
        {nextSteps[slug].map((s, i) => (
          <li key={s.title} className="flex items-start gap-4 rounded-2xl bg-muted p-5">
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${tone[slug].bg} ${tone[slug].text}`}>{i + 1}</span>
            <div className="flex-1"><p className="font-semibold">{s.title}</p><p className="text-sm text-muted-foreground">{s.detail}</p></div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" />{s.minutes} min</span>
          </li>
        ))}
      </ol>
      <Link href="/contact" className="btn-primary mt-6">Start my plan <ArrowRight className="h-4 w-4" /></Link>
    </Card>
  );
}

export function AnalysisShell({ slug, firstTab, extraTabs = [], children }: { slug: SkillSlug; firstTab: string; extraTabs?: { id: string; label: string; node: ReactNode }[]; children: ReactNode }) {
  const h = headers[slug];
  const tabs = [
    { id: "main", label: firstTab, node: children },
    ...(criteria[slug] ? [{ id: "criteria", label: "Criteria", node: <Criteria slug={slug} /> }] : []),
    ...extraTabs,
    { id: "patterns", label: "Patterns", node: <Patterns slug={slug} /> },
    { id: "next", label: "Next steps", node: <NextSteps slug={slug} /> },
  ];
  const [tab, setTab] = useState("main");
  const stats = [...h.stats, { label: "Submitted", value: h.submitted }];
  return (
    <div className="container-site space-y-6 py-10">
      <p className="flex items-center gap-2 text-sm text-muted-foreground"><Sparkles className="h-4 w-4 text-primary" /> AI skill analysis preview</p>
      <section className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <p className={`text-xs font-bold uppercase tracking-widest ${tone[slug].text}`}>{h.eyebrow}</p>
            <h1 className="mt-2 text-3xl font-semibold md:text-4xl">{h.title}</h1>
            <p className="mt-4 rounded-xl border border-border bg-muted px-4 py-3 text-sm">{h.prompt}</p>
          </div>
          <BandRing band={h.band} slug={slug} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {stats.map((s) => <div key={s.label} className="rounded-xl bg-muted px-4 py-3"><p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</p><p className="font-semibold">{s.value}</p></div>)}
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Info className="h-3.5 w-3.5" /> Illustrative estimate from sample data — not an official IELTS result.</p>
      </section>
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${tab === t.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"}`}>{t.label}</button>
        ))}
      </div>
      {tabs.find((t) => t.id === tab)!.node}
    </div>
  );
}
