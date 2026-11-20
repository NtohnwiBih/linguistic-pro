import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { skillCards, process } from "@/components/site/home/data";
import { tone } from "@/lib/analysis";
import { AnalysisPreview } from "@/components/site/home/AnalysisPreview";
import { posts } from "@/lib/posts";

/** Desktop landing page content (rendered inside `WebsiteShell`). */
export function Landing() {
  return (
    <>
      <section className="home-hero relative overflow-hidden bg-ink text-ink-foreground">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero.jpg" alt="Three learners working through an English exercise together" width={1600} height={1008} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[65%_center]" />
        <div className="absolute inset-0 home-hero-shade" />
        <div className="container-site relative py-16 md:py-20">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase"><span className="h-1.5 w-1.5 rounded-full bg-primary-glow" /> English & IELTS · linguisticPro</p>
          <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-[1.1] md:text-6xl">English practice.<br /><em className="text-primary-glow">Clearer progress.</em></h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-foreground/85">Go beyond right and wrong. Understand your answers, discover what’s holding you back, and find your next step forward.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12 bg-primary-glow text-ink hover:bg-primary-glow/90"><Link href="/reading">Explore answer analysis <ArrowUpRight /></Link></Button>
            <Button asChild variant="ghost" size="lg" className="h-12 border border-ink-foreground/30 text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"><Link href="/contact">Let’s talk <ArrowRight /></Link></Button>
          </div>
          <p className="mt-7 flex items-center gap-2 text-xs text-ink-foreground/75"><Check className="h-3.5 w-3.5" /> Four skills. Focused feedback. A clearer way forward.</p>
        </div>
       </section>

      <section className="border-b border-border">
        <div className="container-site py-10 md:py-12">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><h2 className="text-2xl font-semibold">Where would you like to improve?</h2><p className="text-xs text-muted-foreground">Explore the four skills</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillCards.map(({ slug, icon: Icon, title, description, detail }) => (
              <Link key={slug} href={`/${slug}`} className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <div className="flex items-center justify-between"><span className={`grid h-10 w-10 place-items-center rounded-md ${tone[slug].bg} ${tone[slug].text}`}><Icon className="h-5 w-5" /></span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">{description}</p><p className="mt-5 border-t border-border pt-3 text-[11px] text-muted-foreground">{detail}</p>
              </Link>
            ))}
          </div>
        </div>
       </section>

       <AnalysisPreview />

       <section className="border-y border-border bg-secondary/50">
        <div className="container-site py-16">
          <p className="eyebrow">Small steps. Meaningful progress.</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">Make every answer count.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">{process.map(step => <div key={step.number} className="border-t border-primary/25 pt-5"><span className="font-display text-2xl text-primary">{step.number}</span><h3 className="mt-4 text-xl font-semibold">{step.title}</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{step.text}</p></div>)}</div>
        </div>
       </section>

       <section className="container-site py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">The learning journal</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">A little insight goes a long way.</h2></div>
          <Button asChild variant="link" className="px-0"><Link href="/blog">All articles <ArrowUpRight /></Link></Button>
        </div>
        <div className="mt-8 grid gap-7 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="aspect-[3/2] overflow-hidden rounded-lg bg-muted">{/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.title} loading="lazy" width={768} height={512} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="mt-5 flex items-center justify-between"><p className="eyebrow">{p.tag}</p><ArrowUpRight className="h-4 w-4 text-muted-foreground" /></div><h3 className="mt-2 text-xl font-semibold group-hover:text-primary">{p.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-site flex flex-col items-start justify-between gap-7 py-14 md:flex-row md:items-center">
          <div><p className="mb-3 text-xs font-semibold uppercase opacity-75">Your next step starts here</p><h2 className="text-3xl font-semibold md:text-4xl">Less guesswork. More understanding.</h2><p className="mt-3 text-sm opacity-80">Take a closer look at what your answers are telling you.</p></div>
          <Button asChild size="lg" variant="secondary" className="h-12 shrink-0"><Link href="/writing">Explore writing analysis <ArrowUpRight /></Link></Button>
        </div>
      </section>
    </>
  );
}
