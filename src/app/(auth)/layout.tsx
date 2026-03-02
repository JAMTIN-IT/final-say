import React from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      <header className="h-16 flex items-center px-6 border-b border-stone-300 bg-white">
        <Link href="/" className="font-display text-[22px] text-dusk font-light tracking-wide">
          Final Say
        </Link>
      </header>
      <main id="main-content" className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
      <footer className="py-4 text-center text-[13px] text-stone-500 font-sans">
        <Link href="/terms" className="hover:text-stone-700 transition-colors">Terms</Link>
        <span className="mx-2">·</span>
        <Link href="/privacy" className="hover:text-stone-700 transition-colors">Privacy</Link>
      </footer>
    </div>
  );
}
