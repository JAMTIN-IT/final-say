"use client";

import React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function AlertBox({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex gap-3 bg-[rgba(74,122,155,0.08)] border border-[rgba(74,122,155,0.3)] rounded-[8px] p-4 px-5",
        className
      )}
      role="note"
    >
      <Info size={16} className="text-info shrink-0 mt-0.5" aria-hidden="true" />
      <div className="font-sans text-[14px] text-stone-700 leading-[1.6]">{children}</div>
    </div>
  );
}
