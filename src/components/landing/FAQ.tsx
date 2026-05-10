"use client";

import { useState } from "react";
import { faqData } from "@/data/siteData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative section-padding overflow-hidden bg-background">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label justify-center">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight text-foreground">
            Frequently Asked{" "}
            <span className="text-[#2563EB]">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Everything you need to know about Nexiv. Can&apos;t find what you&apos;re
            looking for? Reach out to our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "border-[#2563EB]/30 bg-[#2563EB]/5 shadow-md"
                  : "border-border bg-card hover:bg-muted/50"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span
                  className={`text-sm md:text-base font-medium pr-4 transition-colors duration-300 ${
                    openIndex === index
                      ? "text-[#2563EB]"
                      : "text-foreground"
                  }`}
                >
                  {item.question}
                </span>
                <div
                  className={`flex-shrink-0 size-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? "bg-[#2563EB] rotate-180"
                      : "bg-muted"
                  }`}
                >
                  <svg
                    className={`size-4 transition-colors duration-300 ${
                      openIndex === index ? "text-white" : "text-muted-foreground"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-60" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
