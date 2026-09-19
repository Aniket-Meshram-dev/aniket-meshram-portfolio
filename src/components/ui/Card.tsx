import React, { useRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface CardProps extends HTMLMotionProps<'div'> {
  tiltEffect?: boolean;
  spotlight?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  tiltEffect = false,
  spotlight = true,
  className,
  children,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    if (tiltEffect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((y - centerY) / centerY) * -5;
      const rotY = ((x - centerX) / centerX) * 5;
      setRotation({ x: rotX, y: rotY });
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
    if (tiltEffect) {
      setRotation({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      style={{ perspective: 1000 }}
      className={cn(
        'glass-panel relative overflow-hidden rounded-2xl p-6 transition-colors duration-200',
        className
      )}
      {...props}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(204, 51, 102, 0.08), transparent 40%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};
