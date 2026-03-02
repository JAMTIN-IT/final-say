"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface RepeatableFieldProps<T> {
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  addLabel?: string;
  className?: string;
  maxItems?: number;
}

export function RepeatableField<T>({
  items,
  onAdd,
  onRemove,
  renderItem,
  addLabel = "Add another",
  className,
  maxItems,
}: RepeatableFieldProps<T>) {
  const canAdd = maxItems === undefined || items.length < maxItems;

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, idx) => (
        <div key={idx} className="relative group">
          <div className="border border-stone-300 rounded-input p-4 bg-white">
            {renderItem(item, idx)}
          </div>
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="absolute top-3 right-3 p-1.5 text-stone-400 hover:text-danger hover:bg-stone-100 rounded transition-colors duration-fast opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            aria-label={`Remove item ${idx + 1}`}
          >
            <Trash2 size={14} aria-hidden="true" />
          </button>
        </div>
      ))}
      {canAdd && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onAdd}
          className="flex items-center gap-2"
        >
          <Plus size={14} aria-hidden="true" />
          {addLabel}
        </Button>
      )}
    </div>
  );
}
