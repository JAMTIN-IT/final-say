"use client";

import React from "react";
import { cn } from "@/lib/utils";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "block font-sans font-medium text-[13px] text-stone-700 mb-1.5 tracking-[0.02em]",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
