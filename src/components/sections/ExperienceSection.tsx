import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, type MotionValue } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';

interface TechBrand {
  bg: string;
  border: string;
  text: string;
  glow: string;
}

const TECH_BRAND_COLORS: Record<string, TechBrand> = {
  'Python': { bg: 'rgba(55, 118, 171, 0.16)', border: 'rgba(55, 118, 171, 0.65)', text: '#38bdf8', glow: 'rgba(55, 118, 171, 0.45)' },
  'Machine Learning': { bg: 'rgba(255, 111, 97, 0.16)', border: 'rgba(255, 111, 97, 0.65)', text: '#fb7185', glow: 'rgba(255, 111, 97, 0.45)' },
  'मशीन लर्निंग': { bg: 'rgba(255, 111, 97, 0.16)', border: 'rgba(255, 111, 97, 0.65)', text: '#fb7185', glow: 'rgba(255, 111, 97, 0.45)' },
  'Neural Networks': { bg: 'rgba(139, 92, 246, 0.16)', border: 'rgba(139, 92, 246, 0.65)', text: '#c084fc', glow: 'rgba(139, 92, 246, 0.45)' },
  'न्यूरल नेटवर्क्स': { bg: 'rgba(139, 92, 246, 0.16)', border: 'rgba(139, 92, 246, 0.65)', text: '#c084fc', glow: 'rgba(139, 92, 246, 0.45)' },
  'Java': { bg: 'rgba(237, 139, 0, 0.16)', border: 'rgba(237, 139, 0, 0.65)', text: '#fb923c', glow: 'rgba(237, 139, 0, 0.45)' },
  'Spring Boot': { bg: 'rgba(109, 179, 63, 0.16)', border: 'rgba(109, 179, 63, 0.65)', text: '#4ade80', glow: 'rgba(109, 179, 63, 0.45)' },
  'PostgreSQL': { bg: 'rgba(51, 103, 145, 0.16)', border: 'rgba(51, 103, 145, 0.65)', text: '#60a5fa', glow: 'rgba(51, 103, 145, 0.45)' },
  'Cybersecurity': { bg: 'rgba(16, 185, 129, 0.16)', border: 'rgba(16, 185, 129, 0.65)', text: '#34d399', glow: 'rgba(16, 185, 129, 0.45)' },
  'साइबर सुरक्षा': { bg: 'rgba(16, 185, 129, 0.16)', border: 'rgba(16, 185, 129, 0.65)', text: '#34d399', glow: 'rgba(16, 185, 129, 0.45)' },
  'Zero Trust': { bg: 'rgba(6, 182, 212, 0.16)', border: 'rgba(6, 182, 212, 0.65)', text: '#22d3ee', glow: 'rgba(6, 182, 212, 0.45)' },
  'जीरो ट्रस्ट': { bg: 'rgba(6, 182, 212, 0.16)', border: 'rgba(6, 182, 212, 0.65)', text: '#22d3ee', glow: 'rgba(6, 182, 212, 0.45)' },
  'Network Security': { bg: 'rgba(59, 130, 246, 0.16)', border: 'rgba(59, 130, 246, 0.65)', text: '#60a5fa', glow: 'rgba(59, 130, 246, 0.45)' },
  'नेटवर्क सुरक्षा': { bg: 'rgba(59, 130, 246, 0.16)', border: 'rgba(59, 130, 246, 0.65)', text: '#60a5fa', glow: 'rgba(59, 130, 246, 0.45)' },
  'Threat Defense': { bg: 'rgba(239, 68, 68, 0.16)', border: 'rgba(239, 68, 68, 0.65)', text: '#f87171', glow: 'rgba(239, 68, 68, 0.45)' },
  'थ्रेट डिफेंस': { bg: 'rgba(239, 68, 68, 0.16)', border: 'rgba(239, 68, 68, 0.65)', text: '#f87171', glow: 'rgba(239, 68, 68, 0.45)' },
  'Full Stack': { bg: 'rgba(236, 72, 153, 0.16)', border: 'rgba(236, 72, 153, 0.65)', text: '#f472b6', glow: 'rgba(236, 72, 153, 0.45)' },
  'फुल स्टैक': { bg: 'rgba(236, 72, 153, 0.16)', border: 'rgba(236, 72, 153, 0.65)', text: '#f472b6', glow: 'rgba(236, 72, 153, 0.45)' },
  'AICTE': { bg: 'rgba(245, 158, 11, 0.16)', border: 'rgba(245, 158, 11, 0.65)', text: '#fbbf24', glow: 'rgba(245, 158, 11, 0.45)' },
  'Grade O': { bg: 'rgba(16, 185, 129, 0.16)', border: 'rgba(16, 185, 129, 0.65)', text: '#34d399', glow: 'rgba(16, 185, 129, 0.45)' },
  'ग्रेड O': { bg: 'rgba(16, 185, 129, 0.16)', border: 'rgba(16, 185, 129, 0.65)', text: '#34d399', glow: 'rgba(16, 185, 129, 0.45)' },
  'Next.js': { bg: 'rgba(255, 255, 255, 0.12)', border: 'rgba(255, 255, 255, 0.5)', text: '#ffffff', glow: 'rgba(255, 255, 255, 0.4)' },
  'WebSockets': { bg: 'rgba(240, 80, 50, 0.16)', border: 'rgba(240, 80, 50, 0.65)', text: '#fb7185', glow: 'rgba(240, 80, 50, 0.45)' },
};

