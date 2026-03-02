"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ErrorText({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("flex items-center gap-1.5 font-sans text-[13px] text-danger mt-1", className)}>
      <AlertCircle size={13} aria-hidden="true" />
      {children}
    </p>
  );
}
