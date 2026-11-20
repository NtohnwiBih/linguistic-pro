import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found — linguisticPro", robots: { index: false } };
  return {
    title: `${post.title} — linguisticPro`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <article className="container-site max-w-3xl py-20">
      <Link href="/blog" className="text-sm font-semibold text-primary">← All articles</Link>
      <p className="mt-8 text-sm text-muted-foreground"><span className="eyebrow mr-2">{p.tag}</span>{p.date}</p>
      <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{p.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.image} alt="" className="mt-8 aspect-[3/2] w-full rounded-2xl border border-border object-cover" />
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">{p.body.map((b, i) => <p key={i}>{b}</p>)}</div>
    </article>
  );
}