const getTechBrand = (skill: string, fallbackColor: string): TechBrand => {
  const trimmed = skill.trim();
  if (TECH_BRAND_COLORS[trimmed]) return TECH_BRAND_COLORS[trimmed];
  for (const [key, val] of Object.entries(TECH_BRAND_COLORS)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return {
    bg: `${fallbackColor}18`,
    border: `${fallbackColor}60`,
    text: fallbackColor,
    glow: `${fallbackColor}45`,
  };
};

interface CircuitTraceProps {
  side: 'left' | 'right';
  progress: MotionValue<number>;
  color: string;
  isLocked: boolean;
}

const CircuitTrace: React.FC<CircuitTraceProps> = ({ side, progress, color, isLocked }) => {
  const isLeft = side === 'left';
  // 80px gap from center spine (50%) to card boundary + 8px inside card pad = 88px width
  const pathD = isLeft
    ? 'M 88 20 H 52 L 38 30 H 0'
    : 'M 0 20 H 36 L 50 30 H 88';

  const terminalX = isLeft ? 8 : 80;
  const terminalY = 30;
  const viaX = isLeft ? 52 : 36;
  const viaY = 20;

  return (
    <svg
      className={`absolute top-6 ${isLeft ? 'right-1/2' : 'left-1/2'} w-[88px] h-10 pointer-events-none hidden md:block overflow-visible z-10`}
      viewBox="0 0 88 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background faint PCB guide trace */}
      <path
        d={pathD}
        stroke="var(--color-border)"
        strokeWidth="1.5"
        strokeOpacity="0.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Animated Glowing Laser PCB Trace */}
      <motion.path
        d={pathD}
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: progress }}
      />

      {/* Intermediate Copper PCB Via */}
      <circle
        cx={viaX}
        cy={viaY}
        r="1.8"
        fill={isLocked ? color : 'var(--color-border)'}
        opacity={isLocked ? 0.95 : 0.4}
        className="transition-colors duration-300"
      />

      {/* Terminal Solder Pad At Card Boundary */}
      <circle
        cx={terminalX}
        cy={terminalY}
        r="3.5"
        fill="var(--color-bg)"
        stroke={isLocked ? color : 'var(--color-border)'}
        strokeWidth="2"
        className="transition-colors duration-300"
      />
      {isLocked && (
        <circle
          cx={terminalX}
          cy={terminalY}
          r="1.8"
          fill={color}
          className="animate-pulse"
        />
      )}
    </svg>
  );
};

