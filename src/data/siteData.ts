import { Track, Project, Testimonial, FAQItem, PricingPlan } from "@/types";

export const tracks: Track[] = [
  {
    id: "embedded-systems",
    title: "Embedded Systems",
    description:
      "Master microcontrollers, firmware programming, RTOS, and hardware-software integration through hands-on projects with Arduino, STM32, and ESP32.",
    icon: "⚡",
    projectCount: 12,
    difficulty: "Intermediate",
    duration: "16 weeks",
    tags: ["C/C++", "Arduino", "STM32", "RTOS"],
    color: "#F59E0B",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Learn user-centered design, wireframing, prototyping, and design systems. Build stunning interfaces with Figma and ship production-ready designs.",
    icon: "🎨",
    projectCount: 10,
    difficulty: "Beginner",
    duration: "12 weeks",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    color: "#EC4899",
  },
  {
    id: "iot",
    title: "Internet of Things",
    description:
      "Build connected devices, sensor networks, and smart systems. Master MQTT, cloud connectivity, and edge computing with real IoT deployments.",
    icon: "🌐",
    projectCount: 8,
    difficulty: "Intermediate",
    duration: "14 weeks",
    tags: ["MQTT", "Sensors", "Cloud IoT", "Edge Computing"],
    color: "#10B981",
  },
  {
    id: "python",
    title: "Python Engineering",
    description:
      "Go beyond basics — build automation tools, data pipelines, APIs, and ML models. Master Python for real engineering workflows and production systems.",
    icon: "🐍",
    projectCount: 15,
    difficulty: "Beginner",
    duration: "12 weeks",
    tags: ["Flask", "FastAPI", "Pandas", "Automation"],
    color: "#3B82F6",
  },
  {
    id: "networking",
    title: "Network Engineering",
    description:
      "Configure enterprise networks, implement security protocols, and build network monitoring tools. Gain hands-on experience with real topologies.",
    icon: "🔗",
    projectCount: 9,
    difficulty: "Advanced",
    duration: "14 weeks",
    tags: ["TCP/IP", "Cisco", "Security", "Monitoring"],
    color: "#8B5CF6",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights. Master SQL, Python analytics, visualization dashboards, and statistical modeling for engineering decisions.",
    icon: "📊",
    projectCount: 11,
    difficulty: "Beginner",
    duration: "10 weeks",
    tags: ["SQL", "Power BI", "Visualization", "Statistics"],
    color: "#06B6D4",
  },
];

export const projects: Project[] = [
  {
    id: "smart-home-iot",
    title: "Smart Home Automation System",
    description:
      "Build a complete IoT-based home automation system with sensor networks, mobile app control, and cloud dashboard integration.",
    difficulty: "Intermediate",
    technologies: ["ESP32", "MQTT", "React Native", "Firebase"],
    duration: "4 weeks",
    mentorRating: 4.8,
    trackId: "iot",
  },
  {
    id: "portfolio-builder",
    title: "Engineering Portfolio Generator",
    description:
      "Create a dynamic portfolio system that auto-generates beautiful engineering portfolios from project data with PDF export.",
    difficulty: "Beginner",
    technologies: ["Next.js", "Tailwind CSS", "Puppeteer", "MongoDB"],
    duration: "3 weeks",
    mentorRating: 4.9,
    trackId: "python",
  },
  {
    id: "rtos-scheduler",
    title: "Real-Time Task Scheduler",
    description:
      "Implement a priority-based RTOS task scheduler on STM32 with preemptive multitasking, semaphores, and inter-task communication.",
    difficulty: "Advanced",
    technologies: ["C", "STM32", "FreeRTOS", "UART"],
    duration: "5 weeks",
    mentorRating: 4.7,
    trackId: "embedded-systems",
  },
  {
    id: "fintech-dashboard",
    title: "FinTech Analytics Dashboard",
    description:
      "Design and build a comprehensive financial analytics dashboard with real-time charts, KPI tracking, and responsive data visualization.",
    difficulty: "Intermediate",
    technologies: ["Figma", "React", "D3.js", "REST APIs"],
    duration: "3 weeks",
    mentorRating: 4.9,
    trackId: "ui-ux-design",
  },
  {
    id: "network-monitor",
    title: "Network Health Monitor",
    description:
      "Build a network monitoring tool with real-time packet analysis, latency tracking, alert systems, and visual topology mapping.",
    difficulty: "Advanced",
    technologies: ["Python", "Scapy", "Grafana", "Docker"],
    duration: "4 weeks",
    mentorRating: 4.6,
    trackId: "networking",
  },
  {
    id: "ml-pipeline",
    title: "ML Data Pipeline System",
    description:
      "Build an end-to-end machine learning pipeline with data ingestion, preprocessing, model training, and automated deployment workflow.",
    difficulty: "Intermediate",
    technologies: ["Python", "Airflow", "Scikit-learn", "Docker"],
    duration: "4 weeks",
    mentorRating: 4.8,
    trackId: "data-analytics",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Aravind Kumar",
    role: "Embedded Systems Engineer",
    company: "Texas Instruments",
    avatar: "AK",
    text: "Nexiv transformed my career. The embedded systems projects gave me real firmware experience that my college never provided. I landed my dream job within 3 months of completing my portfolio.",
    projectsCompleted: 8,
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "UI/UX Designer",
    company: "Razorpay",
    avatar: "PS",
    text: "The mentor feedback on my design projects was incredibly detailed. My Nexiv portfolio directly led to my current position. The project-first approach is exactly what the industry needs.",
    projectsCompleted: 6,
    rating: 5,
  },
  {
    id: "3",
    name: "Rahul Mehta",
    role: "IoT Developer",
    company: "Bosch",
    avatar: "RM",
    text: "Building real IoT systems with cloud integration on Nexiv gave me confidence in my interviews. The team collaboration projects taught me engineering workflows that textbooks can't.",
    projectsCompleted: 10,
    rating: 5,
  },
  {
    id: "4",
    name: "Sneha Reddy",
    role: "Data Engineer",
    company: "Amazon",
    avatar: "SR",
    text: "The data analytics track was comprehensive and practical. From SQL to ML pipelines — every project added real value to my portfolio. Nexiv is the future of engineering education.",
    projectsCompleted: 12,
    rating: 5,
  },
];

