import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { Magnetic } from '@/components/ui/Magnetic';
import { useSmoothScroll } from '@/context/SmoothScrollContext';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { scrollToTop } = useSmoothScroll();
  const { t, isHindi } = useLanguage();
  const [isLaunching, setIsLaunching] = useState<boolean>(false);

  const handleRocketLaunch = () => {
    setIsLaunching(true);
    scrollToTop(false);
    setTimeout(() => {
      setIsLaunching(false);
    }, 1100);
  };

  const handleNav = (e: React.MouseEvent, route: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.hash = route;
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative border-t border-white/10 bg-black"
    >
      {/* Top Laser Accent Beam */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Col 1: Logo & Spiritual Quote */}
          <div className="col-span-2 md:col-span-1">
            <div
              className="flex items-center gap-3 mb-4 group cursor-pointer"
              onClick={(e) => handleNav(e, '/')}
            >
              <div className="relative w-10 h-10 shrink-0 select-none">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 p-[1.5px] shadow-[0_0_12px_rgba(244,63,94,0.35)]">
                  <div className="w-full h-full rounded-full bg-zinc-950 border border-white/10" />
                </div>
                <div className="absolute inset-x-0 -top-2 bottom-0 flex items-end justify-center pointer-events-none">
                  <img
                    src="/avatar-transparent.png"
                    alt="Aniket Meshram — Avatar"
                    className="w-[122%] h-[122%] max-w-none object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-300 ease-out"
                  />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-pink-400 transition-colors">
                Aniket
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs font-mono">
              {t.footer.tagline}
            </p>
          </div>

          {/* Col 2: Links */}
          <div>
            <p className="font-semibold text-sm text-white uppercase tracking-wider mb-4">
              {t.footer.navigation}
            </p>
            <div className="flex flex-col gap-2">
              <a
                onClick={(e) => handleNav(e, '/')}
                href="/"
                className="text-sm text-zinc-400 hover:text-primary transition-colors w-fit cursor-pointer"
              >
                {t.nav.home}
              </a>
              <a
                onClick={(e) => handleNav(e, '/projects')}
                href="/projects"
                className="text-sm text-zinc-400 hover:text-primary transition-colors w-fit cursor-pointer"
              >
                {t.nav.projects}
              </a>
              <a
                onClick={(e) => handleNav(e, '/blog')}
                href="/blog"
                className="text-sm text-zinc-400 hover:text-primary transition-colors w-fit cursor-pointer"
              >
                {t.nav.blog}
              </a>
              <a
                onClick={(e) => handleNav(e, '/wall')}
                href="/wall"
                className="text-sm text-zinc-400 hover:text-primary transition-colors w-fit cursor-pointer"
              >
                {t.nav.wall}
              </a>
              <a
                onClick={(e) => handleNav(e, '/contact')}
                href="/contact"
                className="text-sm text-zinc-400 hover:text-primary transition-colors w-fit cursor-pointer"
              >
                {t.nav.contact}
              </a>
            </div>
          </div>

          {/* Col 3: Legal */}
          <div>
            <p className="font-semibold text-sm text-white uppercase tracking-wider mb-4">
              {isHindi ? 'कानूनी' : 'Legal'}
            </p>
            <div className="flex flex-col gap-2">
              <a
                onClick={(e) => handleNav(e, '/privacy')}
                href="/privacy"
                className="text-sm text-zinc-400 hover:text-primary transition-colors w-fit cursor-pointer"
              >
                {t.footer.privacy}
              </a>
              <a
                onClick={(e) => handleNav(e, '/terms')}
                href="/terms"
                className="text-sm text-zinc-400 hover:text-primary transition-colors w-fit cursor-pointer"
              >
                {t.footer.terms}
              </a>
            </div>
          </div>

          {/* Col 4: Social */}
          <div>
            <p className="font-semibold text-sm text-white uppercase tracking-wider mb-4">
              {t.footer.socials}
            </p>
            <div className="flex flex-wrap gap-2.5 max-w-[280px]">
              <a
                href={PORTFOLIO_DATA.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center transition-all hover:scale-110 hover:border-primary/40 group"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg
                  className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-[#0077b5]/20 border border-white/10 flex items-center justify-center transition-all hover:scale-110 hover:border-[#0077b5]/50 group"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg
                  className="w-5 h-5 text-zinc-400 group-hover:text-[#0077b5] transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-pink-500/20 border border-white/10 flex items-center justify-center transition-all hover:scale-110 hover:border-pink-500/50 group"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg
                  className="w-5 h-5 text-zinc-400 group-hover:text-pink-400 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.socials.reddit}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-[#FF4500]/20 border border-white/10 flex items-center justify-center transition-all hover:scale-110 hover:border-[#FF4500]/50 group"
                aria-label="Reddit"
                title="Reddit"
              >
                <svg
                  className="w-5 h-5 text-zinc-400 group-hover:text-[#FF4500] transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-[#FFA116]/20 border border-white/10 flex items-center justify-center transition-all hover:scale-110 hover:border-[#FFA116]/50 group"
                aria-label="LeetCode"
                title="LeetCode"
              >
                <svg
                  className="w-5 h-5 text-zinc-400 group-hover:text-[#FFA116] transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.65 6.002 6.002 0 0 0 2.766-.285 5.97 5.97 0 0 0 1.077-.52l7.106-5.462a1.374 1.374 0 0 0 .285-1.895 1.374 1.374 0 0 0-1.895-.285L9.278 17.33a3.22 3.22 0 0 1-1.393.313 3.197 3.197 0 0 1-2.576-1.977 3.187 3.187 0 0 1 .632-3.48l3.834-4.106 5.344-5.719A1.374 1.374 0 0 0 14.2 0a1.374 1.374 0 0 0-.717 0zm2.71 14.738a1.374 1.374 0 0 0-1.374 1.374v.05a1.374 1.374 0 0 0 1.374 1.374h5.433a1.374 1.374 0 0 0 1.374-1.374v-.05a1.374 1.374 0 0 0-1.374-1.374h-5.433z" />
                </svg>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.socials.email}
                className="w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-primary/20 border border-white/10 flex items-center justify-center transition-all hover:scale-110 hover:border-primary/50 group"
                aria-label="Email"
                title="Email"
              >
                <svg
                  className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar: Copyright + Rocket Back to Top */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright text */}
          <p className="text-xs text-zinc-500 font-mono text-center sm:text-left">
            © 2026 Aniket Meshram. {t.footer.copyright}
          </p>

          {/* Back to Top Rocket / Elevator Button */}
          <Magnetic strength={0.3} innerParallax>
            <button
              type="button"
              onClick={handleRocketLaunch}
              className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-primary/40 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-300 cursor-pointer shadow-lg overflow-hidden"
              title={isHindi ? 'शीर्ष पर वापस जाएं' : 'Smooth elevator scroll to top'}
              data-cursor="pointer"
            >
              {/* Flame glow effect on launch */}
              <div
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-t from-orange-500 via-pink-500 to-transparent blur-sm pointer-events-none transition-opacity duration-300 ${
                  isLaunching ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <span className="relative flex items-center justify-center">
                <motion.svg
                  animate={
                    isLaunching
                      ? { y: [-2, -28, 20, 0], opacity: [1, 0, 0, 1] }
                      : { y: [0, -2, 0] }
                  }
                  transition={
                    isLaunching
                      ? { duration: 0.85, times: [0, 0.4, 0.6, 1], ease: 'easeInOut' }
                      : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
                  }
                  className="w-4 h-4 text-primary group-hover:text-primary-light"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </motion.svg>
              </span>

              <span>{isHindi ? 'वापस ऊपर' : 'Back to Top'}</span>

              <svg
                className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:-translate-y-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </div>
    </motion.footer>
  );
};
