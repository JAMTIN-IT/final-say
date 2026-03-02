"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  heading: string;
  body: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, heading, body, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="text-stone-300 mb-4" aria-hidden="true">{icon}</div>
      <h3 className="font-display text-[22px] font-normal text-stone-700 mb-2 italic">{heading}</h3>
      <p className="font-sans text-[15px] text-stone-500 max-w-[280px] leading-relaxed mb-6">{body}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
