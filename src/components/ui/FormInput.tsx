import React, { InputHTMLAttributes } from 'react';
import InlineError, { InlineWarning } from '@/components/ui/InlineError';

type FormInputProps = {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  suggestion?: string | null;
  onSuggestionApply?: () => void;
  error?: string | null;
};

export default function FormInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  autoComplete,
  suggestion,
  onSuggestionApply,
  error,
}: FormInputProps) {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-bold text-[var(--text-primary)] mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`w-full input-field ${suggestion ? 'input-warning' : ''} ${error ? 'input-error' : ''}`}
      />
      {error && <InlineError message={error} show={true} />}
      {suggestion && onSuggestionApply && (
        <InlineWarning
          message={`Did you mean ${suggestion}?`}
          show={true}
          onAction={onSuggestionApply}
          actionLabel="Yes, fix it"
        />
      )}
    </div>
  );
}
