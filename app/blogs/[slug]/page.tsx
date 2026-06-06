import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    title: post.title.replace("\n", " "),
    description: post.excerpt,
    openGraph: {
      title: post.title.replace("\n", " "),
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

  const nextPost = post.nextSlug ? getBlogBySlug(post.nextSlug) : null;

  return (
    <div className="h-screen bg-[#1a1a2e] text-[#FCFCFC] overflow-y-auto">
      <div className="crt-phosphor" aria-hidden="true" />

      <div className="blog-article-wrap">
        {/* Back navigation */}
        <nav className="blog-back-nav">
          <Link href="/blogs" className="back-btn">
            ← ALL LOGS
          </Link>
          <span className="breadcrumb">
            DATA LOGS / <span>{post.title.replace("\n", " ")}</span>
          </span>
        </nav>

        {/* Meta bar */}
        <div className="blog-meta-bar">
          <span className="bmeta-world">{post.world}</span>
          <span className="bmeta-date">{formattedDate.toUpperCase()}</span>
          <span className="bmeta-read">{post.readTime.toUpperCase()} READ</span>
        </div>

        {/* Title & subtitle */}
        <h1 className="blog-title">{post.title}</h1>
        <p className="blog-subtitle">{post.subtitle}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Hero emoji */}
        <div className="blog-hero-img">
          <span className="pixel-art" style={{ animation: "none" }}>
            {post.emoji}
          </span>
          <div className="blog-hero-overlay" />
        </div>

        {/* Coin divider */}
        <div className="inline-divider">
          <div className="iline" />
          <div className="icoin" />
          <div className="iline" />
        </div>

        {/* Content body */}
        <div
          className="blog-content-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Coin divider */}
        <div className="inline-divider">
          <div className="iline" />
          <div className="icoin" />
          <div className="iline" />
        </div>

        {/* Footer */}
        <div className="blog-footer">
          <div className="blog-footer-author">
            TRANSMISSION BY <span>LAKSHAY JAIN</span>
          </div>
          <Link
            href="/#contact"
            className="card-btn"
          >
            <span className="arrow">▶</span> SEND TRANSMISSION
          </Link>
        </div>

        {/* Next article */}
        {nextPost && (
          <Link
            href={`/blogs/${nextPost.slug}`}
            className="next-article block no-underline"
          >
            <div className="next-article-label">NEXT LOG ▶▶</div>
            <div className="next-article-title">
              {nextPost.title.replace("\n", " ")}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
