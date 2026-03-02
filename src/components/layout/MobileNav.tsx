"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquareHeart, Users, Lock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquareHeart, exact: false },
  { href: "/dashboard/vault", label: "Vault", icon: Lock, exact: false },
  { href: "/dashboard/trustees", label: "Trustees", icon: Users, exact: false },
  { href: "/settings", label: "Settings", icon: Settings, exact: false },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-300 z-20 safe-area-inset-bottom"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 min-w-[44px] min-h-[44px] justify-center transition-colors duration-fast",
                isActive ? "text-ember" : "text-stone-500"
              )}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
