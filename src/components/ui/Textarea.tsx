"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, success, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-white border-[1.5px] rounded-input px-4 py-3 font-sans text-body text-stone-700 placeholder:text-stone-500 transition-all duration-fast resize-y min-h-[120px] leading-[1.6]",
          "focus:outline-none focus:border-dusk focus:shadow-input-focus",
          "disabled:bg-stone-100 disabled:opacity-60 disabled:cursor-not-allowed",
          error && "border-danger shadow-input-error",
          success && "border-success",
          !error && !success && "border-stone-300",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
