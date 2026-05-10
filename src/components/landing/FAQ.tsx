"use client";

import { useState } from "react";
import { faqData } from "@/data/siteData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative section-padding overflow-hidden bg-[var(--bg-primary)]">

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label justify-center">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Frequently Asked <span className="text-[var(--text-primary)]">Questions</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
            Everything you need to know about Nexiv. Can&apos;t find what you&apos;re
            looking for? Reach out to our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`rounded-md border transition-all duration-400 overflow-hidden ${
                openIndex === index
                  ? "border-[var(--text-primary)] bg-[var(--bg-secondary)]"
                  : "border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:bg-[var(--bg-elevated)]"
              }`}
            >
              <div className="relative">

                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full px-7 py-5 flex items-center justify-between text-left"
                >
                  <span
                    className={`text-sm md:text-[15px] font-medium pr-4 transition-colors duration-300 ${
                      openIndex === index
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center transition-all duration-400 ${
                      openIndex === index
                        ? "bg-[var(--bg-elevated)] rotate-180 border border-[var(--border-subtle)]"
                        : "bg-[var(--bg-secondary)] border border-[var(--border-subtle)]"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 text-[var(--text-primary)] transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    openIndex === index ? "max-h-60" : "max-h-0"
                  }`}
                >
                  <p className="px-7 pb-6 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
