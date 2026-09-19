import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA, type Project } from '@/data/portfolioData';
import { LazyImage } from '@/components/ui/LazyImage';
import { ProjectCursorBadge } from '@/components/ui/ProjectCursorBadge';
import { useLanguage } from '@/context/LanguageContext';

interface GalleryProjectCardProps {
  project: Project;
  idx: number;
  isActive: boolean;
  mousePosRef: React.RefObject<{ x: number; y: number; isInside: boolean }>;
  onSelectProject: (project: Project) => void;
  onNavigate?: (route: string) => void;
  onSelectTag?: (tag: string) => void;
  onCardMouseEnter: (index: number, clientX: number, clientY: number) => void;
  onCardMouseMove: (index: number, clientX: number, clientY: number) => void;
  onCardMouseLeave: (index: number) => void;
  setCardRef: (index: number, el: HTMLDivElement | null) => void;
}

const GalleryProjectCard: React.FC<GalleryProjectCardProps> = ({
  project,
  idx,
  isActive,
  mousePosRef,
  onSelectProject,
  onNavigate,
  onSelectTag,
  onCardMouseEnter,
  onCardMouseMove,
  onCardMouseLeave,
  setCardRef,
}) => {
  const { isHindi } = useLanguage();
  const localCardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);

  const slides = useMemo(() => {
    return project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [project.image || '/avatar-transparent.png'];
  }, [project.screenshots, project.image]);

  const displayUrl = useMemo(() => {
    if (project.links?.live) {
      try {
        return new URL(project.links.live).hostname;
      } catch {
        return project.links.live.replace(/^https?:\/\//, '').replace(/\/$/, '');
      }
    }
    return `${project.slug}.app`;
  }, [project.links?.live, project.slug]);

  const tilt = useRef({ rx: 0, ry: 0, nx: 0, ny: 0, gx: 50, gy: 50 });
  const currentTilt = useRef({ rx: 0, ry: 0, nx: 0, ny: 0, gx: 50, gy: 50 });
  const animFrame = useRef<number | null>(null);

  const assignRef = (el: HTMLDivElement | null) => {
    localCardRef.current = el;
    setCardRef(idx, el);
  };

  useEffect(() => {
    // Avoid running tilt loops on touch-only mobile devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const loop = () => {
      if (isActive && localCardRef.current && mousePosRef.current.isInside) {
        const rect = localCardRef.current.getBoundingClientRect();
        const clientX = mousePosRef.current.x;
        const clientY = mousePosRef.current.y;
        const nx = (clientX - rect.left) / rect.width - 0.5;
        const ny = (clientY - rect.top) / rect.height - 0.5;
        tilt.current = {
          rx: -ny * 7,
          ry: nx * 7,
          nx,
          ny,
          gx: ((clientX - rect.left) / rect.width) * 100,
          gy: ((clientY - rect.top) / rect.height) * 100,
        };
      } else {
        tilt.current = { rx: 0, ry: 0, nx: 0, ny: 0, gx: 50, gy: 50 };
      }

      currentTilt.current.rx += (tilt.current.rx - currentTilt.current.rx) * 0.12;
      currentTilt.current.ry += (tilt.current.ry - currentTilt.current.ry) * 0.12;
      currentTilt.current.nx += (tilt.current.nx - currentTilt.current.nx) * 0.12;
      currentTilt.current.ny += (tilt.current.ny - currentTilt.current.ny) * 0.12;
      currentTilt.current.gx += (tilt.current.gx - currentTilt.current.gx) * 0.12;
      currentTilt.current.gy += (tilt.current.gy - currentTilt.current.gy) * 0.12;

      const isSettling =
        Math.abs(currentTilt.current.rx) > 0.05 ||
        Math.abs(currentTilt.current.ry) > 0.05 ||
        Math.abs(currentTilt.current.nx) > 0.01 ||
        Math.abs(currentTilt.current.ny) > 0.01;

      if (localCardRef.current) {
        if (isActive || isSettling) {
          localCardRef.current.style.transform = `perspective(1000px) rotateX(${currentTilt.current.rx}deg) rotateY(${currentTilt.current.ry}deg) scale3d(1.008, 1.008, 1.008)`;
        } else {
          localCardRef.current.style.transform =
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      }

      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(450px circle at ${currentTilt.current.gx}% ${currentTilt.current.gy}%, rgba(255, 255, 255, 0.1), transparent 70%)`;
      }

      if (isActive || isSettling) {
        animFrame.current = requestAnimationFrame(loop);
      }
    };

    animFrame.current = requestAnimationFrame(loop);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isActive, mousePosRef]);

  const handleCardClick = () => {
    onSelectProject(project);
    if (onNavigate) {
      onNavigate(`/projects/${project.slug}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (idx % 2) * 0.1 }}
      className="flex flex-col h-full"
    >
      <div
        ref={assignRef}
        onClick={handleCardClick}
        onMouseEnter={(e) => onCardMouseEnter(idx, e.clientX, e.clientY)}
        onMouseMove={(e) => onCardMouseMove(idx, e.clientX, e.clientY)}
        onMouseLeave={() => onCardMouseLeave(idx)}
        style={{
          transformStyle: 'preserve-3d',
          transition: isActive
            ? 'none'
            : 'transform 0.4s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease',
        }}
        className={`group relative flex flex-col w-full h-full rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0c0d14] overflow-hidden transition-all duration-300 will-change-transform md:cursor-none cursor-pointer ${
          isActive
            ? 'shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/30'
            : 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-white/20'
        }`}
      >
        {/* Dynamic Specular Glare Sheen */}
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none z-20 transition-opacity duration-300"
          style={{ opacity: isActive ? 1 : 0 }}
        />

        {/* Ambient Hover Glow Tinted with Project Color */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl transition-opacity duration-500 pointer-events-none z-0"
          style={{
            opacity: isActive ? 1 : 0,
            boxShadow: `0 0 45px -10px ${project.color}35`,
          }}
        />

        {/* Top Accent Gradient Line */}
        <div
          className="absolute top-0 inset-x-0 h-[1.5px] transition-opacity duration-500 pointer-events-none z-10"
          style={{
            opacity: isActive ? 1 : 0.6,
            background: `linear-gradient(90deg, transparent 5%, ${project.color} 50%, transparent 95%)`,
          }}
        />

        {/* 1. Header Metadata Bar */}
        <div className="flex items-center justify-between gap-2.5 px-5 sm:px-6 pt-5 pb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-black font-mono tabular-nums px-2 py-0.5 rounded-md shrink-0 border"
              style={{
                background: `${project.color}20`,
                borderColor: `${project.color}40`,
                color: project.color,
              }}
            >
              {project.num || `0${idx + 1}`}
            </span>
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider truncate">
              {project.category}
            </span>
          </div>
          <span className="text-[10.5px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 shrink-0">
            {project.date}
          </span>
        </div>

        {/* 2. Brand Identity: Logo + Title + Details Arrow */}
        <div className="flex items-center gap-3.5 px-5 sm:px-6 pb-2.5 relative z-10">
          <LazyImage
            src={project.logo || '/logo.svg'}
            alt={project.title}
            className="w-full h-full object-contain p-1"
            containerClassName="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            style={{ backgroundColor: `${project.color}15`, borderColor: `${project.color}35` }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight truncate group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          <div
            className={`shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 ${
              isActive
                ? 'opacity-100 translate-x-0 bg-white/10'
                : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:bg-white/10'
            }`}
          >
            <svg
              className="w-4 h-4 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ color: project.color }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>

        {/* 3. Description (Concise & Minimal) */}
        <div className="px-5 sm:px-6 pb-3 relative z-10">
          <p className="line-clamp-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 4. Widescreen macOS Browser Dashboard Showcase */}
        <div className="mx-3.5 mb-3 sm:mx-5 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden relative h-[210px] sm:h-[250px] md:h-[280px] lg:h-[300px] bg-[#0c0e14] border border-white/10 group/frame shadow-2xl relative z-10">
          {/* macOS Browser Chrome Header */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#141722]/95 border-b border-white/10 select-none z-20 relative shrink-0">
            {/* Traffic Light Dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 inline-block shadow-sm" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 inline-block shadow-sm" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 inline-block shadow-sm" />
            </div>

            {/* Live Domain Bar */}
            <div className="flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-md bg-black/40 border border-white/5 max-w-[170px] sm:max-w-[260px] truncate">
              <svg className="w-2.5 h-2.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[10px] sm:text-[11px] font-mono text-white/70 truncate tracking-tight">
                {displayUrl}
              </span>
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 text-[9px] font-semibold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live App
              </span>
            </div>
          </div>

          {/* Screenshot Viewport with Multi-Slide Carousel */}
          <div className="relative w-full h-[calc(100%-33px)] overflow-hidden bg-black/90">
            <img
              src={slides[activeSlide]}
              alt={`${project.title} - ${project.category} Interface Preview ${activeSlide + 1}`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/frame:scale-[1.02]"
              loading="lazy"
            />

            {/* Slide Arrows on Hover */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
                  }}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-black/95 text-white/90 border border-white/20 flex items-center justify-center opacity-0 group-hover/frame:opacity-100 transition-opacity duration-200 z-30 cursor-pointer shadow-lg active:scale-95"
                  aria-label="Previous screenshot"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide((prev) => (prev + 1) % slides.length);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-black/95 text-white/90 border border-white/20 flex items-center justify-center opacity-0 group-hover/frame:opacity-100 transition-opacity duration-200 z-30 cursor-pointer shadow-lg active:scale-95"
                  aria-label="Next screenshot"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Story Navigation Dots */}
                <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-20 pointer-events-auto">
                  {slides.slice(0, 6).map((_, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(sIdx);
                      }}
                      className="py-1 px-0.5 cursor-pointer focus:outline-none"
                    >
                      <div
                        className="h-1 rounded-full transition-all duration-300"
                        style={{
                          width: sIdx === activeSlide ? '20px' : '6px',
                          backgroundColor: sIdx === activeSlide ? (project.color || '#fff') : 'rgba(255,255,255,0.4)',
                          boxShadow: sIdx === activeSlide ? `0 0 8px ${project.color || '#fff'}` : undefined,
                        }}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 5. Minimal Technology Tags */}
        <div className="flex flex-wrap gap-1.5 px-5 sm:px-6 pb-3 relative z-10">
          {project.tags.slice(0, 4).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectTag) onSelectTag(tag);
              }}
              className="px-2.5 py-0.5 text-[10.5px] sm:text-[11px] rounded-md bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] font-medium border border-white/10 transition-colors duration-200 cursor-pointer"
            >
              {tag}
            </button>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-zinc-500 rounded-md border border-white/5">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* 7. Action Footer: Explore Case Study + Live Demo + GitHub Source */}
        <div className="mt-auto px-5 sm:px-6 py-3.5 bg-black/30 border-t border-white/[0.07] flex items-center justify-between gap-3 relative z-10">
          <button
            type="button"
            onClick={handleCardClick}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white group-hover:text-primary transition-colors cursor-pointer"
          >
            <span>{isHindi ? 'केस स्टडी देखें' : 'Explore Case Study'}</span>
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/15 hover:bg-primary/25 border border-primary/30 text-white transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95"
                title="Open Live App"
              >
                <span>{isHindi ? 'लाइव ऐप' : 'Live App'}</span>
                <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors active:scale-95"
                title="Source Code on GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.839 1.236 1.838 1.236 1.07 1.834 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
  onNavigate?: (route: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Platforms' },
  { id: 'ai', label: 'Autonomous AI' },
  { id: 'enterprise', label: 'Enterprise & POS' },
  { id: 'fintech', label: 'FinTech & Web3' },
];

function matchesCategory(project: Project, catId: string): boolean {
  if (catId === 'all') return true;
  if (catId === 'ai') return project.id === 'nexlearn-ai' || project.id === 'visionary-ai';
  if (catId === 'enterprise') return project.id === 'nexpos';
  if (catId === 'fintech') return project.id === 'coinnova';
  return true;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onSelectProject,
  onNavigate,
}) => {
  const { t, isHindi } = useLanguage();
  const cursorBadgeRef = useRef<HTMLDivElement>(null);
  const cardElements = useRef<(HTMLDivElement | null)[]>([]);

  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const activeCardIndexRef = useRef<number | null>(null);
  const mousePos = useRef({ x: -1000, y: -1000, isInside: false });
  const targetCursor = useRef({ x: -1000, y: -1000, scale: 0, opacity: 0 });
  const currentCursor = useRef({ x: -1000, y: -1000, scale: 0, opacity: 0 });
  const scrollKick = useRef(0);
  const lastScrollY = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
  const animFrame = useRef<number | null>(null);

  const setCardRef = useCallback((index: number, el: HTMLDivElement | null) => {
    cardElements.current[index] = el;
  }, []);

  // Filtered projects list based on search, category, and active tag
  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((p) => {
      if (!matchesCategory(p, selectedCategory)) return false;
      if (selectedTag && !p.tags.includes(selectedTag)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(q);
        const descMatch = p.description.toLowerCase().includes(q);
        const catMatch = p.category.toLowerCase().includes(q);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!titleMatch && !descMatch && !catMatch && !tagMatch) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  const updateActiveCardFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      let foundIndex: number | null = null;
      for (let i = 0; i < filteredProjects.length; i++) {
        const el = cardElements.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
          ) {
            foundIndex = i;
            break;
          }
        }
      }

      if (foundIndex !== null) {
        if (activeCardIndexRef.current !== foundIndex) {
          activeCardIndexRef.current = foundIndex;
          setActiveCardIndex(foundIndex);
        }
        targetCursor.current = {
          x: clientX,
          y: clientY,
          scale: 1,
          opacity: 1,
        };
      } else {
        if (activeCardIndexRef.current !== null) {
          activeCardIndexRef.current = null;
          setActiveCardIndex(null);
        }
        targetCursor.current.scale = 0;
        targetCursor.current.opacity = 0;
      }
    },
    [filteredProjects.length]
  );

  const handleCardMouseEnter = useCallback(
    (index: number, clientX: number, clientY: number) => {
      mousePos.current = { x: clientX, y: clientY, isInside: true };
      activeCardIndexRef.current = index;
      setActiveCardIndex(index);
      targetCursor.current = { x: clientX, y: clientY, scale: 1, opacity: 1 };
    },
    []
  );

  const handleCardMouseMove = useCallback(
    (_index: number, clientX: number, clientY: number) => {
      mousePos.current = { x: clientX, y: clientY, isInside: true };
      targetCursor.current.x = clientX;
      targetCursor.current.y = clientY;
    },
    []
  );

  const handleCardMouseLeave = useCallback((_index: number) => {
    mousePos.current = { x: -1000, y: -1000, isInside: false };
    activeCardIndexRef.current = null;
    setActiveCardIndex(null);
    targetCursor.current.scale = 0;
    targetCursor.current.opacity = 0;
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY, isInside: true };
      updateActiveCardFromPoint(e.clientX, e.clientY);
    };

    const handleGlobalMouseLeave = () => {
      mousePos.current.isInside = false;
      activeCardIndexRef.current = null;
      setActiveCardIndex(null);
      targetCursor.current.scale = 0;
      targetCursor.current.opacity = 0;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!mousePos.current.isInside && activeCardIndexRef.current === null) return;
      const kick = Math.min(Math.max(Math.abs(e.deltaY) * 0.38, 7), 28);
      if (e.deltaY < 0) {
        scrollKick.current += kick;
      } else if (e.deltaY > 0) {
        scrollKick.current -= kick;
      }
      scrollKick.current = Math.max(-50, Math.min(50, scrollKick.current));

      if (mousePos.current.isInside) {
        updateActiveCardFromPoint(mousePos.current.x, mousePos.current.y);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleGlobalMouseLeave);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseleave', handleGlobalMouseLeave);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [updateActiveCardFromPoint]);

  useEffect(() => {
    const loop = () => {
      const currentScroll = window.scrollY;
      const scrollDiff = currentScroll - lastScrollY.current;
      if (Math.abs(scrollDiff) > 0.1) {
        if (mousePos.current.isInside) {
          updateActiveCardFromPoint(mousePos.current.x, mousePos.current.y);
        }
      }
      lastScrollY.current = currentScroll;

      scrollKick.current += (0 - scrollKick.current) * 0.09;

      currentCursor.current.x += (targetCursor.current.x - currentCursor.current.x) * 0.18;
      currentCursor.current.y += (targetCursor.current.y - currentCursor.current.y) * 0.18;
      currentCursor.current.scale += (targetCursor.current.scale - currentCursor.current.scale) * 0.18;
      currentCursor.current.opacity += (targetCursor.current.opacity - currentCursor.current.opacity) * 0.22;

      if (cursorBadgeRef.current) {
        const finalX = currentCursor.current.x + scrollKick.current;
        const finalY = currentCursor.current.y;
        cursorBadgeRef.current.style.transform = `translate3d(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px), 0) scale(${currentCursor.current.scale})`;
        cursorBadgeRef.current.style.opacity = `${currentCursor.current.opacity}`;
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    animFrame.current = requestAnimationFrame(loop);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [updateActiveCardFromPoint]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen py-20 md:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative select-none md:select-auto">
      {/* Floating Single Viewport Action Capsule Cursor */}
      <ProjectCursorBadge
        id="gallery-global"
        variant="gallery"
        cursorRef={cursorBadgeRef}
        activeColor={activeCardIndex !== null ? filteredProjects[activeCardIndex]?.color : undefined}
      />

      {/* ── Ambient Radial Background Glows ── */}
      <div
        className="fixed top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[300px] pointer-events-none -z-10 blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212, 84, 126, 0.35) 0%, transparent 70%)',
        }}
      />

      {/* ── Breadcrumb Bar ── */}
      <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 mb-5">
        <button
          type="button"
          onClick={() => onNavigate?.('/')}
          className="hover:text-primary transition-colors cursor-pointer"
        >
          {t.nav.home}
        </button>
        <span>/</span>
        <span className="text-zinc-300">{t.nav.projects}</span>
      </div>

      {/* ── 1. Hero Header Section ── */}
      <div className="text-center mb-8 sm:mb-10">
        {/* Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 shadow-inner mb-5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-300">
            {t.projects.sectionBadge}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
            {PORTFOLIO_DATA.projects.length} {isHindi ? 'प्लेटफॉर्म्स' : 'Platforms'}
          </span>
        </motion.div>

        {/* Dramatic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4"
        >
          {t.projects.heading}{' '}
          <span className="gradient-text italic font-serif inline-block">
            {t.projects.headingAccent}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t.projects.subtitle}
        </motion.p>

        {/* Minimal Understated Architecture Status */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-zinc-400 select-none"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {isHindi ? '4 प्रोडक्शन प्लेटफॉर्म्स' : '4 Production Platforms'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {isHindi ? '30+ आधुनिक तकनीकें' : '30+ Modern Technologies'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            {isHindi ? 'फुल-स्टैक सिस्टम्स' : 'Full-Stack Systems'}
          </span>
        </motion.div>
      </div>

      {/* ── 2. Interactive Search & Category Filter Toolbar ── */}
      <div className="mb-10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none select-none">
            {CATEGORIES.map((cat) => {
              const count = PORTFOLIO_DATA.projects.filter((p) => matchesCategory(p, cat.id)).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-primary text-white shadow-[0_0_15px_rgba(212,84,126,0.35)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'तकनीक या प्रोजेक्ट खोजें (जैसे Next.js, Spring Boot, AI)...' : 'Search stack or title (e.g. Next.js, Spring Boot, AI)...'}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs cursor-pointer p-0.5"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Badges Bar */}
        {(selectedTag || selectedCategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between gap-3 px-2 py-1 text-xs text-zinc-400 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span>Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-white flex items-center gap-1">
                  Category: {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-red-400 cursor-pointer">✕</button>
                </span>
              )}
              {selectedTag && (
                <span className="px-2 py-0.5 rounded-md bg-primary/20 border border-primary/30 text-primary flex items-center gap-1 font-mono">
                  Stack: {selectedTag}
                  <button onClick={() => setSelectedTag(null)} className="hover:text-white cursor-pointer">✕</button>
                </span>
              )}
              {searchQuery && (
                <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-white flex items-center gap-1">
                  Query: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-400 cursor-pointer">✕</button>
                </span>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-primary hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* ── 3. Projects Grid ── */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <GalleryProjectCard
                key={project.id}
                project={project}
                idx={idx}
                isActive={activeCardIndex === idx}
                mousePosRef={mousePos}
                onSelectProject={onSelectProject}
                onNavigate={onNavigate}
                onSelectTag={(tag) => setSelectedTag(tag)}
                onCardMouseEnter={handleCardMouseEnter}
                onCardMouseMove={handleCardMouseMove}
                onCardMouseLeave={handleCardMouseLeave}
                setCardRef={setCardRef}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 rounded-3xl bg-white/[0.02] border border-white/10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{isHindi ? 'कोई प्रोजेक्ट नहीं मिला' : 'No projects found'}</h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
            {isHindi
              ? 'वर्तमान फ़िल्टर या खोज के अनुरूप कोई प्रोजेक्ट नहीं मिला। कृपया फ़िल्टर रीसेट करें।'
              : 'No projects matched your current filters or search query. Try clearing filters or searching for another technology.'}
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-lg hover:brightness-110 transition-all cursor-pointer"
          >
            {isHindi ? 'फ़िल्टर हटाएं व सभी देखें' : 'Clear Filters & View All'}
          </button>
        </div>
      )}

      {/* ── 4. Bottom Collaboration Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#161824] to-[#0c0d14] border border-white/10 relative overflow-hidden text-center shadow-2xl"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(212, 84, 126, 0.25) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary font-semibold px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 inline-block mb-4">
            {isHindi ? 'सहयोग व चर्चा' : "Let's Collaborate"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            {isHindi ? 'कोई तकनीकी चुनौती या बड़ा विचार है?' : 'Have an architectural challenge or ambitious idea?'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mb-8 leading-relaxed">
            {isHindi
              ? 'चाहे आप उच्च-क्षमता क्लाउड बैकएंड, एआई सिस्टम, या रीयल-टाइम वेब ऐप्स बना रहे हों — आइए मिलकर कुछ उत्कृष्ट बनाते हैं।'
              : "Whether you're building high-throughput cloud backends, AI-powered ecosystems, or real-time web applications, let's connect and engineer something exceptional."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-[0_0_20px_rgba(212,84,126,0.4)] hover:brightness-110 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span>{t.hero.contactMe}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <a
                href="mailto:aniketmeshram445@gmail.com"
                className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-[0_0_20px_rgba(212,84,126,0.4)] hover:brightness-110 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span>{t.hero.contactMe}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
            <a
              href="/Aniket_Resume.pdf"
              download="Aniket_Resume.pdf"
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{t.hero.downloadResume}</span>
            </a>
            {onNavigate && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate('/blog')}
                  className="px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>{isHindi ? 'आर्किटेक्चर ब्लॉग' : 'Architecture Blog'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/wall')}
                  className="px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>{isHindi ? 'द वॉल' : 'The Wall'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};