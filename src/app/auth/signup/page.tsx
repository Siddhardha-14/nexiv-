"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "mentor">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-[#1A1A1A]">
      {/* Left Side: Illustration Area */}
      <div className="hidden lg:flex flex-1 relative bg-[#FFF3E3] p-12 flex-col justify-center items-center overflow-hidden">
        {/* Top Left Logo */}
        <div className="absolute top-12 left-12 flex items-center gap-2 z-10">
          <div className="w-10 h-10 bg-[#FF4B3A] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            N
          </div>
          <span className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Nexiv</span>
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
      </div>

      {/* Right Side: Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-white overflow-y-auto">
        <div className="w-full max-w-[440px] px-4 py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10 justify-center">
            <div className="w-9 h-9 bg-[#FF4B3A] rounded-xl flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
            <span className="text-xl font-bold text-[#1A1A1A]">Nexiv</span>
          </div>

          <div className="mb-8 text-left">
            <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3 tracking-tight">Sign up</h1>
            <p className="text-[#4A4A4A] text-[15px]">
              If you already have an account register <br className="hidden sm:block" />
              You can <Link href="/auth/login" className="text-[#FF4B3A] font-bold hover:underline">Login here !</Link>
            </p>
          </div>

          {/* Compact Role Switcher */}
          <div className="flex bg-[#F8F8F8] p-1.5 rounded-full w-fit mb-8">
            <button 
              type="button"
              onClick={() => setRole("student")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${role === "student" ? "bg-white text-[#FF4B3A] shadow-sm" : "text-[#7C7C7C]"}`}
            >
              Student
            </button>
            <button 
              type="button"
              onClick={() => setRole("mentor")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${role === "mentor" ? "bg-white text-[#FF4B3A] shadow-sm" : "text-[#7C7C7C]"}`}
            >
              Mentor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#1A1A1A]" htmlFor="email">Email</label>
              <div className="relative flex items-center">
                <span className="absolute left-0 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-underline pl-8 w-full placeholder:text-[#A1A1A1]/70 border-[#FF4B3A]"
                />
              </div>
            </div>

            {/* Full Name / Username */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#1A1A1A]" htmlFor="fullName">Username</label>
              <div className="relative flex items-center">
                <span className="absolute left-0 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your User name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-underline pl-8 w-full placeholder:text-[#A1A1A1]/70"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#1A1A1A]" htmlFor="password">Password</label>
              <div className="relative flex items-center">
                <span className="absolute left-0 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-underline pl-8 pr-8 w-full placeholder:text-[#A1A1A1]/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-[#1A1A1A]" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative flex items-center">
                <span className="absolute left-0 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-underline pl-8 pr-8 w-full placeholder:text-[#A1A1A1]/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#FF4B3A] text-white font-bold rounded-2xl shadow-[0_8px_25px_rgba(255,75,58,0.3)] hover:shadow-[0_12px_30px_rgba(255,75,58,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-[16px]"
              >
                {isLoading ? "Creating Account..." : "Register"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-xs text-[#7C7C7C]">
             By registering, you agree to the <span className="font-medium text-[#1A1A1A] cursor-pointer hover:underline">Terms of Service</span> and <span className="font-medium text-[#1A1A1A] cursor-pointer hover:underline">Privacy Policy</span>.
          </div>
        </div>
      </div>
    </div>
  );
}
