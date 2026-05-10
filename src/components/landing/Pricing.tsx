"use client";

import { useState } from "react";
import { pricingPlans } from "@/data/siteData";
import Link from "next/link";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative section-padding overflow-hidden bg-[var(--bg-primary)]">

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label justify-center">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Invest in Your <span className="text-[var(--text-primary)]">Engineering Career</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            Start free, upgrade when you&apos;re ready. Cancel anytime.
          </p>

          {/* Toggle — smoother pill */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full border border-white/[0.06] bg-[var(--bg-surface)]/60 backdrop-blur-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-400 ${
                !yearly
                  ? "bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-400 flex items-center gap-2 ${
                yearly
                  ? "bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Yearly
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-8 transition-all duration-400 ${
                plan.highlighted
                  ? "border-2 border-[var(--border-subtle)] bg-[var(--bg-secondary)] shadow-sm"
                  : "border border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)]"
              }`}
            >

              {/* Popular Badge */}
              {plan.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-[10px] font-bold uppercase tracking-wider shadow-sm"
                >
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 relative z-10">
                {plan.name}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6 relative z-10">
                {plan.description}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-8 relative z-10">
                <span className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  {plan.name === "Free"
                    ? "₹0"
                    : yearly
                    ? "₹4,999"
                    : plan.price}
                </span>
                <span className="text-[var(--text-muted)] text-sm mb-2">
                  {plan.name === "Free"
                    ? "/forever"
                    : yearly
                    ? "/year"
                    : plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3.5 mb-8 relative z-10">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
                  >
                    <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                      <svg
                        className="w-3 h-3 text-[var(--text-primary)]"
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
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/auth/signup"
                className={`block text-center py-3.5 px-6 rounded-md font-semibold text-sm transition-all duration-300 relative z-10 ${
                  plan.highlighted
                    ? "bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] w-full"
                    : "bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] w-full"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-xs text-[var(--text-muted)] mt-10">
          No credit card required for free plan. Pro plan includes 14-day free trial.
        </p>
      </div>
    </section>
  );
}
