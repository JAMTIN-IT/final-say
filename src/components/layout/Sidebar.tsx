"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User, Flower2, Lock, MessageSquareHeart, Users, Heart, Feather, Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/funeral", label: "Funeral Arrangements", icon: Flower2 },
  { href: "/dashboard/vault", label: "Digital Vault", icon: Lock },
  { href: "/dashboard/messages", label: "Final Messages", icon: MessageSquareHeart },
  { href: "/dashboard/trustees", label: "Trustees", icon: Users },
  { href: "/dashboard/dependants", label: "Pets & Dependants", icon: Heart },
  { href: "/dashboard/philosophy", label: "Life Philosophy", icon: Feather },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[260px] shrink-0 bg-dusk min-h-full" aria-label="Module navigation">
      <div className="px-5 py-6">
        <Link href="/dashboard" className="block">
          <span className="font-display text-[22px] text-ivory font-light tracking-wide">Final Say</span>
        </Link>
      </div>
      <div className="border-t border-white/10 mx-5" />
      <nav className="flex-1 py-4" aria-label="Modules">
        {modules.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-5 py-3 text-[14px] font-sans font-medium transition-colors duration-fast",
                isActive
                  ? "bg-[rgba(196,112,74,0.2)] border-l-[3px] border-ember text-white pl-[17px]"
                  : "text-white/70 hover:text-white hover:bg-white/5 border-l-[3px] border-transparent"
              )}
            >
              <Icon size={20} aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 mx-5" />
      <Link
        href="/settings"
        className={cn(
          "flex items-center gap-3 px-5 py-4 text-[14px] font-sans font-medium transition-colors duration-fast",
          pathname.startsWith("/settings")
            ? "text-white border-l-[3px] border-ember pl-[17px]"
            : "text-white/60 hover:text-white border-l-[3px] border-transparent"
        )}
      >
        <Settings size={20} aria-hidden="true" />
        Settings
      </Link>
    </aside>
  );
}
