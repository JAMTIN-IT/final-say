"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percentage: number;
  className?: string;
  animated?: boolean;
}

export function ProgressBar({ percentage, className, animated = true }: ProgressBarProps) {
  return (
    <div
      className={cn("w-full h-1 bg-stone-100 rounded-full overflow-hidden", className)}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full gradient-progress rounded-full"
        style={{
          width: `${percentage}%`,
          transition: animated ? "width 0.6s ease" : "none",
        }}
      />
    </div>
  );
}
