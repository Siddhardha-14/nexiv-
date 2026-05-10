"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

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
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-[80px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-9 rounded-xl bg-[#FF4B3A] shadow-md shadow-[#FF4B3A]/20 flex items-center justify-center font-extrabold text-white text-lg transition-transform group-hover:scale-105">
            N
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            Nexiv
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-[#FF4B3A] transition-colors duration-200 text-[15px] font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-semibold">
              Log in
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-[#FF4B3A] hover:bg-[#E33A2B] text-white font-semibold rounded-full px-6 shadow-lg shadow-[#FF4B3A]/20">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-card shadow-xl overflow-hidden transition-all duration-300 absolute w-full ${
          mobileOpen ? "max-h-[400px] border-b border-border" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-muted-foreground hover:text-[#FF4B3A] font-medium transition-colors py-2 border-b border-border/50"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[#FF4B3A] hover:bg-[#E33A2B] text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
