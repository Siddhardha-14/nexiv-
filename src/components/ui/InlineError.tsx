"use client";

interface InlineErrorProps {
  message: string;
  show: boolean;
}

export default function InlineError({ message, show }: InlineErrorProps) {
  if (!show || !message) return null;

  return (
    <div
      className="flex items-center gap-1.5 mt-1.5 animate-slide-down"
      role="alert"
      aria-live="polite"
    >
      <svg
        className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-[12px] font-medium text-[#EF4444] leading-tight">
        {message}
      </span>
    </div>
  );
}

interface InlineSuccessProps {
  message?: string;
  show: boolean;
}

export function InlineSuccess({ message = "Looks good", show }: InlineSuccessProps) {
  if (!show) return null;

  return (
    <div
      className="flex items-center gap-1.5 mt-1.5 animate-slide-down"
      role="status"
    >
      <svg
        className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span className="text-[12px] font-medium text-[#10B981] leading-tight">
        {message}
      </span>
    </div>
  );
}

interface InlineWarningProps {
  message: string;
  show: boolean;
  /** If set, clicking the message triggers this action (e.g., auto-correct email typo) */
  onAction?: () => void;
  actionLabel?: string;
}

export function InlineWarning({ message, show, onAction, actionLabel }: InlineWarningProps) {
  if (!show || !message) return null;

  return (
    <div
      className="flex items-center gap-1.5 mt-1.5 animate-slide-down"
      role="status"
    >
      <svg
        className="w-3.5 h-3.5 text-[#F59E0B] flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span className="text-[12px] font-medium text-[#F59E0B] leading-tight">
        {message}
      </span>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="text-[12px] font-bold text-[#F59E0B] hover:text-[#D97706] underline underline-offset-2 transition-colors ml-0.5"
        >
          {actionLabel || "Fix"}
        </button>
      )}
    </div>
  );
}

interface InlineHintProps {
  message: string;
  show: boolean;
}

export function InlineHint({ message, show }: InlineHintProps) {
  if (!show || !message) return null;

  return (
    <div
      className="flex items-center gap-1.5 mt-1.5 animate-slide-down"
      role="note"
    >
      <svg
        className="w-3.5 h-3.5 text-[#A1A1A1] flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-[12px] font-medium text-[#A1A1A1] leading-tight">
        {message}
      </span>
    </div>
  );
}

