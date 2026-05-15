"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SaveIndicatorProps {
  /** Current form values (serialized for comparison) */
  currentValues: string;
  /** Original form values (serialized) */
  originalValues: string;
  /** Called when save is triggered */
  onSave: () => Promise<void>;
  /** Called to restore original values */
  onCancel: () => void;
}

type SaveState = "clean" | "dirty" | "saving" | "saved" | "error";

export default function SaveIndicator({
  currentValues,
  originalValues,
  onSave,
  onCancel,
}: SaveIndicatorProps) {
  const [state, setState] = useState<SaveState>("clean");
  const savedTimer = useRef<NodeJS.Timeout | null>(null);

  // Track dirty state
  useEffect(() => {
    if (state === "saving" || state === "saved") return;
    setState(currentValues !== originalValues ? "dirty" : "clean");
  }, [currentValues, originalValues, state]);

  // Warn on page unload if dirty
  useEffect(() => {
    if (state !== "dirty") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [state]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    };
  }, []);

  const handleSave = useCallback(async () => {
    setState("saving");
    try {
      await onSave();
      setState("saved");
      savedTimer.current = setTimeout(() => setState("clean"), 2000);
    } catch {
      setState("error");
    }
  }, [onSave]);

  if (state === "clean") {
    return (
      <button
        disabled
        className="px-6 py-3 rounded-xl text-sm font-bold text-[#A1A1A1] bg-[#F5F5F5] cursor-not-allowed transition-all"
      >
        Save Changes
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 animate-slide-down">
      {state === "dirty" && (
        <>
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#F59E0B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            Unsaved changes
          </div>
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#4A4A4A] bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#FF4B3A] hover:bg-[#E33A2B] transition-all shadow-lg shadow-[#FF4B3A]/20"
          >
            Save Changes
          </button>
        </>
      )}

      {state === "saving" && (
        <button
          disabled
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#FF4B3A] opacity-70 cursor-wait transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Saving...
        </button>
      )}

      {state === "saved" && (
        <div className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-[#10B981] bg-[#10B981]/10 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Saved
        </div>
      )}

      {state === "error" && (
        <>
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#EF4444]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Failed to save
          </div>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#FF4B3A] hover:bg-[#E33A2B] transition-all"
          >
            Retry
          </button>
        </>
      )}
    </div>
  );
}