export const faqData: FAQItem[] = [
  {
    question: "What makes Nexiv different from other learning platforms?",
    answer:
      "Nexiv is project-first and portfolio-first. Instead of passive video consumption, you build real engineering projects with mentor guidance. Every project automatically becomes part of your professional portfolio, making you job-ready from day one.",
  },
  {
    question: "Do I need prior experience to start?",
    answer:
      "Not at all! Our tracks range from Beginner to Advanced. Beginner tracks start from fundamentals and progressively build your skills through guided projects. Each project includes starter code, documentation, and mentor support.",
  },
  {
    question: "How does the mentor feedback system work?",
    answer:
      "After submitting a project, it's assigned to an industry mentor who reviews your code, design, or implementation. You receive detailed feedback with actionable suggestions. You can revise and resubmit until your project meets industry standards.",
  },
  {
    question: "Can I collaborate with other students?",
    answer:
      "Yes! Our team collaboration system lets you create teams, assign roles (UI Designer, Backend Developer, etc.), share resources, and submit team projects. This mirrors real engineering workflows.",
  },
  {
    question: "How does the portfolio system work?",
    answer:
      "Every completed and approved project is automatically added to your Nexiv portfolio. You get a public profile URL with project showcases, skill highlights, and certificate displays. You can also export to PDF and share on LinkedIn.",
  },
  {
    question: "Are the certificates industry-recognized?",
    answer:
      "Nexiv certificates come with unique verification codes that employers can validate. Each certificate reflects actual project completion and mentor approval, not just video watching. This makes them significantly more credible.",
  },
  {
    question: "What engineering tracks are available?",
    answer:
      "We currently offer tracks in Embedded Systems, UI/UX Design, Internet of Things, Python Engineering, Network Engineering, and Data Analytics. New tracks are added regularly based on industry demand.",
  },
  {
    question: "Can I switch between Free and Pro plans?",
    answer:
      "Absolutely! You can upgrade to Pro anytime to unlock premium projects, mentor reviews, advanced portfolio features, and certifications. You can also downgrade, though you'll lose access to premium features.",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started with engineering projects",
    features: [
      "5 starter projects",
      "Community access",
      "Basic portfolio page",
      "Self-paced learning",
      "Public project showcase",
      "Discussion forums",
    ],
    highlighted: false,
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    description: "Full access to accelerate your engineering career",
    features: [
      "50+ premium projects",
      "Expert mentor reviews",
      "Advanced portfolio builder",
      "Team collaboration tools",
      "Industry certificates",
      "Priority support",
      "Resume builder",
      "Career guidance sessions",
    ],
    highlighted: true,
    cta: "Go Pro",
  },
];

export const stats = [
  { value: "50+", label: "Real Projects" },
  { value: "6", label: "Skill Tracks" },
  { value: "1,200+", label: "Students" },
  { value: "95%", label: "Placement Rate" },
];
