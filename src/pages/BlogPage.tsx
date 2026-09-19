import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Search,
  BookOpen,
  ArrowRight,
  Sparkles,
  Copy,
  Terminal,
  Layers,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { BLOG_ARTICLES, type BlogArticleContent } from '@/data/blogArticles';
import { useLanguage } from '@/context/LanguageContext';

const CATEGORIES = [
  'All',
  'System Architecture',
  'AI & LLM Systems',
  'Fintech & WebSockets',
  'Full-Stack',
] as const;

interface BlogPageProps {
  onNavigate?: (route: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const { t, isHindi } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<BlogArticleContent | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSnippetIdx, setCopiedSnippetIdx] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for reading progress bar
  useEffect(() => {
    if (!selectedArticle) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedArticle]);

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((art) => {
      const matchesCat = activeCategory === 'All' || art.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle Share / Copy Link
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Copy Code Snippet
  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIdx(idx);
    setTimeout(() => setCopiedSnippetIdx(null), 2000);
  };

  // Next article in reader view
  const currentIdx = selectedArticle
    ? BLOG_ARTICLES.findIndex((a) => a.id === selectedArticle.id)
    : -1;
  const nextArticle =
    currentIdx !== -1 && currentIdx < BLOG_ARTICLES.length - 1
      ? BLOG_ARTICLES[currentIdx + 1]
      : BLOG_ARTICLES[0];

  return (
    <div className="relative min-h-screen py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto selection:bg-primary/30">
      {/* ── Soft Ambient Glow ── */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-[850px] h-[350px] pointer-events-none -z-10 blur-[130px] opacity-20 bg-[radial-gradient(ellipse_at_center,#4f46e5_0%,transparent_70%)]" />

      {/* ── Reading Progress Bar (when viewing article) ── */}
      {selectedArticle && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-primary to-amber-400 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {selectedArticle ? (
        /* ═══════════════════════════════════════════════════════════
         *  FULL-SCREEN ARTICLE READER VIEW
         * ═══════════════════════════════════════════════════════════ */
        <motion.div
          key={selectedArticle.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="max-w-4xl mx-auto"
        >
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedArticle(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-primary transition-transform group-hover:-translate-x-1" />
                <span>{isHindi ? 'सभी लेख' : 'All Articles'}</span>
              </button>
              {onNavigate && (
                <>
                  <span className="text-zinc-700 hidden sm:inline">•</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('/')}
                    className="hidden sm:inline text-xs font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                  <span className="text-zinc-700 hidden sm:inline">•</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('/projects')}
                    className="hidden sm:inline text-xs font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    Projects
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? (isHindi ? 'लिंक कॉपी हुआ' : 'Link Copied') : (isHindi ? 'शेयर करें' : 'Share Case Study')}</span>
              </button>
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-zinc-400 mb-4">
              <span className="px-2.5 py-0.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-semibold uppercase tracking-wider text-[11px]">
                {selectedArticle.category}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{selectedArticle.publishDate}</span>
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>{selectedArticle.readTime}</span>
              </span>
              <span className="text-zinc-600">•</span>
              <span>{selectedArticle.views} Views</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
              {selectedArticle.title}
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 font-normal leading-relaxed pb-6 border-b border-white/10">
              {selectedArticle.excerpt}
            </p>

            {/* Author Byline */}
            <div className="flex items-center justify-between gap-4 pt-4">
              <div className="flex items-center gap-3">
                <img
                  src="/avatar-transparent.png"
                  alt={PORTFOLIO_DATA.personal.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 bg-primary/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {PORTFOLIO_DATA.personal.name}
                  </h4>
                  <p className="text-xs font-mono text-zinc-400">
                    Software Engineer &amp; Full-Stack Architect
                  </p>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="hidden sm:flex flex-wrap gap-1.5">
                {selectedArticle.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[10.5px] font-mono text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Key Metrics Benchmark Box */}
          {selectedArticle.keyMetrics && (
            <div className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold block mb-3">
                ⚡ Architectural Benchmarks &amp; Specs
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedArticle.keyMetrics.map((m) => (
                  <div key={m.label} className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-lg sm:text-2xl font-black text-white tracking-tight">
                      {m.value}
                    </div>
                    <div className="text-[10.5px] font-mono uppercase text-zinc-400 mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Diagram (if present) */}
          {selectedArticle.architectureDiagram && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-zinc-400">
                <Layers className="w-4 h-4 text-primary" />
                <span>System Architecture Dataflow</span>
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-black border border-white/15 font-mono text-[11px] sm:text-xs text-emerald-400 overflow-x-auto shadow-2xl leading-relaxed">
                <pre>{selectedArticle.architectureDiagram}</pre>
              </div>
            </div>
          )}

          {/* Structured Content Sections */}
          <div className="space-y-12 text-zinc-200 leading-relaxed text-sm sm:text-base">
            {selectedArticle.contentSections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {sec.heading}
                </h2>
                <p className="text-zinc-300 leading-relaxed">{sec.body}</p>

                {sec.callout && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-primary/10 border-l-4 border-primary text-zinc-200 text-xs sm:text-sm font-medium leading-relaxed my-4">
                    <span className="font-bold text-white block mb-1">💡 Architecture Note:</span>
                    {sec.callout}
                  </div>
                )}

                {sec.codeSnippet && (
                  <div className="rounded-2xl bg-[#090b12] border border-white/15 overflow-hidden my-6 shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#121422] border-b border-white/10 text-xs font-mono text-zinc-300">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-primary" />
                        <span className="font-semibold text-white">{sec.codeSnippet.title}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(sec.codeSnippet!.code, idx)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedSnippetIdx === idx ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span className="text-[10px]">{copiedSnippetIdx === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] text-zinc-300 overflow-x-auto leading-relaxed">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}

            {/* Key Engineering Takeaways */}
            {selectedArticle.takeaways && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 my-10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t.blog.takeaways}</span>
                </h3>
                <ul className="space-y-3 text-sm text-zinc-300">
                  {selectedArticle.takeaways.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0 mt-0.5 border border-emerald-500/30 font-bold">
                        ✓
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Up Next Article Card */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block mb-2">
              Up Next in The Journal
            </span>
            <div
              onClick={() => {
                setSelectedArticle(nextArticle);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/40 transition-all cursor-pointer group flex items-center justify-between gap-4"
            >
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {nextArticle.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                  {nextArticle.excerpt}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/15 group-hover:border-primary group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-all">
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* ═══════════════════════════════════════════════════════════
         *  ARTICLES LISTING CATALOG VIEW
         * ═══════════════════════════════════════════════════════════ */
        <div>
          {/* Breadcrumb Bar */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 mb-5">
            <button
              type="button"
              onClick={() => onNavigate?.('/')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {t.nav.home}
            </button>
            <span>/</span>
            <span className="text-zinc-300">{t.nav.blog}</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3 font-mono inline-flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.blog.sectionBadge}</span>
              <BookOpen className="w-3.5 h-3.5" />
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4"
            >
              {t.blog.heading}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-primary to-amber-300">
                {t.blog.headingAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed"
            >
              {t.blog.subtitle}
            </motion.p>
          </div>

          {/* Search Bar & Category Filter Tabs */}
          <div className="mb-10 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-lg mx-auto">
              <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHindi ? 'शीर्षक, तकनीक या विषय खोजें...' : 'Search articles by title, tech stack, or topic...'}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 transition-all text-xs sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Chips */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer shrink-0 border ${
                    activeCategory === cat
                      ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                      : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="space-y-6">
            <AnimatePresence>
              {filteredArticles.map((art, idx) => (
                <motion.article
                  key={art.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => {
                    setSelectedArticle(art);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group p-6 sm:p-8 rounded-3xl bg-[#0b0d14] border border-white/10 hover:border-primary/40 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
                >
                  {/* Subtle top accent */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-mono text-zinc-400 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary/20 text-primary border border-primary/30 font-semibold uppercase tracking-wider text-[11px]">
                      {art.category}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span>{art.publishDate}</span>
                    <span className="text-zinc-600">•</span>
                    <span>{art.readTime}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500">{art.views} reads</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors mb-3 leading-snug">
                    {art.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-2">
                    {art.excerpt}
                  </p>

                  {/* Footer Tags & Read Action */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {art.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[10.5px] font-mono rounded bg-white/[0.03] text-zinc-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                      <span>{isHindi ? 'पूरा लेख पढ़ें' : 'Read Full Deep-Dive'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16 text-zinc-500 text-sm font-mono">
                No engineering articles found matching "{searchQuery}".
              </div>
            )}
          </div>

          {/* Cross-Page Redirection Navigation Banner */}
          <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#121422] to-[#080910] border border-white/10 text-center relative overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
              Explore More of Aniket's Engineering Portfolio
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
              Inspect live production deployments, leave your mark on the interactive physics wall, or initiate a software engineering conversation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {onNavigate && (
                <>
                  <button
                    type="button"
                    onClick={() => onNavigate('/projects')}
                    className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-pink-500/25"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('/wall')}
                    className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/10 text-xs sm:text-sm font-medium active:scale-95 transition-all cursor-pointer"
                  >
                    The Wall (Canvas)
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('/contact')}
                    className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/10 text-xs sm:text-sm font-medium active:scale-95 transition-all cursor-pointer"
                  >
                    Get in Touch
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
