import React from "react";
import Link from "next/link";

interface DetailPageShellProps {
  badge: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}

export default function DetailPageShell({
  badge,
  backHref = "/",
  backLabel = "RETURN TO BASE",
  children,
}: DetailPageShellProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-body)] allow-scroll overflow-y-auto">
      <div className="crt-phosphor" aria-hidden="true" />
      <main className="section-container max-w-[1100px] mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href={backHref}
            className="font-pixel text-[7px] text-[var(--text-dim)] border border-[var(--border-dim)] px-4 py-2.5 hover:text-[var(--coin)] hover:border-[var(--coin)] transition-colors tracking-wider w-fit"
          >
            ← {backLabel}
          </Link>
          <span className="font-pixel text-[7px] text-[var(--mario-skin)] border border-[var(--mario-skin)] px-3 py-1.5 tracking-wider w-fit">
            {badge}
          </span>
        </div>
        {children}
      </main>
    </div>
  );
}
