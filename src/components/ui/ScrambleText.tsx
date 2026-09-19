import React, { useState, useRef, useEffect, useCallback } from 'react';

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#________01';

interface ScrambleTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p' | 'div';
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number;
  charset?: string;
  trigger?: 'hover' | 'mount' | 'both';
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  as: Component = 'span',
  className = '',
  scrambleSpeed = 28,
  revealSpeed = 2,
  charset = DEFAULT_CHARS,
  trigger = 'hover',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsScrambling(true);

    let frame = 0;
    const totalFrames = text.length * revealSpeed;

    intervalRef.current = window.setInterval(() => {
      frame++;

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (frame / revealSpeed > index) {
            return char;
          }
          return charset[Math.floor(Math.random() * charset.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, scrambleSpeed);
  }, [text, revealSpeed, scrambleSpeed, charset]);

  useEffect(() => {
    setDisplayText(text);
    if (trigger === 'mount' || trigger === 'both') {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, trigger, startScramble]);

  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'both') {
      startScramble();
    }
  };

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={`inline-block font-mono tracking-tight transition-colors duration-200 cursor-default ${
        isScrambling ? 'text-primary' : ''
      } ${className}`}
    >
      {displayText}
    </Component>
  );
};
