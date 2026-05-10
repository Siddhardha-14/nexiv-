"use client";

import Link from "next/link";
import Image from "next/image";
import { stats } from "@/data/siteData";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-[100px] pb-20 overflow-hidden bg-background">
      {/* Subtle Background Texture/Shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-[#FF4B3A]/5 dark:bg-[#FF4B3A]/10 rounded-l-[120px] -z-10 hidden lg:block" />
      
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Content */}
        <div className="text-left max-w-xl mx-auto lg:mx-0 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF4B3A]/10 border border-[#FF4B3A]/20 text-xs font-bold text-[#FF4B3A] mb-6">
            <span className="flex size-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4B3A] opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-[#FF4B3A]"></span>
            </span>
            Enrollment Open for 2026
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black tracking-tight leading-[1.1] text-foreground mb-6">
            Learn with us <br className="hidden sm:block" />
            anywhere <br className="hidden sm:block" />
            <span className="text-[#FF4B3A] relative inline-block">
              anytime.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FF4B3A]/30 -z-10" viewBox="0 0 200 9" fill="none">
                <path d="M2.0002 7.00003C33.3335 2.33336 99.2002 -1.39997 198 7.00003" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="text-[17px] text-muted-foreground mb-10 leading-relaxed font-medium max-w-[460px]">
            Discover a wide range of courses covering various subjects, from technology to languages, taught by experts from around the world.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/auth/signup">
              <Button className="bg-[#FF4B3A] hover:bg-[#E33A2B] text-white py-6 px-10 text-base font-bold rounded-full shadow-lg shadow-[#FF4B3A]/30">
                Join for Free
              </Button>
            </Link>
            <a
              href="#tracks"
              className="inline-flex items-center gap-3 font-bold text-foreground hover:text-[#FF4B3A] transition-colors py-4 px-6"
            >
              <div className="size-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center">
                <svg className="size-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              Watch Demo
            </a>
          </div>

          {/* Mini Stats Container */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
             {stats.slice(0, 3).map((stat, i) => (
               <div key={i} className="flex flex-col">
                 <span className="text-2xl font-black text-foreground">{stat.value}</span>
                 <span className="text-[13px] font-medium text-muted-foreground">{stat.label}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Right Column: Visual Illustration Area */}
        <div className="relative flex items-center justify-center lg:h-[600px] w-full animate-fade-in delay-200">
          {/* Main Image Card Container */}
          <div className="relative z-20 bg-card p-4 rounded-[40px] shadow-2xl shadow-[#FF4B3A]/10 w-[90%] aspect-square md:w-[500px] md:h-[500px] flex items-center justify-center overflow-hidden border border-border">
             <Image 
               src="/images/auth_illustration.png" 
               alt="Premium education visual" 
               fill 
               className="object-cover p-8"
               priority
             />
          </div>

          {/* Floating Badges for dynamic UI feel */}
          <div className="absolute top-10 left-[5%] md:-left-4 bg-card p-4 rounded-2xl shadow-xl border border-border flex items-center gap-3 z-30 animate-bounce-slow">
             <div className="size-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
             </div>
             <div>
               <p className="text-sm font-black text-foreground">Professional Courses</p>
               <p className="text-xs font-medium text-muted-foreground">Expert Instructors</p>
             </div>
          </div>

          <div className="absolute bottom-12 right-[5%] md:-right-6 bg-card p-4 rounded-2xl shadow-xl border border-border flex items-center gap-4 z-30 animate-bounce-slow" style={{ animationDelay: "1s" }}>
             <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="size-9 rounded-full border-2 border-card bg-[#FF4B3A]/20 flex items-center justify-center text-xs font-bold text-[#FF4B3A]">
                   <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                   </svg>
                 </div>
               ))}
             </div>
             <div>
               <p className="text-sm font-black text-foreground">2K+ Enrolled</p>
               <div className="flex text-yellow-400 text-xs">
                 {[1,2,3,4,5].map(j => <span key={j}>&#9733;</span>)}
               </div>
             </div>
          </div>
          
          {/* Circles in Bg for extra pop */}
          <div className="absolute -z-10 size-64 bg-[#FF4B3A]/10 rounded-full blur-3xl top-20 right-20" />
        </div>
      </div>
    </section>
  );
}
