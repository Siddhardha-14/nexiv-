"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const activeProjects = [
  { id: "smart-home-iot", title: "Smart Home Automation System", track: "IoT", progress: 65, deadline: "May 25, 2026", status: "In Progress" },
  { id: "portfolio-builder", title: "Engineering Portfolio Generator", track: "Python", progress: 40, deadline: "Jun 2, 2026", status: "In Progress" },
  { id: "fintech-dashboard", title: "FinTech Analytics Dashboard", track: "UI/UX", progress: 85, deadline: "May 18, 2026", status: "Review" },
];

const recentNotifications = [
  { text: "Mentor approved your RTOS Scheduler submission", time: "2h ago", type: "success" },
  { text: "New project available: ML Data Pipeline", time: "5h ago", type: "info" },
  { text: "Team invite from Rahul for IoT project", time: "1d ago", type: "team" },
];

const trackProgress = [
  { name: "Embedded Systems", progress: 72, color: "#F59E0B" },
  { name: "UI/UX Design", progress: 45, color: "#EC4899" },
  { name: "Python Engineering", progress: 88, color: "#3B82F6" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="relative overflow-hidden border-border/50">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#2563EB]/10 to-transparent z-0" />
        
        <CardContent className="p-8 md:p-10 relative z-10">
          <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-0 mb-4">
            <span className="size-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
            Active Session
          </Badge>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight text-foreground">
            Welcome back, <span className="text-[#2563EB]">Aravind</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg font-medium leading-relaxed">
            You have <span className="font-bold text-foreground">3 active projects</span> and 2 pending reviews. Keep building — your portfolio is growing!
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/dashboard/projects">
              <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold shadow-lg shadow-[#2563EB]/20">
                Continue Project
                <svg className="size-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <Link href="/dashboard/portfolio">
              <Button variant="outline" className="font-bold">
                View Portfolio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Projects Completed", value: "8", icon: "check", change: "+2 this month", color: "#2563EB" },
          { label: "Active Tracks", value: "3", icon: "book", change: "2 in progress", color: "#3B82F6" },
          { label: "Certificates", value: "5", icon: "award", change: "1 pending", color: "#F59E0B" },
          { label: "Portfolio Score", value: "87%", icon: "star", change: "+5% this week", color: "#10B981" },
        ].map((stat, i) => (
          <Card key={i} className="border-border/50 hover:shadow-lg hover:shadow-[#2563EB]/5 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="size-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  {stat.icon === "check" && (
                    <svg className="size-6" style={{ color: stat.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {stat.icon === "book" && (
                    <svg className="size-6" style={{ color: stat.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  {stat.icon === "award" && (
                    <svg className="size-6" style={{ color: stat.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  )}
                  {stat.icon === "star" && (
                    <svg className="size-6" style={{ color: stat.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )}
                </div>
                <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wide">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-3xl font-black text-foreground tracking-tight">{stat.value}</div>
              <div className="text-sm font-semibold text-muted-foreground mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black tracking-tight">Active Projects</CardTitle>
              <Link href="/dashboard/projects" className="text-sm font-bold text-[#2563EB] hover:underline flex items-center gap-1">
                View All
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="block rounded-xl border border-border/50 bg-secondary/30 p-6 hover:bg-secondary/50 hover:shadow-lg hover:shadow-[#2563EB]/5 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-[#2563EB] transition-colors mb-1">
                        {project.title}
                      </h3>
                      <span className="text-xs font-black text-muted-foreground uppercase tracking-wider">{project.track} Track</span>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={
                        project.status === "Review" 
                          ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-0"
                          : "bg-[#2563EB]/10 text-[#2563EB] border-0"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1 h-2.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-black text-foreground w-10 text-right">
                      {project.progress}%
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                    <svg className="size-4 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Due: {project.deadline}
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Track Progress */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-black tracking-tight">Track Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {trackProgress.map((track) => (
                <div key={track.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[15px] font-bold text-foreground">{track.name}</span>
                    <span className="text-sm font-black" style={{ color: track.color }}>
                      {track.progress}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${track.progress}%`, backgroundColor: track.color }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-black tracking-tight">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentNotifications.map((notif, i) => (
                <div key={i} className="flex items-start gap-3 p-3 -mx-2 rounded-xl hover:bg-secondary/50 transition-all">
                  <div className={`size-2 rounded-full mt-2 flex-shrink-0 ${
                    notif.type === "success" ? "bg-green-500" :
                    notif.type === "team" ? "bg-purple-500" :
                    "bg-[#2563EB]"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-foreground leading-tight mb-1">{notif.text}</p>
                    <p className="text-xs font-medium text-muted-foreground">{notif.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