export const ExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  const rawExperiences = PORTFOLIO_DATA.experiences;

  // Seamlessly merge localized strings with experience icons, colors, and layout props
  const experiences = rawExperiences.map((exp, idx) => {
    const loc = t.experience?.items?.[idx] || t.experience?.items?.find((item) => item.id === exp.id);
    return {
      ...exp,
      role: loc?.role || exp.role,
      company: loc?.company || exp.company,
      period: loc?.period || exp.period,
      description: loc?.description || exp.description,
      skills: loc?.skills || exp.skills,
    };
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const spineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0.9]);

  // Dynamic touch thresholds measured from exact marker DOM coordinates
  const [touchFractions, setTouchFractions] = useState<number[]>([0.02, 0.35, 0.68]);

  // Synchronized PCB Circuit Trace draw progress for the 3 experiences
  const trace0 = useMotionValue(0);
  const trace1 = useMotionValue(0);
  const trace2 = useMotionValue(0);
  const traces = useRef([trace0, trace1, trace2]).current;

  // Lock-In status for each timeline card
  const [lockedIn, setLockedIn] = useState<boolean[]>([false, false, false]);

  const updateFractions = () => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.offsetHeight || containerRef.current.scrollHeight;
    if (!containerHeight) return;

    const fractions = experiences.map((_, idx) => {
      const el = entryRefs.current[idx];
      if (!el) return idx === 0 ? 0.02 : idx === 1 ? 0.35 : 0.68;
      // Center marker icon is positioned at top-6 (24px) inside el.
      // The traveling node touches the marker icon the exact instant its tip hits el.offsetTop + 24px:
      const touchY = el.offsetTop + 24;
      return Math.max(0, Math.min(1, touchY / containerHeight));
    });

    setTouchFractions(fractions);
  };

  useEffect(() => {
    updateFractions();
    const t1 = setTimeout(updateFractions, 150);
    const t2 = setTimeout(updateFractions, 600);
    window.addEventListener('resize', updateFractions);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateFractions);
    };
  }, []);

  // Update trace draw progress and instant lock-in state on scroll
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const newLocked = touchFractions.map((frac, idx) => {
      // Trace starts drawing 5% of container height before the marker and completes at touch point
      const start = Math.max(0, frac - 0.05);
      const span = frac - start || 0.001;
      const p = Math.max(0, Math.min(1, (latest - start) / span));
      traces[idx].set(p);
      // Instant ignition the exact moment the pink node touches the marker
      return latest >= frac;
    });
    setLockedIn(newLocked);
  });

  useEffect(() => {
    const current = scrollYProgress.get();
    const newLocked = touchFractions.map((frac, idx) => {
      const start = Math.max(0, frac - 0.05);
      const span = frac - start || 0.001;
      const p = Math.max(0, Math.min(1, (current - start) / span));
      traces[idx].set(p);
      return current >= frac;
    });
    setLockedIn(newLocked);
  }, [touchFractions, scrollYProgress]);

  return (
    <section id="experience" className="py-20 md:py-28 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="exp-heading mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[var(--color-text)]"
          >
            {t.experience.heading}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 h-1 w-16 rounded-full bg-primary"
          />
        </div>
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto px-6">
        {/* Faint Background Track Line */}
        <div className="absolute top-0 w-[2px] h-full z-0 hidden md:block md:start-1/2 md:-translate-x-1/2 bg-[var(--color-border)]/40" />

        {/* Dynamic Glowing Ink Light Ray linked to scroll */}
        <motion.div
          className="experience-line absolute top-0 w-[2px] z-10 hidden md:block md:start-1/2 md:-translate-x-1/2 overflow-visible"
          style={{ height: spineHeight }}
        >
          {/* Liquid Glow Energy Node Traveling Along Spine */}
          <motion.div
            style={{ opacity: dotOpacity }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center pointer-events-none"
          >
            {/* Electric Ripple Rings (Shockwaves) Radiating Constantly */}
            <div className="electric-ripple-ring electric-ripple-1 w-7 h-7 border border-pink-400/80" />
            <div className="electric-ripple-ring electric-ripple-2 w-11 h-11 border border-primary/60" />
            <div className="electric-ripple-ring electric-ripple-3 w-14 h-14 border border-cyan-400/40" />

            {/* Glowing High-Voltage Core Bead */}
            <div className="w-3.5 h-3.5 rounded-full bg-white relative z-20 shadow-[0_0_10px_#fff,0_0_20px_#e07a9c,0_0_36px_#d4547e]" />
            <div className="absolute w-6 h-6 rounded-full bg-primary/40 blur-[3px] z-10 animate-pulse" />
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-10 md:gap-20">
          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            const isLocked = lockedIn[idx] ?? false;
            const skillsList = exp.skills.split(/[·,]/).map((s) => s.trim()).filter(Boolean);

            return (
              <motion.div
                ref={(el) => {
                  entryRefs.current[idx] = el;
                }}
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="experience-entry group/exp relative md:grid md:grid-cols-2 md:gap-40"
              >
                {/* Connecting Circuit Trace (Center Spine to Card) */}
                <CircuitTrace
                  side={isEven ? 'left' : 'right'}
                  progress={traces[idx]}
                  color={exp.color}
                  isLocked={isLocked}
                />

                {/* Content Block with Magnetic "Lock-In" Reveal */}
                <div className={isEven ? '' : 'md:col-start-2'}>
                  <motion.div
                    animate={isLocked ? {
                      opacity: 1,
                      filter: 'brightness(1) saturate(1)',
                      borderColor: exp.color,
                      boxShadow: `0 0 32px ${exp.color}24, 0 12px 28px -5px rgba(0,0,0,0.35)`,
                    } : {
                      opacity: 0.48,
                      filter: 'brightness(0.75) saturate(0.5)',
                      borderColor: 'var(--color-border)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group/card relative rounded-2xl p-6 md:p-7 border bg-[var(--color-card)]/90 backdrop-blur-md overflow-hidden transition-colors duration-300"
                  >
                    {/* Top Laser Filament upon Lock-In */}
                    {isLocked && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${exp.color} 50%, transparent 100%)`,
                          boxShadow: `0 0 10px ${exp.color}`,
                        }}
                      />
                    )}

                    {/* Card Header & Status */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Mobile Icon Badge */}
                        <div
                          className="md:hidden w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                          style={{
                            backgroundColor: isLocked ? exp.color : `${exp.color}70`,
                            boxShadow: isLocked ? `${exp.color}40 0px 0px 14px 4px` : 'none',
                          }}
                        >
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d={exp.iconPath} />
                          </svg>
                        </div>

                        <span
                          className="text-xs font-semibold tracking-wider uppercase font-mono-code transition-colors duration-300"
                          style={{ color: isLocked ? exp.color : 'var(--color-text-tertiary)' }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Lock-In Connection Pill */}
                      <span
                        className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border transition-all duration-300 flex items-center gap-1"
                        style={{
                          borderColor: isLocked ? `${exp.color}60` : 'var(--color-border)',
                          backgroundColor: isLocked ? `${exp.color}15` : 'transparent',
                          color: isLocked ? exp.color : 'var(--color-text-tertiary)',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: isLocked ? exp.color : 'var(--color-text-tertiary)',
                            boxShadow: isLocked ? `0 0 8px ${exp.color}` : 'none',
                          }}
                        />
                        {isLocked ? t.experience.nodeConnected : t.experience.standby}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[var(--color-text)] leading-tight mt-3">
                      {exp.role}
                    </h3>

                    <p className="text-sm font-medium mt-1 transition-colors duration-300" style={{ color: exp.color }}>
                      {exp.company}
                    </p>

                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-3">
                      {exp.description}
                    </p>

                    {/* Tech Tag Interactive Chips */}
                    <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[var(--color-border)]/40">
                      {skillsList.map((skill) => {
                        const brand = getTechBrand(skill, exp.color);
                        return (
                          <span
                            key={skill}
                            className="tech-interactive-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-code font-medium cursor-default select-none"
                            style={{
                              '--brand-bg': brand.bg,
                              '--brand-border': brand.border,
                              '--brand-text': brand.text,
                              '--brand-glow': brand.glow,
                            } as React.CSSProperties}
                          >
                            <span
                              className="chip-led w-1.5 h-1.5 rounded-full transition-all duration-300"
                              style={{ backgroundColor: brand.text }}
                            />
                            <span className="transition-colors duration-300">{skill}</span>
                          </span>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                {/* Empty Spacer on desktop for even entries */}
                {isEven && <div className="hidden md:block" />}

                {/* Center Marker on desktop with Touch Shockwave Burst */}
                <div className="hidden md:flex absolute top-6 z-20 start-1/2 -translate-x-1/2 items-center justify-center">
                  {/* Shockwave Burst Ring on Marker Touch */}
                  {isLocked && (
                    <motion.div
                      key={`burst-${exp.id}`}
                      initial={{ scale: 0.7, opacity: 1 }}
                      animate={{ scale: [0.7, 2.3, 2.7], opacity: [1, 0.45, 0] }}
                      transition={{ duration: 0.9, ease: [0.1, 0.9, 0.2, 1] }}
                      className="absolute w-12 h-12 rounded-full border-2 pointer-events-none"
                      style={{ borderColor: exp.color, boxShadow: `0 0 24px ${exp.color}` }}
                    />
                  )}

                  {/* Ambient Ring */}
                  <div
                    className={`experience-marker-ring absolute w-11 h-11 rounded-full border-2 transition-colors duration-500 ${isLocked ? 'marker-ring-pulse' : 'opacity-40'}`}
                    style={{ borderColor: isLocked ? exp.color : `${exp.color}40` }}
                  />

                  {/* Marker Icon Bead with Vibrant Light-up Ignition */}
                  <motion.div
                    animate={isLocked ? {
                      scale: [0.88, 1.22, 1],
                      boxShadow: `0 0 0 3px var(--color-bg), 0 0 28px 6px ${exp.color}`,
                      backgroundColor: exp.color,
                    } : {
                      scale: 0.88,
                      boxShadow: `0 0 0 2px var(--color-bg), 0 0 8px 1px ${exp.color}30`,
                      backgroundColor: `${exp.color}70`,
                    }}
                    transition={{ duration: 0.5, ease: 'backOut' }}
                    className="w-10 h-10 rounded-full flex items-center justify-center relative z-20 transition-colors duration-300"
                  >
                    <svg
                      className="w-4 h-4 text-white transition-opacity duration-300"
                      style={{ opacity: isLocked ? 1 : 0.75 }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={exp.iconPath} />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
