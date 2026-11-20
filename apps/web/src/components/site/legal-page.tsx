import { PageHero } from "./page-hero";
export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string[]; list?: string[] }[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={`Last updated ${updated}`} />
      <section className="container-site max-w-3xl py-16 prose-legal">
        {sections.map((s) => (
          <div key={s.h}><h2>{s.h}</h2>{s.p.map((x, i) => <p key={i}>{x}</p>)}{s.list && <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}</div>
        ))}
      </section>
    </>
  );
}
