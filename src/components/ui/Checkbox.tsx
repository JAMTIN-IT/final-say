"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
}

export function Checkbox({ checked, onChange, label, id, disabled }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none" htmlFor={id}>
      <button
        id={id}
        role="checkbox"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "w-[18px] h-[18px] rounded-[4px] border-[1.5px] flex items-center justify-center transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed",
          checked ? "bg-dusk border-dusk" : "bg-white border-stone-300"
        )}
      >
        {checked && <Check size={11} className="text-white" aria-hidden="true" />}
      </button>
      {label && <span className="font-sans text-[14px] text-stone-700">{label}</span>}
    </label>
  );
}
