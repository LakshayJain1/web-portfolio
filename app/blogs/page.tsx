import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BLOGS } from "../../data/blogs";

export const metadata: Metadata = {
  title: "Data Logs",
  description: "Design notes, build logs, and workflow thoughts from DEV LAKSHAY.",
};

export default function BlogsPage() {
  return (
    <div className="h-screen w-full bg-[#1a1a2e] text-[#FCFCFC] overflow-y-auto flex flex-col items-center">
      {/* ══ HERO ══ */}
      <div className="w-full max-w-[1200px] relative text-center pt-20 pb-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="font-pixel text-[7px] text-[#FFD700] border-3 border-[#FFD700] px-3 py-2 tracking-wider hover:bg-[#FFD700] hover:text-black transition-all"
          >
            ← BASE
          </Link>
          <span className="font-pixel text-[7px] text-[#FAB278] border border-[#FAB278] px-3 py-1.5 tracking-wider">
            WORLD 4-1 // ARCHIVE
          </span>
        </div>
        <h1
          className="font-pixel text-[clamp(18px,4vw,36px)] text-white leading-snug tracking-wider mb-4"
          style={{
            textShadow:
              "4px 4px 0 #0A0A0F, -2px -2px 0 #0A0A0F, 2px -2px 0 #0A0A0F, -2px 2px 0 #0A0A0F",
          }}
        >
          DATA LOGS<br />
          & TRANSMISSIONS
        </h1>
        <p className="font-terminal text-[22px] text-white/75 max-w-[560px] mx-auto">
          Design notes, build logs, and workflow thoughts from the field.
        </p>
      </div>

      {/* ══ BLOG GRID ══ */}
      <div className="w-full max-w-[1200px] relative px-6 pb-24">
        {/* section header */}
        <div className="text-center mb-12 relative z-[2]">
          <span className="font-pixel text-[8px] text-[#FFD700] tracking-[4px] block mb-3">
            // TRANSMISSION LOGS //
          </span>
          <h2
            className="font-pixel text-[clamp(14px,3vw,24px)] text-white tracking-wider"
            style={{ textShadow: "3px 3px 0 #E52B2B" }}
          >
            COLLECTED INTEL
          </h2>
          <div className="flex justify-center gap-2 mt-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#FFD700] border-2 border-[#FFA500] animate-coin-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8 relative z-[2]">
          {BLOGS.map((post) => {
            const formattedDate = new Date(post.publishedAt).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            );

            return (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className={`group relative border-3 border-[#FFD700] bg-[rgba(10,10,20,0.82)] cursor-pointer no-underline text-inherit transition-all duration-100 shadow-[6px_6px_0_#0A0A0F] hover:shadow-[10px_10px_0_#FFD700] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[4px_4px_0_#FFD700] ${
                  post.featured
                    ? "col-span-full grid grid-cols-1 md:grid-cols-2"
                    : ""
                }`}
              >
                {/* gold gradient overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[rgba(255,215,0,0.04)] to-transparent" />

                {/* world badge */}
                <div className="absolute -top-[14px] left-4 bg-[#E52B2B] border-3 border-black font-pixel text-[7px] text-white px-2 py-[3px] tracking-wider z-[2]" style={{ boxShadow: "3px 3px 0 #000" }}>
                  {post.world}
                </div>

                {/* brick header */}
                <div className="relative brick-header px-5 pb-4 pt-7 border-b-3 border-black min-h-[100px] flex flex-col justify-end">
                  <div className="flex items-center gap-2 font-['Share_Tech_Mono'] text-[12px] text-white/70 mb-[10px]">
                    <span>{formattedDate.toUpperCase()}</span>
                    <span className="text-[#FFD700]">▶</span>
                    <span className="bg-black/40 border border-[rgba(255,215,0,0.3)] px-1.5 py-[2px] text-[11px]">
                      {post.readTime.toUpperCase()}
                    </span>
                  </div>
                  <div className="font-pixel text-[11px] text-white leading-relaxed tracking-[0.5px]" style={{ textShadow: "2px 2px 0 #0A0A0F" }}>
                    {post.title}
                  </div>
                </div>

                {/* card body */}
                <div className="px-5 py-4 pb-5">
                  <p className="font-terminal text-[18px] text-white/80 leading-snug mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-pixel text-[6px] text-[#FFD700] bg-[rgba(255,215,0,0.15)] border-2 border-[#FFD700] px-2 py-1 tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="inline-flex items-center gap-2 font-pixel text-[7px] text-black bg-[#FFD700] border-3 border-black px-3.5 py-2 no-underline cursor-pointer transition-all duration-[0.08s]"
                    style={{ boxShadow: "3px 3px 0 #000" }}
                  >
                    <span className="text-[12px]">▶</span> READ LOG
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
