import React from 'react';
import { ArrowLeft, ExternalLink, CheckCircle, Smartphone, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LazyImage } from '@/components/ui/LazyImage';
import type { Project } from '@/data/portfolioData';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
}) => {
  const displayImage =
    project.screenshots && project.screenshots[0]
      ? project.screenshots[0]
      : project.image || project.logo || '/logo.svg';

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors mb-8 cursor-pointer font-mono"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to all projects</span>
      </button>

      {/* Header Info */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="brand">{project.category}</Badge>
          <span className="text-zinc-600">•</span>
          <span className="text-xs text-zinc-400 font-mono">
            {project.date || 'Production Project'}
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-4 mb-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {project.title}
          </h1>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mb-6">
          {project.longDescription || project.description}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3">
          {project.links.live && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.open(project.links.live, '_blank')}
            >
              <span>Visit Project</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          )}

          {project.links.github && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(project.links.github, '_blank')}
            >
              <GithubIcon className="h-4 w-4" />
              <span>Source Repository</span>
            </Button>
          )}
        </div>
      </div>

      {/* Video Walkthrough or Main Showcase Banner */}
      {project.video ? (
        <div className="relative w-full rounded-2xl overflow-hidden mb-10 shadow-2xl border border-white/10 bg-black/60 p-2 sm:p-4">
          <div className="flex items-center justify-between px-2 py-2 mb-2 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              System Walkthrough Video
            </span>
            <span>MP4 · HD</span>
          </div>
          <video
            controls
            playsInline
            preload="metadata"
            poster={displayImage}
            className="w-full rounded-xl max-h-[560px] bg-black shadow-lg"
          >
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div
          className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-2xl border border-white/10 flex items-center justify-center p-6"
          style={{
            background:
              project.bgGradient ||
              'linear-gradient(145deg, #18181b, #09090b)',
          }}
        >
          <img
            src={displayImage}
            alt={project.title}
            className="h-full w-auto object-contain rounded-xl shadow-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/logo.svg';
            }}
          />
        </div>
      )}

      {/* Key Metrics Grid */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {project.metrics.map((metric) => (
            <Card key={metric.label} className="p-4 text-center bg-[#0a0a0c]">
              <div className="text-xl sm:text-2xl font-extrabold text-primary font-mono">
                {metric.value}
              </div>
              <div className="text-xs text-zinc-400 mt-1">{metric.label}</div>
            </Card>
          ))}
        </div>
      )}

      {/* Screenshots Gallery */}
      {project.screenshots && project.screenshots.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>Interface &amp; System Architecture ({project.screenshots.length} Screenshots)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.screenshots.map((src, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0e] group relative"
              >
                <LazyImage
                  src={src}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-102"
                  containerClassName="w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architectural Highlights / Engineering Solutions */}
      <Card className="p-6 md:p-8 space-y-6 mb-10 bg-[#0a0a0c]">
        {project.features && project.features.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>Key Architectural Highlights &amp; Engineering Solutions</span>
            </h2>
            <ul className="space-y-3">
              {project.features.map((feat: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                >
                  <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.platforms && project.platforms.length > 0 && (
          <div className="pt-6 border-t border-white/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 font-mono">
              Supported Target Platforms
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.platforms.map((plat: string) => (
                <Badge key={plat} variant="accent" className="gap-1.5 py-1">
                  <Smartphone className="h-3 w-3" />
                  <span>{plat}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-white/10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 font-mono">
            Technology Stack & Libraries
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="default" className="py-1 font-mono">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
