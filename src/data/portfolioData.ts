export interface Project {
  id: string;
  num?: string;
  slug: string;
  title: string;
  category: string;
  date?: string;
  description: string;
  longDescription?: string;
  color?: string;
  bgGradient?: string;
  logo?: string;
  image?: string;
  video?: string;
  screenshots: string[];
  tags: string[];
  featured: boolean;
  metrics?: { label: string; value: string }[];
  features?: string[];
  platforms?: string[];
  links: {
    live?: string;
    github?: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string;
  color: string;
  iconPath?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  color: string;
  spotlightColor: string;
  featured?: boolean;
  viewBox?: string;
  svgPath?: string;
  pdfUrl?: string;
  previewImage?: string;
  verificationUrl?: string;
  certificateId?: string;
  grade?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
  views?: string;
}

export interface Sticker {
  id: string;
  name: string;
  src: string;
  initialX: number;
  initialY: number;
  rotation: number;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Aniket Meshram",
    alias: "Aniket Meshram",
    handle: "@Aniket-Meshram-dev",
    title: "Software Engineer & Full-Stack Developer",
    status: "Available for new opportunities",
    location: "Amravati, Maharashtra - 444905",
    phone: "+91 7028143749",
    education: "B.Tech — Kolhapur Institute of Technology's College of Engineering, Kolhapur (KIT's College of Engineering, Kolhapur)",
    bio: "I'm a Software Engineer & Full-Stack Developer with a passion for building clean, high-performance web applications. I bridge the gap between design and robust engineering, with hands-on experience in full-stack development, modern web technologies, and scalable backend platforms.",
    email: "aniketmeshram445@gmail.com",
    socials: {
      github: "https://github.com/Aniket-Meshram-dev",
      linkedin: "https://www.linkedin.com/in/aniket-meshram-dev/",
      instagram: "https://www.instagram.com/aniket_m_2_4?stkn=MWhtY2M4ZGtzejNiYQ==",
      reddit: "https://www.reddit.com/u/DoubleLaw4101/s/NjzzLB2TBd",
      leetcode: "https://leetcode.com/u/Aniket_meshram_/",
      email: "mailto:aniketmeshram445@gmail.com",
      phone: "tel:+917028143749",
    },
    stats: {
      contributions: "3,523",
      followers: 12,
      repositories: 4,
      stars: 28,
    }
  },

  projects: [
    {
      id: "nexlearn-ai",
      num: "01",
      slug: "nexlearn-ai-autonomous-learning-platform",
      title: "NexLearn AI",
      category: "Autonomous AI Learning Ecosystem",
      date: "2026",
      description: "Institutional-grade autonomous learning platform with dual-engine AI cascades (Groq Llama 3.3 70B & Gemini), interactive Monaco code sandboxes, ELK.js concept mindmaps, SM-2 spaced repetition, and cryptographic verifiable credentials.",
      longDescription: "NexLearn AI is an institutional-grade, full-stack autonomous learning platform and adaptive academic ecosystem built with Next.js 16 (Turbopack) and React 19. It transforms any career goal or topic into an interactive multi-dimensional curriculum in seconds. Powered by dual-engine AI cascades (Groq LPU Llama 3.3 70B & Google Gemini), NexLearn features zero-hallucination structured syllabus synthesis, Socratic AI voice mentors, interactive Monaco code sandboxes, visual concept mindmaps (ELK.js + React Flow), adaptive timed quizzes, SuperMemo SM-2 spaced repetition memory decks, deep Chart.js academic telemetry, and cryptographically verifiable academic credentials with dynamic QR code authentication.",
      color: "#4F46E5",
      bgGradient: "linear-gradient(145deg, #312E81, #1E1B4B)",
      logo: "/projects/nexlearn/logo.svg",
      image: "/projects/nexlearn/screenshots/01-landing-hero.png",
      video: "/projects/nexlearn/videos/nexlearn-walkthrough.mp4",
      screenshots: [
        "/projects/nexlearn/screenshots/01-landing-hero.png",
        "/projects/nexlearn/screenshots/03-dashboard.png",
        "/projects/nexlearn/screenshots/06-learning-module.png",
        "/projects/nexlearn/screenshots/04-course-generator.png",
        "/projects/nexlearn/screenshots/05-course-curriculum.png",
        "/projects/nexlearn/screenshots/07-concept-mindmap.png",
        "/projects/nexlearn/screenshots/08-quiz-assessment.png",
        "/projects/nexlearn/screenshots/09-quiz-result.png",
        "/projects/nexlearn/screenshots/10-flashcards-deck.png",
        "/projects/nexlearn/screenshots/11-academic-analytics.png",
        "/projects/nexlearn/screenshots/12-achievements-trophies.png",
        "/projects/nexlearn/screenshots/13-verifiable-certificate.png",
        "/projects/nexlearn/screenshots/14-discover-catalog.png",
        "/projects/nexlearn/screenshots/15-user-profile.png",
        "/projects/nexlearn/screenshots/16-settings-security.png",
        "/projects/nexlearn/screenshots/02-auth-login.png"
      ],
      tags: ["Next.js 16", "React 19", "TypeScript", "Prisma ORM", "Neon PostgreSQL", "Groq LPU", "Google Gemini", "Monaco Editor", "React Flow", "ELK.js", "Chart.js", "Tailwind CSS", "Zod", "NextAuth.js", "Brevo"],
      featured: true,
      metrics: [
        { label: "Inference Latency", value: "< 2s" },
        { label: "Course Modules", value: "36+ Ready" },
        { label: "AI Cascade Uptime", value: "99.9%" },
        { label: "Credential Standard", value: "SHA-256 / QR" }
      ],
      features: [
        "Autonomous Course Generation Studio with Dual-Engine LLM Cascade (Groq Llama 3.3 70B + Google Gemini Flash fallback) and structural Zod schema validation.",
        "Interactive Monaco Code Editor Sandbox supporting JavaScript/Python execution simulation, stdout/stderr channels, and inline test validation.",
        "Interactive Concept Mindmap & Knowledge Graph powered by ELK.js topological layout and React Flow with zoom, pan, and subtopic expansion.",
        "SuperMemo SM-2 Spaced Repetition Flashcard Engine calculating memory intervals and ease factors based on student recall quality.",
        "Cryptographic Verifiable Academic Credentials with permanent registry ID (e.g. NXL-JAVA-2026), dynamic QR codes, and 1-click LinkedIn Add-to-Profile.",
        "Conversational Socratic AI Mentor featuring customizable pedagogical personas (Socratic, Academic Professor, Eli5, Code Architect).",
        "Timed Adaptive Quizzes with instant answer feedback, question timer, conceptual explanations, and automated XP rewards.",
        "Comprehensive Academic Telemetry & Analytics tracking weekly study distribution, subject mastery radars, streaks, and PDF report exports."
      ],
      platforms: ["Web (Cloudflare / Vercel)", "Responsive Tablet", "Mobile PWA"],
      links: {
        live: "https://nexlearn-ai-tan.vercel.app/",
        github: "https://github.com/Aniket-Meshram-dev/NexLearn-AI"
      }
    },
    {
      id: "nexpos",
      num: "02",
      slug: "nexpos-multi-branch-retail-management",
      title: "NexPOS",
      category: "Enterprise Multi-Tenant Point of Sale",
      date: "2025 – 2026",
      description: "Enterprise-grade multi-tenant POS and distributed retail management platform featuring sub-second barcode checkout, atomic multi-branch inventory sync, 6-tier RBAC, offline held orders, GST tax invoicing, and STOMP WebSocket telemetry.",
      longDescription: "NexPOS is an enterprise-grade, multi-tenant Point of Sale (POS) and distributed retail management platform engineered for modern supermarket chains, retail franchises, and grocery outlets. Built with sub-200ms barcode checkout, offline-resilient park & recall cart queues, atomic multi-branch inventory synchronization, real-time STOMP WebSocket telemetry, GST-compliant tax invoicing (CGST/SGST splits), till cash drawer reconciliation, and strict 6-tier Role-Based Access Control (Super Admin, Store Admin, Store Manager, Branch Admin, Branch Manager, and Cashier) across a 3,500+ SKU pre-seeded catalog.",
      color: "#059669",
      bgGradient: "linear-gradient(145deg, #065F46, #022C22)",
      logo: "/projects/nexpos/logo.svg",
      image: "/projects/nexpos/screenshots/08-cashier-terminal.png",
      video: "/projects/nexpos/videos/nexpos-walkthrough.mp4",
      screenshots: [
        "/projects/nexpos/screenshots/08-cashier-terminal.png",
        "/projects/nexpos/screenshots/03-super-admin-dashboard.png",
        "/projects/nexpos/screenshots/04-store-admin-dashboard.png",
        "/projects/nexpos/screenshots/06-branch-admin-dashboard.png",
        "/projects/nexpos/screenshots/07-branch-manager-dashboard.png",
        "/projects/nexpos/screenshots/05-store-manager-dashboard.png",
        "/projects/nexpos/screenshots/01-landing-page.png",
        "/projects/nexpos/screenshots/02-login-page.png",
        "/projects/nexpos/screenshots/09-store-onboarding.png"
      ],
      tags: ["React 19", "Vite 7", "Tailwind CSS v4", "Redux Toolkit", "Java 17", "Spring Boot 3.5.3", "Spring Security 6", "Stateless JJWT", "PostgreSQL", "Neon Cloud", "STOMP WebSockets", "Recharts", "jsPDF", "Bucket4j Rate Limiting", "Razorpay SDK"],
      featured: true,
      metrics: [
        { label: "Barcode Checkout Latency", value: "< 200ms" },
        { label: "Master Catalog SKUs", value: "3,500+" },
        { label: "RBAC Stakeholder Tiers", value: "6 Roles" },
        { label: "Database Entities", value: "32 JPA Models" }
      ],
      features: [
        "Sub-200ms High-Speed POS Checkout Terminal with physical USB barcode scanner support, keyboard hotkeys (F1–F8), and real-time cart ledger across 3,500+ items.",
        "Park & Recall FIFO Held Order Queue allowing cashiers to suspend active carts to HeldOrder entities in PostgreSQL and instantly resume without queue blockage.",
        "Atomic Multi-Branch Inventory Synchronization with optimistic concurrency locking, preventing negative stock depletion during simultaneous peak checkouts.",
        "Till Float & Cash Drawer Balancing with ShiftReport Z-Report variance calculations, preventing till theft and generating printable thermal shift audits.",
        "Multi-Tender Payment & Split Checkout supporting Cash, Card terminal slips, dynamic UPI QR codes, and Razorpay gateway links.",
        "Indian GST & HSN Tax Compliant Invoicing dynamically splitting CGST and SGST per product category, exporting 80mm/58mm thermal receipts and jsPDF invoices.",
        "Strict 6-Tier Role-Based Access Control (Super Admin, Store Admin, Store Manager, Branch Admin, Branch Manager, Cashier) with isolated dashboards.",
        "Real-Time Bi-Directional STOMP WebSocket Telemetry broadcasting instant sales, low-stock threshold triggers, and approval alerts across fleet terminals.",
        "Automated Fraud & Anomaly Detection flagging refund spikes (> ₹5,000 or > 3/day) and inactive cashier sessions via LastActivityFilter."
      ],
      platforms: ["Cloudflare Pages (Frontend SPA)", "Render / Docker (Spring Boot REST API)", "Thermal ESC/POS Printers"],
      links: {
        live: "https://pos-system-97v.pages.dev/",
        github: "https://github.com/Aniket-Meshram-dev/POS-SYSTEM"
      }
    },
    {
      id: "visionary-ai",
      num: "03",
      slug: "visionary-ai-creative-career-platform",
      title: "Visionary.ai",
      category: "Full-Stack Multi-Model Generative AI Platform",
      date: "2025",
      description: "Enterprise-grade generative AI & career ecosystem unifying real-time SSE article streaming, 4K image synthesis, neural photo cleanup, ATS resume engineering, and dual-currency billing into a single hub.",
      longDescription: "Visionary.ai is an enterprise-grade, full-stack AI platform unifying high-velocity generative text streaming, 4K visual synthesis, neural photo inpainting, interactive ATS resume engineering, and multi-currency billing into a single cohesive creative and career ecosystem. Powered by Groq LPU inference, Supabase PostgreSQL with Row Level Security, Cloudinary Generative AI, and Gemini multimodal OCR fallbacks.",
      color: "#6366F1",
      bgGradient: "linear-gradient(145deg, #3730A3, #1E1B4B)",
      logo: "/projects/visionary-ai/logo.svg",
      image: "/projects/visionary-ai/screenshots/dashboard.png",
      video: "/projects/visionary-ai/videos/650918240-99130bc6-1123-431f-a0e2-73ce7a57565d.mp4",
      screenshots: [
        "/projects/visionary-ai/screenshots/landing-hero.png",
        "/projects/visionary-ai/screenshots/dashboard.png",
        "/projects/visionary-ai/screenshots/article-writer.png",
        "/projects/visionary-ai/screenshots/summarizer-mindmap.png",
        "/projects/visionary-ai/screenshots/image-studio.png",
        "/projects/visionary-ai/screenshots/photo-cleanup.png",
        "/projects/visionary-ai/screenshots/resume-builder.png",
        "/projects/visionary-ai/screenshots/resume-auditor.png",
        "/projects/visionary-ai/screenshots/admin-dashboard.png",
        "/projects/visionary-ai/screenshots/community-feed.png",
        "/projects/visionary-ai/screenshots/quick-code.png",
        "/projects/visionary-ai/screenshots/my-creations.png",
        "/projects/visionary-ai/screenshots/auth-modal.png"
      ],
      tags: ["React 19", "Vite 7", "Tailwind CSS v4", "React Router v7", "Supabase", "PostgreSQL RLS", "Groq LPU", "Google Gemini OCR", "Cloudinary AI", "Stripe", "Razorpay", "Express 5", "Node.js", "Mermaid.js"],
      featured: true,
      metrics: [
        { label: "Inference Engine", value: "Groq LPU" },
        { label: "Visual Resolution", value: "4K Synthesis" },
        { label: "ATS Score Calibration", value: "0–100 Rubric" },
        { label: "Multi-Currency Ramp", value: "USD & INR" }
      ],
      features: [
        "Real-Time SSE Article Writer with streaming Markdown, structured outline staging, auto 16:9 cover generation, and 1-click social repurposing.",
        "Multi-Source Summarizer & Mindmap ingesting SSRF-protected URLs, YouTube transcripts, and PDFs up to 10MB with interactive Mermaid.js concept graphs.",
        "Polyglot QuickCode Generator in 8 languages (JS, TS, Python, Java, C++, Go, Rust, SQL) with Big-O complexity headers and sandboxed execution simulator.",
        "4K AI Image Studio across 8 curated styles with prompt intelligence enhancer, negative prompt injection, and watermark-free Cloudinary CDN delivery.",
        "Neural Photo Cleanup & Inpainting featuring transparent PNG background stripping and targeted generative object removal.",
        "Interactive ATS Resume Auditor & Builder Studio with Gemini multimodal OCR fallback for scanned PDFs, Google XYZ bullet optimizer, live A4 WYSIWYG canvas, and DOCX/PDF export.",
        "Community Discovery Feed with public creations gallery, real-time likes, and shareable deep-link pages with OpenGraph metadata.",
        "Dual-Currency Subscription Engine supporting Stripe (USD) and Razorpay (INR) with HMAC signature verified webhooks and VIP promo bypass.",
        "Executive Admin Control Center tracking MRR, token telemetry, infrastructure cost estimation, and user quota moderation."
      ],
      platforms: ["Cloudflare Pages (Client)", "Render Cloud (Express 5 API)", "Cloudinary Media CDN"],
      links: {
        live: "https://visionary-nextgen-ai.pages.dev/",
        github: "https://github.com/Aniket-Meshram-dev/Visionary-AI"
      }
    },
    {
      id: "coinnova",
      num: "04",
      slug: "coinnova-cryptocurrency-trading-terminal",
      title: "CoinNova",
      category: "Cryptocurrency Terminal & AI Behavioral Finance",
      date: "2025 – 2026",
      description: "Institutional-grade full-stack cryptocurrency trading terminal and AI behavioral intelligence ecosystem featuring Limit/Stop-Loss matching engine, Binance WebSocket tickers, P2P PIN transfers, and AI Trading DNA.",
      longDescription: "CoinNova is an institutional-grade, full-stack cryptocurrency trading terminal and AI behavioral intelligence ecosystem. Engineered with an in-memory & persistent order matching engine (Limit, Market, Stop-Loss, Take-Profit), sub-second Binance WebSocket streams, multi-currency ledger (USD/INR), dual fiat gateways (Stripe & Razorpay), P2P crypto transfers with 6-digit PIN vaulting, and an AI Trading DNA engine that diagnoses emotional mistakes (FOMO buying, panic selling, revenge trading), calibrates trader confidence, and replays executions candlestick-by-candlestick.",
      color: "#00F2FE",
      bgGradient: "linear-gradient(145deg, #0E7490, #083344)",
      logo: "/projects/coinnova/logo.svg",
      image: "/projects/coinnova/screenshots/03-dashboard.png",
      video: "/projects/coinnova/videos/coinnova-walkthrough.mp4",
      screenshots: [
        "/projects/coinnova/screenshots/01-landing-hero.png",
        "/projects/coinnova/screenshots/03-dashboard.png",
        "/projects/coinnova/screenshots/05-trading-terminal.png",
        "/projects/coinnova/screenshots/04-market-overview.png",
        "/projects/coinnova/screenshots/06-portfolio-analytics.png",
        "/projects/coinnova/screenshots/07-wallet-deposit.png",
        "/projects/coinnova/screenshots/08-p2p-transfer.png",
        "/projects/coinnova/screenshots/09-transaction-history.png",
        "/projects/coinnova/screenshots/10-watchlist.png",
        "/projects/coinnova/screenshots/11-price-alerts.png",
        "/projects/coinnova/screenshots/12-trade-replay.png",
        "/projects/coinnova/screenshots/13-trade-journal.png",
        "/projects/coinnova/screenshots/14-trading-dna.png",
        "/projects/coinnova/screenshots/15-admin-control-center.png",
        "/projects/coinnova/screenshots/16-settings-security.png",
        "/projects/coinnova/screenshots/02-auth-login.png",
        "/projects/coinnova/screenshots/01-landing-full.png"
      ],
      tags: ["React 19", "Vite 7", "TypeScript 5.8", "Tailwind CSS", "Zustand", "TanStack Query", "Recharts", "Binance WebSockets", "Node.js 25", "Express 5", "PostgreSQL", "Drizzle ORM", "Stripe", "Razorpay", "Argon2 / Bcrypt PIN Vault"],
      featured: true,
      metrics: [
        { label: "Ticker Synchronization", value: "Sub-Second WS" },
        { label: "Paper Trading Balance", value: "$100,000 Demo" },
        { label: "Behavioral Archetypes", value: "6 Trading Personas" },
        { label: "PIN Vault Protection", value: "Argon2 / Bcrypt" }
      ],
      features: [
        "Institutional Trading Terminal with sub-second Binance WebSockets, live order book, depth chart, custom candlestick timeframes, and CoinGecko fallback.",
        "High-Performance Order Matching Engine supporting Limit, Market, Stop-Loss, and Take-Profit orders with instant collateral locking and atomic SQL settlement.",
        "AI Trading DNA & Behavioral Profiler mapping trading patterns across 6 archetypes (Momentum, Swing, Long-Term, Emotional, Technical, Fundamental) with multi-axis Habit Radar.",
        "MistakeDetector Heuristic Engine scanning transactions for chronic errors: FOMO Buying (>5% pumps), Panic Selling, Bag Holding (>7 days), and Revenge Trading (<30 mins).",
        "Smart Trade Guardian pre-execution risk middleware intercepting impulsive orders that breach position sizing rules.",
        "Historical Candlestick Trade Replay Simulator replaying trades step-by-step with automated AI post-mortem grading and timing critique.",
        "Crypto Trading Journal linked to ledger transactions, tagging emotional sentiments (FOMO, Greed, Fear, Calm) and computing emotional win-rate correlations.",
        "Multi-Currency Ledger (USD & INR) with real-time forex recalculation, Stripe card checkout, and Razorpay UPI ramp.",
        "Instant Zero-Gas P2P Crypto Transfers between platform accounts, protected by recipient email lookup and mandatory 6-digit cryptographic Transaction PIN authorization.",
        "Tiered KYC Compliance Pipeline supporting passport/ID verification with 2-tier withdrawal caps and admin verification queue."
      ],
      platforms: ["Cloudflare Pages (Frontend SPA)", "Render Cloud (Express 5 Backend)", "Binance WebSocket Streams"],
      links: {
        live: "https://coinnova-trading.pages.dev/",
        github: "https://github.com/Aniket-Meshram-dev/CoinNova-Trading-Platform"
      }
    }
  ] as Project[],

  experiences: [
    {
      id: "exp-google-aiml",
      role: "AI-ML Virtual Intern",
      company: "Google for Developers & EduSkills / AICTE",
      period: "JAN 2026 – MAR 2026",
      description: "Completed an intensive 10-week AI-ML virtual internship supported by Google for Developers (India Edu Program) and the Ministry of Education / AICTE. Engineered machine learning models, trained neural network pipelines, and achieved an Outstanding (Grade O) rating.",
      skills: "Machine Learning · Python · Neural Networks · AICTE · Grade O",
      color: "#f59e0b",
      iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    },
    {
      id: "exp-eduskills-java",
      role: "Java Full Stack Developer Intern",
      company: "EduSkills Academy & AICTE (Ministry of Education)",
      period: "APR 2026 – JUN 2026",
      description: "Engineered full-stack Java solutions across an 8-week virtual internship. Built Spring Boot REST APIs, relational PostgreSQL databases, and modern interactive frontends, graduating with Outstanding (Grade O) distinction.",
      skills: "Java · Spring Boot · PostgreSQL · Full Stack · Grade O",
      color: "#3b82f6",
      iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    },
    {
      id: "exp-paloalto-cyber",
      role: "Cybersecurity Virtual Intern",
      company: "Palo Alto Networks & EduSkills / AICTE",
      period: "JUL 2025 – SEP 2025",
      description: "Completed a 10-week cybersecurity engineering virtual internship supported by Palo Alto Networks and AICTE NEAT Cell. Implemented security policies, zero-trust architectures, network traffic inspection, and threat mitigation.",
      skills: "Cybersecurity · Zero Trust · Network Security · Threat Defense",
      color: "#10b981",
      iconPath: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    }
  ] as Experience[],

  achievements: [
    {
      id: "cert-ai-ml-google",
      title: "AI-ML Virtual Internship (10-Weeks)",
      organization: "Google for Developers (India Edu Program) & EduSkills / AICTE",
      date: "Jan – Mar 2026",
      description: "Successfully completed the 10-week AI-ML Virtual Internship supported by Google for Developers India Edu Program, Ministry of Education, and AICTE with Grade O (Outstanding).",
      color: "#f59e0b",
      spotlightColor: "#f59e0b15",
      featured: true,
      certificateId: "4007b8ee8cc343bb21d0",
      grade: "Grade O (Outstanding)",
      pdfUrl: "/certificates/AI-ML Virtual Internship.pdf",
      previewImage: "/certificates/previews/AI-ML_Virtual_Internship.png",
      viewBox: "0 0 576 512",
      svgPath: "M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z",
    },
    {
      id: "cert-java-fullstack",
      title: "Java Full Stack Development With Project Virtual Internship",
      organization: "EduSkills Academy & AICTE (Ministry of Education)",
      date: "Apr – Jun 2026",
      description: "Successfully completed the 8-week Java Full Stack Development With Project Virtual Internship supported by EduSkills Academy and AICTE with Grade O (Outstanding).",
      color: "#3b82f6",
      spotlightColor: "#3b82f615",
      featured: true,
      certificateId: "4a67a2fce58d0ae70cfb",
      grade: "Grade O (Outstanding)",
      pdfUrl: "/certificates/Java Full Stack Development With Project Virtual Internship.pdf",
      previewImage: "/certificates/previews/Java_Full_Stack_Development_With_Project_Virtual_Internship.png",
      viewBox: "0 0 352 512",
      svgPath: "M96.06 454.35c.01 6.29 1.87 12.45 5.36 17.69l17.09 25.69a31.99 31.99 0 0 0 26.64 14.28h61.71a31.99 31.99 0 0 0 26.64-14.28l17.09-25.69a31.989 31.989 0 0 0 5.36-17.69l.04-38.35H96.01l.05 38.35zM0 176c0 44.37 16.45 84.85 43.56 115.78 16.52 18.85 42.36 58.23 52.21 91.45.04.26.07.52.11.78h160.24c.04-.26.07-.51.11-.78 9.85-33.22 35.69-72.6 52.21-91.45C335.55 260.85 352 220.37 352 176 352 78.61 272.91-.3 175.45 0 73.44.31 0 82.97 0 176zm176-80c-44.11 0-80 35.89-80 80 0 8.84-7.16 16-16 16s-16-7.16-16-16c0-61.76 50.24-112 112-112 8.84 0 16 7.16 16 16s-7.16 16-16 16z",
    },
    {
      id: "cert-cybersecurity-paloalto",
      title: "Cybersecurity Virtual Internship (10 Weeks)",
      organization: "Palo Alto Networks & EduSkills / AICTE",
      date: "Jul – Sep 2025",
      description: "Successfully completed 10 weeks of Cybersecurity Virtual Internship supported by Palo Alto Networks and AICTE NEAT Cell with Grade B (Good).",
      color: "#10b981",
      spotlightColor: "#10b98115",
      featured: true,
      certificateId: "4e498fc2b8f1b50de16ab5ae483fb657",
      grade: "Grade B (Good)",
      pdfUrl: "/certificates/Aniket Pravin Meshram 275447.pdf",
      previewImage: "/certificates/previews/Aniket_Pravin_Meshram_275447.png",
      viewBox: "0 0 512 512",
      svgPath: "M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z",
    },
    {
      id: "cert-dsa-amazon",
      title: "Data Structures and Algorithms",
      organization: "Amazon (Offered via Coursera)",
      date: "Apr 15, 2025",
      description: "Online course authorized by Amazon covering fundamental and advanced data structures, algorithmic complexity, sorting, graphs, and dynamic programming.",
      color: "#ff9900",
      spotlightColor: "#ff990015",
      verificationUrl: "https://coursera.org/verify/IDCYTHLNQSHQ",
      pdfUrl: "/certificates/Coursera IDCYTHLNQSHQ ( Data Structure % Algorithm.pdf",
      previewImage: "/certificates/previews/Coursera_IDCYTHLNQSHQ_Data_Structure_Algorithm.png",
      viewBox: "0 0 512 512",
      svgPath: "M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm92.52 157.26l-37.93 36.96 8.97 52.22c1.6 9.36-8.26 16.51-16.65 12.09L256 393.88l-46.9 24.65c-8.4 4.45-18.25-2.74-16.65-12.09l8.97-52.22-37.93-36.96c-6.82-6.64-3.05-18.23 6.35-19.59l52.43-7.64 23.43-47.52c2.11-4.28 6.19-6.39 10.28-6.39 4.11 0 8.22 2.14 10.33 6.39l23.43 47.52 52.43 7.64c9.4 1.36 13.17 12.95 6.35 19.59z",
    },
    {
      id: "cert-java-amazon",
      title: "Programming with Java",
      organization: "Amazon (Offered via Coursera)",
      date: "Apr 11, 2025",
      description: "Professional course authorized by Amazon covering modern Java syntax, OOP inheritance, encapsulation, interfaces, collections framework, and robust error handling.",
      color: "#e11d48",
      spotlightColor: "#e11d4815",
      verificationUrl: "https://coursera.org/verify/V1HZOR69ITZ1",
      pdfUrl: "/certificates/Coursera V1HZOR69ITZ1  ( PROGRAMMING WITH JAVA ).pdf",
      previewImage: "/certificates/previews/Coursera_V1HZOR69ITZ1__PROGRAMMING_WITH_JAVA_.png",
      viewBox: "0 0 384 512",
      svgPath: "M97.12 362.63c-8.69-8.69-4.16-6.24-25.12-11.85-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58-19.5 0-37.82-7.59-51.61-21.37zM382.8 448.7l-45.37-111.24c-7.56 5.88-15.92 10.77-25.43 13.32-21.07 5.64-16.45 3.18-25.12 11.85-13.79 13.78-32.12 21.37-51.62 21.37-12.44 0-24.47-3.55-35.31-9.58L252 502.04c4.39 10.77 18.44 13.4 26.43 4.96l36.25-38.28 52.69 2.01c11.62.44 19.82-11.27 15.43-22.03zM263 340c15.28-15.55 17.03-14.21 38.79-20.14 13.89-3.79 24.75-14.84 28.47-28.98 7.48-28.4 5.54-24.97 25.95-45.75 10.17-10.35 14.14-25.44 10.42-39.58-7.47-28.38-7.48-24.42 0-52.83 3.72-14.14-.25-29.23-10.42-39.58-20.41-20.78-18.47-17.36-25.95-45.75-3.72-14.14-14.58-25.19-28.47-28.98-27.88-7.61-24.52-5.62-44.95-26.41-10.17-10.35-25-14.4-38.89-10.61-27.87 7.6-23.98 7.61-51.9 0-13.89-3.79-28.72.25-38.89 10.61-20.41 20.78-17.05 18.8-44.94 26.41-13.89 3.79-24.75 14.84-28.47 28.98-7.47 28.39-5.54 24.97-25.95 45.75-10.17 10.35-14.15 25.44-10.42 39.58 7.47 28.36 7.48 24.4 0 52.82-3.72 14.14.25 29.23 10.42 39.59 20.41 20.78 18.47 17.35 25.95 45.75 3.72 14.14 14.58 25.19 28.47 28.98C104.6 325.96 106.27 325 121 340c13.23 13.47 33.84 15.88 49.74 5.82a39.676 39.676 0 0 1 42.53 0c15.89 10.06 36.5 7.65 49.73-5.82zM97.66 175.96c0-53.03 42.24-96.02 94.34-96.02s94.34 42.99 94.34 96.02-42.24 96.02-94.34 96.02-94.34-42.99-94.34-96.02z",
    },
    {
      id: "cert-intro-sw-amazon",
      title: "Introduction to Software Development",
      organization: "Amazon (Offered via Coursera)",
      date: "Apr 6, 2025",
      description: "Foundational software engineering course authorized by Amazon covering Agile workflows, software lifecycle stages, modular code architecture, and testing.",
      color: "#8b5cf6",
      spotlightColor: "#8b5cf615",
      verificationUrl: "https://coursera.org/verify/VEWZUQ30XVNG",
      pdfUrl: "/certificates/Coursera VEWZUQ30XVNG  ( INTRODUCTION TO SOFTWARE DEVELOPMMENT ).pdf",
      previewImage: "/certificates/previews/Coursera_VEWZUQ30XVNG__INTRODUCTION_TO_SOFTWARE_DEVELOPMMENT_.png",
      viewBox: "0 0 576 512",
      svgPath: "M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24z",
    },
    {
      id: "cert-html5-infosys",
      title: "HTML5 - The Language",
      organization: "Infosys Springboard",
      date: "Jun 4, 2025",
      description: "Professional course certification in modern semantic HTML5, accessible markup, forms, media APIs, and modern web specifications.",
      color: "#e34f26",
      spotlightColor: "#e34f2615",
      verificationUrl: "https://verify.onwingspan.com",
      pdfUrl: "/certificates/1-2174cd44-0c0f-40a1-93b8-b62bf59b9019.pdf",
      previewImage: "/certificates/previews/1-2174cd44-0c0f-40a1-93b8-b62bf59b9019.png",
      viewBox: "0 0 384 512",
      svgPath: "M97.12 362.63c-8.69-8.69-4.16-6.24-25.12-11.85-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58-19.5 0-37.82-7.59-51.61-21.37z",
    },
    {
      id: "cert-css3-infosys",
      title: "CSS3",
      organization: "Infosys Springboard",
      date: "Jun 6, 2025",
      description: "Professional course certification in responsive layout systems, Flexbox, CSS Grid, custom properties, and GPU-accelerated micro-animations.",
      color: "#1572b6",
      spotlightColor: "#1572b615",
      verificationUrl: "https://verify.onwingspan.com",
      pdfUrl: "/certificates/1-a4f41681-fe26-4d1f-96ec-b0cc35faa651.pdf",
      previewImage: "/certificates/previews/1-a4f41681-fe26-4d1f-96ec-b0cc35faa651.png",
      viewBox: "0 0 512 512",
      svgPath: "M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z",
    }
  ] as Achievement[],

  articles: [
    {
      id: "art-1",
      slug: "sub-200ms-pos-checkout-architecture",
      title: "Architecting a Sub-200ms Retail POS: Atomic Inventory & Offline Held Orders",
      excerpt: "How we engineered NexPOS with React 19, Spring Boot 3.5, and transactional PostgreSQL to eliminate checkout queue latency and guarantee atomic inventory sync across distributed branches.",
      category: "Architecture",
      publishDate: "2026",
      readTime: "8 min read"
    },
    {
      id: "art-2",
      slug: "ai-trading-dna-behavioral-finance",
      title: "Building AI Trading DNA: Intercepting FOMO and Emotional Churn in Real-Time",
      excerpt: "Inside CoinNova's behavioral intelligence engine: combining millisecond Binance WebSockets with deterministic heuristics to diagnose panic selling, revenge trading, and overconfidence bias.",
      category: "Fintech & AI",
      publishDate: "2026",
      readTime: "7 min read"
    },
    {
      id: "art-3",
      slug: "zero-hallucination-curriculum-synthesis",
      title: "Zero-Hallucination Curriculum Synthesis: Dual-Engine LLM Cascades with Groq & Gemini",
      excerpt: "How NexLearn AI synthesizes 36+ module academic roadmaps using Groq Llama 3.3 70B, Google Gemini fallback cascades, Zod runtime repair, and automated ELK.js concept mindmaps.",
      category: "AI & EdTech",
      publishDate: "2026",
      readTime: "9 min read"
    }
  ] as Article[]
};
