"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  /** If set, user must type this exact text to enable confirm button */
  requireTypedConfirmation?: string;
  /** If true, show a loading spinner on the confirm button */
  loading?: boolean;
  /** If set, show a countdown timer (in seconds) on the dialog */
  countdownSeconds?: number;
  /** Called when countdown reaches 0 */
  onCountdownComplete?: () => void;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  requireTypedConfirmation,
  loading = false,
  countdownSeconds,
  onCountdownComplete,
}: ConfirmDialogProps) {
  const [typedText, setTypedText] = useState("");
  const [countdown, setCountdown] = useState(countdownSeconds || 0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  // Reset typed text when dialog opens/closes
  useEffect(() => {
    if (open) {
      setTypedText("");
      if (countdownSeconds) setCountdown(countdownSeconds);
    }
  }, [open, countdownSeconds]);

  // Countdown timer
  useEffect(() => {
    if (!open || !countdownSeconds || countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onCountdownComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [open, countdownSeconds, countdown, onCountdownComplete]);

  // Focus trap: focus confirm button when dialog opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => confirmBtnRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Tab trap within dialog
  useEffect(() => {
    if (!open) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const overlay = overlayRef.current;
      if (!overlay) return;
      const focusable = overlay.querySelectorAll<HTMLElement>(
        'button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [open]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  const canConfirm = requireTypedConfirmation
    ? typedText === requireTypedConfirmation
    : true;

  const variantStyles = {
    danger: {
      icon: "🗑️",
      confirmBg: "bg-[#EF4444] hover:bg-[#DC2626]",
      confirmShadow: "shadow-[0_6px_20px_rgba(239,68,68,0.25)]",
      borderColor: "border-red-100",
      headerColor: "text-[#EF4444]",
      countdownColor: "#EF4444",
    },
    warning: {
      icon: "⚠️",
      confirmBg: "bg-[#F59E0B] hover:bg-[#D97706]",
      confirmShadow: "shadow-[0_6px_20px_rgba(245,158,11,0.25)]",
      borderColor: "border-amber-100",
      headerColor: "text-[#D97706]",
      countdownColor: "#F59E0B",
    },
    info: {
      icon: "ℹ️",
      confirmBg: "bg-[#FF4B3A] hover:bg-[#E33A2B]",
      confirmShadow: "shadow-[0_6px_20px_rgba(255,75,58,0.25)]",
      borderColor: "border-orange-100",
      headerColor: "text-[#FF4B3A]",
      countdownColor: "#FF4B3A",
    },
  };

  const style = variantStyles[variant];

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-black/[0.04] animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="px-7 pt-7 pb-0">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3F1] flex items-center justify-center text-2xl flex-shrink-0">
              {style.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                id="confirm-dialog-title"
                className={`text-lg font-bold tracking-tight ${style.headerColor}`}
              >
                {title}
              </h3>
              <p className="text-sm text-[#4A4A4A] mt-1 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Typed confirmation */}
        {requireTypedConfirmation && (
          <div className="px-7 mt-5">
            <p className="text-xs text-[#7C7C7C] mb-2">
              Type{" "}
              <code className="px-1.5 py-0.5 bg-red-50 text-[#EF4444] rounded font-mono text-[11px] font-bold">
                {requireTypedConfirmation}
              </code>{" "}
              to confirm:
            </p>
            <input
              type="text"
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              placeholder={requireTypedConfirmation}
              className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAFA] border border-gray-200 text-sm text-[#1A1A1A] placeholder:text-gray-300 focus:outline-none focus:border-[#EF4444] focus:ring-1 focus:ring-[#EF4444] transition-all font-mono"
              autoFocus
            />
          </div>
        )}

        {/* Countdown progress bar */}
        {countdownSeconds && countdown > 0 && (
          <div className="px-7 mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-[#7C7C7C]">
                Auto-completing in {countdown}s
              </span>
            </div>
            <div className="h-1 rounded-full bg-black/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${(countdown / countdownSeconds) * 100}%`,
                  backgroundColor: style.countdownColor,
                }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 px-7 pt-6 pb-7">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-[#4A4A4A] bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-all disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmBtnRef}
            onClick={() => {
              if (canConfirm && !loading) {
                onConfirm();
              }
            }}
            disabled={!canConfirm || loading}
            className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all ${style.confirmBg} ${style.confirmShadow} disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
