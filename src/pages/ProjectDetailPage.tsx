import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Share2,
  Check,
  Play,
  FileText,
  Monitor,
  LayoutGrid,
  Lightbulb,
  Zap,
  ShieldCheck,
  Layers,
  Server,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { LazyImage } from '@/components/ui/LazyImage';
import { PORTFOLIO_DATA, type Project } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectProject?: (project: Project) => void;
  onNavigate?: (route: string) => void;
}

interface MediaItem {
  id: string;
  type: 'video' | 'image';
  src: string;
  title: string;
}

interface ProjectSimpleStory {
  tagline: string;
  whyIBuiltThis: string;
  howItWorks: {
    step: string;
    title: string;
    description: string;
  }[];
}

// Simple, friendly explanations for each project (Recruiter & Visitor friendly)
// Factual, human-friendly project narratives directly sourced from each repository's official README
const PROJECT_STORIES: Record<string, ProjectSimpleStory> = {
  'nexlearn-ai': {
    tagline: 'Autonomous full-stack AI learning platform and adaptive academic ecosystem built with Next.js 16 (Turbopack) & React 19.',
    whyIBuiltThis:
      'Online education suffers from five fundamental flaws: rigid pre-recorded video playlists with no dynamic pacing, the "illusion of competence" from passive watching without active coding practice, juggling fragmented tools (ChatGPT, YouTube, LeetCode, Anki, Notion), lack of mathematical retention algorithms (SuperMemo SM-2), and unverifiable fake PDF certificates. I built NexLearn AI to synthesize topologically sorted curricula with interactive Monaco code sandboxes, ELK.js concept mindmaps, SM-2 spaced repetition, and cryptographic certificates backed by a public verification registry and dynamic QR codes.',
    howItWorks: [
      {
        step: '1',
        title: 'Set Goal & Synthesize Curriculum',
        description: 'Enter any career goal or subject; the dual-engine AI cascade (Groq LPU Llama 3.3 70B + Google Gemini Flash) generates a structured multi-module syllabus validated with Zod schemas.',
      },
      {
        step: '2',
        title: 'Practice in the Immersive Room',
        description: 'Read structured theory notes, run and debug code in the interactive Monaco editor with live stdout/stderr execution, and explore ELK.js concept mindmaps.',
      },
      {
        step: '3',
        title: 'Reinforce with SM-2 Spaced Repetition',
        description: 'Review 3D flip flashcards calculated by the SuperMemo SM-2 algorithm to counteract the forgetting curve, and test understanding with timed adaptive quizzes.',
      },
      {
        step: '4',
        title: 'Earn Verifiable Credentials',
        description: 'Graduate with a tamper-evident academic certificate featuring a permanent registry ID (e.g. NXL-JAVA-2026), dynamic QR verification, and 1-click LinkedIn Add-to-Profile.',
      },
    ],
  },
  'nexpos': {
    tagline: 'Enterprise-grade multi-tenant Point of Sale (POS) and distributed retail management platform.',
    whyIBuiltThis:
      'Traditional retail grocery stores face critical operational bottlenecks: slow legacy checkout taking 4–6 seconds per item scan, inventory divergence across branches causing stockouts, untracked till cash drawer discrepancies at shift end, and Indian GST tax compliance calculation burdens. I built NexPOS to solve these issues with sub-200ms barcode scanning, keyboard hotkeys (F1–F8), park & recall held orders, atomic multi-branch inventory synchronization, automated CGST/SGST invoicing, till cash drawer reconciliation, and 6-tier role-based access control.',
    howItWorks: [
      {
        step: '1',
        title: 'High-Speed Barcode Checkout',
        description: 'Cashiers scan items with physical USB barcode scanners or keyboard hotkeys (F1–F8) across 3,500+ items with sub-200ms catalog search and real-time cart ledger.',
      },
      {
        step: '2',
        title: 'Park & Recall Held Orders',
        description: 'When a customer forgets an item or delays payment, cashiers suspend the cart to the FIFO HeldOrder queue and immediately serve the next shopper, resuming with 1 click.',
      },
      {
        step: '3',
        title: 'Multi-Tender Payment & GST Split',
        description: 'Settle sales via Cash, Card terminal slips, dynamic UPI QR codes, or Razorpay with automated CGST & SGST tax breakdowns per HSN product code.',
      },
      {
        step: '4',
        title: 'Till Reconciliation & Stock Sync',
        description: 'Print 80mm/58mm thermal receipts, balance cash drawer floats with ShiftReport Z-Reports, and sync inventory atomically across branches to prevent stockouts.',
      },
    ],
  },
  'visionary-ai': {
    tagline: 'Enterprise-grade multi-model generative AI platform unifying streaming writing, 4K visual synthesis, photo inpainting, and ATS resume engineering.',
    whyIBuiltThis:
      'Modern creators, developers, and job seekers frequently juggle multiple fragmented, expensive subscriptions—one tool for AI writing, another for image generation, another for photo cleanup, and another for resume tailoring. I built Visionary.ai to unite these creative and career workflows into a single high-performance workspace powered by Groq LPU streaming inference, Supabase PostgreSQL with RLS, Cloudinary generative AI, and Gemini multimodal OCR fallbacks.',
    howItWorks: [
      {
        step: '1',
        title: 'Select a Creative Studio',
        description: 'Choose between the Real-Time SSE Article Writer, 4K Image Studio, Photo Cleanup & Inpainting, or the ATS Resume Studio based on your workflow.',
      },
      {
        step: '2',
        title: 'Instant Streaming & Generation',
        description: 'Stream articles word-by-word via Server-Sent Events (SSE), synthesize 4K images across 8 styles, or generate polyglot code with Big-O complexity analysis.',
      },
      {
        step: '3',
        title: 'Neural Inpainting & Resume Auditing',
        description: 'Strip backgrounds to transparent PNGs, remove objects with generative inpainting, or audit resumes against a 0–100 ATS rubric with Google XYZ bullet optimization.',
      },
      {
        step: '4',
        title: 'Export, Publish or Share',
        description: 'Download resumes to A4 PDF/DOCX, export 4K visual assets via Cloudinary CDN, publish articles to social channels, or showcase work in the Community Discovery Feed.',
      },
    ],
  },
  'coinnova': {
    tagline: 'Institutional-grade cryptocurrency trading terminal and AI behavioral intelligence ecosystem.',
    whyIBuiltThis:
      'Over 85% of retail crypto losses stem from emotional trading—impulsive FOMO buying at market tops, panic selling into flash crashes, and revenge trading after a losing streak, while traders juggle fragmented tools. I built CoinNova to unify institutional order execution with an AI Behavioral Intelligence Suite ("Trading DNA"): offering a $100,000 risk-free demo sandbox, sub-second Binance WebSockets, pre-execution risk guardrails, and automated post-trade emotional diagnostics.',
    howItWorks: [
      {
        step: '1',
        title: 'Stream Live Binance Markets',
        description: 'Stream live candlestick charts (1H to 1Y), real-time bids/asks order books, and depth charts via sub-second Binance WebSockets with CoinGecko fallback.',
      },
      {
        step: '2',
        title: 'Trade in the $100K Sandbox',
        description: 'Execute Market, Limit, Stop-Loss, and Take-Profit orders with instant collateral locking and atomic SQL settlement using $100K virtual capital.',
      },
      {
        step: '3',
        title: 'AI Trading DNA & Mistake Alerts',
        description: 'The Smart Trade Guardian intercepts impulsive orders, while MistakeDetector flags FOMO buying (>5% pumps), panic selling, or revenge trading.',
      },
      {
        step: '4',
        title: 'Instant P2P Transfers & Journaling',
        description: 'Send zero-gas internal crypto transfers authorized by a 6-digit PIN vault, tag psychological sentiments in the journal, and replay past trades candle-by-candle.',
      },
    ],
  },
};

