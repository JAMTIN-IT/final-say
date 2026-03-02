"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ToneTag, TONE_TAG_STYLES } from "@/types/messages";

interface BadgeProps {
  variant: "complete" | "in-progress" | "not-started" | "tone";
  toneTag?: ToneTag;
  className?: string;
  children?: React.ReactNode;
}

export function Badge({ variant, toneTag, className, children }: BadgeProps) {
  if (variant === "tone" && toneTag) {
    const style = TONE_TAG_STYLES[toneTag];
    return (
      <span
        className={cn("inline-flex items-center font-sans font-medium text-[11px] px-2 py-0.5 rounded-badge", className)}
        style={{ backgroundColor: style.bg, color: style.text }}
      >
        {style.label}
      </span>
    );
  }

  const variants = {
    complete: "bg-[rgba(74,140,111,0.12)] text-success border border-[rgba(74,140,111,0.3)]",
    "in-progress": "bg-[rgba(196,154,74,0.12)] text-warning border border-[rgba(196,154,74,0.3)]",
    "not-started": "bg-stone-100 text-stone-500",
  };

  const labels = {
    complete: "Complete",
    "in-progress": "In Progress",
    "not-started": "Not Started",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-sans font-medium text-[11px] px-2 py-0.5 rounded-badge",
        variants[variant as keyof typeof variants],
        className
      )}
    >
      {children ?? labels[variant as keyof typeof labels]}
    </span>
  );
}
