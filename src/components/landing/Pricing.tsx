"use client";

import { useState } from "react";
import { pricingPlans } from "@/data/siteData";
import Link from "next/link";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative section-padding overflow-hidden bg-[#FFFDFB]">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-md bg-[#FFECE8] text-[#FF4B3A] text-xs font-bold uppercase tracking-wider mb-3">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight text-[#1A1A1A]">
            Invest in Your <span className="text-[#FF4B3A]">Engineering Career</span>
          </h2>
          <p className="text-[#575757] max-w-2xl mx-auto text-lg leading-relaxed font-medium mb-10">
            Start free, upgrade when you're ready. Cancel anytime.
          </p>

          {/* Toggle Pill */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-[#F5F5F5] border border-gray-100">
            <button
              onClick={() => setYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                !yearly
                  ? "bg-white text-[#FF4B3A] shadow-md shadow-gray-200/50"
                  : "text-[#575757] hover:text-[#1A1A1A]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                yearly
                  ? "bg-white text-[#FF4B3A] shadow-md shadow-gray-200/50"
                  : "text-[#575757] hover:text-[#1A1A1A]"
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-[#FFF3E3] text-[#FF4B3A] text-[9px] font-black uppercase">
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
              className={`relative rounded-[40px] p-10 transition-all duration-500 transform hover:-translate-y-2 ${
                plan.highlighted
                  ? "bg-[#1A1A1A] text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]"
                  : "bg-white border border-gray-100 text-[#1A1A1A] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)]"
              }`}
            >

              {/* Popular Badge */}
              {plan.highlighted && (
                <div
                  className="absolute -top-3 right-10 px-4 py-1.5 rounded-full bg-[#FF4B3A] text-white text-[10px] font-black uppercase tracking-wider shadow-md"
                >
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3 className={`text-2xl font-black mb-2 ${plan.highlighted ? "text-white" : "text-[#1A1A1A]"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-8 font-medium ${plan.highlighted ? "text-gray-400" : "text-[#666666]"}`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="flex items-end gap-2 mb-8">
                <span className={`text-5xl font-black tracking-tight ${plan.highlighted ? "text-white" : "text-[#1A1A1A]"}`}>
                  {plan.name === "Free"
                    ? "₹0"
                    : yearly
                    ? "₹4,999"
                    : plan.price}
                </span>
                <span className={`text-sm font-bold mb-2 ${plan.highlighted ? "text-gray-400" : "text-[#8C8C8C]"}`}>
                  {plan.name === "Free"
                    ? "/forever"
                    : yearly
                    ? "/year"
                    : plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.highlighted ? "bg-gray-800" : "bg-[#FFF3E3]"
                    }`}>
                      <svg
                        className={`w-3.5 h-3.5 ${plan.highlighted ? "text-[#FF4B3A]" : "text-[#FF4B3A]"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className={plan.highlighted ? "text-gray-200" : "text-[#4A4A4A]"}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/auth/signup"
                className={`block text-center py-4 px-8 rounded-full font-black text-[15px] transition-all duration-300 w-full ${
                  plan.highlighted
                    ? "bg-[#FF4B3A] text-white hover:bg-[#FF6252] shadow-[0_10px_25px_rgba(255,75,58,0.3)]"
                    : "bg-[#1A1A1A] text-white hover:bg-[#333] shadow-md"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-xs font-medium text-[#8C8C8C] mt-12">
          No credit card required for free plan. Pro plan includes 14-day free trial.
        </p>
      </div>
    </section>
  );
}
