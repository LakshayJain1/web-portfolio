'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOGS } from '../data/blogs';

interface BlogPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function BlogPopup({ open, onClose }: BlogPopupProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[6000] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md allow-scroll overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-3xl bg-[#0A0A0F] border-4 border-[var(--coin)] p-6 md:p-10 shadow-[12px_12px_0_#000] relative my-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="font-pixel text-[6px] text-[var(--mario-skin)] block mb-2">
                ARCHIVE // DATA LOGS
              </span>
              <h2 className="font-pixel text-[var(--coin)] text-[18px] md:text-[22px] tracking-tight">
                Transmissions
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 border-2 border-[var(--coin)] flex items-center justify-center hover:bg-[var(--coin)] hover:text-black transition-colors"
              aria-label="Close blog popup"
            >
              <span className="font-bold text-xl">×</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BLOGS.map((post) => {
              const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  onClick={onClose}
                  className="group border border-[var(--border-dim)] bg-[rgba(10,10,22,0.6)] p-4 hover:border-[var(--coin)] transition-colors"
                >
                  <div className="h-1 w-10 mb-3" style={{ backgroundColor: post.accentColor }} />
                  <span className="font-pixel text-[5px] text-[var(--text-dim)] tracking-wider block mb-2">
                    {formattedDate} • {post.readTime}
                  </span>
                  <h3 className="font-pixel text-[9px] text-[var(--coin)] tracking-tight mb-2 leading-relaxed group-hover:brightness-110">
                    {post.title}
                  </h3>
                  <p className="font-terminal text-[13px] text-[var(--text-dim)] leading-relaxed line-clamp-2 group-hover:text-[var(--text-body)] transition-colors">
                    {post.excerpt}
                  </p>
                  <p className="font-pixel text-[5px] text-[var(--coin)] tracking-wider mt-3 opacity-70 group-hover:opacity-100">
                    ▶ READ LOG
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/blogs"
              onClick={onClose}
              className="flex-1 py-4 bg-[var(--coin)] text-black font-pixel text-[7px] text-center hover:brightness-110 active:translate-y-1 transition-all shadow-[0_4px_0_#B88A00]"
            >
              VIEW ALL LOGS
            </Link>
            <button
              onClick={onClose}
              className="flex-1 py-4 border-2 border-[var(--coin)] text-[var(--coin)] font-pixel text-[7px] hover:bg-[var(--coin)]/10 transition-colors"
            >
              CLOSE TERMINAL
            </button>
          </div>

          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--coin)] opacity-50" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
