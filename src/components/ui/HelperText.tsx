"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function HelperText({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("font-sans text-[13px] text-stone-500 mt-1", className)}>
      {children}
    </p>
  );
}
