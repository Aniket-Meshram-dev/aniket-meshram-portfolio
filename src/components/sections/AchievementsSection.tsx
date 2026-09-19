import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA, Achievement } from '../../data/portfolioData';
import { HolographicCertificateModal } from '../ui/HolographicCertificateModal';
import { ExternalLink, Maximize2 } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const achievements = PORTFOLIO_DATA.achievements;
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Achievement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="achievements" ref={containerRef} className="py-20 md:py-28 is-visible">
      {/* Title */}
      <div className="mb-16 max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[var(--color-text)]"
        >
          Achievements
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 h-1 w-16 rounded-full bg-primary"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="relative">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none achievements-bg-glow" />

          {/* Cards Grid */}
          <div className="relative grid md:grid-cols-2 gap-6">
            {achievements.map((item, idx) => {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onMouseMove={handleMouseMove}
                  onClick={() => setSelectedCertificate(item)}
                  className={`spotlight-card group/card achievement-card achievement-tilt relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    item.featured ? 'achievement-card--featured' : ''
                  }`}
                  style={
                    {
                      '--spotlight-color': item.spotlightColor,
                      '--achievement-color': item.color,
                    } as React.CSSProperties
                  }
                >
                  {/* Internal Glow & Sweep */}
                  <div className="achievement-glow" />
                  <div className="achievement-border-sweep" />

                  {/* Card Content Chassis */}
                  <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                    <div className="flex items-start gap-4">
                      {/* Medal Icon */}
                      <div
                        className="achievement-medal w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/card:scale-105"
                        style={{
                          backgroundColor: `${item.color}18`,
                          color: item.color,
                          border: `1px solid ${item.color}35`,
                        }}
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox={item.viewBox || "0 0 512 512"}
                          className="w-6 h-6 drop-shadow"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d={item.svgPath} />
                        </svg>
                      </div>

                      {/* Text Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg leading-tight text-[var(--color-text)] group-hover/card:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p
                          className="text-sm font-semibold mt-1"
                          style={{ color: item.color }}
                        >
                          {item.organization} · {item.date}
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-2.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Verification / View Certificate Actions Bar */}
                    <div className="flex items-center gap-3 mt-5 pt-3.5 border-t border-[var(--color-border)]">
                      {/* Primary 3D Holographic Certificate Trigger */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCertificate(item);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline transition-colors cursor-pointer"
                        style={{ color: item.color }}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View Certificate</span>
                      </button>

                      {/* External Verification Portal */}
                      {item.verificationUrl && (
                        <a
                          href={item.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-white hover:underline transition-colors"
                          title="Verify on issuer verification portal"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {/* Credential ID with Verified Indicator */}
                      {item.certificateId && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(item.certificateId!);
                          }}
                          className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-tertiary)] hover:text-white font-mono ml-auto transition-colors cursor-pointer"
                          title="Click to copy Credential ID"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>ID: {item.certificateId.slice(0, 8)}...</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Holographic Certificate Modal / Lightbox */}
      <HolographicCertificateModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        certificate={selectedCertificate}
        certificates={achievements}
        onSelectCertificate={(cert) => setSelectedCertificate(cert)}
      />
    </section>
  );
};
