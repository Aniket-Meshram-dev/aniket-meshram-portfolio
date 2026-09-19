import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA, type Project } from '@/data/portfolioData';
import { LazyImage } from '@/components/ui/LazyImage';
import { ProjectCursorBadge } from '@/components/ui/ProjectCursorBadge';

/* ───────────────────────────────────────────────────────────────
 *  WebDashboardShowcase
 *
 *  Institutional-grade PC / macOS browser window frame featuring:
 *  - Traffic light window controls + SSL lock domain bar
 *  - Auto-advancing multi-screenshot desktop showcase
 *  - Instant looping video teaser crossfade on card hover
 *  - Story-style progress bars & manual navigation arrows
 * ─────────────────────────────────────────────────────────────── */
interface WebDashboardShowcaseProps {
  project: Project;
  isActive: boolean;
  dashboardRef?: React.RefObject<HTMLDivElement | null>;
}

const WebDashboardShowcase: React.FC<WebDashboardShowcaseProps> = ({
  project,
  isActive,
  dashboardRef,
}) => {
  const slides = useMemo(() => {
    if (project.screenshots && project.screenshots.length > 0) {
      return project.screenshots.slice(0, 5);
    }
    return [project.image || project.logo || '/logo.svg'];
  }, [project.screenshots, project.image, project.logo]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-advance screenshots on interval when NOT hovered
  useEffect(() => {
    if (isActive && project.video) return; // Pause auto-advance when watching video teaser
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isActive, project.video, slides.length]);

  // Video walkthrough teaser playback control
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.video) return;

    if (isActive) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Catch potential browser autoplay policies gracefully
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, project.video]);

  // Extract clean domain for the browser address bar
  const displayUrl = useMemo(() => {
    if (project.links?.live) {
      try {
        const url = new URL(project.links.live);
        return url.hostname;
      } catch {
        return project.links.live.replace(/^https?:\/\//, '').replace(/\/$/, '');
      }
    }
    return `${project.slug}.app`;
  }, [project.links?.live, project.slug]);

  return (
    <div
      ref={dashboardRef}
      className="w-full h-full flex flex-col rounded-xl overflow-hidden bg-[#0d1117] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md will-change-transform"
      style={{
        boxShadow: isActive
          ? `0 24px 60px -12px rgba(0, 0, 0, 0.8), 0 0 32px -4px ${project.color}35`
          : '0 18px 40px -10px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* ── Browser Chrome Header ── */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#161b22]/95 border-b border-white/10 select-none z-20 shrink-0">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 inline-block shadow-sm" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 inline-block shadow-sm" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 inline-block shadow-sm" />
        </div>

        {/* URL / Domain Bar */}
        <div className="flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-md bg-black/40 border border-white/5 max-w-[180px] sm:max-w-[260px] truncate">
          <svg
            className="w-2.5 h-2.5 text-emerald-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span className="text-[10px] sm:text-[11px] font-mono text-white/75 truncate tracking-tight">
            {displayUrl}
          </span>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isActive && project.video ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/35 text-[9px] font-bold tracking-wide uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Live Teaser
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 text-[9px] font-semibold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Web Dashboard
            </span>
          )}

          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hidden sm:flex items-center justify-center w-5 h-5 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              title="Open Live App"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* ── Viewport Area ── */}
      <div className="relative flex-1 w-full overflow-hidden bg-black/80 group/viewport">
        {/* Active Screenshot Display */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={slides[activeSlide]}
            alt={`${project.title} screenshot ${activeSlide + 1}`}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
            style={{
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
            }}
          />
        </div>

        {/* Video Walkthrough Teaser Overlay */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-10"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
              transition: 'opacity 0.4s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        )}

        {/* Ambient Top Light Reflection */}
        <div
          className="absolute inset-0 pointer-events-none z-15 opacity-40"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 35%, rgba(0,0,0,0.3) 100%)',
          }}
        />

        {/* Previous / Next Arrows on Viewport Hover */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/65 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 flex items-center justify-center opacity-0 group-hover/viewport:opacity-100 transition-all duration-200 z-30 shadow-lg backdrop-blur-md cursor-pointer active:scale-95"
              aria-label="Previous screenshot"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide((prev) => (prev + 1) % slides.length);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/65 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 flex items-center justify-center opacity-0 group-hover/viewport:opacity-100 transition-all duration-200 z-30 shadow-lg backdrop-blur-md cursor-pointer active:scale-95"
              aria-label="Next screenshot"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Story Progress Bars at Bottom */}
        <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-30 pointer-events-auto">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(idx);
              }}
              className="py-1 px-0.5 focus:outline-none cursor-pointer"
              aria-label={`Show screenshot ${idx + 1}`}
            >
              <div
                className="h-1 rounded-full transition-all duration-300 backdrop-blur-md"
                style={{
                  width: idx === activeSlide ? '24px' : '7px',
                  backgroundColor:
                    idx === activeSlide
                      ? (project.color || '#ffffff')
                      : 'rgba(255, 255, 255, 0.4)',
                  boxShadow:
                    idx === activeSlide
                      ? `0 0 10px ${project.color || '#ffffff'}`
                      : undefined,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  mousePosRef: React.RefObject<{ x: number; y: number; isInside: boolean }>;
  onSelectProject: (project: Project) => void;
  onNavigate: (route: string) => void;
  onCardMouseEnter: (index: number, clientX: number, clientY: number) => void;
  onCardMouseMove: (index: number, clientX: number, clientY: number) => void;
  onCardMouseLeave: (index: number) => void;
  setCardRef: (index: number, el: HTMLDivElement | null) => void;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  project,
  index,
  isActive,
  mousePosRef,
  onSelectProject,
  onNavigate,
  onCardMouseEnter,
  onCardMouseMove,
  onCardMouseLeave,
  setCardRef,
}) => {
  const localCardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const dashboardFrameRef = useRef<HTMLDivElement>(null);

  const tilt = useRef({ rx: 0, ry: 0, nx: 0, ny: 0, gx: 50, gy: 50 });
  const currentTilt = useRef({ rx: 0, ry: 0, nx: 0, ny: 0, gx: 50, gy: 50 });
  const animFrame = useRef<number | null>(null);

  const assignRef = (el: HTMLDivElement | null) => {
    localCardRef.current = el;
    setCardRef(index, el);
  };

  useEffect(() => {
    const loop = () => {
      if (isActive && localCardRef.current && mousePosRef.current.isInside) {
        const rect = localCardRef.current.getBoundingClientRect();
        const clientX = mousePosRef.current.x;
        const clientY = mousePosRef.current.y;
        const nx = (clientX - rect.left) / rect.width - 0.5;
        const ny = (clientY - rect.top) / rect.height - 0.5;
        tilt.current = {
          rx: -ny * 9,
          ry: nx * 9,
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

      if (localCardRef.current) {
        if (isActive || Math.abs(currentTilt.current.rx) > 0.05) {
          localCardRef.current.style.transform = `perspective(1000px) rotateX(${currentTilt.current.rx}deg) rotateY(${currentTilt.current.ry}deg) scale3d(1.012, 1.012, 1.012)`;
        } else {
          localCardRef.current.style.transform =
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      }

      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(450px circle at ${currentTilt.current.gx}% ${currentTilt.current.gy}%, rgba(255, 255, 255, 0.12), transparent 70%)`;
      }

      if (dashboardFrameRef.current) {
        dashboardFrameRef.current.style.transform = `translate3d(${currentTilt.current.nx * 14}px, ${currentTilt.current.ny * 10}px, 0)`;
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    animFrame.current = requestAnimationFrame(loop);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isActive, mousePosRef]);

  return (
    <div
      ref={assignRef}
      onClick={() => {
        onSelectProject(project);
        onNavigate(`/projects/${project.slug}`);
      }}
      onMouseEnter={(e) => onCardMouseEnter(index, e.clientX, e.clientY)}
      onMouseMove={(e) => onCardMouseMove(index, e.clientX, e.clientY)}
      onMouseLeave={() => onCardMouseLeave(index)}
      style={{
        transformStyle: 'preserve-3d',
        transition: isActive
          ? 'none'
          : 'transform 0.4s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease',
      }}
      data-cursor="hidden"
      className={`group relative flex flex-col w-full h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden transition-shadow duration-300 will-change-transform md:cursor-none cursor-pointer ${
        isActive ? 'shadow-2xl border-white/25' : 'hover:shadow-2xl'
      }`}
    >
      {/* Dynamic Specular Glare Sheen */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-opacity duration-300"
        style={{
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Subtle Ambient Glow on Card Hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none z-0"
        style={{
          opacity: isActive ? 1 : 0,
          boxShadow: `0 0 32px -6px ${project.color}40`,
        }}
      />

      {/* Top Accent Line */}
      <div
        className="absolute top-0 inset-x-0 h-px transition-opacity duration-500 pointer-events-none z-10"
        style={{
          opacity: isActive ? 1 : 0,
          background: `linear-gradient(90deg, transparent 10%, ${project.color} 50%, transparent 90%)`,
        }}
      />

      {/* Dashed Metadata Header */}
      <div className="flex items-center gap-2.5 px-5 pt-4 pb-1.5 relative z-10">
        <span
          className="text-[10.5px] font-black font-mono tabular-nums px-2.5 py-0.5 rounded-md shrink-0"
          style={{
            background: `${project.color}18`,
            color: project.color,
          }}
        >
          {project.num}
        </span>
        <span className="flex-1 border-t border-dashed border-[var(--color-border)]" />
        <span className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider truncate shrink-0 max-w-[240px]">
          {project.category}
        </span>
        <span className="flex-1 border-t border-dashed border-[var(--color-border)]" />
        <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] shrink-0">
          {project.date}
        </span>
      </div>

      {/* Logo, Title & Arrow */}
      <div className="flex items-center gap-3 px-5 pb-1 relative z-10">
        <LazyImage
          src={project.logo || '/logo.svg'}
          alt={project.title}
          className="w-full h-full object-contain p-1"
          containerClassName="w-9 h-9 rounded-xl overflow-hidden shrink-0 ring-1 ring-[var(--color-border)] transition-transform duration-300 group-hover:scale-105 md:w-10 md:h-10 md:rounded-xl flex items-center justify-center bg-black/30 dark:bg-black/30 backdrop-blur-sm"
          style={{ backgroundColor: `${project.color}18`, borderColor: `${project.color}35` }}
        />
        <h3 className="flex-1 text-lg font-extrabold text-[var(--color-text)] leading-tight truncate md:text-xl">
          {project.title}
        </h3>
        <div
          className={`shrink-0 w-6.5 h-6.5 rounded-full border border-[var(--color-border)] flex items-center justify-center transition-all duration-300 ${
            isActive
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
          }`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ color: project.color }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 pb-2.5 relative z-10">
        <p className="clamp-2 min-h-[2lh] text-xs text-[var(--color-text-secondary)] leading-relaxed md:text-sm">
          {project.description}
        </p>
      </div>

      {/* Visual Showcase Box: Web Dashboard & Live Teaser */}
      <div className="project-card-showcase group/showcase mx-3 mb-3 rounded-xl overflow-hidden relative h-[210px] sm:h-[250px] md:h-[300px] lg:h-[320px] md:mx-4 md:mb-3.5">
        <div
          className="h-full flex flex-col relative overflow-hidden p-3 md:p-4"
          style={{ background: project.bgGradient }}
        >
          {/* Dot Matrix Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0.8px, transparent 0.8px)',
              backgroundSize: '18px 18px',
            }}
          />

          {/* Web Dashboard Browser Frame */}
          <div className="relative z-10 w-full h-full">
            <WebDashboardShowcase
              project={project}
              isActive={isActive}
              dashboardRef={dashboardFrameRef}
            />
          </div>
        </div>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap items-center gap-1.5 px-5 pb-3.5 pt-0 mt-auto relative z-10">
        {project.tags.slice(0, 6).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 text-[11px] rounded-md bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] font-medium border border-[var(--color-border)] transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 6 && (
          <span className="px-2 py-0.5 text-[10.5px] font-mono text-[var(--color-text-tertiary)] rounded-md border border-[var(--color-border)]/50">
            +{project.tags.length - 6}
          </span>
        )}
      </div>
    </div>
  );
};

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onNavigate: (route: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorBadgeRef = useRef<HTMLDivElement>(null);
  const cardElements = useRef<(HTMLDivElement | null)[]>([]);

  const [scrollRange, setScrollRange] = useState(3200);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const activeCardIndexRef = useRef<number | null>(null);
  const mousePos = useRef({ x: -1000, y: -1000, isInside: false });
  const targetCursor = useRef({ x: -1000, y: -1000, scale: 0, opacity: 0 });
  const currentCursor = useRef({ x: -1000, y: -1000, scale: 0, opacity: 0 });
  const scrollKick = useRef(0);
  const lastTrackLeft = useRef<number | null>(null);
  const animFrame = useRef<number | null>(null);

  const featuredProjects = PORTFOLIO_DATA.projects.filter((p) => p.featured);

  const setCardRef = useCallback((index: number, el: HTMLDivElement | null) => {
    cardElements.current[index] = el;
  }, []);

  const updateActiveCardFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      let foundIndex: number | null = null;
      for (let i = 0; i < featuredProjects.length; i++) {
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
    [featuredProjects.length]
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

  const handleCardMouseLeave = useCallback((index: number) => {
    if (activeCardIndexRef.current === index) {
      activeCardIndexRef.current = null;
      setActiveCardIndex(null);
      targetCursor.current.scale = 0;
      targetCursor.current.opacity = 0;
    }
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

      // User requirement:
      // "upar scroll karne par cursor aage hona chahiye and scroll down karne par cursor backword direction me move hona chahiye"
      // Scrolling up (e.deltaY < 0): forward / aage (+X kick towards next card)
      // Scrolling down (e.deltaY > 0): backward (-X kick towards previous card)
      const kick = Math.min(Math.max(Math.abs(e.deltaY) * 0.38, 7), 28);
      if (e.deltaY < 0) {
        scrollKick.current += kick; // aage (forward)
      } else if (e.deltaY > 0) {
        scrollKick.current -= kick; // backward
      }
      scrollKick.current = Math.max(-50, Math.min(50, scrollKick.current));

      // As cards scroll under stationary mouse pointer, recheck active card
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        const totalW = trackRef.current.scrollWidth;
        const viewW = window.innerWidth;
        const range = Math.max(1800, totalW - viewW + 160);
        setScrollRange(range);
      }
    };
    updateRange();
    const t = setTimeout(updateRange, 150);
    window.addEventListener('resize', updateRange);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateRange);
    };
  }, [featuredProjects.length]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  useEffect(() => {
    const loop = () => {
      // Check track movement to detect when cards move under stationary mouse
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        if (lastTrackLeft.current !== null) {
          const deltaX = rect.left - lastTrackLeft.current;
          if (Math.abs(deltaX) > 0.15) {
            // Track moving left (deltaX < 0) means advancing forward to next card
            // Track moving right (deltaX > 0) means going backward to previous card
            const forwardMove = -deltaX;
            const motionKick = Math.sign(forwardMove) * Math.min(Math.abs(forwardMove) * 0.9, 14);
            scrollKick.current += motionKick;
            scrollKick.current = Math.max(-50, Math.min(50, scrollKick.current));

            // Seamlessly transfer active card to the card currently under the mouse
            if (mousePos.current.isInside) {
              updateActiveCardFromPoint(mousePos.current.x, mousePos.current.y);
            }
          }
        }
        lastTrackLeft.current = rect.left;
      }

      // Smooth decay of scroll kick back to 0
      scrollKick.current += (0 - scrollKick.current) * 0.09;

      // Smooth LERP of cursor position, scale, opacity
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

  return (
    <div
      id="projects"
      ref={containerRef}
      className="relative"
      style={{ height: '3200px' }}
    >
      {/* Floating Single Viewport Action Capsule Cursor */}
      <ProjectCursorBadge
        id="featured-global"
        variant="featured"
        cursorRef={cursorBadgeRef}
        activeColor={activeCardIndex !== null ? featuredProjects[activeCardIndex]?.color : undefined}
      />

      <section className="md:sticky md:top-0 md:h-screen overflow-hidden">
        <div className="md:h-full md:flex md:flex-col md:justify-center pt-24 md:pt-24 pb-8 md:pb-10">
          {/* Section Heading: aligned within max-w-6xl matching standard page grid */}
          <div className="w-full max-w-6xl mx-auto px-6 mb-6 md:mb-5 shrink-0">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-[var(--color-text)]"
            >
              Featured Projects
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 h-1 w-16 rounded-full bg-primary"
            />
          </div>

          {/* Reel Track - Perfectly aligned with heading on left, balanced compact card widths */}
          <div className="overflow-hidden w-full">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="w-max flex gap-6 md:gap-7 pb-4 flex-nowrap justify-start px-6 md:ps-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
            >
              {featuredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="shrink-0 w-[340px] sm:w-[440px] md:w-[560px] lg:w-[600px] flex"
                >
                  <FeaturedProjectCard
                    project={project}
                    index={idx}
                    isActive={activeCardIndex === idx}
                    mousePosRef={mousePos}
                    onSelectProject={onSelectProject}
                    onNavigate={onNavigate}
                    onCardMouseEnter={handleCardMouseEnter}
                    onCardMouseMove={handleCardMouseMove}
                    onCardMouseLeave={handleCardMouseLeave}
                    setCardRef={setCardRef}
                  />
                </div>
              ))}

              {/* 6th Card: "View All Projects" CTA Card */}
              <div className="shrink-0 w-[260px] sm:w-[300px] md:w-[360px] flex">
                <div
                  onClick={() => {
                    onNavigate('/projects');
                  }}
                  className="group/cta relative flex flex-col items-center justify-center h-full w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_60px_-15px_rgba(212,84,126,0.25)] cursor-pointer py-12 md:py-0"
                >
                  {/* Subtle Ambient Radial Glow on Hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at center, rgba(212, 84, 126, 0.14) 0%, transparent 68%)',
                    }}
                  />

                  {/* Top Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-[1.5px] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

                  {/* Aurora Drift Blobs */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                      className="absolute -top-1/2 -left-1/4 w-3/4 h-full rounded-full opacity-[0.03] group-hover/cta:opacity-[0.06] transition-opacity duration-1000 blur-3xl bg-primary"
                      style={{
                        animation:
                          '14s ease-in-out 0s infinite normal none running cta-aurora-drift',
                      }}
                    />
                    <div
                      className="absolute -bottom-1/3 -right-1/4 w-2/3 h-3/4 rounded-full opacity-[0.02] group-hover/cta:opacity-[0.05] transition-opacity duration-1000 blur-3xl bg-primary-light"
                      style={{
                        animation:
                          '18s ease-in-out 0s infinite normal none running cta-aurora-drift-alt',
                      }}
                    />
                  </div>

                  {/* Subtle Grid Lines */}
                  <div
                    className="absolute inset-0 opacity-[0.015] group-hover/cta:opacity-[0.03] transition-opacity duration-700 pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Content Container */}
                  <div className="flex flex-col items-center gap-7 px-8 py-12 md:py-0 relative z-10">
                    <div className="relative">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-primary/10 border border-primary/25 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover/cta:scale-105 group-hover/cta:bg-primary/15 group-hover/cta:border-primary/45 group-hover/cta:shadow-[0_0_30px_rgba(212,84,126,0.3)]">
                        <svg
                          className="w-8 h-8 md:w-10 md:h-10 text-primary transition-all duration-500 group-hover/cta:rotate-6 group-hover/cta:scale-105"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl md:text-2xl font-extrabold text-[var(--color-text)] mb-2 transition-colors duration-300">
                        View All Projects
                      </h3>
                      <p className="text-sm text-[var(--color-text-tertiary)] transition-colors duration-300 group-hover/cta:text-[var(--color-text-secondary)]">
                        See the full collection
                      </p>
                    </div>

                    <div className="relative overflow-hidden flex items-center gap-2.5 px-6 py-3 rounded-full border border-[var(--color-border)] transition-all duration-300 group-hover/cta:border-primary/40 group-hover/cta:bg-primary/10">
                      <span className="text-sm font-semibold text-[var(--color-text-secondary)] transition-colors duration-300 group-hover/cta:text-primary relative z-[1]">
                        Explore
                      </span>
                      <svg
                        className="w-4 h-4 text-[var(--color-text-secondary)] transition-all duration-300 group-hover/cta:translate-x-1 group-hover/cta:text-primary relative z-[1]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* End Spacer */}
              <div className="hidden md:block shrink-0 w-2" aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
