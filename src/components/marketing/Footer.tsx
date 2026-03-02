"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-stone-900 py-12 px-6">
      <div className="max-w-content mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div>
          <p className="font-display text-[22px] text-ivory font-light mb-2">Final Say</p>
          <p className="font-sans text-[13px] text-white/40 italic">Your words. Your wishes. Your way.</p>
        </div>
        <nav className="flex gap-8" aria-label="Footer navigation">
          <Link href="/terms" className="font-sans text-[13px] text-white/50 hover:text-white/80 transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="font-sans text-[13px] text-white/50 hover:text-white/80 transition-colors">Privacy Policy</Link>
          <a href="mailto:hello@finalsay.app" className="font-sans text-[13px] text-white/50 hover:text-white/80 transition-colors">Contact</a>
        </nav>
      </div>
      <div className="max-w-content mx-auto border-t border-white/10 mt-8 pt-6">
        <p className="font-sans text-[12px] text-white/30 text-center">
          © {new Date().getFullYear()} Final Say. This platform is not a legal will and does not constitute legal advice.
        </p>
      </div>
    </footer>
  );
}
