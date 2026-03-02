"use client";

import React from "react";
import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutoSaveIndicatorProps {
  state: "idle" | "saving" | "saved" | "error";
}

export function AutoSaveIndicator({ state }: AutoSaveIndicatorProps) {
  if (state === "idle") return null;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 font-sans text-[13px] transition-opacity duration-base",
        state === "saved" && "text-success animate-saved",
        state === "saving" && "text-stone-500",
        state === "error" && "text-danger"
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {state === "saved" && <Check size={13} aria-hidden="true" />}
      {state === "error" && <AlertCircle size={13} aria-hidden="true" />}
      {state === "saving" && (
        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {state === "saved" && "Saved quietly"}
      {state === "saving" && "Saving…"}
      {state === "error" && "Couldn't save. Retrying…"}
    </div>
  );
}
