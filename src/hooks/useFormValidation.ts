"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────
export interface FieldValidation {
  isValid: boolean;
  message: string;
  touched: boolean;
}

export interface PasswordStrengthResult {
  score: 0 | 1 | 2 | 3 | 4; // 0=none, 1=weak, 2=fair, 3=good, 4=strong
  label: string;
  suggestions: string[];
}

// ─── Validators ──────────────────────────────────────────────

// Common email domain typos → corrections
const EMAIL_DOMAIN_CORRECTIONS: Record<string, string> = {
  "gmail.con": "gmail.com", "gmail.co": "gmail.com", "gamil.com": "gmail.com",
  "gmial.com": "gmail.com", "gmal.com": "gmail.com", "gmaill.com": "gmail.com",
  "yahoo.con": "yahoo.com", "yahooo.com": "yahoo.com",
  "hotmail.con": "hotmail.com", "hotmal.com": "hotmail.com",
  "outlok.com": "outlook.com", "outloo.com": "outlook.com",
  "icloud.con": "icloud.com",
};

export interface EmailValidationResult extends FieldValidation {
  suggestion?: string;
}

export function validateEmail(email: string): EmailValidationResult {
  if (!email) return { isValid: false, message: "", touched: false };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, message: "Please enter a valid email address", touched: true };
  }
  // Check for domain typo
  const domain = email.split("@")[1]?.toLowerCase();
  const correction = domain ? EMAIL_DOMAIN_CORRECTIONS[domain] : undefined;
  if (correction) {
    const correctedEmail = email.split("@")[0] + "@" + correction;
    return { isValid: true, message: "", touched: true, suggestion: correctedEmail };
  }
  return { isValid: true, message: "", touched: true };
}

export function validateFullName(name: string): FieldValidation {
  if (!name || !name.trim()) return { isValid: false, message: "Full name is required", touched: true };
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { isValid: false, message: "Name must be at least 2 characters", touched: true };
  }
  if (trimmed.length > 100) {
    return { isValid: false, message: "Name must be 100 characters or fewer", touched: true };
  }
  if (/^\d+$/.test(trimmed)) {
    return { isValid: false, message: "Name cannot be only numbers", touched: true };
  }
  return { isValid: true, message: "", touched: true };
}

export function validateUsername(username: string): FieldValidation {
  if (!username) return { isValid: false, message: "", touched: false };
  if (username.length < 3) {
    return { isValid: false, message: "Username must be at least 3 characters", touched: true };
  }
  if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
    return { isValid: false, message: "Only letters, numbers, underscores, dots, and hyphens allowed", touched: true };
  }
  if (username.length > 30) {
    return { isValid: false, message: "Username must be 30 characters or fewer", touched: true };
  }
  return { isValid: true, message: "", touched: true };
}

export function validatePassword(password: string): FieldValidation {
  if (!password) return { isValid: false, message: "", touched: false };
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters", touched: true };
  }
  return { isValid: true, message: "", touched: true };
}

export function validatePasswordMatch(password: string, confirm: string): FieldValidation {
  if (!confirm) return { isValid: false, message: "", touched: false };
  if (password !== confirm) {
    return { isValid: false, message: "Passwords do not match", touched: true };
  }
  return { isValid: true, message: "", touched: true };
}

export function validateUrl(url: string): FieldValidation {
  if (!url) return { isValid: false, message: "URL is required", touched: true };
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { isValid: false, message: "URL must start with http:// or https://", touched: true };
    }
    return { isValid: true, message: "", touched: true };
  } catch {
    return { isValid: false, message: "Please enter a valid URL", touched: true };
  }
}

export function validateGithubUrl(url: string): FieldValidation {
  if (!url || !url.trim()) return { isValid: false, message: "GitHub repository URL is required", touched: true };
  try {
    const raw = url.trim();
    // Prepend https if missing to allow friendly parser recovery
    const completeUrl = raw.startsWith("http") ? raw : `https://${raw}`;
    const parsed = new URL(completeUrl);
    if (!parsed.hostname.toLowerCase().includes("github.com")) {
      return { isValid: false, message: "Link must be hosted on github.com", touched: true };
    }
    const segments = parsed.pathname.split("/").filter(Boolean);
    if (segments.length < 2) {
      return { isValid: false, message: "Please include username/repository segment", touched: true };
    }
    return { isValid: true, message: "", touched: true };
  } catch {
    return { isValid: false, message: "Format not recognized as a valid URL", touched: true };
  }
}

export function validateScore(score: number): FieldValidation {
  if (isNaN(score)) return { isValid: false, message: "Score must be a number", touched: true };
  if (!Number.isInteger(score)) return { isValid: false, message: "Score must be a whole number", touched: true };
  if (score < 0 || score > 100) return { isValid: false, message: "Score must be between 0 and 100", touched: true };
  return { isValid: true, message: "", touched: true };
}

export function getPasswordStrength(password: string): PasswordStrengthResult {
  if (!password) return { score: 0, label: "", suggestions: [] };

  let score = 0;
  const suggestions: string[] = [];

  if (password.length >= 8) score++;
  else suggestions.push("Use at least 8 characters");

  if (/[A-Z]/.test(password)) score++;
  else suggestions.push("Add an uppercase letter");

  if (/[0-9]/.test(password)) score++;
  else suggestions.push("Add a number");

  if (/[^a-zA-Z0-9]/.test(password)) score++;
  else suggestions.push("Add a special character (!@#$%)");

  const labels = ["", "Weak", "Fair", "Good", "Strong"] as const;
  return {
    score: Math.min(score, 4) as 0 | 1 | 2 | 3 | 4,
    label: labels[Math.min(score, 4)],
    suggestions,
  };
}

// ─── Hook ────────────────────────────────────────────────────

export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, FieldValidation>>({});
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // Cleanup debounce timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  const validateField = useCallback(
    (fieldName: string, validator: () => FieldValidation, delay = 300) => {
      // Clear any existing timer for this field
      if (debounceTimers.current[fieldName]) {
        clearTimeout(debounceTimers.current[fieldName]);
      }

      debounceTimers.current[fieldName] = setTimeout(() => {
        const result = validator();
        setErrors((prev) => ({ ...prev, [fieldName]: result }));
      }, delay);
    },
    []
  );

  const validateFieldImmediate = useCallback(
    (fieldName: string, validator: () => FieldValidation) => {
      const result = validator();
      setErrors((prev) => ({ ...prev, [fieldName]: result }));
      return result;
    },
    []
  );

  const clearField = useCallback((fieldName: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  }, []);

  const getFieldState = useCallback(
    (fieldName: string): FieldValidation => {
      return errors[fieldName] || { isValid: false, message: "", touched: false };
    },
    [errors]
  );

  const setFieldState = useCallback(
    (fieldName: string, state: FieldValidation) => {
      setErrors((prev) => ({ ...prev, [fieldName]: state }));
    },
    []
  );

  const isFormValid = useCallback(
    (requiredFields: string[]): boolean => {
      return requiredFields.every(
        (field) => errors[field]?.isValid === true && errors[field]?.touched === true
      );
    },
    [errors]
  );

  return {
    errors,
    validateField,
    validateFieldImmediate,
    clearField,
    getFieldState,
    setFieldState,
    isFormValid,
  };
}
