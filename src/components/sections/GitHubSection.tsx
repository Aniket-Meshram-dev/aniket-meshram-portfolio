import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  fetchLiveGitHubData,
  CompleteGitHubData,
  GitHubContributionDay,
  MonthSegment,
} from '@/services/githubService';
import { HEATMAP_LEVEL_COLORS } from '@/data/githubData';
import { useLanguage } from '@/context/LanguageContext';

const Counter: React.FC<{ end: number; duration?: number }> = ({
  end,
  duration = 1.2,
}) => {
  const [count, setCount] = useState(0);
  const prevEnd = useRef(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const startVal = prevEnd.current;
    const targetVal = end;
    prevEnd.current = end;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(startVal + (targetVal - startVal) * ease));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(targetVal);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="github-stat-number font-bold">
      {count.toLocaleString()}
    </span>
  );
};

// Formats 'YYYY-MM-DD' to 'Oct 14, 2025'
function formatContributionDate(dateStr: string): string {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return `${months[monthIdx]} ${day}, ${year}`;
    }
  } catch {
    // fallback
  }
  return dateStr;
}

export const GitHubSection: React.FC = () => {
  const [githubData, setGithubData] = useState<CompleteGitHubData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [currentCommitIdx, setCurrentCommitIdx] = useState<number>(0);
  const [isCommitPaused, setIsCommitPaused] = useState<boolean>(false);

  // Scroll track progress
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Tooltip state for cell inspector
  const [hoveredCell, setHoveredCell] = useState<{
    day: GitHubContributionDay;
    clientX: number;
    clientY: number;
    cellWidth: number;
    cellHeight: number;
  } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const calendarAreaRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss tooltip if page scrolls
  useEffect(() => {
    if (!hoveredCell) return;
    const handleScroll = () => setHoveredCell(null);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hoveredCell]);

  // Load real GitHub API data with localStorage caching
  useEffect(() => {
    let isMounted = true;
    fetchLiveGitHubData().then((data) => {
      if (isMounted) {
        setGithubData(data);
        setLoading(false);
        if (data.availableYears && data.availableYears.length > 0) {
          setSelectedYear(data.availableYears[0]);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Live Commit Pulse auto-cycle every 4.2 seconds (pausable on hover)
  useEffect(() => {
    if (isCommitPaused || !githubData?.liveCommits?.length) return;
    const timer = setInterval(() => {
      setCurrentCommitIdx((prev) => (prev + 1) % githubData.liveCommits.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isCommitPaused, githubData?.liveCommits?.length]);

  // Handle year switch
  const handleYearChange = (year: string) => {
    if (year === selectedYear) return;
    setSelectedYear(year);
    setHoveredCell(null);
  };

  const currentDataset = useMemo(() => {
    if (!githubData) return null;
    return (
      githubData.yearsData[selectedYear] ||
      Object.values(githubData.yearsData)[0] ||
      null
    );
  }, [githubData, selectedYear]);

  const activeCommit =
    githubData?.liveCommits?.[currentCommitIdx] ||
    githubData?.liveCommits?.[0] || {
      id: 'default',
      repo: 'NexLearn-AI',
      branch: 'main',
      hash: 'e984cf9',
      message: 'Active repository development',
      time: 'recently',
      url: 'https://github.com/Aniket-Meshram-dev',
    };

  // Tooltip tracking: calculate cell viewport coordinates
  const handleCellMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    day: GitHubContributionDay
  ) => {
    const cellRect = e.currentTarget.getBoundingClientRect();
    setHoveredCell({
      day,
      clientX: cellRect.left + cellRect.width / 2,
      clientY: cellRect.top,
      cellWidth: cellRect.width,
      cellHeight: cellRect.height,
    });
  };

  // Scroll track handlers
  const handleScrollUpdate = () => {
    setHoveredCell(null);
    const el = scrollTrackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
    } else {
      setScrollProgress(el.scrollLeft / maxScroll);
    }
  };

  const scrollHorizontally = (direction: 'left' | 'right') => {
    setHoveredCell(null);
    const el = scrollTrackRef.current;
    if (!el) return;
    const distance = 240;
    el.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  // Compute fixed tooltip positioning and clamping so it never cuts off or misaligns
  const tooltipCalculations = useMemo(() => {
    if (!hoveredCell) return null;
    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const estimatedCardWidth = 240;
    const halfWidth = estimatedCardWidth / 2;
    const padding = 16;

    // Clamped horizontal center for the tooltip box to prevent screen cutoff
    const clampedCenterX = Math.min(
      winWidth - halfWidth - padding,
      Math.max(halfWidth + padding, hoveredCell.clientX)
    );

    // Arrow offset relative to tooltip center
    const rawArrowOffset = hoveredCell.clientX - clampedCenterX;
    const maxArrowOffset = halfWidth - 24;
    const arrowOffset = Math.max(-maxArrowOffset, Math.min(maxArrowOffset, rawArrowOffset));

    // Determine whether to place above or below cell (place below if cell is near top edge)
    const placeBelow = hoveredCell.clientY < 90;
    const top = placeBelow
      ? hoveredCell.clientY + hoveredCell.cellHeight + 10
      : hoveredCell.clientY - 10;

    return {
      clampedCenterX,
      arrowOffset,
      placeBelow,
      top,
    };
  }, [hoveredCell]);

  const { t } = useLanguage();
  const username = githubData?.username || 'Aniket-Meshram-dev';
  const profileUrl = githubData?.profile?.html_url || `https://github.com/${username}`;
  const totalContributions = currentDataset?.totalContributions || 0;
  const availableYears = githubData?.availableYears?.slice(0, 4) || ['2026', '2025', '2024'];

  const segmentedMonths: MonthSegment[] = currentDataset?.segmentedMonths || [];

  return (
    <section id="github" ref={sectionRef} className="py-20 md:py-28 relative">
      <style>{`
        @keyframes waveIgnite {
          0% {
            opacity: 0.3;
            transform: scale(0.75);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .heatmap-cell-wave {
          animation: waveIgnite 450ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Section Title */}
      <div className="mb-12 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-[var(--color-text)]"
            >
              {t.githubSection.heading}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 h-1 w-16 rounded-full bg-primary"
            />
          </div>

          {/* Live GitHub API / Tech Commit Pulse Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onMouseEnter={() => setIsCommitPaused(true)}
            onMouseLeave={() => setIsCommitPaused(false)}
            className="group relative flex items-center gap-3 px-4 py-2 rounded-2xl bg-[var(--color-card)]/90 backdrop-blur-md border border-[var(--color-border)] shadow-lg overflow-hidden max-w-xl cursor-default"
          >
            {/* Pulsing Beacon */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono font-semibold tracking-wider text-emerald-400 uppercase">
                Live Pulse
              </span>
            </div>

            <div className="h-4 w-px bg-white/10 shrink-0" />

            {/* Rotating Real Commit Display */}
            <div className="flex-1 overflow-hidden min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCommit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 truncate text-xs"
                >
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-primary/15 border border-primary/30 text-primary font-medium shrink-0">
                    {activeCommit.repo}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-text-secondary)] shrink-0">
                    {activeCommit.hash}
                  </span>
                  <span
                    className="text-[var(--color-text)] font-medium truncate"
                    title={activeCommit.message}
                  >
                    {activeCommit.message}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <span className="text-[10px] font-mono text-[var(--color-text-secondary)] shrink-0 hidden sm:inline">
              {activeCommit.time}
            </span>

            {/* GitHub external link */}
            <a
              href={activeCommit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-primary transition-colors shrink-0"
              title="View on GitHub"
              data-cursor="pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Left Column: Segmented Month Calendar Container */}
          <motion.div
            ref={calendarAreaRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="github-calendar-area relative p-6 md:p-8 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] overflow-hidden shadow-xl"
          >
            {/* Header: Profile, Year Selector & Total Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.06]">
              {/* Profile Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner overflow-hidden">
                  {githubData?.profile?.avatar_url ? (
                    <img
                      src={githubData.profile.avatar_url}
                      alt={`Aniket Meshram — GitHub Profile (@${username})`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                </div>
                <div>
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--color-text)] hover:text-primary transition-colors flex items-center gap-1.5"
                    data-cursor="pointer"
                  >
                    @{username}
                  </a>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Contribution activity on GitHub
                  </p>
                </div>
              </div>

              {/* Controls: Year Selector & Total Count */}
              <div className="flex items-center gap-4 sm:justify-end">
                {/* Year Selector Pills */}
                <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md p-1 rounded-xl border border-white/10">
                  {availableYears.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => handleYearChange(yr)}
                      data-cursor="pointer"
                      className={`px-3 py-1 text-xs font-mono rounded-lg transition-all duration-200 ${
                        selectedYear === yr
                          ? 'bg-primary text-white font-bold shadow-[0_0_12px_rgba(212,84,126,0.45)]'
                          : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>

                {/* Stat Badge */}
                <div className="text-end pl-3 border-l border-white/10">
                  <p className="text-xl md:text-2xl font-bold gradient-text">
                    <Counter end={totalContributions} />
                  </p>
                  <p className="text-[11px] text-[var(--color-text-secondary)]">
                    contributions in {selectedYear}
                  </p>
                </div>
              </div>
            </div>

            {/* Segmented Month Heatmap (Matching Screenshot) */}
            <div className="relative min-h-[150px]">
              {loading && !currentDataset ? (
                <div className="w-full h-32 flex items-center justify-center animate-pulse text-xs text-[var(--color-text-secondary)] font-mono">
                  Loading segmented contribution calendar...
                </div>
              ) : segmentedMonths.length > 0 ? (
                <div className="relative">
                  {/* Outer Flex Container: Left Weekday Column + Right Segmented Month Track */}
                  <div
                    className="flex items-start select-none pt-1"
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {/* Left Column: 7 Weekday Labels (Sun..Sat) */}
                    <div className="flex flex-col gap-[3px] pr-3 select-none text-[var(--color-text-secondary)] font-mono shrink-0">
                      <span className="h-[14px] leading-[14px] text-[10px] text-zinc-500">Sun</span>
                      <span className="h-[14px] leading-[14px] text-[10px] font-bold text-zinc-300">Mon</span>
                      <span className="h-[14px] leading-[14px] text-[10px] text-zinc-500">Tue</span>
                      <span className="h-[14px] leading-[14px] text-[10px] font-bold text-zinc-300">Wed</span>
                      <span className="h-[14px] leading-[14px] text-[10px] text-zinc-500">Thu</span>
                      <span className="h-[14px] leading-[14px] text-[10px] font-bold text-zinc-300">Fri</span>
                      <span className="h-[14px] leading-[14px] text-[10px] text-zinc-500">Sat</span>
                    </div>

                    {/* Right Side: Horizontal Scrollable Segmented Month Clusters */}
                    <div
                      ref={scrollTrackRef}
                      onScroll={handleScrollUpdate}
                      className="flex-1 overflow-x-auto pb-3 scrollbar-none"
                    >
                      <div
                        key={`segmented-wave-${selectedYear}`}
                        className="flex items-start gap-4 md:gap-5 min-w-max"
                      >
                        {segmentedMonths.map((month, monthIdx) => (
                          <div
                            key={month.key}
                            className="flex flex-col items-center gap-2 shrink-0"
                          >
                            {/* Grid of Weeks for This Specific Month */}
                            <div className="flex flex-row gap-[3px]">
                              {month.columns.map((week, colIdx) => (
                                <div
                                  key={colIdx}
                                  className="flex flex-col gap-[3px]"
                                >
                                  {week.map((day, rowIdx) => {
                                    // Empty placeholder slot if day doesn't belong to this month
                                    if (!day) {
                                      return (
                                        <div
                                          key={`empty-${rowIdx}`}
                                          className="w-[14px] h-[14px] opacity-0 pointer-events-none"
                                        />
                                      );
                                    }

                                    return (
                                      <div
                                        key={day.date}
                                        data-date={day.date}
                                        data-level={day.level}
                                        data-cursor="default"
                                        className="w-[14px] h-[14px] rounded-[3.5px] transition-all duration-150 cursor-pointer hover:scale-125 hover:brightness-125 hover:z-20 hover:ring-1.5 hover:ring-white heatmap-cell-wave"
                                        style={{
                                          backgroundColor:
                                            HEATMAP_LEVEL_COLORS[day.level] || '#18171f',
                                          border:
                                            day.level > 0
                                              ? '1px solid rgba(212, 84, 126, 0.25)'
                                              : '1px solid rgba(255, 255, 255, 0.06)',
                                          animationDelay: `${
                                            (monthIdx * 4 + colIdx) * 16 + rowIdx * 2
                                          }ms`,
                                        }}
                                        onMouseEnter={(e) =>
                                          handleCellMouseEnter(e, day)
                                        }
                                      />
                                    );
                                  })}
                                </div>
                              ))}
                            </div>

                            {/* Centered Month Name Below (e.g. Sep, Oct, Nov) */}
                            <span className="text-[11px] font-medium text-[var(--color-text-secondary)] select-none">
                              {month.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Minimalist Scroll Track with Left/Right Nav (Matches Screenshot) */}
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                    <button
                      onClick={() => scrollHorizontally('left')}
                      className="text-zinc-400 hover:text-white p-1 transition-colors text-xs select-none"
                      title="Scroll Left"
                      data-cursor="pointer"
                    >
                      ◀
                    </button>

                    {/* Interactive Horizontal Track Indicator */}
                    <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden relative">
                      <div
                        className="h-full bg-primary/60 rounded-full transition-all duration-150"
                        style={{
                          width: '40%',
                          transform: `translateX(${scrollProgress * 150}%)`,
                        }}
                      />
                    </div>

                    <button
                      onClick={() => scrollHorizontally('right')}
                      className="text-zinc-400 hover:text-white p-1 transition-colors text-xs select-none"
                      title="Scroll Right"
                      data-cursor="pointer"
                    >
                      ▶
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-32 flex items-center justify-center text-xs text-[var(--color-text-secondary)]">
                  No contribution records available for {selectedYear}.
                </div>
              )}

              {/* Footer Legend */}
              <footer className="flex flex-wrap items-center justify-between gap-4 text-[var(--color-text-secondary)] mt-4 pt-2">
                <div className="text-xs">
                  <span className="font-semibold text-[var(--color-text)]">
                    {totalContributions.toLocaleString()}
                  </span>{' '}
                  contributions in {selectedYear}
                </div>

                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-xs mr-1 text-[var(--color-text-secondary)]">
                    Less
                  </span>
                  {([0, 1, 2, 3, 4] as const).map((lvl) => (
                    <div
                      key={lvl}
                      className="w-[12px] h-[12px] rounded-[2.5px]"
                      style={{
                        backgroundColor: HEATMAP_LEVEL_COLORS[lvl],
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    />
                  ))}
                  <span className="text-xs ml-1 text-[var(--color-text-secondary)]">
                    More
                  </span>
                </div>
              </footer>

              {/* Floating Glassmorphic Tooltip Cell Inspector */}
              <AnimatePresence>
                {hoveredCell && tooltipCalculations && (
                  <motion.div
                    key="heatmap-tooltip"
                    initial={{
                      opacity: 0,
                      y: tooltipCalculations.placeBelow ? -6 : 6,
                      scale: 0.94,
                    }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    style={{
                      position: 'fixed',
                      left: `${tooltipCalculations.clampedCenterX}px`,
                      top: `${tooltipCalculations.top}px`,
                      transform: tooltipCalculations.placeBelow
                        ? 'translate(-50%, 0)'
                        : 'translate(-50%, -100%)',
                      zIndex: 99999999,
                    }}
                    className="pointer-events-none whitespace-nowrap"
                  >
                    <div className="relative px-3.5 py-2 rounded-xl bg-[#0e0d15]/95 backdrop-blur-xl border border-primary/40 text-xs shadow-[0_12px_30px_-5px_rgba(0,0,0,0.9),0_0_20px_rgba(212,84,126,0.35)] text-white">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor] shrink-0"
                          style={{
                            backgroundColor:
                              hoveredCell.day.count > 0
                                ? HEATMAP_LEVEL_COLORS[hoveredCell.day.level]
                                : '#4b5563',
                            color:
                              hoveredCell.day.count > 0
                                ? HEATMAP_LEVEL_COLORS[hoveredCell.day.level]
                                : '#4b5563',
                          }}
                        />
                        <span className="text-xs text-zinc-300">
                          {hoveredCell.day.count > 0 ? (
                            <>
                              <strong className="font-semibold text-white">
                                {hoveredCell.day.count} contribution
                                {hoveredCell.day.count === 1 ? '' : 's'}
                              </strong>{' '}
                              on {formatContributionDate(hoveredCell.day.date)}
                            </>
                          ) : (
                            <>
                              No contributions on{' '}
                              <span className="text-zinc-400">
                                {formatContributionDate(hoveredCell.day.date)}
                              </span>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Micro Arrow Pip positioned accurately to point to the hovered square */}
                      <div
                        className={`absolute w-2.5 h-2.5 bg-[#0e0d15] rotate-45 ${
                          tooltipCalculations.placeBelow
                            ? '-top-[5px] border-l border-t border-primary/40'
                            : '-bottom-[5px] border-r border-b border-primary/40'
                        }`}
                        style={{
                          left: `calc(50% + ${tooltipCalculations.arrowOffset}px)`,
                          transform: 'translateX(-50%) rotate(45deg)',
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: 3 Live Stat Cards */}
          <div className="flex flex-row lg:flex-col gap-4">
            {/* Real Followers */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="github-stat-card flex-1 relative overflow-hidden p-5 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1"
              style={
                {
                  '--stat-accent': '#ec4899',
                } as React.CSSProperties
              }
            >
              <div
                className="absolute top-0 end-0 w-20 h-20 rounded-full opacity-10 blur-2xl pointer-events-none"
                style={{ backgroundColor: '#ec4899' }}
              />
              <div className="relative z-10 flex flex-col items-center lg:items-start gap-1">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 640 512"
                  className="w-5 h-5 mb-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: '#ec4899' }}
                >
                  <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
                </svg>
                <div style={{ color: '#ec4899' }} className="text-3xl font-bold">
                  <Counter end={githubData?.stats?.followers ?? 1} />
                </div>
                <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                  Followers
                </p>
              </div>
            </motion.div>

            {/* Real Repositories */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="github-stat-card flex-1 relative overflow-hidden p-5 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1"
              style={
                {
                  '--stat-accent': '#14b8a6',
                } as React.CSSProperties
              }
            >
              <div
                className="absolute top-0 end-0 w-20 h-20 rounded-full opacity-10 blur-2xl pointer-events-none"
                style={{ backgroundColor: '#14b8a6' }}
              />
              <div className="relative z-10 flex flex-col items-center lg:items-start gap-1">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  className="w-5 h-5 mb-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: '#14b8a6' }}
                >
                  <path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z" />
                </svg>
                <div style={{ color: '#14b8a6' }} className="text-3xl font-bold">
                  <Counter end={githubData?.stats?.repositories ?? 5} />
                </div>
                <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                  Repositories
                </p>
              </div>
            </motion.div>

            {/* Real GitHub Stars */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="github-stat-card flex-1 relative overflow-hidden p-5 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1"
              style={
                {
                  '--stat-accent': '#f59e0b',
                } as React.CSSProperties
              }
            >
              <div
                className="absolute top-0 end-0 w-20 h-20 rounded-full opacity-10 blur-2xl pointer-events-none"
                style={{ backgroundColor: '#f59e0b' }}
              />
              <div className="relative z-10 flex flex-col items-center lg:items-start gap-1">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 576 512"
                  className="w-5 h-5 mb-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: '#f59e0b' }}
                >
                  <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                </svg>
                <div style={{ color: '#f59e0b' }} className="text-3xl font-bold">
                  <Counter end={githubData?.stats?.totalStars ?? 1} />
                </div>
                <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                  GitHub Stars
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
