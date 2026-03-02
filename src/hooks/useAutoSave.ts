"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SaveFn<T> = (data: T) => Promise<void>;

export function useAutoSave<T>(data: T, saveFn: SaveFn<T>, delay = 800) {
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);
  const serialized = JSON.stringify(data);

  const save = useCallback(
    async (payload: T) => {
      setSaveState("saving");
      try {
        await saveFn(payload);
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 2800);
      } catch {
        setSaveState("error");
        setTimeout(() => setSaveState("idle"), 3000);
      }
    },
    [saveFn]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => save(JSON.parse(serialized) as T), delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialized, delay, save]);

  return saveState;
}
