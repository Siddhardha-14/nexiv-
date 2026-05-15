"use client";

interface FormProgressProps {
  /** Array of { label, completed } for each field */
  fields: { label: string; completed: boolean }[];
}

export default function FormProgress({ fields }: FormProgressProps) {
  const completed = fields.filter((f) => f.completed).length;
  const total = fields.length;
  const percentage = Math.round((completed / total) * 100);

  if (completed === 0) return null;

  return (
    <div className="animate-slide-down">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-1.5">
        <div className="flex-1 h-1.5 rounded-full bg-black/[0.04] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${percentage}%`,
              backgroundColor: percentage === 100 ? "#10B981" : "#FF4B3A",
            }}
          />
        </div>
        <span
          className="text-[11px] font-bold tabular-nums min-w-[36px] text-right"
          style={{ color: percentage === 100 ? "#10B981" : "#A1A1A1" }}
        >
          {completed}/{total}
        </span>
      </div>
      {/* Field dots */}
      <div className="flex gap-1">
        {fields.map((field, i) => (
          <div
            key={i}
            title={`${field.label}: ${field.completed ? "Complete" : "Incomplete"}`}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: field.completed ? "#10B981" : "rgba(0,0,0,0.08)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
