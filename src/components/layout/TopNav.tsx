"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";

export function TopNav() {
  const { user, userDoc } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <header className="h-16 bg-white border-b border-stone-300 flex items-center px-6 justify-between shrink-0 z-10">
      <Link href="/dashboard" className="font-display text-[22px] text-dusk font-light tracking-wide">
        Final Say
      </Link>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link href="/dashboard" className="font-sans font-medium text-[14px] text-stone-700 hover:text-dusk transition-colors duration-fast">
            Dashboard
          </Link>
          <Link href="/settings?tab=billing" className="font-sans font-medium text-[14px] text-stone-700 hover:text-dusk transition-colors duration-fast">
            My Plan
          </Link>
        </nav>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-2 rounded-input hover:bg-stone-100 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <div className="w-7 h-7 rounded-full bg-dusk flex items-center justify-center text-white text-[12px] font-medium">
              {(userDoc?.displayName || user?.email || "U")[0].toUpperCase()}
            </div>
            <span className="hidden sm:block font-sans text-[14px] text-stone-700 max-w-[120px] truncate">
              {userDoc?.displayName || user?.email}
            </span>
            <ChevronDown size={14} className="text-stone-500" aria-hidden="true" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} aria-hidden="true" />
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-stone-300 rounded-[10px] shadow-modal z-20 py-1 animate-scale-in">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-stone-700 hover:bg-stone-100 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <User size={15} aria-hidden="true" /> Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-stone-700 hover:bg-stone-100 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings size={15} aria-hidden="true" /> Settings
                </Link>
                <div className="border-t border-stone-100 my-1" />
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-danger hover:bg-stone-100 transition-colors w-full text-left"
                >
                  <LogOut size={15} aria-hidden="true" /> Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
