"use client";

import { getPasswordStrength } from "@/hooks/useFormValidation";

interface PasswordStrengthProps {
  password: string;
}

const strengthColors = ["", "#EF4444", "#F59E0B", "#84CC16", "#10B981"];
const strengthBg = ["", "#EF444415", "#F59E0B15", "#84CC1615", "#10B98115"];

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, label, suggestions } = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 animate-slide-down">
      {/* Strength bars */}
      <div className="flex gap-1.5 mb-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                level <= score ? strengthColors[score] : "rgba(0,0,0,0.06)",
            }}
          />
        ))}
      </div>

      {/* Label + hint */}
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] font-bold uppercase tracking-wider"
          style={{ color: strengthColors[score] }}
        >
          {label}
        </span>
        {suggestions.length > 0 && (
          <span className="text-[11px] text-[#7C7C7C]">
            {suggestions[0]}
          </span>
        )}
      </div>
    </div>
  );
}
