import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nexiv — Engineering Skill-to-Job Platform",
  description:
    "Transform from learner to builder. Master engineering skills through real-world projects, mentorship, and portfolio-driven career acceleration.",
  keywords: [
    "engineering",
    "projects",
    "portfolio",
    "mentorship",
    "skills",
    "career",
    "embedded systems",
    "IoT",
    "UI/UX",
    "Python",
  ],
  authors: [{ name: "Nexiv" }],
  openGraph: {
    title: "Nexiv — Engineering Skill-to-Job Platform",
    description:
      "Transform from learner to builder through project-based engineering education.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
