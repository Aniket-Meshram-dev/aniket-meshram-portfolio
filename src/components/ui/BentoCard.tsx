import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number;
  perspective?: number;
  enableBorderGlint?: boolean;
  enableSurfaceSheen?: boolean;
  glintColor?: string;
  depthZ?: number;
  children: React.ReactNode;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  maxTilt = 6.5,
  perspective = 1000,
  enableBorderGlint = true,
  enableSurfaceSheen = true,
  glintColor = 'rgba(212, 84, 126, 0.8)',
  depthZ = 16,
  className,
  style,
  children,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, (y / rect.height - 0.5) * 2));

    const rotX = -normY * maxTilt;
    const rotY = normX * maxTilt;

    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    if (glintRef.current) glintRef.current.style.opacity = '1';
    if (sheenRef.current) sheenRef.current.style.opacity = '1';
  };

  const handlePointerEnter = () => {
    if (isTouch || !cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease';
  };

  const handlePointerLeave = () => {
    if (isTouch || !cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.65s ease';
    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

    if (glintRef.current) glintRef.current.style.opacity = '0';
    if (sheenRef.current) sheenRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'bento-3d-card group/card relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden',
        'will-change-transform transform-gpu select-none transition-colors duration-200',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
      {...props}
    >
      {/* 1. Specular Border Glint Sweep (Stripe / Apple TV dynamic perimeter reflection) */}
      {enableBorderGlint && !isTouch && (
        <div
          ref={glintRef}
          className="bento-border-glint absolute -inset-[1px] pointer-events-none rounded-[inherit] z-30 opacity-0 transition-opacity duration-300"
          style={{
            padding: '1.2px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            background: `radial-gradient(320px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), ${glintColor} 0%, rgba(255, 255, 255, 0.45) 22%, transparent 70%)`,
          }}
        />
      )}

      {/* 2. Specular Surface Sheen Sweep */}
      {enableSurfaceSheen && !isTouch && (
        <div
          ref={sheenRef}
          className="bento-surface-sheen absolute inset-0 pointer-events-none rounded-[inherit] z-20 opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(450px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(255, 255, 255, 0.08) 0%, rgba(212, 84, 126, 0.04) 35%, transparent 72%)`,
          }}
        />
      )}

      {/* 3. Parallax Floating Content Layer */}
      <div
        className="relative z-10 w-full h-full"
        style={{
          transform: !isTouch && depthZ ? `translateZ(${depthZ}px)` : undefined,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
};