// Helper: Format readable caption from screenshot file path
function formatScreenshotTitle(path: string): string {
  const filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
  return filename
    .replace(/^\d+-/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper: Extract domain name for browser frame
function getDisplayUrl(url?: string): string {
  if (!url) return 'localhost:3000';
  try {
    const parsed = new URL(url);
    return parsed.hostname + (parsed.pathname !== '/' ? parsed.pathname : '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
}

const FEATURE_ICONS = [Zap, ShieldCheck, Layers, Server];

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onSelectProject,
  onNavigate,
}) => {
  const { t, isHindi } = useLanguage();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'cinema' | 'strip'>('cinema');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  const scrollStripRef = useRef<HTMLDivElement>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const screenshots =
    project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [project.image || project.logo || '/logo.svg'];

  // Media items list: Video first (if present), then screenshots
  const mediaItems: MediaItem[] = [
    ...(project.video
      ? [
          {
            id: 'walkthrough-video',
            type: 'video' as const,
            src: project.video,
            title: 'System Walkthrough Video',
          },
        ]
      : []),
    ...screenshots.map((src, idx) => ({
      id: `screenshot-${idx}`,
      type: 'image' as const,
      src,
      title: formatScreenshotTitle(src),
    })),
  ];

  const activeMedia = mediaItems[activeMediaIndex] || mediaItems[0];
  const displayUrl = getDisplayUrl(project.links?.live);

  // Next project for smooth continuity
  const allProjects = PORTFOLIO_DATA.projects;
  const currentProjectIdx = allProjects.findIndex((p) => p.id === project.id);
  const nextProject =
    currentProjectIdx < allProjects.length - 1 ? allProjects[currentProjectIdx + 1] : allProjects[0];

  // Story data for this project
  const story = PROJECT_STORIES[project.id] || {
    tagline: project.description,
    whyIBuiltThis: project.longDescription || project.description,
    howItWorks: [
      { step: '1', title: 'Start', description: 'Explore the intuitive user interface.' },
      { step: '2', title: 'Interact', description: 'Experience real-time features and responsive design.' },
      { step: '3', title: 'Scale', description: 'Built with modern full-stack performance.' },
    ],
  };

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    const thumbEl = thumbnailRefs.current[activeMediaIndex];
    if (thumbEl && thumbStripRef.current) {
      thumbEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeMediaIndex]);

  // Monitor scroll for floating bar
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Media navigation
  const handlePrevMedia = useCallback(() => {
    setActiveMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  }, [mediaItems.length]);

  const handleNextMedia = useCallback(() => {
    setActiveMediaIndex((prev) => (prev + 1) % mediaItems.length);
  }, [mediaItems.length]);

  // Lightbox navigation
  const handlePrevLightbox = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + screenshots.length) % screenshots.length);
    }
  }, [lightboxIndex, screenshots.length]);

  const handleNextLightbox = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % screenshots.length);
    }
  }, [lightboxIndex, screenshots.length]);

  // KEYBOARD CONTROLS: ArrowLeft, ArrowRight, F, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes inside form inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (lightboxIndex !== null) {
          handlePrevLightbox();
        } else {
          handlePrevMedia();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (lightboxIndex !== null) {
          handleNextLightbox();
        } else {
          handleNextMedia();
        }
      } else if (e.key === 'Escape') {
        if (lightboxIndex !== null) {
          e.preventDefault();
          setLightboxIndex(null);
        }
      } else if ((e.key === 'f' || e.key === 'F') && lightboxIndex === null) {
        const currentItem = mediaItems[activeMediaIndex];
        if (currentItem && currentItem.type === 'image') {
          const scrIdx = screenshots.indexOf(currentItem.src);
          setLightboxIndex(scrIdx !== -1 ? scrIdx : 0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    lightboxIndex,
    activeMediaIndex,
    mediaItems,
    screenshots,
    handlePrevLightbox,
    handleNextLightbox,
    handlePrevMedia,
    handleNextMedia,
  ]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleOpenActiveInLightbox = () => {
    if (activeMedia.type === 'image') {
      const scrIdx = screenshots.indexOf(activeMedia.src);
      setLightboxIndex(scrIdx !== -1 ? scrIdx : 0);
    }
  };

  const keyCapabilities = (project.features || []).slice(0, 4);

  return (
    <div className="relative min-h-screen text-white pt-24 sm:pt-28 pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto selection:bg-primary/30">
      {/* ── Soft Ambient Glow ── */}
      <div
        className="fixed top-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-[850px] h-[350px] pointer-events-none -z-10 blur-[130px] opacity-20 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${project.color || '#4F46E5'} 0%, transparent 70%)`,
        }}
      />

      {/* ── 1. Top Navigation Bar ── */}
      <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-zinc-400">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 text-primary" />
            <span>{isHindi ? 'सभी प्रोजेक्ट्स' : 'All Projects'}</span>
          </button>
          {onNavigate && (
            <>
              <span className="text-zinc-700 hidden sm:inline">•</span>
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="hidden sm:inline text-xs font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.home}
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {/* Quick Resume Link for Recruiters */}
          <a
            href={PORTFOLIO_DATA.personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition-all active:scale-95"
            title="View Resume"
          >
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span>Resume (PDF)</span>
          </a>

          {/* Share */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
            title="Copy Project Link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? (isHindi ? 'कॉपी हुआ' : 'Copied') : (isHindi ? 'शेयर' : 'Share')}</span>
          </button>

          {/* Live App */}
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span>{isHindi ? 'लाइव ऐप' : 'Live App'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* ── 2. Hero Section: Clean & Readable ── */}
      <div className="mb-10 sm:mb-14">
        {/* Category & Status */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-zinc-400 mb-4">
          <span
            className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider border"
            style={{
              borderColor: `${project.color}50`,
              backgroundColor: `${project.color}15`,
              color: project.color,
            }}
          >
            {project.category}
          </span>
          <span className="text-zinc-600">•</span>
          <span>{project.date || '2025 – 2026'}</span>
          <span className="text-zinc-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Verified &amp; Live
          </span>
        </div>

        {/* Project Title + Logo */}
        <div className="flex items-center gap-4 sm:gap-5 mb-4">
          <LazyImage
            src={project.logo || '/logo.svg'}
            alt={project.title}
            className="w-full h-full object-contain p-1"
            containerClassName="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 ring-1 ring-white/15 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-md"
            style={{ backgroundColor: `${project.color}15`, borderColor: `${project.color}35` }}
          />
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {project.title}
          </h1>
        </div>

        {/* Simple, Human Tagline */}
        <p className="text-base sm:text-xl text-zinc-200 leading-relaxed font-normal mb-6">
          {story.tagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-primary hover:brightness-110 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.35)] transition-all active:scale-95 cursor-pointer"
            >
              <span>Launch Live App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs sm:text-sm border border-white/10 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-zinc-300" />
              <span>GitHub Code</span>
            </a>
          )}

          <a
            href={PORTFOLIO_DATA.personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs border border-white/10 flex items-center gap-2 transition-all active:scale-95"
          >
            <FileText className="w-4 h-4 text-primary" />
            <span>Resume</span>
          </a>
        </div>
      </div>

      {/* ── 3. Interactive Screenshots & Media Showcase (Controlled by Arrow Keys) ── */}
      <div className="mb-14 sm:mb-18">
        {/* Header with Arrow Key Instruction */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Screenshots &amp; App Walkthrough
              </span>
              <span className="text-zinc-600">•</span>
              {/* Arrow Keys Badge */}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-mono text-zinc-300">
                <span>Use keyboard</span>
                <kbd className="px-1.5 py-0.2 rounded bg-white/15 text-white font-bold border border-white/20">←</kbd>
                <kbd className="px-1.5 py-0.2 rounded bg-white/15 text-white font-bold border border-white/20">→</kbd>
                <span>to flip</span>
              </div>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Project Interface &amp; Features
            </h2>
          </div>

          {/* Controls: Left/Right Arrow Buttons & View Mode */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-0.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('cinema')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'cinema'
                    ? 'bg-white/15 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Cinema View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Featured</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('strip')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'strip'
                    ? 'bg-white/15 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Filmstrip View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filmstrip</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrevMedia}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              aria-label="Previous screenshot (Left Arrow key)"
              title="Previous capture (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMedia}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              aria-label="Next screenshot (Right Arrow key)"
              title="Next capture (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Cinema Spotlight View ── */}
        {viewMode === 'cinema' ? (
          <div className="flex flex-col gap-3">
            {/* Main Stage */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0b0c13] shadow-2xl">
              {/* Window Header Bar */}
              <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-[#12141f] border-b border-white/10 select-none">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-sm" />
                  <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-500 ml-2">
                    {displayUrl}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-semibold text-zinc-200 truncate px-2 text-center max-w-[50%]">
                  {activeMedia.title}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                    {activeMediaIndex + 1} / {mediaItems.length}
                  </span>

                  {activeMedia.type === 'image' && (
                    <button
                      type="button"
                      onClick={handleOpenActiveInLightbox}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      title="Enlarge (F)"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Main Media Canvas */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] bg-black overflow-hidden flex items-center justify-center group">
                <AnimatePresence mode="wait">
                  {activeMedia.type === 'video' ? (
                    <motion.div
                      key="video-player"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full"
                    >
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={screenshots[0]}
                        className="w-full h-full object-cover object-top"
                      >
                        <source src={activeMedia.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeMedia.src}
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      onClick={handleOpenActiveInLightbox}
                      className="w-full h-full cursor-zoom-in relative"
                    >
                      <img
                        src={activeMedia.src}
                        alt={`${project.title} - ${activeMedia.title}`}
                        className="w-full h-full object-cover object-top select-none transition-transform duration-300 hover:scale-[1.01]"
                      />

                      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-xs font-mono text-zinc-200 border border-white/20 backdrop-blur-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                        <Maximize2 className="w-3.5 h-3.5 text-primary" />
                        <span>Click or press F to zoom</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating Chevron Overlays */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevMedia();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer active:scale-95 shadow-xl"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextMedia();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer active:scale-95 shadow-xl"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div
              ref={thumbStripRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x select-none -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollBehavior: 'smooth' }}
            >
              {mediaItems.map((item, idx) => {
                const isActive = idx === activeMediaIndex;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      thumbnailRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`shrink-0 w-20 sm:w-24 text-left rounded-xl overflow-hidden border transition-all cursor-pointer snap-start relative ${
                      isActive
                        ? 'border-primary ring-2 ring-primary/40 bg-white/10 scale-[1.03]'
                        : 'border-white/10 hover:border-white/30 bg-black/40 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
                      {item.type === 'video' ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-300">
                          <Play className="w-4 h-4 text-red-400 fill-red-400/20" />
                          <span className="text-[8px] font-mono text-zinc-400 mt-0.5">Video</span>
                        </div>
                      ) : (
                        <img
                          src={item.src}
                          alt={`${project.title} - ${item.title}`}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="px-1 py-0.5 bg-[#12141f] border-t border-white/5 truncate">
                      <p className="text-[9px] font-mono text-zinc-300 truncate text-center">
                        {idx + 1}. {item.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ── Filmstrip Mode ── */
          <div
            ref={scrollStripRef}
            className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none select-none -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollBehavior: 'smooth' }}
          >
            {mediaItems.map((item, idx) => (
              <div
                key={item.id}
                className={`w-[80vw] sm:w-[460px] shrink-0 snap-start rounded-2xl overflow-hidden border bg-[#0c0d14] shadow-xl flex flex-col cursor-pointer transition-all duration-200 ${
                  idx === activeMediaIndex ? 'border-primary ring-1 ring-primary/40' : 'border-white/10 hover:border-white/25'
                }`}
                onClick={() => setActiveMediaIndex(idx)}
              >
                <div className="flex items-center justify-between px-3 py-2 bg-[#131622] border-b border-white/10 text-xs font-mono text-zinc-300">
                  <span className="truncate">{item.title}</span>
                  <span className="text-zinc-500">{idx + 1}/{mediaItems.length}</span>
                </div>
                <div className="relative w-full aspect-[16/10] bg-black/90">
                  {item.type === 'video' ? (
                    <video controls playsInline className="w-full h-full object-cover">
                      <source src={item.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item.src}
                      alt={`${project.title} - ${item.title}`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      onClick={() => {
                        const scrIdx = screenshots.indexOf(item.src);
                        setLightboxIndex(scrIdx !== -1 ? scrIdx : 0);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── 4. "Why I Built This" (Simple, Relatable Context for Recruiters) ── */}
      <div className="mb-14 sm:mb-18 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            {isHindi ? 'यह प्रोजेक्ट क्यों बनाया गया' : 'Why I Built This Project'}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          {story.whyIBuiltThis}
        </p>
      </div>

      {/* ── 5. "How It Works" (Simple, Easy-to-Read 4-Step Flow) ── */}
      <div className="mb-14 sm:mb-18">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block mb-1">
            {isHindi ? 'यूज़र फ्लो' : 'User Flow'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isHindi ? 'यह 4 सरल चरणों में कैसे काम करता है' : 'How It Works in 4 Simple Steps'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {story.howItWorks.map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex items-start gap-4"
            >
              <div
                className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center font-black text-sm border"
                style={{
                  borderColor: `${project.color}50`,
                  backgroundColor: `${project.color}15`,
                  color: project.color || '#4F46E5',
                }}
              >
                {item.step}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. Key Project Highlights (Clean, Scannable Cards) ── */}
      {keyCapabilities.length > 0 && (
        <div className="mb-14 sm:mb-18">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block mb-1">
              {isHindi ? 'प्रमुख क्षमताएं' : 'Core Capabilities'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isHindi ? 'मुख्य विशेषताएं व खूबियां' : 'Key Features & Highlights'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyCapabilities.map((cap, idx) => {
              const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
              const parts = cap.split(/(?:with|featuring|powered by|supporting)/i);
              const title = parts[0]?.trim() || cap;
              const desc = parts.length > 1 ? cap.slice(title.length).trim() : null;

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex items-start gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border"
                    style={{
                      borderColor: `${project.color}40`,
                      backgroundColor: `${project.color}15`,
                      color: project.color,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1 leading-snug">
                      {title}
                    </h3>
                    {desc ? (
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {desc.charAt(0).toUpperCase() + desc.slice(1)}
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {cap}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 7. Key Numbers & Metrics (If Available) ── */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="mb-14 sm:mb-18 pb-8 border-b border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <div
                  className="text-2xl sm:text-3xl font-black tracking-tight"
                  style={{ color: project.color || '#ffffff' }}
                >
                  {metric.value}
                </div>
                <div className="text-xs font-mono uppercase text-zinc-400 mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 8. Technologies Used (Clean & Modern Badges) ── */}
      <div className="mb-14 sm:mb-18 pb-8 border-b border-white/10">
        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold block mb-1">
            {isHindi ? 'तकनीकी स्टैक' : 'Tech Stack'}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {isHindi ? 'प्रयुक्त तकनीकें एवं लाइब्रेरीज' : 'Technologies & Libraries Used'}
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-white/[0.03] text-zinc-200 border border-white/10 hover:border-white/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.platforms && project.platforms.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mt-3">
            <span className="text-zinc-500 uppercase">Supported On:</span>
            {project.platforms.map((plat) => (
              <span
                key={plat}
                className="px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/5 text-zinc-300"
              >
                {plat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── 9. Up Next Project Banner ── */}
      <div className="mb-14 sm:mb-18">
        <button
          type="button"
          onClick={() => {
            if (onSelectProject) onSelectProject(nextProject);
            if (onNavigate) onNavigate(`/projects/${nextProject.slug}`);
          }}
          className="w-full p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/40 text-left transition-all cursor-pointer group flex items-center justify-between gap-4"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block mb-1">
              {isHindi ? 'अगला प्रोजेक्ट' : 'Up Next Project'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-primary transition-colors tracking-tight">
              {nextProject.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg line-clamp-1">
              {nextProject.description}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full border border-white/15 group-hover:border-primary group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-all">
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>

      {/* ── 10. Simple Recruiter Contact CTA ── */}
      <div className="text-center py-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {isHindi ? 'साथ काम करने में रुचि रखते हैं?' : 'Interested in working together?'}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6">
          {isHindi
            ? 'मैं सॉफ्टवेयर इंजीनियरिंग रोल्स एवं फुल-स्टैक डेवलपमेंट के अवसरों के लिए उपलब्ध हूँ। आइए चर्चा करते हैं!'
            : "I'm open to software engineering roles and full-stack development opportunities. Let's connect!"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {onNavigate ? (
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="px-5 py-2.5 rounded-xl bg-primary hover:brightness-110 text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {t.hero.contactMe}
            </button>
          ) : (
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=Regarding your project: ${project.title}`}
              className="px-5 py-2.5 rounded-xl bg-primary hover:brightness-110 text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {t.hero.contactMe}
            </a>
          )}
          <a
            href={PORTFOLIO_DATA.personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs sm:text-sm font-medium transition-all active:scale-95 flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-primary" />
            <span>{t.hero.downloadResume}</span>
          </a>
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            {isHindi ? 'सभी प्रोजेक्ट्स' : 'All Projects'}
          </button>
        </div>
      </div>

      {/* ── 11. Fullscreen Lightbox Modal (Keyboard & Arrow Supported) ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 select-none">
              <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400">
                <span className="text-white font-semibold">
                  {lightboxIndex + 1} / {screenshots.length}
                </span>
                <span>•</span>
                <span className="text-zinc-200">{formatScreenshotTitle(screenshots[lightboxIndex])}</span>
                <span className="hidden sm:inline text-zinc-600">•</span>
                <span className="hidden sm:inline text-zinc-500">
                  Use <kbd className="px-1 py-0.5 rounded bg-white/10 text-zinc-300">←</kbd>{' '}
                  <kbd className="px-1 py-0.5 rounded bg-white/10 text-zinc-300">→</kbd> to navigate,{' '}
                  <kbd className="px-1 py-0.5 rounded bg-white/10 text-zinc-300">Esc</kbd> to exit
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex-1 flex items-center justify-center relative my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={screenshots[lightboxIndex]}
                alt={formatScreenshotTitle(screenshots[lightboxIndex])}
                className="max-h-[82vh] max-w-[95vw] w-auto h-auto object-contain rounded-xl shadow-2xl select-none"
              />

              {screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevLightbox();
                    }}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 hover:bg-black text-white border border-white/25 flex items-center justify-center cursor-pointer shadow-2xl transition-transform active:scale-95"
                    aria-label="Previous screenshot (←)"
                    title="Previous (←)"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextLightbox();
                    }}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 hover:bg-black text-white border border-white/25 flex items-center justify-center cursor-pointer shadow-2xl transition-transform active:scale-95"
                    aria-label="Next screenshot (→)"
                    title="Next (→)"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 12. Floating Quick Bar (Appears On Scroll) ── */}
      <AnimatePresence>
        {showFloatingBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-md w-[92vw] sm:w-auto"
          >
            <div className="px-4 py-2.5 rounded-2xl bg-[#0e101a]/95 backdrop-blur-xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center justify-between sm:justify-center gap-3 text-xs">
              <div className="flex items-center gap-2 truncate max-w-[140px] sm:max-w-[170px]">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: project.color || '#4F46E5' }}
                />
                <span className="font-bold text-white truncate">{project.title}</span>
              </div>

              <div className="h-4 w-[1px] bg-white/15 shrink-0" />

              <div className="flex items-center gap-2 shrink-0">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-primary hover:brightness-110 text-white font-semibold flex items-center gap-1 transition-all active:scale-95"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={PORTFOLIO_DATA.personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                >
                  <FileText className="w-3 h-3 text-primary" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
