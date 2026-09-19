import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Share2, Check } from 'lucide-react';
import { PORTFOLIO_DATA, type Article } from '@/data/portfolioData';

export const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-24 md:py-32 px-6 max-w-4xl mx-auto">
      {selectedArticle ? (
        <div>
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors mb-8 cursor-pointer font-mono"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all articles</span>
          </button>

          <article className="p-8 md:p-10 rounded-2xl bg-[#0a0a0c] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                {selectedArticle.category}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-400 font-mono">
                {selectedArticle.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center justify-between py-4 border-y border-white/10 mb-8 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                <span>Published on {selectedArticle.publishDate}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Share2 className="h-3.5 w-3.5" />
                )}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>

            <div className="text-sm sm:text-base text-zinc-300 leading-relaxed space-y-6">
              <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                {selectedArticle.excerpt}
              </p>

              <h2 className="text-xl font-bold text-white mt-8 mb-4">
                Automating Flutter Build Pipelines
              </h2>
              <p>
                Publishing cross-platform Flutter applications to 6 different
                ecosystems (Google Play, Apple App Store, macOS App Store,
                Windows Store, Snap Store, and Web) manually quickly becomes a
                bottleneck. By unifying CI/CD pipelines with GitHub Actions and
                Fastlane, releases can be triggered purely with a single Git tag.
              </p>

              <div className="rounded-xl bg-black/60 p-4 border border-white/10 font-mono text-xs overflow-x-auto text-zinc-300">
                <pre>{`# .github/workflows/release.yml
on:
  push:
    tags:
      - 'v*'
jobs:
  build-and-deploy:
    runs-on: macos-14
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: bundle exec fastlane deploy_all`}</pre>
              </div>

              <h2 className="text-xl font-bold text-white mt-8 mb-4">
                Key Takeaways
              </h2>
              <p>
                Deterministic builds and unified secret management ensure that
                releases remain reliable, zero-touch, and error-free.
              </p>
            </div>
          </article>
        </div>
      ) : (
        <div>
          {/* Header matching aniketmeshram.me/en/blog */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 font-mono"
            >
              The Journal
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif"
            >
              Thoughts &{' '}
              <span
                className="italic font-bold bg-clip-text text-transparent inline-block -mx-2 px-4 -my-1 py-1"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgb(255, 0, 153), rgb(255, 154, 210))',
                }}
              >
                Ideas
              </span>
            </motion.h1>
          </div>

          <div className="space-y-6">
            {PORTFOLIO_DATA.articles.map((art, idx) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedArticle(art)}
                className="group p-6 md:p-8 rounded-2xl bg-[#0a0a0c] border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:shadow-xl relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                    {art.category}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {art.publishDate}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors mb-3 leading-tight">
                  {art.title}
                </h2>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
                  {art.excerpt}
                </p>

                <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-primary">
                  <span>Read Article</span>
                  <svg
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
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
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
