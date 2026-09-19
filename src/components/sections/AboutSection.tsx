import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import createGlobe from 'cobe';
import { BentoCard } from '@/components/ui/BentoCard';
import { Magnetic } from '@/components/ui/Magnetic';

interface AboutSectionProps {
  onNavigate?: (route: string) => void;
}


interface CinematicCounterProps {
  value: number;
  isInView: boolean;
  duration?: number;
  className?: string;
}

const CinematicCounter: React.FC<CinematicCounterProps> = ({
  value,
  isInView,
  duration = 1300,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setDisplayValue(0);
      return;
    }

    let start: number | null = null;
    let animId: number;

    // Cinematic easeOutExpo spring roll curve
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.min(value, Math.round(eased * value));
      setDisplayValue(current);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value, duration]);

  return (
    <motion.span
      key={displayValue}
      initial={{ y: -3, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className={`inline-block tabular-nums ${className}`}
    >
      {displayValue}
    </motion.span>
  );
};

const SwissClockFace: React.FC = React.memo(() => {
  const hourHandRef = useRef<SVGGElement>(null);
  const minuteHandRef = useRef<SVGGElement>(null);
  const secondHandRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dateInfo] = useState(() => {
    const now = new Date();
    return {
      dayDate: now.getDate(),
      dayName: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()],
    };
  });

  useEffect(() => {
    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: '0px' }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const tick = () => {
      if (isVisible) {
        const now = new Date();
        const ms = now.getMilliseconds();
        const s = now.getSeconds() + ms / 1000;
        const m = now.getMinutes() + s / 60;
        const h = (now.getHours() % 12) + m / 60;

        const secondDeg = (s / 60) * 360;
        const minuteDeg = (m / 60) * 360;
        const hourDeg = (h / 12) * 360;

        if (secondHandRef.current) {
          secondHandRef.current.setAttribute('transform', `rotate(${secondDeg.toFixed(2)} 180 180)`);
        }
        if (minuteHandRef.current) {
          minuteHandRef.current.setAttribute('transform', `rotate(${minuteDeg.toFixed(2)} 180 180)`);
        }
        if (hourHandRef.current) {
          hourHandRef.current.setAttribute('transform', `rotate(${hourDeg.toFixed(2)} 180 180)`);
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="about-row2 orbital-clock-cell relative flex items-center justify-center">
      <div className="clock-halo" />
      <div>
        <svg width="360" height="360" viewBox="0 0 360 360" className="mx-auto clock-face">
          <defs>
            <filter id="lumeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="handGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="metalBezel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#333333" />
              <stop offset="18%" stopColor="#555555" />
              <stop offset="38%" stopColor="#888888" />
              <stop offset="50%" stopColor="#aaaaaa" />
              <stop offset="62%" stopColor="#888888" />
              <stop offset="82%" stopColor="#505050" />
              <stop offset="100%" stopColor="#333333" />
            </linearGradient>
            <linearGradient id="innerBezel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#444444" />
              <stop offset="50%" stopColor="#262626" />
              <stop offset="100%" stopColor="#444444" />
            </linearGradient>
            <radialGradient id="dialFace" cx="50%" cy="42%" r="55%">
              <stop offset="0%" stopColor="#111111" />
              <stop offset="75%" stopColor="#0a0a0a" />
              <stop offset="100%" stopColor="#050505" />
            </radialGradient>
            <clipPath id="moonClip">
              <circle cx="120.24" cy="180" r="27.88" />
            </clipPath>
          </defs>

          {/* Bezels */}
          <circle cx="180" cy="180" r="180" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
          <circle cx="180" cy="180" r="178" fill="none" stroke="url(#metalBezel)" strokeWidth="5" />
          <circle cx="180" cy="180" r="175" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="137.44 412.33" strokeDashoffset="-27.48" />
          <circle cx="180" cy="180" r="172" fill="none" stroke="url(#innerBezel)" strokeWidth="3.5" />
          <circle cx="180" cy="180" r="169" fill="none" stroke="#1a1a1a" strokeWidth="0.8" />
          <circle cx="180" cy="180" r="168" fill="url(#dialFace)" />

          {/* Concentric rings */}
          <circle cx="180" cy="180" r="152.72" fill="none" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.15" />
          <circle cx="180" cy="180" r="129.48" fill="none" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.15" />
          <circle cx="180" cy="180" r="99.6" fill="none" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.15" />
          <circle cx="180" cy="180" r="69.72" fill="none" stroke="#1a1a1a" strokeWidth="0.3" opacity="0.15" />
          <circle cx="180" cy="180" r="150" fill="none" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.5" />

          {/* Hour Indices Lines */}
          <line x1="180" y1="30" x2="180" y2="15" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="255" y1="50" x2="262.5" y2="37" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="309.9" y1="105" x2="322.8" y2="97.5" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="330" y1="180" x2="345" y2="180" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="309.9" y1="255" x2="322.8" y2="262.5" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="255" y1="309.9" x2="262.5" y2="322.8" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="180" y1="330" x2="180" y2="345" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="105" y1="309.9" x2="97.5" y2="322.8" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="50" y1="255" x2="37.1" y2="262.5" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="30" y1="180" x2="15" y2="180" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="50" y1="105" x2="37.1" y2="97.5" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="105" y1="50" x2="97.5" y2="37.1" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" />

          {/* Lume Dots */}
          <circle cx="180" cy="18" r="3.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="261" cy="39.7" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="320.3" cy="99" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="342" cy="180" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="320.3" cy="261" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="261" cy="320.3" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="180" cy="342" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="99" cy="320.3" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="39.7" cy="261" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="18" cy="180" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="39.7" cy="99" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />
          <circle cx="99" cy="39.7" r="2.8" fill="#ffffff" filter="url(#lumeGlow)" className="lume-dot" />

          {/* City & Subdials */}
          <text x="180" y="233" textAnchor="middle" dominantBaseline="central" fontSize="7" fontWeight="500" fill="rgba(255,255,255,0.4)" letterSpacing="2">
            AMRAVATI
          </text>

          {/* Date Window */}
          <rect x="221.5" y="167.55" width="36.52" height="24.9" rx="3.5" fill="#0c0c0c" stroke="#2a2a2a" strokeWidth="0.7" />
          <text x="239.76" y="180" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="700" fill="#ffffff" filter="url(#lumeGlow)">
            {dateInfo.dayDate}
          </text>
          <text x="239.76" y="160.08" textAnchor="middle" dominantBaseline="central" fontSize="5.5" fill="rgba(255,255,255,0.35)" letterSpacing="1.2">
            {dateInfo.dayName}
          </text>

          {/* Moon Phase Subdial */}
          <circle cx="120.24" cy="180" r="31.38" fill="none" stroke="#2a2a2a" strokeWidth="0.3" opacity="0.3" />
          <circle cx="120.24" cy="180" r="29.88" fill="#080808" stroke="#2a2a2a" strokeWidth="0.7" />
          <text x="120.24" y="145.12" textAnchor="middle" dominantBaseline="central" fontSize="4.5" fill="rgba(255,255,255,0.35)" letterSpacing="1.2">
            MOON
          </text>
          <g clipPath="url(#moonClip)">
            <circle cx="120.24" cy="180" r="27.88" fill="rgba(255,255,255,0.06)" />
            <path d="M 120.24 152.12 A 27.88 27.88 0 0 1 120.24 207.88 A 7.1 27.88 0 0 0 120.24 152.12 Z" fill="rgba(255,255,255,0.5)" />
          </g>

          {/* Hands */}
          {/* Hour hand */}
          <g ref={hourHandRef} transform="rotate(0 180 180)">
            <polygon points="176,195 184,195 183,105 177,105" fill="rgba(255,255,255,0.85)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" filter="url(#handGlow)" />
          </g>

          {/* Minute hand */}
          <g ref={minuteHandRef} transform="rotate(0 180 180)">
            <polygon points="177,200 183,200 182,65 178,65" fill="rgba(255,255,255,0.85)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" filter="url(#handGlow)" />
          </g>

          {/* Second hand */}
          <g ref={secondHandRef} transform="rotate(0 180 180)">
            <line x1="180" y1="216.5" x2="180" y2="38.9" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
            <circle cx="180" cy="216.5" r="3.5" fill="#ffffff" />
          </g>

          {/* Central Pin */}
          <circle cx="180" cy="180" r="8.5" fill="#2a2a2a" />
          <circle cx="180" cy="180" r="6" fill="#ffffff" filter="url(#lumeGlow)" />
          <circle cx="180" cy="180" r="2.2" fill="#0a0a0a" />
        </svg>
      </div>
    </div>
  );
});

export const AboutSection: React.FC<AboutSectionProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisibleRef = useRef(false);


  // Impact Stats mouse speed sync & scrub trigger
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsContainerRef, { amount: 0.2, once: false });
  const lastPointerPos = useRef<{ x: number; y: number; time: number } | null>(null);
  const currentSpeedMult = useRef(1.0);
  const targetSpeedMult = useRef(1.0);
  const anglesRef = useRef({
    c1Orbit: 0, c1Dot: 0, c1DotRev: 0,
    c2Orbit: 0, c2Dot: 0, c2DotRev: 0,
    c3Orbit: 0, c3Dot: 0, c3DotRev: 0,
    c4Orbit: 0, c4Dot: 0, c4DotRev: 0,
  });

  // RAF loop for Impact Stats Orbiting Dots synced to mouse speed
  useEffect(() => {
    if (!isStatsInView) return;

    let animId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(33, now - lastTime) / 1000;
      lastTime = now;

      // Friction decay of target multiplier back toward baseline cruising 1.0
      targetSpeedMult.current += (1.0 - targetSpeedMult.current) * Math.min(1, dt * 2.8);
      // Smooth lerp of current speed multiplier
      currentSpeedMult.current += (targetSpeedMult.current - currentSpeedMult.current) * Math.min(1, dt * 7.5);

      const mult = currentSpeedMult.current;
      const a = anglesRef.current;

      // Card 1: Production Projects
      a.c1Orbit = (a.c1Orbit + (360 / 10) * mult * dt) % 360;
      a.c1Dot = (a.c1Dot + (360 / 3) * mult * dt) % 360;
      a.c1DotRev = (a.c1DotRev - (360 / 5) * mult * dt) % 360;

      // Card 2: Virtual Internships
      a.c2Orbit = (a.c2Orbit + (360 / 12) * mult * dt) % 360;
      a.c2Dot = (a.c2Dot + (360 / 3.5) * mult * dt) % 360;
      a.c2DotRev = (a.c2DotRev - (360 / 5.7) * mult * dt) % 360;

      // Card 3: Certifications
      a.c3Orbit = (a.c3Orbit + (360 / 14) * mult * dt) % 360;
      a.c3Dot = (a.c3Dot + (360 / 4) * mult * dt) % 360;
      a.c3DotRev = (a.c3DotRev - (360 / 6.4) * mult * dt) % 360;

      // Card 4: Core Technologies
      a.c4Orbit = (a.c4Orbit + (360 / 16) * mult * dt) % 360;
      a.c4Dot = (a.c4Dot + (360 / 4.5) * mult * dt) % 360;
      a.c4DotRev = (a.c4DotRev - (360 / 7.1) * mult * dt) % 360;

      if (statsContainerRef.current) {
        const el = statsContainerRef.current;
        el.style.setProperty('--c1-orbit-rot', `${a.c1Orbit.toFixed(1)}deg`);
        el.style.setProperty('--c1-dot-rot', `${a.c1Dot.toFixed(1)}deg`);
        el.style.setProperty('--c1-dotrev-rot', `${a.c1DotRev.toFixed(1)}deg`);

        el.style.setProperty('--c2-orbit-rot', `${a.c2Orbit.toFixed(1)}deg`);
        el.style.setProperty('--c2-dot-rot', `${a.c2Dot.toFixed(1)}deg`);
        el.style.setProperty('--c2-dotrev-rot', `${a.c2DotRev.toFixed(1)}deg`);

        el.style.setProperty('--c3-orbit-rot', `${a.c3Orbit.toFixed(1)}deg`);
        el.style.setProperty('--c3-dot-rot', `${a.c3Dot.toFixed(1)}deg`);
        el.style.setProperty('--c3-dotrev-rot', `${a.c3DotRev.toFixed(1)}deg`);

        el.style.setProperty('--c4-orbit-rot', `${a.c4Orbit.toFixed(1)}deg`);
        el.style.setProperty('--c4-dot-rot', `${a.c4Dot.toFixed(1)}deg`);
        el.style.setProperty('--c4-dotrev-rot', `${a.c4DotRev.toFixed(1)}deg`);

        const velocityGlow = Math.max(0, (mult - 1) / 3.2);
        el.style.setProperty('--orbit-glow-boost', velocityGlow.toFixed(2));
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isStatsInView]);

  const handleStatsPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (lastPointerPos.current) {
      const dx = e.clientX - lastPointerPos.current.x;
      const dy = e.clientY - lastPointerPos.current.y;
      const dt = Math.max(12, now - lastPointerPos.current.time);
      const speed = Math.hypot(dx, dy) / dt; // px per millisecond
      // Rapid cursor movement accelerates orbiting particles up to 4.8x
      const boost = Math.min(speed * 3.2, 3.8);
      targetSpeedMult.current = Math.min(4.8, Math.max(targetSpeedMult.current, 1.0 + boost));
    }
    lastPointerPos.current = { x: e.clientX, y: e.clientY, time: now };
  };

  // IntersectionObserver to pause heavy WebGL globe & clock RAF loops when off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: '0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Live IST time string for globe location tag (derived from 1s timer — zero extra cost)
  const [istTimeStr, setIstTimeStr] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
  });

  // Update IST string once per second (not every RAF frame — avoids unnecessary re-renders)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setIstTimeStr(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Interactive 3D Bitmoji Avatar state
  const [avatarBubbleText, setAvatarBubbleText] = useState("Hi, I'm Aniket! 👋");
  const [isAvatarBouncing, setIsAvatarBouncing] = useState(false);

  const handleAvatarClick = () => {
    setIsAvatarBouncing(true);
    setAvatarBubbleText("Let's build together! 🚀");
    setTimeout(() => {
      setIsAvatarBouncing(false);
    }, 700);
    setTimeout(() => {
      setAvatarBubbleText("Hi, I'm Aniket! 👋");
    }, 3500);
  };

  // Authentic 3D Dotted Rotating WebGL Globe with COBE & Dynamic 3D Location Tag
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);
  const locationTagRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const phiVelocity = useRef(0);
  const thetaVelocity = useRef(0);
  const phi = useRef(3.35);
  const theta = useRef(0.18);
  const targetTheta = useRef(0.18);

  const AMRAVATI_LAT = 20.9374;
  const AMRAVATI_LON = 77.7796;

  // Project 3D sphere coordinate to 2D canvas pixel space
  const getAmravatiScreenPos = (phiVal: number, thetaVal: number, size = 420, scale = 1.02) => {
    const rad = Math.PI / 180;
    const r = AMRAVATI_LAT * rad;
    const a = AMRAVATI_LON * rad - Math.PI;
    const o = Math.cos(r);
    const p = [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)];
    const sphereRadius = 0.8 + 0.05;

    const v0 = p[0] * sphereRadius;
    const v1 = p[1] * sphereRadius;
    const v2 = p[2] * sphereRadius;

    const cosTheta = Math.cos(thetaVal);
    const cosPhi = Math.cos(phiVal);
    const sinTheta = Math.sin(thetaVal);
    const sinPhi = Math.sin(phiVal);

    const c = cosPhi * v0 + sinPhi * v2;
    const s = sinPhi * sinTheta * v0 + cosTheta * v1 - cosPhi * sinTheta * v2;
    const z = -sinPhi * cosTheta * v0 + sinTheta * v1 + cosPhi * cosTheta * v2;

    const xPercent = (c * scale + 1) / 2;
    const yPercent = (-s * scale + 1) / 2;

    return {
      x: xPercent * size,
      y: yPercent * size,
      visible: z > 0.02,
      zDepth: z,
    };
  };

  useEffect(() => {
    const canvas = globeCanvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 420;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: phi.current,
      theta: theta.current,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 32000,
      mapBrightness: 4,
      mapBaseBrightness: 0.02,
      baseColor: [0.15, 0.12, 0.16], // Deep charcoal-plum base (dark, not black)
      markerColor: [0.83, 0.33, 0.49],
      glowColor: [0.18, 0.07, 0.12], // Warm subtle rose atmospheric rim glow
      markers: [], // Flat dot replaced by interactive dynamic 3D Location Tag
      scale: 1.02,
      opacity: 1,
    });

    let animId: number;
    const animateGlobe = () => {
      if (isVisibleRef.current) {
        if (isDragging.current) {
          phi.current += phiVelocity.current;
          theta.current += thetaVelocity.current;
        } else {
          phi.current += 0.002;
          phi.current += phiVelocity.current;
          phiVelocity.current *= 0.92;
          const diff = targetTheta.current - theta.current;
          theta.current += 0.06 * diff;
        }
        theta.current = Math.max(-0.6, Math.min(0.6, theta.current));
        globe.update({
          phi: phi.current,
          theta: theta.current,
        });

        // Update 3D Pinned Location Tag Position & Perspective in Real Time
        if (locationTagRef.current) {
          const pos = getAmravatiScreenPos(phi.current, theta.current, size, 1.02);
          const scaleFactor = Math.max(0.75, Math.min(1, 0.7 + pos.zDepth * 0.35));
          locationTagRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scaleFactor})`;
          locationTagRef.current.style.opacity = pos.visible
            ? `${Math.min(1, Math.max(0, pos.zDepth * 3.5))}`
            : '0';
        }
      }
      animId = requestAnimationFrame(animateGlobe);
    };

    animId = requestAnimationFrame(animateGlobe);

    return () => {
      cancelAnimationFrame(animId);
      globe.destroy();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28">
      {/* 1. Header */}
      <div className="mb-16 max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[var(--color-text)]"
        >
          About Me
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
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-3">
          {/* Row 1, Card 1: Bio (Apple TV / Stripe 3D Tilt + Specular Border Glint) */}
          <BentoCard className="about-row1 md:col-span-6 lg:col-span-4" maxTilt={6} depthZ={12}>
            <div className="relative z-10 p-6 md:p-8">
              <div className="flex items-center gap-5 mb-6">
                <style>{`
                  @keyframes avatarNeonPulse {
                    0%, 100% {
                      transform: scale(0.94);
                      opacity: 0.4;
                    }
                    50% {
                      transform: scale(1.12);
                      opacity: 0.85;
                    }
                  }
                `}</style>

                {/* Magnetic Interactive Avatar Pod */}
                <Magnetic strength={0.38} innerParallax>
                  <div
                    onClick={handleAvatarClick}
                    className="relative group/avatar shrink-0 cursor-pointer select-none"
                    title="Click to interact with Aniket!"
                    data-cursor="pointer"
                  >
                    {/* Breathing Soft Pink/Rose Radial Ambient Glow (Pure transparent background aura) */}
                    <div
                      className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.45)_0%,rgba(217,70,239,0.25)_45%,rgba(0,0,0,0)_75%)] blur-xl pointer-events-none transition-all duration-500 group-hover/avatar:scale-125 group-hover/avatar:opacity-100"
                      style={{ animation: 'avatarNeonPulse 4.2s ease-in-out infinite' }}
                    />

                    {/* Secondary soft purple ambient depth ring */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-pink-500/20 via-rose-500/30 to-purple-500/20 blur-md pointer-events-none" />

                    {/* 3D Pop-out Container (78px - 86px) with Transparent Glass Pedestal */}
                    <div className="relative w-20 h-20 md:w-[86px] md:h-[86px]">
                      {/* Holographic Frosted Glass Pedestal Rim (no flat opaque color, perfectly blends with dark theme) */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent p-[1.5px] backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.25)] group-hover/avatar:shadow-[0_0_35px_rgba(244,63,94,0.55)] transition-all duration-300">
                        <div className="w-full h-full rounded-full bg-white/[0.03] border border-white/10" />
                      </div>

                      {/* 3D Pop-out Bitmoji Character */}
                      <motion.div
                        animate={
                          isAvatarBouncing
                            ? {
                                scale: [1, 0.86, 1.24, 0.94, 1.06, 1],
                                rotate: [0, -10, 10, -5, 2, 0],
                                y: [0, 4, -8, 2, 0],
                              }
                            : {}
                        }
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                        className="absolute inset-x-0 -top-4 bottom-0 flex items-end justify-center pointer-events-none"
                      >
                        <img
                          src="/avatar-transparent.png"
                          alt="Aniket Meshram"
                          className="w-[128%] h-[128%] max-w-none object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.85)] group-hover/avatar:scale-112 group-hover/avatar:-translate-y-1.5 transition-transform duration-300 ease-out"
                          loading="eager"
                        />
                      </motion.div>

                      {/* Organic Floating Green Status Dot (No awkward border, soft neon aura) */}
                      <div
                        className="absolute bottom-0.5 right-0.5 flex items-center justify-center h-4 w-4 z-20 pointer-events-none"
                        title="Available for Work"
                      >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34d399,0_0_16px_rgba(52,211,153,0.6)]" />
                      </div>
                    </div>

                    {/* Interactive Sleek Glass Speech Capsule ("Hi, I'm Aniket! 👋") */}
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 translate-y-1.5 group-hover/avatar:opacity-100 group-hover/avatar:translate-y-0 transition-all duration-250 ease-out pointer-events-none z-30">
                      <div className="relative flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0a0ff0] border border-pink-500/30 text-[11px] font-medium text-zinc-100 shadow-[0_6px_24px_rgba(0,0,0,0.85),0_0_12px_rgba(244,63,94,0.3)] backdrop-blur-xl whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                        <span>{avatarBubbleText}</span>
                        {/* Downward pointing speech notch */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a0a0ff0] border-r border-b border-pink-500/30 rotate-45" />
                      </div>
                    </div>
                  </div>
                </Magnetic>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold gradient-text">Aniket</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                    Software Engineer &amp; Full-Stack Developer
                  </p>
                </div>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]">
                I'm a Software Engineer &amp; Full-Stack Developer with a passion for building clean, high-performance web applications. I bridge the gap between design and robust engineering, with hands-on experience in full-stack development, modern web technologies, and scalable backend platforms.
              </p>
            </div>
          </BentoCard>

          {/* Row 1, Card 2: Timezones & Interactive Globe (3D Tilt + Specular Border Glint) */}
          <BentoCard className="about-row1 md:col-span-3 lg:col-span-4 orbital-card-top" maxTilt={5} depthZ={8}>
            <div className="relative z-10 p-5 md:p-6 flex flex-col h-full">
              <span className="text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-[0.2em] font-medium mb-2">
                Flexible with Timezones
              </span>
              <h3 className="text-lg md:text-xl font-bold text-[var(--color-text)] leading-snug">
                Based in Amravati, <span className="text-[var(--color-text-secondary)]">available globally</span>
              </h3>
              <div className="flex justify-center mt-3 -mb-72 sm:-mx-6 overflow-hidden sm:overflow-visible">
                <div className="globe-glow-wrap" style={{ width: 420, height: 420 }}>
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <canvas
                      ref={globeCanvasRef}
                      data-cursor="drag"
                      style={{ width: 420, height: 420, touchAction: 'pan-y' }}
                      onPointerDown={(e) => {
                        isDragging.current = true;
                        pointerStart.current = { x: e.clientX, y: e.clientY };
                        phiVelocity.current = 0;
                        thetaVelocity.current = 0;
                        e.currentTarget.style.cursor = 'grabbing';
                        e.currentTarget.setPointerCapture(e.pointerId);
                      }}
                      onPointerUp={(e) => {
                        isDragging.current = false;
                        e.currentTarget.style.cursor = 'grab';
                        e.currentTarget.releasePointerCapture(e.pointerId);
                      }}
                      onPointerCancel={(e) => {
                        isDragging.current = false;
                        e.currentTarget.style.cursor = 'grab';
                        e.currentTarget.releasePointerCapture(e.pointerId);
                      }}
                      onPointerMove={(e) => {
                        if (!isDragging.current) return;
                        const dx = e.clientX - pointerStart.current.x;
                        const dy = e.clientY - pointerStart.current.y;
                        pointerStart.current = { x: e.clientX, y: e.clientY };
                        phiVelocity.current = dx / 120;
                        thetaVelocity.current = dy / 120;
                      }}
                    />

                    {/* Interactive 3D Dynamic Location Tag Pin (Amravati, India) */}
                    <div
                      ref={locationTagRef}
                      className="absolute top-0 left-0 pointer-events-none will-change-transform z-20"
                      style={{
                        transform: 'translate3d(210px, 185px, 0) scale(1)',
                        opacity: 1,
                        transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <div className="relative">
                        {/* 1. Ground Pinpoint Beacon on Globe Surface */}
                        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                          {/* Soft Radar ripple wave */}
                          <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-rose-500/40" />
                          {/* Pinpoint jewel anchor */}
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-tr from-rose-500 to-pink-300 ring-1 ring-white/90 shadow-[0_0_8px_rgba(244,63,94,0.7)]" />
                        </div>

                        {/* 2. Slender Glowing Pin Stem */}
                        <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[1px] h-6 bg-gradient-to-t from-rose-500/80 via-white/50 to-transparent shadow-[0_0_4px_rgba(244,63,94,0.4)]" />

                        {/* 3. Floating Glassmorphic Location Tag Badge */}
                        <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0c0c11f0] backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.7),0_0_12px_rgba(212,84,126,0.15)] whitespace-nowrap select-none">
                          {/* Pulsing Live Emerald Indicator */}
                          <span className="relative flex h-1.5 w-1.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                          </span>

                          {/* City Name */}
                          <span className="text-[11px] font-semibold text-white/90 tracking-tight">Amravati</span>

                          {/* Country Pill */}
                          <span className="text-[9px] font-mono font-medium text-pink-300 bg-pink-500/10 px-1 py-0.5 rounded border border-pink-500/20">
                            IN
                          </span>

                          {/* Separator */}
                          <span className="w-px h-3 bg-white/15" />

                          {/* Live IST Clock */}
                          <span className="text-[9px] font-mono font-medium text-white/60 tabular-nums tracking-tight">
                            {istTimeStr} IST
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Row 1, Card 3: Education */}
          <BentoCard className="about-row1 md:col-span-3 lg:col-span-4" maxTilt={6} depthZ={12}>
            <div className="relative z-10 p-5 md:p-6 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest block">Education</span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono">Academic Qualifications</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5 shrink-0">
                  Academic Record
                </span>
              </div>

              {/* Education Milestones List */}
              <div className="flex-1 flex flex-col justify-between space-y-2.5">
                {/* 1. Undergraduate (2023 – 2027) */}
                <div className="p-3 rounded-xl bg-[var(--color-bg-secondary)] border border-primary/30 relative overflow-hidden group/edu hover:border-primary/55 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[11px] font-semibold text-primary uppercase tracking-wide">Undergraduate</span>
                      </div>
                      <p className="text-xs md:text-sm font-bold text-[var(--color-text)] leading-tight mt-0.5">
                        B.Tech in Computer Science &amp; Business Systems
                      </p>
                      <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
                        KIT's College of Engineering, Kolhapur
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-[var(--color-text-tertiary)] shrink-0 bg-[var(--color-bg)]/80 px-1.5 py-0.5 rounded border border-[var(--color-border)]/50">
                      2023 – 2027
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[var(--color-border)]/40 flex items-center justify-between">
                    <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">Cumulative Grade</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.12)]">
                      ★ 8.5 CGPA
                    </span>
                  </div>
                </div>

                {/* 2. Higher Secondary Certificate (HSC) (2022 – 2023) */}
                <div className="p-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]/60 hover:border-[var(--color-border)] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[var(--color-text)] leading-tight">
                        Higher Secondary Certificate (HSC)
                      </p>
                      <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
                        Higher Secondary Education • Science
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-[var(--color-text-tertiary)] shrink-0 bg-[var(--color-bg)]/80 px-1.5 py-0.5 rounded border border-[var(--color-border)]/50">
                      2022 – 2023
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[var(--color-border)]/40 flex items-center justify-between">
                    <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">Board Score</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                      68.17 %
                    </span>
                  </div>
                </div>

                {/* 3. Secondary School Certificate (SSC) (2019 – 2020) */}
                <div className="p-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]/60 hover:border-[var(--color-border)] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[var(--color-text)] leading-tight">
                        Secondary School Certificate (SSC)
                      </p>
                      <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
                        Secondary High School
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-[var(--color-text-tertiary)] shrink-0 bg-[var(--color-bg)]/80 px-1.5 py-0.5 rounded border border-[var(--color-border)]/50">
                      2019 – 2020
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[var(--color-border)]/40 flex items-center justify-between">
                    <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">Board Score</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                      76 %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Row 2: Orbital Grid (Vision Card, Analog Watch, Quote Card) */}
          <div className="md:col-span-6 lg:col-span-12">
            <div className="orbital-grid">
              {/* Card Start: Vision (Apple TV / Stripe 3D Tilt + Specular Border Glint) */}
              <BentoCard className="about-row2 orbital-card-start available-card" maxTilt={6} depthZ={10}>
                <div className="relative z-10 p-5 md:p-6 flex flex-col md:h-full overflow-hidden orbital-content-start">
                  <div className="available-bg-gradient absolute inset-0 rounded-2xl" />
                  <div className="available-border-ring absolute inset-0 rounded-2xl" />

                  <div className="relative flex items-center gap-2 mb-3 md:mb-auto">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 available-ping" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-[0.15em]">
                      Available for Work
                    </span>
                  </div>

                  <div className="relative flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 md:flex-1 md:justify-center">
                    <p className="cta-heading text-[1.05rem] md:text-[1.6rem] font-extrabold leading-[1.2] tracking-tight flex-1 md:flex-none">
                      <span className="block text-[var(--color-text-secondary)] cta-line-1">HAVE A VISION?</span>
                      <span className="block gradient-text cta-line-2">LET'S BUILD IT</span>
                      <span className="block text-[var(--color-text-tertiary)] font-medium italic cta-line-3">together.</span>
                    </p>

                    <Magnetic strength={0.35} innerParallax>
                      <a
                        href="/Aniket_Resume.pdf"
                        download="Aniket_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-download-btn group/resume relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold shrink-0 md:mt-4 md:self-start cursor-pointer bg-emerald-950/50 hover:bg-emerald-900/70 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.18)] hover:shadow-[0_0_28px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 overflow-hidden select-none"
                        data-cursor="pointer"
                        title="Download Aniket Resume (PDF)"
                      >
                        <style>{`
                          @keyframes resumeShimmer {
                            0%, 65% {
                              transform: translateX(-120%);
                              opacity: 0;
                            }
                            75% {
                              opacity: 1;
                            }
                            100% {
                              transform: translateX(140%);
                              opacity: 0;
                            }
                          }
                        `}</style>
                        {/* Periodic Subtle Shimmer Light Sweep */}
                        <div
                          className="absolute inset-0 -translate-x-full group-hover/resume:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                          style={{
                            animation: 'resumeShimmer 3.8s ease-in-out infinite',
                          }}
                        />

                        {/* Animated Download Arrow Icon in circular badge */}
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 group-hover/resume:bg-emerald-400/30 text-emerald-400 group-hover/resume:text-white transition-colors shrink-0">
                          <svg
                            className="w-3.5 h-3.5 transition-transform duration-200 group-hover/resume:translate-y-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                        </div>

                        <span className="font-semibold tracking-wide">Download Resume</span>
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </BentoCard>

              {/* Center Orbital Clock Cell */}
              <SwissClockFace />

              {/* Card End: Steve Jobs Quote (Apple TV / Stripe 3D Tilt + Specular Border Glint) */}
              <BentoCard className="about-row2 orbital-card-end" maxTilt={6} depthZ={10}>
                <div className="relative z-10 p-5 md:p-6 h-full flex flex-col justify-center orbital-content-end overflow-hidden">
                  <svg className="absolute top-3 end-4 w-12 h-12 text-primary/[0.07]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <div className="relative">
                    <p className="text-lg md:text-xl font-bold leading-snug">
                      <span className="gradient-text italic">Real artists ship.</span>
                    </p>
                    <div className="mt-4 pt-3 border-t border-primary/15">
                      <span className="text-[11px] font-medium text-[var(--color-text-tertiary)] tracking-widest uppercase">
                        Steve Jobs
                      </span>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>

          {/* Row 3: Impact Stats (orbital-card-bottom / impact-stats-outer with Apple TV / Stripe 3D Tilt + Mouse Velocity Orbit Sync) */}
          <div ref={statsContainerRef} className="md:col-span-6 lg:col-span-12">
            <BentoCard
              onPointerMove={handleStatsPointerMove}
              className={`orbital-card-bottom impact-stats-outer w-full ${isStatsInView ? 'is-visible' : ''}`}
              maxTilt={3.5}
              depthZ={6}
            >
              <div className="impact-stats-section relative z-10 p-5 md:p-8 orbital-content-bottom">
                <div className="impact-stats-glow" />
                <div className="impact-stats-grid relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                  {/* 1. Production Projects */}
                  <div className="impact-stat-float impact-stat-float-1">
                    <div className="impact-stat !bg-[var(--color-bg-secondary)] relative rounded-2xl border border-[var(--color-border)] overflow-hidden">
                      <div className="impact-stat-border" />
                      <div className="impact-stat-tilt relative z-10 p-5 md:p-6">
                        <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                          <div
                            className="impact-stat-glow absolute rounded-full"
                            style={{ inset: '-15%', background: 'radial-gradient(circle, rgba(212, 84, 126, 0.082) 0%, transparent 70%)' }}
                          />
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{ animation: 'none', transform: 'rotate(var(--c1-orbit-rot, 0deg))' }}
                          >
                            <circle cx="60" cy="60" r="50" fill="none" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" stroke="#d4547e" />
                          </svg>
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{
                              animation: 'none',
                              transform: 'rotate(var(--c1-dot-rot, 0deg))',
                              filter: 'drop-shadow(0 0 calc(2px + 5px * var(--orbit-glow-boost, 0)) #d4547e)',
                            }}
                          >
                            <circle cx="60" cy="10" r="2.5" fill="#d4547e" opacity="0.85" />
                          </svg>
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{
                              animation: 'none',
                              transform: 'rotate(var(--c1-dotrev-rot, 0deg))',
                              filter: 'drop-shadow(0 0 calc(1.5px + 4px * var(--orbit-glow-boost, 0)) #d4547e)',
                            }}
                          >
                            <circle cx="110" cy="60" r="2" fill="#d4547e" opacity="0.6" />
                          </svg>
                          <p className="impact-stat-number relative text-2xl md:text-3xl font-bold text-[#d4547e]">
                            <CinematicCounter value={4} isInView={isStatsInView} />
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="opacity-60 text-[#d4547e]">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5" />
                              <circle cx="13" cy="12" r="2" />
                              <path d="M18 19c-2.8 0-5-2.2-5-5v8" />
                              <circle cx="20" cy="19" r="2" />
                            </svg>
                          </span>
                          <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-medium">Production Projects</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Virtual Internships */}
                  <div className="impact-stat-float impact-stat-float-2">
                    <div className="impact-stat !bg-[var(--color-bg-secondary)] relative rounded-2xl border border-[var(--color-border)] overflow-hidden">
                      <div className="impact-stat-border" />
                      <div className="impact-stat-tilt relative z-10 p-5 md:p-6">
                        <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                          <div
                            className="impact-stat-glow absolute rounded-full"
                            style={{ inset: '-15%', background: 'radial-gradient(circle, rgba(99, 179, 237, 0.082) 0%, transparent 70%)' }}
                          />
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{ animation: 'none', transform: 'rotate(var(--c2-orbit-rot, 0deg))' }}
                          >
                            <circle cx="60" cy="60" r="50" fill="none" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" stroke="#63b3ed" />
                          </svg>
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{
                              animation: 'none',
                              transform: 'rotate(var(--c2-dot-rot, 0deg))',
                              filter: 'drop-shadow(0 0 calc(2px + 5px * var(--orbit-glow-boost, 0)) #63b3ed)',
                            }}
                          >
                            <circle cx="60" cy="10" r="2.5" fill="#63b3ed" opacity="0.85" />
                          </svg>
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{
                              animation: 'none',
                              transform: 'rotate(var(--c2-dotrev-rot, 0deg))',
                              filter: 'drop-shadow(0 0 calc(1.5px + 4px * var(--orbit-glow-boost, 0)) #63b3ed)',
                            }}
                          >
                            <circle cx="110" cy="60" r="2" fill="#63b3ed" opacity="0.6" />
                          </svg>
                          <p className="impact-stat-number relative text-2xl md:text-3xl font-bold text-[#63b3ed]">
                            <CinematicCounter value={3} isInView={isStatsInView} />
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="opacity-60 text-[#63b3ed]">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                          </span>
                          <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-medium">Virtual Internships</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Verified Certifications */}
                  <div className="impact-stat-float impact-stat-float-3">
                    <div className="impact-stat !bg-[var(--color-bg-secondary)] relative rounded-2xl border border-[var(--color-border)] overflow-hidden">
                      <div className="impact-stat-border" />
                      <div className="impact-stat-tilt relative z-10 p-5 md:p-6">
                        <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                          <div
                            className="impact-stat-glow absolute rounded-full"
                            style={{ inset: '-15%', background: 'radial-gradient(circle, rgba(34, 197, 94, 0.082) 0%, transparent 70%)' }}
                          />
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{ animation: 'none', transform: 'rotate(var(--c3-orbit-rot, 0deg))' }}
                          >
                            <circle cx="60" cy="60" r="50" fill="none" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" stroke="#22c55e" />
                          </svg>
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{
                              animation: 'none',
                              transform: 'rotate(var(--c3-dot-rot, 0deg))',
                              filter: 'drop-shadow(0 0 calc(2px + 5px * var(--orbit-glow-boost, 0)) #22c55e)',
                            }}
                          >
                            <circle cx="60" cy="10" r="2.5" fill="#22c55e" opacity="0.85" />
                          </svg>
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{
                              animation: 'none',
                              transform: 'rotate(var(--c3-dotrev-rot, 0deg))',
                              filter: 'drop-shadow(0 0 calc(1.5px + 4px * var(--orbit-glow-boost, 0)) #22c55e)',
                            }}
                          >
                            <circle cx="110" cy="60" r="2" fill="#22c55e" opacity="0.6" />
                          </svg>
                          <p className="impact-stat-number relative text-2xl md:text-3xl font-bold text-[#22c55e]">
                            <CinematicCounter value={8} isInView={isStatsInView} />
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="opacity-60 text-[#22c55e]">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <circle cx="12" cy="8" r="6" />
                              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                            </svg>
                          </span>
                          <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-medium">Certifications</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Core Technologies */}
                  <div className="impact-stat-float impact-stat-float-4">
                    <div className="impact-stat !bg-[var(--color-bg-secondary)] relative rounded-2xl border border-[var(--color-border)] overflow-hidden">
                      <div className="impact-stat-border" />
                      <div className="impact-stat-tilt relative z-10 p-5 md:p-6">
                        <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                          <div
                            className="impact-stat-glow absolute rounded-full"
                            style={{ inset: '-15%', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.082) 0%, transparent 70%)' }}
                          />
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{ animation: 'none', transform: 'rotate(var(--c4-orbit-rot, 0deg))' }}
                          >
                            <circle cx="60" cy="60" r="50" fill="none" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" stroke="#f59e0b" />
                          </svg>
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{
                              animation: 'none',
                              transform: 'rotate(var(--c4-dot-rot, 0deg))',
                              filter: 'drop-shadow(0 0 calc(2px + 5px * var(--orbit-glow-boost, 0)) #f59e0b)',
                            }}
                          >
                            <circle cx="60" cy="10" r="2.5" fill="#f59e0b" opacity="0.85" />
                          </svg>
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
                            viewBox="0 0 120 120"
                            style={{
                              animation: 'none',
                              transform: 'rotate(var(--c4-dotrev-rot, 0deg))',
                              filter: 'drop-shadow(0 0 calc(1.5px + 4px * var(--orbit-glow-boost, 0)) #f59e0b)',
                            }}
                          >
                            <circle cx="110" cy="60" r="2" fill="#f59e0b" opacity="0.6" />
                          </svg>
                          <p className="impact-stat-number relative text-2xl md:text-3xl font-bold text-[#f59e0b]">
                            <CinematicCounter value={16} isInView={isStatsInView} />
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="opacity-60 text-[#f59e0b]">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <path d="m18 16 4-4-4-4" />
                              <path d="m6 8-4 4 4 4" />
                              <path d="m14.5 4-5 16" />
                            </svg>
                          </span>
                          <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-medium">Core Technologies</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
};
