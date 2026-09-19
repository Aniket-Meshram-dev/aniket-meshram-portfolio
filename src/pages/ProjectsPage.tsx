import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA, type Project } from '@/data/portfolioData';
import { LazyImage } from '@/components/ui/LazyImage';
import { ProjectCursorBadge } from '@/components/ui/ProjectCursorBadge';

interface GalleryProjectCardProps {
  project: Project;
  idx: number;
  isActive: boolean;
  mousePosRef: React.RefObject<{ x: number; y: number; isInside: boolean }>;
  onSelectProject: (project: Project) => void;
  onNavigate?: (route: string) => void;
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
  onCardMouseEnter,
  onCardMouseMove,
  onCardMouseLeave,
  setCardRef,
}) => {
  const localCardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const phoneLeftRef = useRef<HTMLDivElement>(null);
  const phoneCenterRef = useRef<HTMLDivElement>(null);
  const phoneRightRef = useRef<HTMLDivElement>(null);

  const tilt = useRef({ rx: 0, ry: 0, nx: 0, ny: 0, gx: 50, gy: 50 });
  const currentTilt = useRef({ rx: 0, ry: 0, nx: 0, ny: 0, gx: 50, gy: 50 });
  const animFrame = useRef<number | null>(null);

  const assignRef = (el: HTMLDivElement | null) => {
    localCardRef.current = el;
    setCardRef(idx, el);
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

      if (phoneLeftRef.current) {
        phoneLeftRef.current.style.transform = `translate3d(${currentTilt.current.nx * -18}px, ${currentTilt.current.ny * -10}px, 0)`;
      }
      if (phoneCenterRef.current) {
        phoneCenterRef.current.style.transform = `translate3d(${currentTilt.current.nx * 22}px, ${currentTilt.current.ny * 16}px, 0)`;
      }
      if (phoneRightRef.current) {
        phoneRightRef.current.style.transform = `translate3d(${currentTilt.current.nx * 14}px, ${currentTilt.current.ny * -8}px, 0)`;
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    animFrame.current = requestAnimationFrame(loop);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isActive, mousePosRef]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (idx % 4) * 0.1 }}
      className="flex"
    >
      <div
        ref={assignRef}
        onClick={() => {
          onSelectProject(project);
          if (onNavigate) {
            onNavigate(`/projects/${project.slug}`);
          }
        }}
        onMouseEnter={(e) => onCardMouseEnter(idx, e.clientX, e.clientY)}
        onMouseMove={(e) => onCardMouseMove(idx, e.clientX, e.clientY)}
        onMouseLeave={() => onCardMouseLeave(idx)}
        style={{
          transformStyle: 'preserve-3d',
          transition: isActive
            ? 'none'
            : 'transform 0.4s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease',
        }}
        className={`group relative flex flex-col w-full rounded-2xl border border-white/10 bg-[#0a0a0c] overflow-hidden transition-shadow duration-300 will-change-transform md:cursor-none cursor-pointer ${
          isActive ? 'shadow-2xl border-white/25' : 'hover:shadow-2xl hover:border-white/25'
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

        {/* Subtle hover glow */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none z-0"
          style={{
            opacity: isActive ? 1 : 0,
            boxShadow: `0 0 24px -6px ${project.color}35`,
          }}
        />
        <div
          className="absolute top-0 inset-x-0 h-px transition-opacity duration-500 pointer-events-none z-10"
          style={{
            opacity: isActive ? 1 : 0,
            background: `linear-gradient(90deg, transparent 10%, ${project.color} 50%, transparent 90%)`,
          }}
        />

        {/* 1. Dashed Metadata Header */}
        <div className="flex items-center gap-2.5 px-5 pt-5 pb-2 relative z-10">
          <span
            className="text-[11px] font-black font-mono tabular-nums px-2 py-0.5 rounded-md shrink-0"
            style={{
              background: `${project.color}25`,
              color: project.color,
            }}
          >
            {project.num}
          </span>
          <span className="flex-1 border-t border-dashed border-white/15" />
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest shrink-0">
            {project.category}
          </span>
          <span className="flex-1 border-t border-dashed border-white/15" />
          <span className="text-[10px] font-mono text-zinc-400 shrink-0">
            {project.date}
          </span>
        </div>

        {/* 2. Logo, Title & Arrow */}
        <div className="flex items-center gap-3 px-5 pb-1.5 relative z-10">
          <LazyImage
            src={project.logo || '/logo.svg'}
            alt={project.title}
            className="w-full h-full object-contain p-1"
            containerClassName="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl overflow-hidden shrink-0 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            style={{ backgroundColor: `${project.color}18`, borderColor: `${project.color}35` }}
          />
          <h3 className="flex-1 text-xl md:text-2xl font-extrabold text-white leading-tight truncate">
            {project.title}
          </h3>
          <div
            className={`shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 ${
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

        {/* 3. Description */}
        <div className="px-5 pb-3 relative z-10">
          <p className="line-clamp-2 min-h-[2.5rem] text-sm md:text-base text-zinc-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 4. Visual Mockup Frame Box with Multi-Layer Parallax Phone Stacks */}
        <div className="mx-3 mb-3 md:mx-4 md:mb-4 rounded-xl overflow-hidden relative h-[210px] md:h-[260px]">
          <div
            className="h-full flex flex-col relative overflow-hidden"
            style={{ background: project.bgGradient }}
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.7) 0.8px, transparent 0.8px)',
                backgroundSize: '18px 18px',
              }}
            />

            {/* Screenshots with multi-layer depth */}
            <div className="flex items-end justify-center relative z-[1] mt-auto translate-y-6 md:translate-y-10">
              {project.screenshots[0] && (
                <div
                  ref={phoneLeftRef}
                  className="relative inline-block rounded-[1.2rem] bg-black p-[1.5px] shadow-lg shadow-black/60 overflow-hidden w-28 md:w-36 -mr-4 md:-mr-6 rotate-[-7deg] shrink-0 will-change-transform"
                >
                  <div className="relative aspect-[9/19.5] w-full rounded-[1.2rem] overflow-hidden">
                    <LazyImage
                      src={project.screenshots[0]}
                      alt={`${project.title} preview 1`}
                      className="rounded-[1.2rem] object-cover w-full h-full"
                      containerClassName="w-full h-full"
                    />
                  </div>
                </div>
              )}
              {project.screenshots[1] && (
                <div
                  ref={phoneCenterRef}
                  className="relative inline-block rounded-[1.2rem] bg-black p-[1.5px] shadow-2xl shadow-black/80 overflow-hidden w-32 md:w-40 z-10 shrink-0 will-change-transform"
                >
                  <div className="relative aspect-[9/19.5] w-full rounded-[1.2rem] overflow-hidden">
                    <LazyImage
                      src={project.screenshots[1]}
                      alt={`${project.title} preview 2`}
                      className="rounded-[1.2rem] object-cover w-full h-full"
                      containerClassName="w-full h-full"
                    />
                  </div>
                </div>
              )}
              {project.screenshots[2] && (
                <div
                  ref={phoneRightRef}
                  className="relative inline-block rounded-[1.2rem] bg-black p-[1.5px] shadow-lg shadow-black/60 overflow-hidden w-28 md:w-36 -ml-4 md:-ml-6 rotate-[7deg] shrink-0 will-change-transform"
                >
                  <div className="relative aspect-[9/19.5] w-full rounded-[1.2rem] overflow-hidden">
                    <LazyImage
                      src={project.screenshots[2]}
                      alt={`${project.title} preview 3`}
                      className="rounded-[1.2rem] object-cover w-full h-full"
                      containerClassName="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 5. Tech Tags */}
        <div className="flex flex-wrap gap-1.5 px-5 pb-4 pt-0 mt-auto relative z-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] md:text-xs rounded-full bg-white/[0.04] text-zinc-400 font-medium border border-white/10 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
  onNavigate?: (route: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onSelectProject,
  onNavigate,
}) => {
  const cursorBadgeRef = useRef<HTMLDivElement>(null);
  const cardElements = useRef<(HTMLDivElement | null)[]>([]);

  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

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

  const updateActiveCardFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      let foundIndex: number | null = null;
      for (let i = 0; i < PORTFOLIO_DATA.projects.length; i++) {
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
    []
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

  useEffect(() => {
    const loop = () => {
      // Check vertical scroll movement to detect when cards move under stationary mouse
      const currentScroll = window.scrollY;
      const scrollDiff = currentScroll - lastScrollY.current;
      if (Math.abs(scrollDiff) > 0.1) {
        // When cards move underneath mouse, update active card seamlessly
        if (mousePos.current.isInside) {
          updateActiveCardFromPoint(mousePos.current.x, mousePos.current.y);
        }
      }
      lastScrollY.current = currentScroll;

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
    <div className="min-h-screen py-24 md:py-32 px-6 max-w-6xl mx-auto relative">
      {/* Floating Single Viewport Action Capsule Cursor */}
      <ProjectCursorBadge
        id="gallery-global"
        variant="gallery"
        cursorRef={cursorBadgeRef}
        activeColor={activeCardIndex !== null ? PORTFOLIO_DATA.projects[activeCardIndex]?.color : undefined}
      />

      {/* Signature Header matching aniketmeshram.me */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 font-mono"
        >
          Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-serif"
        >
          Projects{' '}
          <span
            className="italic font-bold bg-clip-text text-transparent inline-block -mx-2 px-4 -my-1 py-1"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgb(255, 0, 153), rgb(255, 154, 210))',
            }}
          >
            Gallery
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed"
        >
          A collection of projects I've built with passion and dedication.
        </motion.p>
      </div>

      {/* 2-Column Grid of all 18 Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PORTFOLIO_DATA.projects.map((project, idx) => (
          <GalleryProjectCard
            key={project.id}
            project={project}
            idx={idx}
            isActive={activeCardIndex === idx}
            mousePosRef={mousePos}
            onSelectProject={onSelectProject}
            onNavigate={onNavigate}
            onCardMouseEnter={handleCardMouseEnter}
            onCardMouseMove={handleCardMouseMove}
            onCardMouseLeave={handleCardMouseLeave}
            setCardRef={setCardRef}
          />
        ))}
      </div>
    </div>
  );
};