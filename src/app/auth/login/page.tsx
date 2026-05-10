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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            alt="Student working at desk illustration" 
            fill
            priority
            className="object-contain"
          />
        </div>
        
        {/* Bottom text */}
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-lg font-medium text-foreground/80 max-w-md">
            Join thousands of students building real-world projects and accelerating their careers.
          </p>
        </div>
      </div>

      {/* Right Side: The Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 bg-background relative">
        {/* Mobile Theme Toggle */}
        <div className="absolute top-6 right-6 lg:hidden">
          <ThemeToggle />
        </div>

        <Card className="w-full max-w-[420px] border-0 shadow-none bg-transparent">
          <CardHeader className="px-0">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2 mb-6 justify-center">
              <div className="size-9 bg-[#FF4B3A] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#FF4B3A]/30">
                N
              </div>
              <span className="text-xl font-bold text-foreground">Nexiv</span>
            </div>

            <CardTitle className="text-3xl font-bold tracking-tight">Sign in</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {"If you don't have an account, "}
              <Link href="/auth/signup" className="text-[#FF4B3A] font-semibold hover:underline">
                Register here
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
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

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="size-4 rounded border-border text-[#FF4B3A] focus:ring-[#FF4B3A]" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-muted-foreground hover:text-foreground transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#FF4B3A] hover:bg-[#E33A2B] text-white font-bold rounded-xl shadow-lg shadow-[#FF4B3A]/30"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Logging in...
                  </span>
                ) : "Login"}
              </Button>
            </form>

            {/* Divider & Social logins */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-6 font-medium">or continue with</p>
              <div className="flex justify-center gap-4">
                {/* Facebook */}
                <Button variant="outline" size="icon" className="size-12 rounded-full border-border/50 hover:bg-secondary">
                  <svg className="size-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Button>
                {/* Apple */}
                <Button variant="outline" size="icon" className="size-12 rounded-full border-border/50 hover:bg-secondary">
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2.002-.156-3.25 1.09-4.21 1.09zm2.376-4.649c.831-1.027 1.39-2.454 1.234-3.878-1.22.049-2.702.82-3.585 1.847-.792.91-1.48 2.363-1.299 3.761 1.364.104 2.74-.65 3.65-1.73z" />
                  </svg>
                </Button>
                {/* Google */}
                <Button variant="outline" size="icon" className="size-12 rounded-full border-border/50 hover:bg-secondary">
                  <svg className="size-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/admin/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Administrator Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
