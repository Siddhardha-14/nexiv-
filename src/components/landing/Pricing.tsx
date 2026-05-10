"use client";

import { useState } from "react";
import { pricingPlans } from "@/data/siteData";
import Link from "next/link";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative section-padding overflow-hidden bg-background">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label justify-center">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight text-foreground">
            Invest in Your{" "}
            <span className="text-[#2563EB]">Engineering Career</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            Start free, upgrade when you&apos;re ready. Cancel anytime.
          </p>

          {/* Toggle Pill */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-muted border border-border">
            <button
              onClick={() => setYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                !yearly
                  ? "bg-card text-[#2563EB] shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                yearly
                  ? "bg-card text-[#2563EB] shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-[10px] font-bold uppercase">
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
              className={`relative rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-1 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white shadow-2xl shadow-[#2563EB]/20 border border-[#334155]"
                  : "bg-card border border-border text-foreground shadow-md hover:shadow-xl"
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 right-8 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlighted ? "text-gray-400" : "text-muted-foreground"}`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="flex items-end gap-2 mb-8">
                <span className={`text-4xl font-bold tracking-tight ${plan.highlighted ? "text-white" : "text-foreground"}`}>
                  {plan.name === "Free"
                    ? "₹0"
                    : yearly
                    ? "₹4,999"
                    : plan.price}
                </span>
                <span className={`text-sm font-medium mb-1 ${plan.highlighted ? "text-gray-400" : "text-muted-foreground"}`}>
                  {plan.name === "Free"
                    ? "/forever"
                    : yearly
                    ? "/year"
                    : plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className={`size-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.highlighted ? "bg-[#2563EB]/20" : "bg-[#0D9488]/10"
                    }`}>
                      <svg
                        className={`size-3 ${plan.highlighted ? "text-[#3B82F6]" : "text-[#0D9488]"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={plan.highlighted ? "text-gray-300" : "text-muted-foreground"}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/auth/signup"
                className={`block text-center py-3.5 px-8 rounded-full font-semibold text-sm transition-all duration-300 w-full ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white hover:opacity-90 shadow-lg shadow-[#2563EB]/30"
                    : "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-md"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          No credit card required for free plan. Pro plan includes 14-day free trial.
        </p>
      </div>
    </section>
  );
}
