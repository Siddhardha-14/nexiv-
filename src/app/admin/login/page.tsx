"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1500));

    if (email === "admin@nexiv.com" && password === "admin123") {
      router.push("/admin");
    } else {
      setError("Invalid credentials. Admin access only.");
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background font-sans">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden border-r border-border bg-card">
        {/* Subtle Geometric Design */}
        <div className="absolute top-[-20%] right-[-20%] size-[600px] bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] size-[400px] bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo & Theme Toggle */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="size-12 rounded-2xl bg-[#2563EB] flex items-center justify-center font-bold text-white text-2xl shadow-lg shadow-[#2563EB]/30 transition-transform group-hover:scale-105 duration-300">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-foreground leading-none">
                  Nexiv
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2563EB] leading-none mt-1.5">
                  Administration
                </span>
              </div>
            </Link>
            <ThemeToggle />
          </div>

          {/* Hero Copy */}
          <div className="mt-auto mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-6">
              <span className="size-2 bg-[#2563EB] rounded-full animate-pulse"/>
              Secure Gateway
            </div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight leading-[1.1] text-foreground">
              Control the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#0D9488]">Ecosystem.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Enter the Command Center to oversee mentorship workflows, review project submittals, and drive institutional performance.
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="size-2 rounded-full bg-green-500" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-background relative">
        {/* Mobile Theme Toggle */}
        <div className="absolute top-6 right-6 lg:hidden">
          <ThemeToggle />
        </div>

        <Card className="w-full max-w-[400px] mx-auto bg-card border border-border shadow-xl">
          <CardHeader>
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="size-11 rounded-xl bg-[#2563EB] flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-[#2563EB]/30">
                  N
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-2xl font-bold tracking-tight text-foreground leading-none">Nexiv</span>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#2563EB] mt-1">Admin</span>
                </div>
              </Link>
            </div>

            <CardTitle className="text-2xl font-bold tracking-tight text-center lg:text-left">Access Portal</CardTitle>
            <CardDescription className="text-center lg:text-left">
              Authenticate to access administrator tools.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Error message */}
            {error && (
              <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
                <svg className="size-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="admin-email">Corporate Identity</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexiv.com"
                  required
                  className="h-12 bg-secondary/50 border-border/50"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="admin-password">Access Code</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-12 bg-secondary/50 border-border/50 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="admin-file">Upload Credentials File (Optional)</Label>
                <div className="relative">
                  <input
                    id="admin-file"
                    type="file"
                    accept=".pdf,.doc,.docx,.json"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("admin-file")?.click()}
                    className="w-full h-12 justify-start gap-3 bg-secondary/50 border-border/50 hover:bg-secondary text-muted-foreground"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {selectedFile ? selectedFile.name : "Choose credentials file"}
                  </Button>
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-xl shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Authorizing...
                  </span>
                ) : (
                  "Enter Command Center"
                )}
              </Button>
            </form>

            {/* User login redirect */}
            <div className="mt-6 text-center border-t border-border pt-6">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-[#2563EB] transition-colors font-semibold"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Student Portal
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
