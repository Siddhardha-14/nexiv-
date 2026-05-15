"use client";

import { useEffect, useCallback } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";

interface UnsavedChangesGuardProps {
  /** Whether the form has unsaved changes */
  isDirty: boolean;
  /** Optional custom message */
  message?: string;
}

/**
 * Guards against accidental navigation when a form has unsaved changes.
 * Handles browser beforeunload events and shows a confirmation dialog
 * when attempting to navigate away via client-side routing.
 */
export default function UnsavedChangesGuard({
  isDirty,
  message = "You have unsaved changes that will be lost if you leave this page.",
}: UnsavedChangesGuardProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  // Browser beforeunload guard
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // Intercept link clicks within the page
  useEffect(() => {
    if (!isDirty) return;

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;

      // Internal navigation — intercept
      e.preventDefault();
      e.stopPropagation();
      setPendingUrl(href);
      setShowDialog(true);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isDirty]);

  const handleConfirmLeave = useCallback(() => {
    setShowDialog(false);
    if (pendingUrl) {
      // Use window.location to force navigation bypassing the guard
      window.location.href = pendingUrl;
    }
  }, [pendingUrl]);

  const handleStay = useCallback(() => {
    setShowDialog(false);
    setPendingUrl(null);
  }, []);

  return (
    <ConfirmDialog
      open={showDialog}
      onClose={handleStay}
      onConfirm={handleConfirmLeave}
      title="Unsaved changes"
      description={message}
      confirmLabel="Leave Page"
      cancelLabel="Stay Here"
      variant="warning"
    />
  );
}
