"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, success, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-white border-[1.5px] rounded-input px-4 py-3 font-sans text-body text-stone-700 placeholder:text-stone-500 transition-all duration-fast",
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

Input.displayName = "Input";
