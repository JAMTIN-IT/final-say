"use client";

import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

interface ModuleCardProps {
  label: string;
  icon: LucideIcon;
  iconColor: string;
  href: string;
  percentage: number;
}

export function ModuleCard({ label, icon: Icon, iconColor, href, percentage }: ModuleCardProps) {
  const badgeVariant =
    percentage === 100 ? "complete" : percentage > 0 ? "in-progress" : "not-started";

  return (
    <Link href={href} className="block group">
      <div className="bg-parchment border border-[rgba(44,42,74,0.08)] rounded-card p-6 shadow-card group-hover:shadow-card-hover group-hover:-translate-y-0.5 transition-all duration-base">
        <div className="flex items-start justify-between mb-5">
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Icon size={22} color={iconColor} aria-hidden="true" />
          </div>
          <ProgressRing percentage={percentage} />
        </div>
        <h3 className="font-sans font-semibold text-[15px] text-stone-900 mb-2">{label}</h3>
        <div className="flex items-center justify-between">
          <Badge variant={badgeVariant} />
          <ArrowRight
            size={15}
            className="text-stone-400 group-hover:text-ember group-hover:translate-x-0.5 transition-all duration-fast"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
