import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = 'Aniket Meshram Portfolio Asset',
  className = '',
  containerClassName = '',
  aspectRatio,
  priority = false,
  ...props
}) => {
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    // Use IntersectionObserver with 250px rootMargin to trigger load slightly before entering view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '250px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton Shimmer Placeholder (visible while loading and no error) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-white/[0.03] animate-pulse pointer-events-none">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
              animation: 'shimmer 1.8s infinite',
            }}
          />
        </div>
      )}

      {/* Actual Image rendered once in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-500 will-change-[opacity] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60 text-zinc-600 text-xs font-mono">
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
};
