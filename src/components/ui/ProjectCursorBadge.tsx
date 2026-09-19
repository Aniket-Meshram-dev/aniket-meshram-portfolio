import React from 'react';

interface ProjectCursorBadgeProps {
  id?: string;
  variant?: 'featured' | 'gallery';
  cursorRef: React.RefObject<HTMLDivElement | null>;
  activeColor?: string;
  label?: string;
}

export const ProjectCursorBadge: React.FC<ProjectCursorBadgeProps> = ({
  cursorRef,
  activeColor,
}) => {
  const accentColor = activeColor || '#00F2FE';

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-50 pointer-events-none will-change-transform select-none hidden md:block"
      style={{
        transformOrigin: 'center center',
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) scale(0)',
      }}
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* ── 1. Outer Orbital Ring with Rotating Micro Satellite Beads ── */}
        <div
          className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin-slow pointer-events-none"
          style={{
            borderColor: `${accentColor}45`,
            animationDuration: '14s',
          }}
        >
          {/* Orbiting Satellite Dot Top */}
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-sm"
            style={{
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
          {/* Orbiting Satellite Dot Bottom */}
          <span
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/70"
          />
        </div>

        {/* ── 2. Secondary Thin Concentric Pulse Ring ── */}
        <div
          className="absolute inset-1.5 rounded-full border pointer-events-none opacity-40 transition-colors duration-300"
          style={{ borderColor: `${accentColor}30` }}
        />

        {/* ── 3. Core Frosted Glass Aperture Lens ── */}
        <div
          className="relative w-10 h-10 rounded-full bg-[#06080e]/85 backdrop-blur-2xl border border-white/30 flex items-center justify-center transition-all duration-300 shadow-2xl"
          style={{
            boxShadow: `0 0 26px -2px ${accentColor}55, 0 12px 28px -6px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.35)`,
            borderColor: `${accentColor}60`,
          }}
        >
          {/* Ambient Inner Color Sheen */}
          <div
            className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${accentColor}40 0%, transparent 75%)`,
            }}
          />

          {/* Precision Crosshair Notches */}
          <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-white/40 rounded-full" />
          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-white/40 rounded-full" />
          <span className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-0.5 bg-white/40 rounded-full" />
          <span className="absolute right-0.5 top-1/2 -translate-y-1/2 w-1 h-0.5 bg-white/40 rounded-full" />

          {/* Razor-Sharp Directional Launch Arrow */}
          <svg
            className="w-4 h-4 transition-transform duration-200"
            style={{
              color: '#ffffff',
              filter: `drop-shadow(0 0 6px ${accentColor})`,
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.6}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};


