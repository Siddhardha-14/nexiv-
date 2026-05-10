// Type definitions for Nexiv platform

export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;
  projectCount: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  tags: string[];
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  technologies: string[];
  duration: string;
  mentorRating: number;
  trackId: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  projectsCompleted: number;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: "student" | "mentor" | "admin";
  profileImage: string;
  bio: string;
  skills: string[];
  enrolledTracks: string[];
  completedProjects: string[];
}

export interface Submission {
  id: string;
  studentId: string;
  projectId: string;
  githubLink: string;
  demoVideo?: string;
  status: "pending" | "approved" | "revision" | "rejected";
  mentorFeedback?: string;
  marks?: number;
  submittedAt: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  projectId: string;
  projectTitle: string;
  certificateUrl: string;
  issueDate: string;
  verificationCode: string;
}

export interface Team {
  id: string;
  teamName: string;
  members: string[];
  leaderId: string;
  projectIds: string[];
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}
