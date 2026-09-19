import React, { useEffect, useRef, useState } from 'react';

type CursorVariant =
  | 'default'
  | 'snap'
  | 'arrow'
  | 'drag'
  | 'zoom'
  | 'sticker'
  | 'text'
  | 'hidden';

export const MorphingCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // Mouse & Physics state
  const mouse = useRef({ x: -200, y: -200, isDown: false, isInside: false });
  const dot = useRef({ x: -200, y: -200 });
  const ring = useRef({
    x: -200,
    y: -200,
    w: 36,
    h: 36,
    r: 9999,
    scale: 1,
    opacity: 0,
  });

  const snapTarget = useRef<{
    rect: DOMRect;
    borderRadius: number;
    element: HTMLElement;
  } | null>(null);

  const currentVariant = useRef<CursorVariant>('default');
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch / coarse devices
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0)
    ) {
      setIsTouch(true);
      return;
    }

    // Add class to html/body to hide system cursor only on desktop fine pointer
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!mouse.current.isInside) {
        mouse.current.isInside = true;
      }

      // Contextual inspection under cursor
      inspectElementAt(e.clientX, e.clientY, e.target as HTMLElement | null);
    };

    const handleMouseDown = () => {
      mouse.current.isDown = true;
    };

    const handleMouseUp = () => {
      mouse.current.isDown = false;
    };

    const handleMouseLeave = () => {
      mouse.current.isInside = false;
      snapTarget.current = null;
      updateVariant('hidden');
    };

    const handleMouseEnter = () => {
      mouse.current.isInside = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  const updateVariant = (newVariant: CursorVariant) => {
    if (currentVariant.current !== newVariant) {
      currentVariant.current = newVariant;
      setVariant(newVariant);
    }
  };

  const inspectElementAt = (x: number, y: number, initialTarget: HTMLElement | null) => {
    const el = initialTarget || document.elementFromPoint(x, y);
    if (!el) {
      snapTarget.current = null;
      updateVariant('default');
      return;
    }

    // 1. Text Inputs / Textarea / ContentEditable -> Keep native cursor, hide custom
    const textInput = el.closest('input, textarea, [contenteditable="true"], select');
    if (textInput) {
      snapTarget.current = null;
      updateVariant('hidden');
      return;
    }

    // 2. Explicit cursor overrides via data-cursor attribute
    const cursorHolder = el.closest('[data-cursor]') as HTMLElement | null;
    if (cursorHolder) {
      const explicit = cursorHolder.getAttribute('data-cursor');
      if (explicit === 'hidden') {
        snapTarget.current = null;
        updateVariant('hidden');
        return;
      }
      if (explicit === 'drag') {
        snapTarget.current = null;
        updateVariant('drag');
        return;
      }
      if (explicit === 'arrow' || explicit === 'pointer') {
        snapTarget.current = null;
        updateVariant('arrow');
        return;
      }
      if (explicit === 'zoom') {
        snapTarget.current = null;
        updateVariant('zoom');
        return;
      }
      if (explicit === 'sticker') {
        snapTarget.current = null;
        updateVariant('sticker');
        return;
      }
      if (explicit === 'snap') {
        updateVariant('snap');
        return;
      }
    }

    // 2b. Heatmap cells -> keep default sleek pinpoint laser dot, never cover with large arrow
    const heatmapCell = el.closest('.heatmap-cell-wave, [data-date]');
    if (heatmapCell) {
      snapTarget.current = null;
      updateVariant('default');
      return;
    }

    // 3. Featured projects section -> Hide custom cursor so the spinning ProjectCursorBadge takes over seamlessly
    const projectCardShowcase = el.closest('.project-card-showcase, [data-project-badge-active]');
    if (projectCardShowcase) {
      snapTarget.current = null;
      updateVariant('hidden');
      return;
    }

    // 4. Interactive 3D drag canvases (COBE Globe, TechOrbitalSphere, 3D Certificate)
    const dragCanvas = el.closest('canvas, .misc-board-dots, .orbital-sphere-wrap, .globe-glow-wrap, [data-cursor="drag"], .certificate-3d-stage');
    if (dragCanvas) {
      snapTarget.current = null;
      updateVariant('drag');
      return;
    }

    // 5. Stickers on The Wall
    const stickerItem = el.closest('.misc-image-sticker, .misc-item');
    if (stickerItem) {
      snapTarget.current = null;
      updateVariant('sticker');
      return;
    }

    // 6. Magnetic Snap Target for Buttons & Compact Interactive Elements
    const buttonTarget = el.closest('button, a, [role="button"], .cv-download-btn, .nav-item') as HTMLElement | null;
    if (buttonTarget) {
      const rect = buttonTarget.getBoundingClientRect();
      // Snap only to compact elements (buttons/pills <= 320px width & <= 100px height)
      if (rect.width > 0 && rect.width <= 320 && rect.height > 0 && rect.height <= 100) {
        const computedRadius = parseFloat(window.getComputedStyle(buttonTarget).borderRadius) || 9999;
        snapTarget.current = {
          rect,
          borderRadius: computedRadius,
          element: buttonTarget,
        };

        // If it's a link or download, show arrow, otherwise snap
        if (buttonTarget.tagName.toLowerCase() === 'a' && buttonTarget.getAttribute('href') && !buttonTarget.classList.contains('nav-item')) {
          updateVariant('arrow');
        } else {
          updateVariant('snap');
        }
        return;
      } else {
        snapTarget.current = null;
        updateVariant('arrow');
        return;
      }
    }

    // 7. General Clickable Elements
    const isClickable = el.closest('.cursor-pointer, [onclick]');
    if (isClickable) {
      snapTarget.current = null;
      updateVariant('arrow');
      return;
    }

    // 8. Default State
    snapTarget.current = null;
    updateVariant('default');
  };

  // RAF Physics Loop for 60fps/120fps hardware-accelerated movement
  useEffect(() => {
    if (isTouch) return;

    const loop = () => {
      // 1. Update Inner Dot (High-precision laser point)
      dot.current.x += (mouse.current.x - dot.current.x) * 0.82;
      dot.current.y += (mouse.current.y - dot.current.y) * 0.82;

      // 2. Update Outer Ring Target calculations
      let targetX = mouse.current.x;
      let targetY = mouse.current.y;
      let targetW = 36;
      let targetH = 36;
      let targetR = 9999;
      let targetOpacity = mouse.current.isInside ? 1 : 0;
      let targetScale = mouse.current.isDown ? 0.82 : 1;

      if (currentVariant.current === 'hidden') {
        targetOpacity = 0;
        targetScale = 0;
      } else if (currentVariant.current === 'snap' && snapTarget.current) {
        // Re-read rect in case of layout shifts / scroll
        const rect = snapTarget.current.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Elastic magnetic attraction towards button center (65% center, 35% mouse)
        targetX = centerX + (mouse.current.x - centerX) * 0.32;
        targetY = centerY + (mouse.current.y - centerY) * 0.32;
        targetW = rect.width + 10;
        targetH = rect.height + 10;
        targetR = Math.min(snapTarget.current.borderRadius + 4, (targetH + 10) / 2);
        targetScale = mouse.current.isDown ? 0.95 : 1.02;
      } else if (currentVariant.current === 'arrow') {
        targetW = 46;
        targetH = 46;
        targetR = 9999;
      } else if (currentVariant.current === 'drag') {
        targetW = 54;
        targetH = 54;
        targetR = 9999;
      } else if (currentVariant.current === 'sticker') {
        targetW = 50;
        targetH = 50;
        targetR = 9999;
      } else if (currentVariant.current === 'zoom') {
        targetW = 48;
        targetH = 48;
        targetR = 9999;
      }

      // 3. Smooth LERP integration for outer ring
      const lerpFactor = currentVariant.current === 'snap' ? 0.24 : 0.18;
      ring.current.x += (targetX - ring.current.x) * lerpFactor;
      ring.current.y += (targetY - ring.current.y) * lerpFactor;
      ring.current.w += (targetW - ring.current.w) * 0.22;
      ring.current.h += (targetH - ring.current.h) * 0.22;
      ring.current.r += (targetR - ring.current.r) * 0.22;
      ring.current.scale += (targetScale - ring.current.scale) * 0.2;
      ring.current.opacity += (targetOpacity - ring.current.opacity) * 0.25;

      // 4. Directly update DOM styles (Zero layout thrashing)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%) scale(${
          currentVariant.current === 'hidden' ? 0 : currentVariant.current === 'snap' ? 0.6 : 1
        })`;
        dotRef.current.style.opacity = `${ring.current.opacity}`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${ring.current.scale})`;
        ringRef.current.style.width = `${Math.round(ring.current.w)}px`;
        ringRef.current.style.height = `${Math.round(ring.current.h)}px`;
        ringRef.current.style.borderRadius = `${Math.round(ring.current.r)}px`;
        ringRef.current.style.opacity = `${ring.current.opacity}`;
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    animFrame.current = requestAnimationFrame(loop);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const isSnapping = variant === 'snap';
  const isArrow = variant === 'arrow';
  const isDrag = variant === 'drag';
  const isSticker = variant === 'sticker';
  const isZoom = variant === 'zoom';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99999999] overflow-hidden select-none hidden md:block"
      aria-hidden="true"
    >
      {/* Outer Soft Magnetic Morphing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center will-change-transform transition-colors duration-200 z-[99999999] ${
          isSnapping
            ? 'border border-white/40 bg-white/[0.06] shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-[0.5px]'
            : isArrow
            ? 'border border-white/60 bg-white/[0.1] shadow-[0_0_16px_rgba(255,255,255,0.2)] backdrop-blur-sm'
            : isDrag
            ? 'border-2 border-dashed border-white/60 bg-black/50 shadow-[0_0_16px_rgba(255,255,255,0.15)] backdrop-blur-sm'
            : isSticker
            ? 'border border-pink-400/80 bg-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.4)] backdrop-blur-sm'
            : isZoom
            ? 'border border-sky-400/80 bg-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.4)] backdrop-blur-sm'
            : 'border-[1.5px] border-white/30 bg-white/[0.03] shadow-[0_0_10px_rgba(255,255,255,0.1)]'
        }`}
        style={{
          width: 36,
          height: 36,
          borderRadius: 9999,
          transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)',
        }}
      >
        {/* Dynamic Contextual Icons */}
        <div ref={iconRef} className="flex items-center justify-center text-white pointer-events-none">
          {/* Arrow Icon */}
          {isArrow && (
            <svg
              className="w-4 h-4 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-75 duration-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          )}

          {/* Drag Rotational / 2-Way Arrows Icon */}
          {isDrag && (
            <div className="flex flex-col items-center gap-0.5 animate-in fade-in zoom-in-75 duration-200">
              <svg
                className="w-4 h-4 text-rose-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M4 12h16" />
              </svg>
              <span className="text-[8px] font-black uppercase tracking-wider text-rose-200">
                DRAG
              </span>
            </div>
          )}

          {/* Sticker Grab / Peel Icon */}
          {isSticker && (
            <svg
              className="w-4 h-4 text-pink-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-75 duration-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a4 4 0 0 0-4 4v7.5a1.5 1.5 0 0 1-3 0V9a1 1 0 0 0-2 0v5.5a7.5 7.5 0 0 0 15 0V7a1 1 0 0 0-2 0v5.5a1.5 1.5 0 0 1-3 0V5a1 1 0 0 0-2 0v6.5a1.5 1.5 0 0 1-3 0V6a4 4 0 0 0-4-4z" />
            </svg>
          )}

          {/* Zoom In Icon */}
          {isZoom && (
            <svg
              className="w-4 h-4 text-sky-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-75 duration-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
            </svg>
          )}
        </div>
      </div>

      {/* Inner Pinpoint Laser Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full will-change-transform z-[99999999]"
        style={{
          width: 5,
          height: 5,
          backgroundColor: '#fff',
          boxShadow: '0 0 6px 1px rgba(255, 255, 255, 0.85), 0 0 10px 2px rgba(255, 255, 255, 0.35)',
          transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%)',
        }}
      />
    </div>
  );
};
