import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Globe,
  Home,
  FolderKanban,
  BookOpen,
  PenTool,
  MessageSquare,
  ArrowUpRight,
  Shield,
  FileText,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { t, language, toggleLanguage, isHindi } = useLanguage();
  const [search, setSearch] = useState('');

  // Handle Cmd+K & Escape keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset search on close
  useEffect(() => {
    if (!isOpen) setSearch('');
  }, [isOpen]);

  const navPages = [
    { label: t.nav.home, path: '/', icon: Home },
    { label: t.nav.projects, path: '/projects', icon: FolderKanban },
    { label: t.nav.blog, path: '/blog', icon: BookOpen },
    { label: t.nav.wall, path: '/wall', icon: PenTool },
    { label: t.nav.contact, path: '/contact', icon: MessageSquare },
  ];

  const socials = [
    {
      label: 'GitHub',
      href: PORTFOLIO_DATA.personal.socials.github,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: PORTFOLIO_DATA.personal.socials.linkedin,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: PORTFOLIO_DATA.personal.socials.instagram,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      label: 'Reddit',
      href: PORTFOLIO_DATA.personal.socials.reddit,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
    },
    {
      label: 'LeetCode',
      href: PORTFOLIO_DATA.personal.socials.leetcode,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.65 6.002 6.002 0 0 0 2.766-.285 5.97 5.97 0 0 0 1.077-.52l7.106-5.462a1.374 1.374 0 0 0 .285-1.895 1.374 1.374 0 0 0-1.895-.285L9.278 17.33a3.22 3.22 0 0 1-1.393.313 3.197 3.197 0 0 1-2.576-1.977 3.187 3.187 0 0 1 .632-3.48l3.834-4.106 5.344-5.719A1.374 1.374 0 0 0 14.2 0a1.374 1.374 0 0 0-.717 0zm2.71 14.738a1.374 1.374 0 0 0-1.374 1.374v.05a1.374 1.374 0 0 0 1.374 1.374h5.433a1.374 1.374 0 0 0 1.374-1.374v-.05a1.374 1.374 0 0 0-1.374-1.374h-5.433z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: PORTFOLIO_DATA.personal.socials.email,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Resume (PDF)',
      href: '/Aniket_Resume.pdf',
      download: 'Aniket_Resume.pdf',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
    },
  ];

  const isResumeQuery =
    'resume'.includes(search.toLowerCase().trim()) ||
    'cv'.includes(search.toLowerCase().trim()) ||
    search.toLowerCase().includes('res') ||
    search.toLowerCase().includes('cv');

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Authentic Bottom Sheet Panel (.nav-sheet-panel) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed bottom-0 inset-x-0 w-full max-h-[85vh] rounded-t-3xl md:max-w-[580px] md:mx-auto md:max-h-[75vh] md:rounded-t-2xl bg-[var(--color-card)] border-t border-[var(--color-border)] md:border-x nav-sheet-panel overflow-hidden flex flex-col shadow-2xl z-10"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Indicator */}
            <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none md:hidden">
              <div className="w-9 h-1 rounded-full bg-[var(--color-border)]" />
            </div>

            <div className="flex flex-col min-h-0 flex-1 md:pt-3">
              {/* Header Action Bar */}
              <div className="flex items-center gap-2 px-4 pt-1 pb-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
                  <input
                    type="text"
                    autoFocus
                    placeholder={t.cmd.placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[var(--color-bg-secondary)] dark:bg-white/[0.06] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
                  />
                </div>

                {/* Reach out button */}
                <button
                  onClick={() => {
                    onNavigate('/contact');
                    onClose();
                  }}
                  className="shrink-0 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] dark:bg-white/[0.06] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)] transition-all cursor-pointer whitespace-nowrap"
                >
                  {t.nav.contact}
                </button>

                {/* Language Toggle button */}
                <button
                  onClick={toggleLanguage}
                  className="shrink-0 px-3 h-10 rounded-xl border border-pink-500/50 bg-[#0c0d14] flex items-center gap-1.5 text-xs font-mono text-zinc-200 hover:text-white hover:border-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all cursor-pointer"
                  aria-label="Toggle Language"
                  title={language === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
                >
                  <Globe className="w-3.5 h-3.5 text-white" />
                  <span className="font-semibold text-pink-400">
                    {language === 'hi' ? 'EN' : 'हिन्दी'}
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-[var(--color-border)] mx-4 shrink-0" />

              {/* Sheet Scroll Body */}
              <div className="sheet-scroll overflow-y-auto overflow-x-hidden px-4 pb-4 pt-4 space-y-5 flex-1">
                {search.trim() ? (
                  /* Filtered Search Results */
                  <div className="space-y-2">
                    {/* Direct Quick Match for Resume / CV */}
                    {isResumeQuery && (
                      <div className="mb-3">
                        <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2 px-1">
                          Direct Document
                        </p>
                        <a
                          href="/Aniket_Resume.pdf"
                          download="Aniket_Resume.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all cursor-pointer group"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 ring-1 ring-emerald-400/40 p-1 flex items-center justify-center bg-emerald-950/50 text-emerald-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                              Aniket Pravin Meshram — Resume (PDF)
                            </h4>
                            <p className="text-xs text-emerald-300/80 truncate">
                              Download official ATS Resume · Software Engineer · 141 KB
                            </p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    )}

                    <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2.5 px-1">
                      Matching Projects ({filteredProjects.length})
                    </p>
                    {filteredProjects.length === 0 && !isResumeQuery ? (
                      <p className="text-sm text-[var(--color-text-tertiary)] py-4 text-center">
                        No projects found matching "{search}"
                      </p>
                    ) : (
                      filteredProjects.map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => {
                            onNavigate(`/projects/${proj.slug}`);
                            onClose();
                          }}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] dark:bg-white/[0.04] hover:bg-[var(--color-bg-tertiary)] transition-all cursor-pointer group"
                        >
                          <div 
                            className="w-10 h-10 rounded-lg overflow-hidden shrink-0 ring-1 ring-[var(--color-border)] p-1 flex items-center justify-center bg-black/20"
                            style={{ backgroundColor: `${proj.color}15` }}
                          >
                            <img
                              src={proj.logo}
                              alt={`Aniket Meshram Project — ${proj.title} icon`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-[var(--color-text)] group-hover:text-primary transition-colors truncate">
                              {proj.title}
                            </h4>
                            <p className="text-xs text-[var(--color-text-tertiary)] truncate">
                              {proj.category} · {proj.date}
                            </p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[var(--color-text-tertiary)] group-hover:text-primary transition-colors" />
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  /* Standard Nav Sheet Content */
                  <>
                    {/* 1. PAGES (2-Column Grid matching aniketmeshram.me) */}
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2.5 px-1">
                        {isHindi ? 'पृष्ठ' : 'Pages'}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {navPages.map((page) => {
                          const PageIcon = page.icon;
                          return (
                            <button
                              key={page.path}
                              onClick={() => {
                                onNavigate(page.path);
                                onClose();
                              }}
                              className="sheet-item flex items-center gap-3 px-4 py-3 rounded-xl border transition-all border-[var(--color-border)] bg-[var(--color-bg-secondary)] dark:bg-white/[0.04] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)] cursor-pointer text-left"
                            >
                              <PageIcon className="w-5 h-5 shrink-0" />
                              <span className="text-sm font-medium">
                                {page.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. CONNECT (Social Links matching aniketmeshram.me) */}
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2.5 px-1">
                        {t.footer.socials}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {socials.map((soc) => (
                          <a
                            key={soc.label}
                            href={soc.href}
                            {...(soc.download ? { download: soc.download } : {})}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sheet-item flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] dark:bg-white/[0.04] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)] transition-all text-sm font-medium"
                          >
                            {soc.icon}
                            <span>{soc.label}</span>
                            <ArrowUpRight className="w-3 h-3 opacity-40" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* 3. LEGAL (Privacy & Terms matching aniketmeshram.me) */}
                    <div>
                      <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2.5 px-1">
                        {isHindi ? 'कानूनी' : 'Legal'}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            onNavigate('/privacy');
                            onClose();
                          }}
                          className="sheet-item flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] dark:bg-white/[0.04] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)] transition-all text-sm font-medium cursor-pointer"
                        >
                          <Shield className="w-4 h-4" />
                          <span>{t.footer.privacy}</span>
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('/terms');
                            onClose();
                          }}
                          className="sheet-item flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] dark:bg-white/[0.04] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)] transition-all text-sm font-medium cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          <span>{t.footer.terms}</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default CommandPalette;
