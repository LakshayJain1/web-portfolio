import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailPageShell from "../../../components/DetailPageShell";
import { getAllBlogSlugs, getBlogBySlug } from "../../../data/blogs";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <DetailPageShell badge="DATA LOG // TRANSMISSION" backHref="/blogs" backLabel="ALL LOGS">
      <article
        className="border border-[var(--coin)] bg-[rgba(10,10,22,0.9)] overflow-hidden"
        style={{ boxShadow: "0 0 30px rgba(255, 215, 0, 0.06), 4px 4px 0 rgba(0, 0, 0, 0.4)" }}
      >
        <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--border-dim)] bg-[rgba(0,0,0,0.3)]">
          <span className="font-pixel text-[6px] text-[var(--text-dim)] tracking-wider">
            BLOG.EXE — {formattedDate.toUpperCase()}
          </span>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--mario-red)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-coin)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-pipe)]" />
          </div>
        </div>

        <div className="p-6 md:p-12">
          <div
            className="w-full h-1 mb-8"
            style={{ backgroundColor: post.accentColor }}
          />
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-pixel text-[5px] text-[var(--text-cyan)] border border-[rgba(85,204,255,0.15)] px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-pixel text-[var(--coin)] text-[clamp(16px,3vw,24px)] tracking-tight mb-4 leading-relaxed">
            {post.title}
          </h1>
          <p className="font-terminal text-[var(--text-dim)] text-[16px] mb-10 leading-relaxed">
            {post.excerpt}
          </p>
          <p className="font-pixel text-[5px] text-[var(--text-dim)] tracking-widest mb-10">
            {formattedDate} • {post.readTime} read
          </p>

          <div className="space-y-6 border-t border-[var(--border-dim)] pt-8">
            {post.content.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="font-terminal text-[17px] text-[var(--text-body)] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--border-dim)] flex flex-col sm:flex-row gap-4">
            <Link
              href="/blogs"
              className="flex-1 py-4 border-2 border-[var(--coin)] text-[var(--coin)] font-pixel text-[7px] text-center hover:bg-[var(--coin)]/10 transition-colors"
            >
              ← ALL DATA LOGS
            </Link>
            <Link
              href="/#contact"
              className="flex-1 py-4 bg-[var(--mario-red)] text-white font-pixel text-[7px] text-center border-2 border-black shadow-[3px_3px_0_#000] hover:translate-y-[-2px] transition-all"
            >
              ▶ SEND TRANSMISSION
            </Link>
          </div>
        </div>
      </article>
    </DetailPageShell>
  );
}
