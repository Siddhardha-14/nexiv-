"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Tracks", href: "#tracks" },
    { label: "Projects", href: "#projects" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-subtle)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >

      <div className="section-container flex items-center justify-between h-[80px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center font-bold text-[var(--text-primary)] text-sm">
            N
          </div>
          <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
            Nexiv
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/[0.04]"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="btn-primary text-sm py-2.5 px-6 rounded-xl inline-flex items-center"
          >
            Get Started
            <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden glass-strong overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 border-t border-[var(--border-subtle)]" : "max-h-0"
        }`}
      >
        <div className="section-container py-4 flex flex-col gap-3">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-2 text-sm font-medium"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-[var(--border-subtle)]">
            <Link
              href="/auth/login"
              className="btn-secondary text-center text-sm py-2.5"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="btn-primary text-center text-sm py-2.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
