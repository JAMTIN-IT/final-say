"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  variant?: "module" | "content" | "message";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Card({ variant = "content", className, children, onClick }: CardProps) {
  const variants = {
    module: "bg-parchment border border-[rgba(44,42,74,0.08)] rounded-card p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-base cursor-pointer",
    content: "bg-white border border-stone-300 rounded-[10px] p-6 px-7",
    message: "bg-white border-l-4 border-l-ember rounded-[0_10px_10px_0] p-5 px-6 shadow-card",
  };

  return (
    <div className={cn(variants[variant], className)} onClick={onClick}>
      {children}
    </div>
  );
}
