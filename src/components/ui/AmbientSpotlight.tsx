import React, { useEffect, useRef, useState } from 'react';

export const AmbientSpotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const animFrame = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const loop = () => {
      // 0.12 LERP factor creates a buttery, luxurious fluid aura trail
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.12;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    animFrame.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Dynamic Smooth Gliding Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute -top-[350px] -left-[350px] w-[700px] h-[700px] rounded-full will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.6s ease-out',
          background:
            'radial-gradient(circle, rgba(212, 84, 126, 0.13) 0%, rgba(255, 0, 153, 0.05) 35%, rgba(138, 43, 226, 0.02) 55%, transparent 75%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
};
