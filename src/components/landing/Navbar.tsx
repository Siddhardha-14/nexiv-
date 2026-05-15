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
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-[80px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#FF4B3A] shadow-md shadow-orange-200 flex items-center justify-center font-extrabold text-white text-lg transition-transform group-hover:scale-105">
            N
          </div>
          <span className="text-xl font-bold text-[#1A1A1A] tracking-tight">
            Nexiv
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 text-[15px] font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-[#575757] hover:text-[#1A1A1A] transition-all duration-200 text-[15px] font-semibold px-2"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="btn-primary text-[14px] py-2.5 px-6 rounded-full shadow-orange-100 inline-flex items-center"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#1A1A1A] transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-xl overflow-hidden transition-all duration-300 absolute w-full ${
          mobileOpen ? "max-h-[400px] border-b border-gray-100" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[#4A4A4A] hover:text-[#FF4B3A] font-medium transition-colors py-2 border-b border-gray-50"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/auth/login"
              className="btn-secondary text-center text-sm py-3"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="btn-primary text-center text-sm py-3"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
