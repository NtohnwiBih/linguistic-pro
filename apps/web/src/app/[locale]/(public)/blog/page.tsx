import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "The Learning Journal — linguisticPro Blog",
  description: "Practical IELTS strategies and fresh ideas for reading, listening, writing and speaking.",
  openGraph: {
    title: "The Learning Journal — linguisticPro Blog",
    description: "A little insight goes a long way. Explore practical advice for all four English skills.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function Blog() {
  const [featured, ...articles] = posts;
  return (
    <main className="container-site pb-20 pt-12 md:pb-24 md:pt-16">
      <header className="mb-10 flex flex-col justify-between gap-5 border-b border-border pb-8 md:mb-12 md:flex-row md:items-end">
        <div>
          <p className="eyebrow flex items-center gap-2"><BookOpen className="size-4" /> The learning journal</p>
          <h1 className="mt-4 text-5xl font-semibold md:text-6xl">The linguisticPro blog.</h1>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-muted-foreground">A little insight goes a long way. Fresh ideas for more confident English.</p>
      </header>

      {featured && (
        <section aria-label="Featured article">
          <Link href={`/blog/${featured.slug}`} className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <div className="overflow-hidden rounded-lg bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.image} alt="An open book, pencil and timer for reading practice" className="aspect-[3/2] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02] md:aspect-[5/2]" fetchPriority="high" />
            </div>
            <div className="grid gap-4 py-6 md:grid-cols-[1fr_0.65fr] md:gap-12 md:py-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs"><span className="eyebrow">Featured · {featured.tag}</span><span className="text-muted-foreground">{featured.date}</span></div>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">{featured.title}</h2>
              </div>
              <div className="md:pt-6">
                <p className="leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read article <ArrowUpRight className="size-4" /></span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="mt-8 border-t border-border pt-8 md:mt-12 md:pt-10" aria-labelledby="more-articles">
        <div className="mb-7 flex items-baseline justify-between gap-4"><h2 id="more-articles" className="text-2xl font-semibold">More from the journal</h2><span className="text-xs text-muted-foreground">Across all four skills</span></div>
        <div className="grid gap-x-7 gap-y-10 md:grid-cols-3">
          {articles.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="overflow-hidden rounded-lg bg-muted">{/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={`${p.tag} practice illustration`} className="aspect-[3/2] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]" loading="lazy" /></div>
              <div className="mt-5 flex items-center justify-between gap-3"><span className="eyebrow">{p.tag}</span><ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" /></div>
              <h3 className="mt-3 text-2xl font-semibold leading-snug transition-colors group-hover:text-primary">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">{p.date}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
