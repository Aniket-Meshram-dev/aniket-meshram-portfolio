import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  showLabel = true,
}) => {
  const { toggleLanguage, isHindi } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`relative group flex items-center justify-center gap-1.5 h-9 rounded-2xl bg-[#0c0d14]/90 backdrop-blur-xl border border-pink-500/80 shadow-[0_0_12px_rgba(236,72,153,0.35)] hover:shadow-[0_0_18px_rgba(236,72,153,0.6)] hover:border-pink-400 transition-all duration-300 cursor-pointer select-none px-2.5 sm:px-3 text-white ${className}`}
      aria-label={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
      title={isHindi ? 'Switch to English' : 'Switch to Hindi (हिंदी)'}
      data-cursor="pointer"
    >
      {/* Subtle Inner Ambient Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 via-transparent to-pink-500/10 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Globe Icon matching reference image */}
      <motion.div
        animate={{ rotate: isHindi ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative z-10 flex items-center justify-center"
      >
        <Globe className="w-4 h-4 text-white group-hover:text-pink-200 transition-colors drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
      </motion.div>

      {/* Language Badge */}
      {showLabel && (
        <span className="relative z-10 text-[11px] font-mono font-bold tracking-wider text-pink-300 group-hover:text-white transition-colors">
          {isHindi ? 'हिन्दी' : 'EN'}
        </span>
      )}

      {/* Active Dot Indicator */}
      <span className="relative z-10 flex h-1.5 w-1.5 rounded-full bg-pink-400 shadow-[0_0_4px_#f472b6]" />
    </motion.button>
  );
};
