import type { Metadata } from "next";
import "@fontsource/mona-sans/index.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
