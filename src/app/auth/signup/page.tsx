"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "mentor">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    router.push("/dashboard");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* Left Side: Illustration Area */}
      <div className="hidden lg:flex flex-1 relative bg-[#FF4B3A]/5 dark:bg-[#FF4B3A]/10 p-12 flex-col justify-center items-center overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute top-[-10%] right-[-10%] size-[500px] bg-[#FF4B3A]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] size-[400px] bg-[#FF4B3A]/10 rounded-full blur-3xl" />
        
        {/* Top Left Logo */}
        <div className="absolute top-12 left-12 flex items-center gap-2.5 z-10">
          <div className="size-10 bg-[#FF4B3A] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#FF4B3A]/30">
            N
          </div>
          <span className="text-2xl font-bold text-foreground tracking-tight">Nexiv</span>
        </div>

        {/* Theme Toggle */}
        <div className="absolute top-12 right-12 z-10">
          <ThemeToggle />
        </div>

        <div className="relative w-[85%] h-[70%] animate-fade-in">
          <Image 
            src="/images/auth_illustration.png" 
            alt="Student illustration" 
            fill
            priority
            className="object-contain"
          />
        </div>
        
        {/* Bottom text */}
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-lg font-medium text-foreground/80 max-w-md">
            Start your journey today. Build real-world projects and showcase your skills.
          </p>
        </div>
      </div>

      {/* Right Side: Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-background overflow-y-auto relative">
        {/* Mobile Theme Toggle */}
        <div className="absolute top-6 right-6 lg:hidden">
          <ThemeToggle />
        </div>

        <Card className="w-full max-w-[440px] border-0 shadow-none bg-transparent">
          <CardHeader className="px-0">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2 mb-6 justify-center">
              <div className="size-9 bg-[#FF4B3A] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#FF4B3A]/30">
                N
              </div>
              <span className="text-xl font-bold text-foreground">Nexiv</span>
            </div>

            <CardTitle className="text-3xl font-bold tracking-tight">Sign up</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {"Already have an account? "}
              <Link href="/auth/login" className="text-[#FF4B3A] font-semibold hover:underline">
                Login here
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0">
            {/* Role Switcher */}
            <div className="flex bg-secondary p-1.5 rounded-full w-fit mb-6">
              <button 
                type="button"
                onClick={() => setRole("student")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  role === "student" 
                    ? "bg-card text-[#FF4B3A] shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Student
              </button>
              <button 
                type="button"
                onClick={() => setRole("mentor")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  role === "mentor" 
                    ? "bg-card text-[#FF4B3A] shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Mentor
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Username</Label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your username"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 h-12 bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-secondary/50 border-border/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file">Upload Resume/Portfolio (Optional)</Label>
                <div className="relative">
                  <input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("file")?.click()}
                    className="w-full h-12 justify-start gap-3 bg-secondary/50 border-border/50 hover:bg-secondary text-muted-foreground"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {selectedFile ? selectedFile.name : "Choose a file to upload"}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#FF4B3A] hover:bg-[#E33A2B] text-white font-bold rounded-xl shadow-lg shadow-[#FF4B3A]/30 mt-4"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : "Register"}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              By registering, you agree to the{" "}
              <span className="font-medium text-foreground cursor-pointer hover:underline">Terms of Service</span>
              {" "}and{" "}
              <span className="font-medium text-foreground cursor-pointer hover:underline">Privacy Policy</span>.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
