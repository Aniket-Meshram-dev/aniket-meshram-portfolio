import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, ArrowRight } from 'lucide-react';

interface MiscSectionProps {
  onNavigate?: (route: string) => void;
}

const STICKERS = [
  { name: 'unknown_stick', file: '/stickers/unknown_stick.png', left: '44%', top: '32%', rotation: '3deg', scale: 1, zIndex: 2 },
  { name: 'Aizen', file: '/stickers/aizen.png', left: '20%', top: '8%', rotation: '-4deg', scale: 1, zIndex: 2 },
  { name: 'Flutter', file: '/stickers/flutter.png', left: '40%', top: '3%', rotation: '-2deg', scale: 1, zIndex: 2 },
  { name: 'Gwen', file: '/stickers/gwen.png', left: '60%', top: '10%', rotation: '5deg', scale: 1, zIndex: 2 },
  { name: 'Tung', file: '/stickers/tung.png', left: '78%', top: '5%', rotation: '-3deg', scale: 1, zIndex: 2 },
  { name: 'Itachi', file: '/stickers/itachi.png', left: '5%', top: '36%', rotation: '3deg', scale: 1, zIndex: 2 },
  { name: 'Mikasa', file: '/stickers/mikasa.png', left: '64%', top: '42%', rotation: '4deg', scale: 1, zIndex: 2 },
  { name: 'Sawako', file: '/stickers/sawako.png', left: '80%', top: '38%', rotation: '-2deg', scale: 1, zIndex: 2 },
  { name: 'Mikey', file: '/stickers/mikey.png', left: '48%', top: '66%', rotation: '-3deg', scale: 1, zIndex: 2 },
  { name: 'Yuta', file: '/stickers/yuta.png', left: '70%', top: '72%', rotation: '4deg', scale: 1, zIndex: 2 },
  { name: 'Android', file: '/stickers/android.png', left: '24%', top: '70%', rotation: '6deg', scale: 1, zIndex: 2 },
  { name: 'Kurapika', file: '/stickers/kurapika.png', left: '4%', top: '66%', rotation: '-5deg', scale: 1, zIndex: 2 },
  { name: 'Hutao', file: '/stickers/hutao.png', left: '8%', top: '5%', rotation: '-4deg', scale: 0.8, zIndex: 2 },
];

export const MiscSection: React.FC<MiscSectionProps> = ({ onNavigate }) => {
  return (
    <section id="misc" className="py-20 md:py-28">
      {/* 1. Header */}
      <div className="mb-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">Misc</h2>
        <div className="mt-4 h-1 w-16 rounded-full bg-[var(--color-primary)]" />
      </div>

      {/* 2. Interactive Dot Board */}
      <div className="max-w-6xl mx-auto px-6">
        <div>
          <div className="misc-board-dots relative rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-2xl">
            <div className="relative w-full h-[550px] sm:h-[650px] lg:h-[700px]">
              {/* SVG Sticker Cutline Filter */}
              <svg width="0" height="0" aria-hidden="true" focusable="false" className="pointer-events-none absolute overflow-hidden">
                <defs>
                  <filter id="misc-image-sticker-cutline" x="-30%" y="-30%" width="165%" height="175%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feMorphology in="SourceAlpha" operator="dilate" radius="2.75" result="expandedAlpha" />
                    <feGaussianBlur in="expandedAlpha" stdDeviation="0.25" result="smoothAlpha" />
                    <feGaussianBlur in="expandedAlpha" stdDeviation="3.5" result="softShadowBlur" />
                    <feOffset in="softShadowBlur" dx="1.5" dy="4" result="softShadowOffset" />
                    <feFlood floodColor="#000000" floodOpacity="0.24" result="softShadowColor" />
                    <feComposite in="softShadowColor" in2="softShadowOffset" operator="in" result="softShadow" />
                    <feGaussianBlur in="expandedAlpha" stdDeviation="0.8" result="contactShadowBlur" />
                    <feOffset in="contactShadowBlur" dx="0.5" dy="1.5" result="contactShadowOffset" />
                    <feFlood floodColor="#000000" floodOpacity="0.2" result="contactShadowColor" />
                    <feComposite in="contactShadowColor" in2="contactShadowOffset" operator="in" result="contactShadow" />
                    <feFlood floodColor="#ffffff" result="paperColor" />
                    <feComposite in="paperColor" in2="smoothAlpha" operator="in" result="paperCutline" />
                    <feMerge>
                      <feMergeNode in="softShadow" />
                      <feMergeNode in="contactShadow" />
                      <feMergeNode in="paperCutline" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Japanese Quote Card Note */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="misc-item cursor-default"
                style={{
                  position: 'absolute',
                  left: '25%',
                  top: '48%',
                  zIndex: 0,
                  transform: 'rotate(-2deg)',
                }}
              >
                <div className="w-[140px] sm:w-[170px] lg:w-[200px] rounded-xl p-3 lg:p-4 bg-[var(--color-card)] border border-[var(--color-border)] shadow-lg">
                  <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed font-medium">
                    痛みを知らぬ者に、本当の平和は分からん
                  </p>
                </div>
              </motion.div>

              {/* Arabic Letter "س" Sticker */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="misc-item cursor-default"
                style={{
                  position: 'absolute',
                  left: '3%',
                  top: '5%',
                  zIndex: 0,
                  transform: 'rotate(-5deg) scale(1.2)',
                }}
              >
                <svg viewBox="0 0 109 88" width="109" height="88" preserveAspectRatio="xMidYMid meet" role="img" aria-label="S">
                  <g fontSize="72" fontWeight="800">
                    <text x="54.5" y="51" textAnchor="middle" dominantBaseline="alphabetic" fill="#fafafa" stroke="#fafafa" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" paintOrder="stroke fill">
                      س
                    </text>
                    <text x="54.5" y="51" textAnchor="middle" dominantBaseline="alphabetic" fill="#050505">
                      س
                    </text>
                  </g>
                </svg>
              </motion.div>

              {/* 13 Image Stickers with Filter & Float */}
              {STICKERS.map((stk, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * idx }}
                  whileHover={{ scale: 1.12, zIndex: 50 }}
                  className="misc-item cursor-pointer transition-transform duration-200"
                  style={{
                    position: 'absolute',
                    left: stk.left,
                    top: stk.top,
                    zIndex: stk.zIndex,
                    transform: `rotate(${stk.rotation}) scale(${stk.scale})`,
                  }}
                >
                  <div className="misc-image-sticker">
                    <img
                      alt={stk.name}
                      width={180}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="block w-[90px] sm:w-[130px] lg:w-[180px] h-auto drop-shadow-md"
                      src={stk.file}
                      style={{ filter: 'url("#misc-image-sticker-cutline")' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3. Bottom CTA Link Pill */}
          <div className="flex justify-center -mt-5 relative z-30">
            <button
              onClick={() => onNavigate?.('the-wall')}
              className="group relative flex items-center gap-3 px-6 py-2.5 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] shadow-lg hover:shadow-xl hover:border-[var(--color-primary)]/40 transition-all duration-300"
            >
              <PenTool className="w-4 h-4 text-[var(--color-primary)]/60 group-hover:text-[var(--color-primary)] transition-colors" />
              <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">
                wanna leave your mark?
              </span>
              <span className="text-sm font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-primary-light)] transition-colors flex items-center gap-1">
                pin something on the visitor wall
                <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
