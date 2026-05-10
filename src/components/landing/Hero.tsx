"use client";

import Link from "next/link";
import Image from "next/image";
import { stats } from "@/data/siteData";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-[100px] pb-20 overflow-hidden bg-background">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-[#2563EB]/5 via-[#0D9488]/5 to-transparent rounded-l-[120px] hidden lg:block" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#F97316]/5 to-transparent rounded-r-[120px] hidden lg:block" />
      </div>
      
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Content */}
        <div className="text-left max-w-xl mx-auto lg:mx-0 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-xs font-semibold text-[#2563EB] mb-6">
            <span className="flex size-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-[#2563EB]"></span>
            </span>
            Enrollment Open for 2026
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.1] text-foreground mb-6">
            Learn with{" "}
            <span className="text-[#2563EB]">experts</span>
            <br className="hidden sm:block" />
            anywhere,{" "}
            <span className="relative inline-block text-[#0D9488]">
              anytime.
              <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[#0D9488]/30 -z-10" viewBox="0 0 200 9" fill="none">
                <path d="M2.0002 7.00003C33.3335 2.33336 99.2002 -1.39997 198 7.00003" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-[480px]">
            Master in-demand skills with industry experts. Build real projects, earn certifications, and accelerate your engineering career.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/auth/signup">
              <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-6 px-10 text-base font-semibold rounded-full shadow-lg shadow-[#2563EB]/25 transition-all">
                Start Learning Free
              </Button>
            </Link>
            <a
              href="#tracks"
              className="inline-flex items-center gap-3 font-semibold text-foreground hover:text-[#2563EB] transition-colors py-4 px-6"
            >
              <div className="size-12 rounded-full bg-card border border-border shadow-md flex items-center justify-center">
                <svg className="size-5 translate-x-0.5 text-[#F97316]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              Watch Demo
            </a>
          </div>

          {/* Mini Stats Container */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
             {stats.slice(0, 3).map((stat, i) => (
               <div key={i} className="flex flex-col">
                 <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                 <span className="text-sm text-muted-foreground">{stat.label}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Right Column: Visual Illustration Area */}
        <div className="relative flex items-center justify-center lg:h-[600px] w-full animate-fade-in">
          {/* Main Image Card Container */}
          <div className="relative z-20 bg-card p-4 rounded-[32px] shadow-2xl shadow-[#2563EB]/10 w-[90%] aspect-square md:w-[480px] md:h-[480px] flex items-center justify-center overflow-hidden border border-border">
             <Image 
               src="/images/auth_illustration.png" 
               alt="Premium education visual" 
               fill 
               className="object-cover p-6"
               priority
             />
          </div>

          {/* Floating Badge - Top Left */}
          <div className="absolute top-8 left-[5%] md:-left-4 bg-card p-4 rounded-2xl shadow-xl border border-border flex items-center gap-3 z-30 animate-bounce-slow">
             <div className="size-11 rounded-xl bg-[#0D9488]/10 flex items-center justify-center text-[#0D9488]">
                <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
             </div>
             <div>
               <p className="text-sm font-bold text-foreground">Expert Instructors</p>
               <p className="text-xs text-muted-foreground">Industry Professionals</p>
             </div>
          </div>

          {/* Floating Badge - Bottom Right */}
          <div className="absolute bottom-10 right-[5%] md:-right-6 bg-card p-4 rounded-2xl shadow-xl border border-border flex items-center gap-4 z-30 animate-bounce-slow" style={{ animationDelay: "1s" }}>
             <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="size-9 rounded-full border-2 border-card bg-gradient-to-br from-[#2563EB] to-[#0D9488] flex items-center justify-center text-xs font-bold text-white">
                   <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                   </svg>
                 </div>
               ))}
             </div>
             <div>
               <p className="text-sm font-bold text-foreground">2K+ Enrolled</p>
               <div className="flex text-[#F97316] text-xs">
                 {[1,2,3,4,5].map(j => <span key={j}>&#9733;</span>)}
               </div>
             </div>
          </div>
          
          {/* Background Gradient Circles */}
          <div className="absolute -z-10 size-64 bg-[#2563EB]/10 rounded-full blur-3xl top-10 right-10" />
          <div className="absolute -z-10 size-48 bg-[#0D9488]/10 rounded-full blur-3xl bottom-20 left-10" />
        </div>
      </div>
    </section>
  );
}
