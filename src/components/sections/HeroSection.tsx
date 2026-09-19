import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Magnetic } from '@/components/ui/Magnetic';
import { useSmoothScroll } from '@/context/SmoothScrollContext';
import { useLanguage } from '@/context/LanguageContext';

const ITEMS_TOP = [
  'Full-Stack Developer',
  'React & Next.js',
  'Java & Spring Boot',
  'PostgreSQL',
  'REST APIs',
  'Tailwind CSS',
];

const ITEMS_BOTTOM = [
  'Web Development',
  'Frontend & Backend',
  'Problem Solving',
  'Clean Code',
  'Database Management',
  'Software Engineering',
];

interface HeroSectionProps {
  onNavigate?: (route: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { scrollToElement } = useSmoothScroll();
  const { t, isHindi } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Scroll-Driven Parallax Exit
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Typography Exit: scale down (1 -> 0.9), blur out (0px -> 8px), y shift (0 -> -80), opacity (1 -> 0)
  const contentScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.9]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.65], [0, -80]);
  const contentFilter = useTransform(scrollYProgress, [0, 0.55], ['blur(0px)', 'blur(8px)']);

  // Background Beams: Deep freeze effect (holds high opacity initially, then fades with subtle drift)
  const beamsOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75], [1, 0.85, 0]);
  const beamsY = useTransform(scrollYProgress, [0, 0.75], [0, 60]);

  // Ribbons & Particles Exit
  const ribbonsOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ribbonsY = useTransform(scrollYProgress, [0, 0.6], [0, 40]);
  const particlesOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Floating Scroll Cue Exit (fades out rapidly on initial scroll down)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.12], [0, 15]);

  // Interactive Mouse-Reactive 3D Perspective Shift (Cockpit / Hyperspace Depth)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const target = { rx: 0, ry: 0, tx: 0, ty: 0 };
    const current = { rx: 0, ry: 0, tx: 0, ty: 0 };
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nx = e.clientX / w - 0.5;
      const ny = e.clientY / h - 0.5;

      // 3D Perspective Angles & Parallax
      target.rx = -ny * 12; // tilt up/down ±12 deg
      target.ry = nx * 14;  // tilt left/right ±14 deg
      target.tx = nx * 35;  // horizontal parallax shift
      target.ty = ny * 25;  // vertical parallax shift
    };

    const handleMouseLeave = () => {
      target.rx = 0;
      target.ry = 0;
      target.tx = 0;
      target.ty = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const loop = () => {
      // 0.08 LERP creates a buttery, fluid cinematic glide with physical inertia
      current.rx += (target.rx - current.rx) * 0.08;
      current.ry += (target.ry - current.ry) * 0.08;
      current.tx += (target.tx - current.tx) * 0.08;
      current.ty += (target.ty - current.ty) * 0.08;

      if (beamsRef.current) {
        beamsRef.current.style.transform = `perspective(1000px) rotateX(${current.rx}deg) rotateY(${current.ry}deg) translate3d(${current.tx}px, ${current.ty}px, 0) scale(1.08)`;
      }

      if (particlesRef.current) {
        // Foreground particles shift with opposing parallax for high multi-layer depth
        particlesRef.current.style.transform = `translate3d(${-current.tx * 1.4}px, ${-current.ty * 1.4}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleScrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      scrollToElement(contactElem, -70);
    } else if (onNavigate) {
      onNavigate('/contact');
    }
  };

  const handleViewProjects = () => {
    const projElem = document.getElementById('projects');
    if (projElem) {
      scrollToElement(projElem, -70);
    } else if (onNavigate) {
      onNavigate('/projects');
    }
  };

  const handleScrollToAbout = () => {
    const aboutElem = document.getElementById('about');
    if (aboutElem) {
      scrollToElement(aboutElem, -70);
    } else if (onNavigate) {
      onNavigate('/#about');
    }
  };

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg)]">
      {/* 1. Background Animated Laser Beams SVG with 3D Perspective Shift & Deep Freeze Exit */}
      <motion.div
        style={{ opacity: beamsOpacity, y: beamsY }}
        className="absolute inset-0 flex h-full w-full items-center justify-center pointer-events-none"
      >
        <div
          ref={beamsRef}
          className="absolute inset-0 flex h-full w-full items-center justify-center pointer-events-none will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg
            className="pointer-events-none absolute z-0 h-full w-full"
            width="100%"
            height="100%"
            viewBox="-380 -650 1470 1530"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient
                id="beams-radial"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(355 115) rotate(90) scale(765 735)"
              >
                <stop offset="0.0666667" stopColor="var(--beams-line-color, #888)" />
                <stop offset="0.243243" stopColor="var(--beams-line-color, #888)" />
                <stop offset="0.43594" stopColor="var(--beams-line-color, #888)" stopOpacity="0" />
              </radialGradient>

              {/* Refined Indigo-Slate Laser Gradient (Visible & Sleek) */}
              <linearGradient id="beam-gradient-refined-slate" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4338ca" stopOpacity="0" />
                <stop offset="25%" stopColor="#6366f1" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#818cf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0" />
              </linearGradient>

              {/* Refined Rose-Coral Laser Gradient (Visible & Elegant) */}
              <linearGradient id="beam-gradient-refined-rose" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#be123c" stopOpacity="0" />
                <stop offset="25%" stopColor="#e11d48" stopOpacity="0.92" />
                <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
              </linearGradient>

              {/* Crisp Optical Soft Glow */}
              <filter id="laser-glow-subtle" x="-15%" y="-15%" width="130%" height="130%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <style>{`
              @keyframes beamTravel {
                0% {
                  stroke-dashoffset: 1900;
                  opacity: 0;
                }
                10% {
                  opacity: 0.88;
                }
                90% {
                  opacity: 0.88;
                }
                100% {
                  stroke-dashoffset: 0;
                  opacity: 0;
                }
              }
              .beam-laser-1 { animation: beamTravel 7.2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
              .beam-laser-2 { animation: beamTravel 8.6s cubic-bezier(0.4, 0, 0.2, 1) 1.8s infinite; }
              .beam-laser-3 { animation: beamTravel 6.4s cubic-bezier(0.4, 0, 0.2, 1) 3.5s infinite; }
              .beam-laser-4 { animation: beamTravel 9.2s cubic-bezier(0.4, 0, 0.2, 1) 0.9s infinite; }
              .beam-laser-5 { animation: beamTravel 7.0s cubic-bezier(0.4, 0, 0.2, 1) 4.8s infinite; }
              .beam-laser-6 { animation: beamTravel 8.2s cubic-bezier(0.4, 0, 0.2, 1) 2.5s infinite; }
              .beam-laser-7 { animation: beamTravel 6.6s cubic-bezier(0.4, 0, 0.2, 1) 4.0s infinite; }
            `}</style>

            {/* Static Track Lines */}
            <path className="beam-static" d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M-16 -605C-16 -605 52 -200 516 -73C980 54 1048 459 1048 459" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />
            <path className="beam-static" d="M12 -637C12 -637 80 -232 544 -105C1008 22 1076 427 1076 427" stroke="url(#beams-radial)" strokeOpacity="0.15" strokeWidth="0.5" />

            {/* Continuous Traveling Refined Visible Laser Pulses */}
            <path className="beam-path beam-laser-1" d="M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843" stroke="url(#beam-gradient-refined-slate)" strokeWidth="1.25" filter="url(#laser-glow-subtle)" strokeDasharray="90 1800" />
            <path className="beam-path beam-laser-2" d="M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779" stroke="url(#beam-gradient-refined-rose)" strokeWidth="1.3" filter="url(#laser-glow-subtle)" strokeDasharray="100 1800" />
            <path className="beam-path beam-laser-3" d="M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715" stroke="url(#beam-gradient-refined-slate)" strokeWidth="1.25" filter="url(#laser-glow-subtle)" strokeDasharray="85 1800" />
            <path className="beam-path beam-laser-4" d="M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651" stroke="url(#beam-gradient-refined-rose)" strokeWidth="1.3" filter="url(#laser-glow-subtle)" strokeDasharray="105 1800" />
            <path className="beam-path beam-laser-5" d="M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587" stroke="url(#beam-gradient-refined-slate)" strokeWidth="1.25" filter="url(#laser-glow-subtle)" strokeDasharray="90 1800" />
            <path className="beam-path beam-laser-6" d="M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523" stroke="url(#beam-gradient-refined-rose)" strokeWidth="1.3" filter="url(#laser-glow-subtle)" strokeDasharray="95 1800" />
            <path className="beam-path beam-laser-7" d="M-16 -605C-16 -605 52 -200 516 -73C980 54 1048 459 1048 459" stroke="url(#beam-gradient-refined-slate)" strokeWidth="1.25" filter="url(#laser-glow-subtle)" strokeDasharray="85 1800" />
          </svg>
        </div>
      </motion.div>

      {/* 2. Floating Ambient Particles with Opposing 3D Parallax & Scroll Fade */}
      <motion.div
        style={{ opacity: particlesOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none will-change-transform">
          <div className="hero-particle absolute w-1 h-1 rounded-full bg-[var(--color-primary)]/40 float-slow" style={{ top: '18%', left: '12%', animationDelay: '0s' }} />
          <div className="hero-particle absolute w-1 h-1 rounded-full bg-[var(--color-primary)]/40 float-slow" style={{ top: '25%', right: '18%', animationDelay: '1.5s' }} />
          <div className="hero-particle absolute w-1 h-1 rounded-full bg-[var(--color-primary)]/40 float-slow" style={{ top: '72%', left: '22%', animationDelay: '3s' }} />
          <div className="hero-particle absolute w-1 h-1 rounded-full bg-[var(--color-primary)]/40 float-slow" style={{ top: '68%', right: '14%', animationDelay: '0.8s' }} />
          <div className="hero-particle absolute w-1 h-1 rounded-full bg-[var(--color-primary)]/40 float-slow" style={{ top: '40%', left: '6%', animationDelay: '2.2s' }} />
          <div className="hero-particle absolute w-1 h-1 rounded-full bg-[var(--color-primary)]/40 float-slow" style={{ top: '55%', right: '8%', animationDelay: '4s' }} />
        </div>
      </motion.div>

      {/* 3. Dual Tilted Crossing Marquee Ribbons with Scroll Parallax & Pause on Hover */}
      <motion.div
        style={{ opacity: ribbonsOpacity, y: ribbonsY }}
        className="hero-marquee absolute inset-0 z-[1] pointer-events-none overflow-hidden select-none"
      >
        <style>{`
          .hero-marquee-strip:hover .hero-marquee-track,
          .hero-marquee-strip:hover .hero-marquee-track-reverse {
            animation-play-state: paused !important;
          }
          .hero-strip-top {
            transform: rotate(2.5deg);
          }
          .hero-strip-bottom {
            transform: rotate(-2.5deg);
          }
          @media (min-width: 640px) {
            .hero-strip-top {
              transform: rotate(3.5deg);
            }
            .hero-strip-bottom {
              transform: rotate(-3.5deg);
            }
          }
          @media (max-height: 720px) {
            .hero-scroll-cue {
              display: none !important;
            }
          }
        `}</style>

        {/* Top Strip: Vivid Crimson-Magenta Gradient matching attached reference */}
        <div
          className="hero-marquee-strip hero-strip-top pointer-events-auto cursor-default absolute left-[-20%] w-[140%] py-2.5 sm:py-3.5 md:py-4.5 lg:py-5 top-[82%] sm:top-[78%] md:top-[77%] lg:top-[78%] text-white shadow-2xl z-10 border-t border-pink-400/30 border-b border-pink-950/40 transition-all duration-300 hover:brightness-110"
          style={{
            background: 'linear-gradient(90deg, #990038 0%, #b80045 15%, #c8024e 35%, #e00762 50%, #c8024e 65%, #b80045 85%, #990038 100%)',
            boxShadow: '0 10px 35px rgba(224, 7, 98, 0.28), 0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
          title="Hover to pause skills"
        >
          <div className="hero-marquee-track-reverse" style={{ '--marquee-duration': '32s' } as React.CSSProperties}>
            {[...ITEMS_TOP, ...ITEMS_TOP, ...ITEMS_TOP, ...ITEMS_TOP].map((item, idx) => (
              <span key={idx} className="inline-flex items-center shrink-0 hover:scale-105 transition-transform duration-200">
                <span className="uppercase font-black tracking-wider text-xs sm:text-sm md:text-base lg:text-lg px-3.5 sm:px-5 md:px-7 whitespace-nowrap text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  {item}
                </span>
                <span className="text-xs sm:text-base text-white/70 mx-1.5 sm:mx-3 md:mx-4 select-none font-bold">●</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Strip: Sleek Obsidian Charcoal matching attached reference */}
        <div
          className="hero-marquee-strip hero-strip-bottom pointer-events-auto cursor-default absolute left-[-20%] w-[140%] py-2.5 sm:py-3.5 md:py-4.5 lg:py-5 top-[86%] sm:top-[82%] md:top-[81%] lg:top-[82%] text-white/95 shadow-2xl z-20 border-t border-white/[0.12] border-b border-white/[0.06] transition-all duration-300 hover:border-white/30 hover:bg-[#121217]"
          style={{
            background: 'linear-gradient(90deg, #08080a 0%, #121217 30%, #17171f 50%, #121217 70%, #08080a 100%)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.85)',
          }}
          title="Hover to pause skills"
        >
          <div className="hero-marquee-track" style={{ '--marquee-duration': '38s' } as React.CSSProperties}>
            {[...ITEMS_BOTTOM, ...ITEMS_BOTTOM, ...ITEMS_BOTTOM, ...ITEMS_BOTTOM].map((item, idx) => (
              <span key={idx} className="inline-flex items-center shrink-0 hover:scale-105 transition-transform duration-200">
                <span className="uppercase font-black tracking-wider text-xs sm:text-sm md:text-base lg:text-lg px-3.5 sm:px-5 md:px-7 whitespace-nowrap text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  {item}
                </span>
                <span className="text-xs sm:text-base text-zinc-500 mx-1.5 sm:mx-3 md:mx-4 select-none font-bold">●</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 4. Center Typography: Exact 1:1 Distances with Scroll-Driven Parallax Exit */}
      <motion.div
        style={{
          scale: contentScale,
          opacity: contentOpacity,
          y: contentY,
          filter: contentFilter,
        }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl -translate-y-4 sm:-translate-y-6 md:-translate-y-8 will-change-transform"
      >
        {/* Central Ambient Aurora Spotlight (Soft Breathing Glow behind Headline) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[950px] h-[340px] md:h-[480px] pointer-events-none -z-10 select-none">
          <style>{`
            @keyframes auroraBreathing {
              0%, 100% {
                transform: translate(-50%, -50%) scale(0.92);
                opacity: 0.38;
              }
              50% {
                transform: translate(-50%, -50%) scale(1.12);
                opacity: 0.68;
              }
            }
            @keyframes auroraCosmicDrift {
              0% {
                filter: blur(95px) hue-rotate(0deg);
              }
              50% {
                filter: blur(120px) hue-rotate(25deg);
              }
              100% {
                filter: blur(95px) hue-rotate(0deg);
              }
            }
          `}</style>

          {/* Deep Rose/Magenta Core Glow */}
          <div
            className="absolute top-1/2 left-1/2 w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(224, 122, 156, 0.28) 0%, rgba(204, 51, 102, 0.16) 35%, rgba(147, 51, 234, 0.10) 60%, rgba(0, 0, 0, 0) 78%)',
              animation: 'auroraBreathing 7s ease-in-out infinite, auroraCosmicDrift 14s ease-in-out infinite',
            }}
          />

          {/* Electric Violet/Blue Rim Reflection for Cinematic Contrast */}
          <div
            className="absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.14) 0%, rgba(236, 72, 153, 0.12) 45%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'auroraBreathing 9s ease-in-out infinite reverse',
            }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hero-greeting uppercase tracking-[0.22em] sm:tracking-[0.28em] text-sm sm:text-base md:text-lg lg:text-xl text-[var(--color-text-secondary)] font-bold mb-1.5 sm:mb-2.5 md:mb-3"
        >
          {isHindi ? 'नमस्ते, मैं हूँ' : "Hi, I'm"}
        </motion.p>

        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
          className="hero-greeting-line block w-10 sm:w-12 h-px mx-auto mb-2.5 sm:mb-3.5 md:mb-4 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent origin-center shadow-[0_0_8px_var(--color-primary)]"
        />

        <style>{`
          @keyframes metallicSheenSweep {
            0%, 65% {
              background-position: 200% 0;
              opacity: 0;
            }
            70% {
              opacity: 0.92;
            }
            84% {
              background-position: -80% 0;
              opacity: 0.92;
            }
            88%, 100% {
              background-position: -80% 0;
              opacity: 0;
            }
          }
        `}</style>

        <h1
          aria-label={`${t.hero.title} | ${t.hero.tagline}`}
          className="hero-name relative flex items-center justify-center flex-nowrap whitespace-nowrap text-[clamp(1.75rem,6.8vw,6.5rem)] font-black mb-3.5 md:mb-4.5 tracking-tight select-none w-full"
          style={{ perspective: 600 }}
        >
          {/* Periodic Luxury Metallic Sheen Sweep (Every 5.5s) */}
          <div
            className="absolute inset-0 pointer-events-none select-none flex items-center justify-center flex-nowrap whitespace-nowrap z-20"
            aria-hidden="true"
          >
            <span
              className="inline-block text-[clamp(1.75rem,6.8vw,6.5rem)] font-black tracking-tight"
              style={{
                backgroundImage:
                  'linear-gradient(115deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.95) 50%, rgba(244, 114, 182, 0.85) 54%, transparent 64%)',
                backgroundSize: '250% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'metallicSheenSweep 5.5s ease-in-out infinite',
                animationDelay: '1.2s',
              }}
            >
              {t.hero.title}
            </span>
          </div>

          {/* Interactive Staggered Characters with Spring Float & Tilt Wave on Hover */}
          {t.hero.nameChars.map((item, index) => (
            <React.Fragment key={index}>
              {item.char === ' ' && (
                <span
                  className="inline-block w-[0.25em] md:w-[0.28em] select-none"
                  aria-hidden="true"
                >
                  &nbsp;
                </span>
              )}
              {item.char !== ' ' && (
                <motion.span
                  initial={{ opacity: 0, y: 30, rotateX: -60, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  whileHover={{
                    y: -10,
                    scale: 1.14,
                    rotate: index % 2 === 0 ? -4 : 4,
                    filter: 'brightness(1.35) drop-shadow(0 0 14px rgba(244, 63, 94, 0.85))',
                    transition: { type: 'spring', stiffness: 450, damping: 14 },
                  }}
                  whileTap={{
                    scale: 0.92,
                    y: 2,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="hero-char inline-block bg-clip-text cursor-pointer relative z-10"
                  data-cursor="pointer"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgb(168, 61, 98), rgb(212, 84, 126), rgb(224, 122, 156), rgb(245, 184, 204))',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '1300% 100%',
                    backgroundPosition: item.pos,
                  }}
                >
                  {item.char}
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          className="hero-tagline text-sm sm:text-base md:text-xl font-medium max-w-xl mx-auto leading-relaxed text-[var(--color-text-secondary)] mb-3.5 sm:mb-4 md:mb-5 px-2"
        >
          {t.hero.tagline}
        </motion.div>

        {/* 5. Signature Magnetic Attraction CTA Buttons with Quick Resume & Micro-Glow */}
        <style>{`
          @keyframes ctaGlowPulse {
            0%, 100% {
              opacity: 0.38;
              transform: scale(0.98);
              filter: blur(8px);
            }
            50% {
              opacity: 0.85;
              transform: scale(1.04);
              filter: blur(16px);
            }
          }

          @keyframes ctaRadarPing {
            0% {
              transform: scale(0.96);
              opacity: 0.7;
            }
            50%, 100% {
              transform: scale(1.22);
              opacity: 0;
            }
          }

          @keyframes ctaSheenSweep {
            0%, 65% {
              transform: translateX(-150%) skewX(-20deg);
              opacity: 0;
            }
            75% {
              opacity: 0.8;
            }
            90%, 100% {
              transform: translateX(220%) skewX(-20deg);
              opacity: 0;
            }
          }
        `}</style>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 relative z-30"
        >
          {/* Primary Magnetic Button: "View Projects" with Organic Micro-Glow Pulse */}
          <Magnetic strength={0.4} innerParallax>
            <div className="relative group">
              {/* Organic Breathing Glow Aura (Soft Pink / Rose) */}
              <div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 opacity-60 blur-md pointer-events-none group-hover:opacity-100 group-hover:blur-xl transition-all duration-300"
                style={{
                  animation: 'ctaGlowPulse 3.6s ease-in-out infinite',
                }}
              />

              {/* Periodic Radar Pulse Ping Wave */}
              <span
                className="absolute inset-0 rounded-full border border-pink-500/50 pointer-events-none"
                style={{
                  animation: 'ctaRadarPing 3.6s cubic-bezier(0, 0, 0.2, 1) infinite',
                }}
              />

              <button
                onClick={handleViewProjects}
                className="relative inline-flex items-center gap-2 sm:gap-2.5 px-4.5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10">
                  {t.hero.viewProjects}
                </span>
                <svg
                  className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>

                {/* Periodic Micro-Sheen Light Sweep */}
                <div
                  className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                  style={{
                    animation: 'ctaSheenSweep 3.6s ease-in-out infinite',
                  }}
                />

                {/* Interactive Hover Fill */}
                <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
              </button>
            </div>
          </Magnetic>

          {/* Secondary Magnetic Button: "Get in Touch" */}
          <Magnetic strength={0.4} innerParallax>
            <button
              onClick={handleScrollToContact}
              className="group relative inline-flex items-center gap-2 sm:gap-2.5 px-4.5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-md hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span className="relative z-10">
                {t.hero.contactMe}
              </span>
              <svg
                className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 group-hover:text-white transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </Magnetic>

          {/* Recruiter Quick Access: "Download CV / Resume 📄" */}
          <Magnetic strength={0.4} innerParallax>
            <a
              href="/Aniket_Resume.pdf"
              download="Aniket_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/[0.05] hover:bg-emerald-500/10 border border-white/15 hover:border-emerald-400/40 text-zinc-200 hover:text-white font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-[0_0_22px_rgba(16,185,129,0.3)] select-none overflow-hidden"
              data-cursor="pointer"
              title="Download CV / Resume (PDF)"
            >
              {/* Circular Icon Badge with Download Arrow */}
              <div className="flex items-center justify-center w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-emerald-500/20 group-hover:bg-emerald-400/30 text-emerald-400 group-hover:text-emerald-300 transition-colors shrink-0">
                <svg
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </div>

              <span className="relative z-10 font-semibold group-hover:text-emerald-300 transition-colors">
                {t.hero.downloadResume}
              </span>

              <span className="text-[10px] sm:text-xs opacity-75 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                📄
              </span>

              {/* Hover Emerald Sheen Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </a>
          </Magnetic>
        </motion.div>

        {/* 6. Floating Scroll Cue (Positioned cleanly below CTAs above the crossing ribbons) */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
          className="hero-scroll-cue mt-2.5 sm:mt-3 md:mt-3.5 flex flex-col items-center justify-center select-none"
        >
          <Magnetic strength={0.3} innerParallax>
            <button
              onClick={handleScrollToAbout}
              className="group flex flex-col items-center gap-1 sm:gap-1.5 cursor-pointer focus:outline-none"
              aria-label="Scroll to explore About section"
              title="Scroll to explore"
              data-cursor="pointer"
            >
              {/* Minimalist Glass Mouse Chassis */}
              <div className="relative w-4 h-6.5 sm:w-5 sm:h-8 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md flex items-start justify-center p-0.5 sm:p-1 group-hover:border-primary/60 group-hover:shadow-[0_0_14px_rgba(244,63,94,0.4)] transition-all duration-300">
                {/* Animated Scroll Wheel Node */}
                <motion.div
                  animate={{
                    y: [0, 6, 0],
                    opacity: [1, 0.3, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-0.5 sm:w-1 h-1.5 sm:h-2 rounded-full bg-gradient-to-b from-pink-400 to-rose-500 shadow-[0_0_6px_#f43f5e]"
                />
              </div>

              {/* Micro Caption & Bouncing Chevron */}
              <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-mono font-medium tracking-[0.2em] text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase">
                <span>Scroll</span>
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-pink-400 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
};
