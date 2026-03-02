"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center w-full" role="list" aria-label="Progress steps">
      {steps.map((step, idx) => {
        const isComplete = idx < currentStep;
        const isCurrent = idx === currentStep;
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center" role="listitem">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium transition-all duration-base",
                  isComplete && "bg-sage text-white",
                  isCurrent && "bg-ember text-white border-2 border-ember",
                  !isComplete && !isCurrent && "border-2 border-stone-300 bg-white text-stone-500"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isComplete ? <Check size={14} aria-label="Complete" /> : idx + 1}
              </div>
              <span className={cn("text-[11px] mt-1 font-sans whitespace-nowrap", isCurrent ? "text-ember font-medium" : "text-stone-500")}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn("flex-1 h-px mx-2 mb-4", isComplete ? "bg-sage" : "bg-stone-300")}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
