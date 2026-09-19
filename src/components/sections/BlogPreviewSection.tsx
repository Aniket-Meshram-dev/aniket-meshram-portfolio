import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface BlogPreviewSectionProps {
  onNavigate: (route: string) => void;
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({ onNavigate }) => {
  return (
    <section id="blog" className="py-16 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#cc3366]">Writings & Thoughts</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
            The Journal
          </h2>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('/blog')}
          className="self-start md:self-auto text-xs text-[#cc3366] hover:text-[#ab2b56]"
        >
          <span>View All Articles</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {PORTFOLIO_DATA.articles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card
              className="p-6 group cursor-pointer hover:border-[#cc3366]/40 transition-colors"
              onClick={() => onNavigate(`/blog`)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono-code">
                    <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 font-medium text-[#cc3366]">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#cc3366] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                    {article.excerpt}
                  </p>
                </div>

                <div className="self-end sm:self-center shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-400 group-hover:bg-[#cc3366] group-hover:text-white transition-all duration-200">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
