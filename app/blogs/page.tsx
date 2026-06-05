import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import DetailPageShell from "../../components/DetailPageShell";
import { BLOGS } from "../../data/blogs";

export const metadata: Metadata = {
  title: "Data Logs",
  description: "Design notes, build logs, and workflow thoughts from DEV LAKSHAY.",
};

export default function BlogsPage() {
  return (
    <DetailPageShell badge="ARCHIVE // DATA LOGS" backHref="/#contact">
      <div className="text-center mb-10">
        <h1 className="font-pixel text-[var(--coin)] text-[clamp(16px,3vw,24px)] tracking-wider uppercase mb-3">
          Data Logs
        </h1>
        <p className="font-terminal text-[var(--text-dim)] text-[16px] max-w-[520px] mx-auto">
          Demo transmissions — swap with real posts when your blog goes live.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {BLOGS.map((post) => {
          const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group card overflow-hidden !p-0"
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: post.accentColor }} />
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-pixel text-[5px] text-[var(--text-dim)] tracking-wider">
                    {formattedDate}
                  </span>
                  <span className="font-pixel text-[5px] text-[var(--text-cyan)] tracking-wider">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="font-pixel text-[var(--coin)] text-[11px] md:text-[12px] tracking-tight mb-3 group-hover:brightness-110 transition-all leading-relaxed">
                  {post.title}
                </h2>
                <p className="font-terminal text-[14px] text-[var(--text-dim)] leading-relaxed line-clamp-3 group-hover:text-[var(--text-body)] transition-colors mb-4">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-pixel text-[5px] text-[var(--text-cyan)] border border-[rgba(85,204,255,0.15)] px-1.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="font-pixel text-[6px] text-[var(--coin)] tracking-wider mt-4 opacity-80 group-hover:opacity-100">
                  ▶ READ LOG
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </DetailPageShell>
  );
}
