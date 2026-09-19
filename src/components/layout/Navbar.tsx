import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Magnetic } from '@/components/ui/Magnetic';
import { useSmoothScroll } from '@/context/SmoothScrollContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenCommandPalette: () => void;
}



const CmdIcon = () => (
  <svg
    className="w-[18px] h-[18px]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"
    />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenCommandPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [glowCenter, setGlowCenter] = useState<number>(45);
  const [greetingActive, setGreetingActive] = useState(true);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navLinksRef = useRef<HTMLDivElement>(null);

  // Time-based greeting matching aniketmeshram.me
  const greeting = React.useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', emoji: '☀️' };
    if (hour < 17) return { text: 'Good Afternoon', emoji: '☀️' };
    if (hour < 21) return { text: 'Good Evening', emoji: '🌆' };
    return { text: 'Good Night', emoji: '🌙' };
  }, []);

  // Collapse greeting pill into navigation bar after 2.2 seconds (or immediately on click)
  useEffect(() => {
    const timer = setTimeout(() => {
      setGreetingActive(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { label: 'Home', path: '/', sectionId: 'hero' },
    { label: 'Projects', path: '/projects', sectionId: 'projects' },
    { label: 'Blog', path: '/blog', sectionId: 'blog' },
    { label: 'The Wall', path: '/wall', sectionId: 'wall' },
    { label: 'Contact', path: '/contact', sectionId: 'contact' },
  ];

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 25);

      if (currentRoute !== '/') return;

      // 1. If user is at or near the very bottom of the document
      const isNearBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 250;
      if (isNearBottom) {
        setActiveSection('contact');
        return;
      }

      // 2. If user is near the top of the page
      if (scrollY < 320) {
        setActiveSection('hero');
        return;
      }

      // 3. Section boundary detection (from bottom of page to top)
      const sections = [
        { id: 'contact', section: 'contact' },
        { id: 'wall', section: 'wall' },
        { id: 'github', section: 'projects' },
        { id: 'achievements', section: 'projects' },
        { id: 'projects', section: 'projects' },
        { id: 'skills', section: 'hero' },
        { id: 'experience', section: 'hero' },
        { id: 'about', section: 'hero' },
        { id: 'hero', section: 'hero' },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top has reached upper half of viewport
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sec.section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRoute]);

  // Compute active item index
  const activeIndex = React.useMemo(() => {
    if (currentRoute === '/') {
      const idx = navItems.findIndex((item) => item.sectionId === activeSection);
      return idx !== -1 ? idx : 0;
    }
    const idx = navItems.findIndex(
      (item) =>
        currentRoute === item.path ||
        (item.path !== '/' && currentRoute.startsWith(item.path))
    );
    return idx !== -1 ? idx : 0;
  }, [currentRoute, activeSection]);

  const targetIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex !== -1 ? activeIndex : 0);

  const updateGlowPosition = useCallback(() => {
    if (greetingActive) return;
    const el = itemRefs.current[targetIndex];
    const container = navLinksRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const center = elRect.left - containerRect.left + elRect.width / 2;
      if (center > 0) {
        setGlowCenter(center);
      }
    }
  }, [targetIndex, greetingActive]);

  useEffect(() => {
    updateGlowPosition();
    const t1 = setTimeout(updateGlowPosition, 80);
    const t2 = setTimeout(updateGlowPosition, 300);
    const t3 = setTimeout(updateGlowPosition, 600);
    window.addEventListener('resize', updateGlowPosition);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updateGlowPosition);
    };
  }, [updateGlowPosition]);

  const { scrollToElement, scrollToTop } = useSmoothScroll();

  const handleNav = (item: (typeof navItems)[number]) => {
    setMobileMenuOpen(false);

    if (currentRoute === '/') {
      // In-page smooth scrolling on homepage
      if (item.sectionId === 'hero') {
        setActiveSection('hero');
        scrollToTop(false);
        return;
      }
      const el = document.getElementById(item.sectionId);
      if (el) {
        setActiveSection(item.sectionId);
        scrollToElement(el, -70);
        return;
      }
    }

    onNavigate(item.path);
  };

  return (
    <>
      {/* Center Floating Pill Navigation matching aniketmeshram.me */}
      <motion.nav
        layout
        transition={{
          layout: { type: 'spring', stiffness: 350, damping: 30, duration: 0.55 },
        }}
        dir="ltr"
        className={`floating-nav hidden md:block fixed top-4 inset-x-0 mx-auto w-fit z-40 rounded-full transition-all duration-300 shadow-2xl overflow-hidden ${
          isScrolled
            ? 'bg-[#0a0a0ceb] backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
            : 'bg-[var(--color-navbar)] backdrop-blur-xl border border-[var(--color-border)] shadow-2xl'
        }`}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence mode="wait">
          {greetingActive ? (
            <motion.div
              key="greeting-pill"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={() => setGreetingActive(false)}
              className="flex items-center justify-center gap-2.5 h-12 px-8 cursor-pointer select-none group"
              title="Click to expand navigation"
            >
              <span className="text-base">{greeting.emoji}</span>
              <span className="text-sm font-medium text-[var(--color-text)] whitespace-nowrap">
                {greeting.text}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="nav-links"
              ref={navLinksRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              onAnimationComplete={updateGlowPosition}
              className="relative flex items-center h-12 px-2"
            >
              {/* Dynamic Dual Laser Glow Beam tracking active/hovered tab */}
              <motion.div
                className="absolute -top-[1px] h-[2px] rounded-full pointer-events-none nav-glow-beam"
                style={{ width: 94 }}
                animate={{ left: glowCenter - 47 }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
              <motion.div
                className="absolute -top-[1px] h-[2px] rounded-full pointer-events-none nav-glow-core"
                style={{ width: 39 }}
                animate={{ left: glowCenter - 19.5 }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />

              <div className="flex items-center gap-1 relative px-1">
                {navItems.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <Magnetic key={item.path} strength={0.25}>
                      <button
                        ref={(el) => {
                          itemRefs.current[idx] = el;
                        }}
                        onClick={() => handleNav(item)}
                        onMouseEnter={() => {
                          setHoveredIndex(idx);
                        }}
                        className={`nav-item relative z-10 px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${isActive
                          ? 'text-white'
                          : 'text-[var(--color-text-secondary)] hover:text-white'
                          }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNavPill"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            className="absolute inset-0 rounded-full bg-white/[0.12] ring-1 ring-white/[0.08]"
                          />
                        )}
                        <span className="relative z-10">{item.label}</span>
                      </button>
                    </Magnetic>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* 3. Right Fixed Actions: Command Palette Button with Shimmering ⌘K Quick Hint */}
      <div className="hidden md:flex items-center gap-2.5 fixed top-5 right-[13%] lg:right-[15%] z-50">
        <style>{`
          @keyframes cmdShimmer {
            0%, 65% {
              transform: translateX(-120%);
              opacity: 0;
            }
            75% {
              opacity: 1;
            }
            100% {
              transform: translateX(140%);
              opacity: 0;
            }
          }
        `}</style>
        <Magnetic strength={0.3} innerParallax>
          <button
            onClick={() => {
              onOpenCommandPalette();
            }}
            className="group relative flex items-center gap-2 px-3 h-9 rounded-full bg-[#0a0a0ceb] backdrop-blur-xl border border-white/15 hover:border-primary/50 hover:bg-[#121217] text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(204,51,102,0.25)] overflow-hidden select-none"
            aria-label="Open Command Palette"
            title="Open Command Palette (Cmd+K / Ctrl+K)"
            data-cursor="pointer"
          >
            {/* Subtle Periodic Shimmer Light Sweep */}
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
              style={{
                animation: 'cmdShimmer 4.2s ease-in-out infinite',
              }}
            />

            {/* Clean Spotlight / Search Icon */}
            <svg
              className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
              Search
            </span>

            {/* Single clean shortcut keycap */}
            <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-zinc-400 group-hover:text-white bg-white/[0.06] group-hover:bg-primary/20 border border-white/10 group-hover:border-primary/40 rounded transition-all">
              ⌘K
            </kbd>
          </button>
        </Magnetic>
      </div>

      {/* 4. Mobile Top Bar with Greeting Capsule matching aniketmeshram.me */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0a0a0a]/85 backdrop-blur-lg border-b border-white/10">
        <a
          onClick={() => handleNav(navItems[0])}
          className="cursor-pointer text-sm font-bold tracking-tight text-white flex items-center gap-2 select-none active:scale-95 transition-transform"
        >
          <div className="relative w-7 h-7 rounded-full bg-white/[0.05] border border-white/15 p-0.5 shrink-0 flex items-center justify-center shadow-[0_0_8px_rgba(244,63,94,0.3)]">
            <img
              src="/avatar-transparent.png"
              alt="Aniket"
              className="w-full h-full object-contain"
            />
            <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
          </div>
          <span>Aniket</span>
        </a>

        {/* Mobile Greeting Pill */}
        <button
          onClick={() => {
            onOpenCommandPalette();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-xs font-medium text-zinc-200 active:scale-95 transition-all"
        >
          <span>{greeting.emoji}</span>
          <span>{greeting.text}</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              onOpenCommandPalette();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 active:scale-95"
          >
            <CmdIcon />
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 active:scale-95"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 left-4 right-4 z-50 flex flex-col gap-1 rounded-2xl p-4 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 shadow-2xl"
          >
            {navItems.map((item, idx) => (
              <button
                key={item.path}
                onClick={() => handleNav(item)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${idx === activeIndex
                  ? 'bg-[#cc3366] text-white'
                  : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
