import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import { SmoothScrollProvider, useSmoothScroll } from '@/context/SmoothScrollContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { HomePage } from '@/pages/HomePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { BlogPage } from '@/pages/BlogPage';
import { WallPage } from '@/pages/WallPage';
import { ContactPage } from '@/pages/ContactPage';
import { AmbientSpotlight } from '@/components/ui/AmbientSpotlight';
import { FilmGrain } from '@/components/ui/FilmGrain';
import { MorphingCursor } from '@/components/ui/MorphingCursor';
import { PORTFOLIO_DATA, type Project } from '@/data/portfolioData';
import { SEOHead } from '@/components/seo/SEOHead';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import {
  ROUTE_SEO_MAP,
  generateBreadcrumbSchema,
  generateProjectSchema,
} from '@/utils/seoConfig';

export const AppContent: React.FC = () => {
  const { scrollToTop } = useSmoothScroll();
  const { language, t } = useLanguage();
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname && window.location.pathname !== '') {
      return window.location.pathname;
    }
    return '/';
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Sync with browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
      setSelectedProject(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: string) => {
    setSelectedProject(null);
    setCurrentRoute(route);
    if (typeof window !== 'undefined' && window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    scrollToTop(false);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    const route = `/projects/${project.slug}`;
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', route);
    }
    scrollToTop(true);
  };

  const projectSlug = currentRoute.startsWith('/projects/')
    ? currentRoute.replace('/projects/', '')
    : null;
  const activeProject =
    selectedProject ||
    (projectSlug
      ? PORTFOLIO_DATA.projects.find(
          (p) => p.slug === projectSlug || p.id === projectSlug
        )
      : null);

  // Compute dynamic SEO metadata for search crawlers & browser title
  const seoProps = useMemo(() => {
    if (activeProject) {
      return {
        title: language === 'hi'
          ? `${activeProject.title} — केस स्टडी | अनिकेत मेश्राम`
          : `${activeProject.title} — Case Study | Aniket Meshram`,
        description: activeProject.description.slice(0, 155),
        canonicalPath: `/projects/${activeProject.slug}`,
        ogImage: activeProject.image,
        ogType: 'article' as const,
        keywords: `${activeProject.title}, ${activeProject.tags.join(', ')}, Aniket Meshram Case Study, Full-Stack Architecture`,
        jsonLd: [
          generateBreadcrumbSchema([
            { name: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home', path: '/' },
            { name: language === 'hi' ? 'परियोजनाएं' : 'Projects', path: '/projects' },
            { name: activeProject.title, path: `/projects/${activeProject.slug}` },
          ]),
          generateProjectSchema(activeProject),
        ],
      };
    }

    if (currentRoute === '/projects') {
      return {
        title: t.seo.projectsTitle,
        description: t.seo.projectsDesc,
        canonicalPath: '/projects',
        ogType: 'website' as const,
        jsonLd: generateBreadcrumbSchema([
          { name: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home', path: '/' },
          { name: language === 'hi' ? 'परियोजनाएं' : 'Projects', path: '/projects' },
        ]),
      };
    }

    if (currentRoute === '/blog') {
      return {
        title: t.seo.blogTitle,
        description: t.seo.blogDesc,
        canonicalPath: '/blog',
        ogType: 'website' as const,
        jsonLd: generateBreadcrumbSchema([
          { name: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home', path: '/' },
          { name: language === 'hi' ? 'ब्लॉग' : 'Blog', path: '/blog' },
        ]),
      };
    }

    if (currentRoute === '/wall') {
      return {
        title: t.seo.wallTitle,
        description: t.seo.wallDesc,
        canonicalPath: '/wall',
        ogType: 'website' as const,
        jsonLd: generateBreadcrumbSchema([
          { name: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home', path: '/' },
          { name: language === 'hi' ? 'दीवार' : 'The Wall', path: '/wall' },
        ]),
      };
    }

    if (currentRoute === '/contact') {
      return {
        title: t.seo.contactTitle,
        description: t.seo.contactDesc,
        canonicalPath: '/contact',
        ogType: 'website' as const,
        jsonLd: generateBreadcrumbSchema([
          { name: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home', path: '/' },
          { name: language === 'hi' ? 'संपर्क' : 'Contact', path: '/contact' },
        ]),
      };
    }

    if (currentRoute === '/privacy') {
      return ROUTE_SEO_MAP['/privacy'];
    }

    if (currentRoute === '/terms') {
      return ROUTE_SEO_MAP['/terms'];
    }

    return {
      title: t.seo.homeTitle,
      description: t.seo.homeDesc,
      canonicalPath: '/',
      ogType: 'website' as const,
    };
  }, [activeProject, currentRoute, language, t]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#cc3366]/30 selection:text-[#f8e7ed] bg-black text-white">
      {/* Dynamic SEO Head Management (Title, Meta Description, Canonical, Open Graph, Schema.org) */}
      <SEOHead {...seoProps} />

      {/* Global Morphing Magnetic Cursor (Dual-Ring Laser) */}
      <MorphingCursor />

      {/* Global Ambient Cursor Spotlight Glow */}
      <AmbientSpotlight />

      {/* Cinematic Film Grain Texture Overlay */}
      <FilmGrain />

      {/* Floating Navigation Header */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Main Page View with Smooth Animated Transitions */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          {activeProject ? (
            <motion.div
              key={`project-${activeProject.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectDetailPage
                project={activeProject}
                onBack={() => {
                  setSelectedProject(null);
                  handleNavigate('/projects');
                }}
                onSelectProject={handleSelectProject}
                onNavigate={handleNavigate}
              />
            </motion.div>
          ) : currentRoute === '/' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <HomePage
                onNavigate={handleNavigate}
                onSelectProject={handleSelectProject}
              />
            </motion.div>
          ) : currentRoute === '/projects' ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectsPage
                onSelectProject={handleSelectProject}
                onNavigate={handleNavigate}
              />
            </motion.div>
          ) : currentRoute === '/blog' ? (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <BlogPage onNavigate={handleNavigate} />
            </motion.div>
          ) : currentRoute === '/wall' ? (
            <motion.div
              key="wall"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <WallPage onNavigate={handleNavigate} />
            </motion.div>
          ) : currentRoute === '/contact' ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ContactPage onNavigate={handleNavigate} />
            </motion.div>
          ) : (
            <motion.div
              key="legal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="min-h-screen py-32 px-6 max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl font-bold mb-4">
                {currentRoute === '/privacy' ? 'Privacy Policy' : 'Terms of Use'}
              </h1>
              <p className="text-zinc-400 mb-6">
                This portfolio is maintained by Aniket Meshram. No personal
                data is collected or tracked.
              </p>
              <button
                onClick={() => handleNavigate('/')}
                className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-xs cursor-pointer"
              >
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SmoothScrollProvider>
          <MotionConfig reducedMotion="user">
            <AppContent />
          </MotionConfig>
        </SmoothScrollProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
