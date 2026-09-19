import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface WallSectionProps {
  onNavigate?: (route: string) => void;
}

interface StickerConfig {
  id: string;
  name: string;
  file: string;
  defaultLeft: string;
  defaultTop: string;
  defaultRotation: number;
  scale: number;
}

interface ItemTransform {
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
}

interface UserStickyNote {
  id: string;
  text: string;
  color: string;
  defaultLeft: string;
  defaultTop: string;
  defaultRotation: number;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
  createdAt: number;
}

const STICKERS: StickerConfig[] = [
  { id: 'unknown_stick', name: 'unknown_stick', file: '/stickers/unknown_stick.png', defaultLeft: '44%', defaultTop: '32%', defaultRotation: 3, scale: 1 },
  { id: 'aizen', name: 'Aizen', file: '/stickers/aizen.png', defaultLeft: '20%', defaultTop: '8%', defaultRotation: -4, scale: 1 },
  { id: 'flutter', name: 'Flutter', file: '/stickers/flutter.png', defaultLeft: '40%', defaultTop: '3%', defaultRotation: -2, scale: 1 },
  { id: 'gwen', name: 'Gwen', file: '/stickers/gwen.png', defaultLeft: '60%', defaultTop: '10%', defaultRotation: 5, scale: 1 },
  { id: 'tung', name: 'Tung', file: '/stickers/tung.png', defaultLeft: '78%', defaultTop: '5%', defaultRotation: -3, scale: 1 },
  { id: 'itachi', name: 'Itachi', file: '/stickers/itachi.png', defaultLeft: '5%', defaultTop: '36%', defaultRotation: 3, scale: 1 },
  { id: 'mikasa', name: 'Mikasa', file: '/stickers/mikasa.png', defaultLeft: '64%', defaultTop: '42%', defaultRotation: 4, scale: 1 },
  { id: 'sawako', name: 'Sawako', file: '/stickers/sawako.png', defaultLeft: '80%', defaultTop: '38%', defaultRotation: -2, scale: 1 },
  { id: 'mikey', name: 'Mikey', file: '/stickers/mikey.png', defaultLeft: '48%', defaultTop: '66%', defaultRotation: -3, scale: 1 },
  { id: 'yuta', name: 'Yuta', file: '/stickers/yuta.png', defaultLeft: '70%', defaultTop: '72%', defaultRotation: 4, scale: 1 },
  { id: 'android', name: 'Android', file: '/stickers/android.png', defaultLeft: '24%', defaultTop: '70%', defaultRotation: 6, scale: 1 },
  { id: 'kurapika', name: 'Kurapika', file: '/stickers/kurapika.png', defaultLeft: '4%', defaultTop: '66%', defaultRotation: -5, scale: 1 },
  { id: 'hutao', name: 'Hutao', file: '/stickers/hutao.png', defaultLeft: '8%', defaultTop: '5%', defaultRotation: -4, scale: 0.8 },
];

const LOCAL_STORAGE_KEY = 'portfolio_visitor_quick_notes';

const NOTE_PALETTES = [
  { accent: '#ec4899', name: 'pink' },
  { accent: '#3b82f6', name: 'blue' },
  { accent: '#10b981', name: 'emerald' },
  { accent: '#f59e0b', name: 'amber' },
  { accent: '#8b5cf6', name: 'violet' },
  { accent: '#06b6d4', name: 'cyan' },
];

const EMOJI_CHIPS = ['👋', '🚀', '🔥', '⚡', '❤️', '✨'];

export const WallSection: React.FC<WallSectionProps> = ({ onNavigate }) => {
  const boardRef = useRef<HTMLDivElement>(null);

  // Highest z-index tracking so dragged item always moves to the front
  const [maxZIndex, setMaxZIndex] = useState<number>(10);

  // Shuffling animation active state
  const [isShuffling, setIsShuffling] = useState<boolean>(false);

  // Quick note text input
  const [quickNoteText, setQuickNoteText] = useState<string>('');

  // Transforms for stickers and cards (x, y, rotation, zIndex)
  const [stickerTransforms, setStickerTransforms] = useState<Record<string, ItemTransform>>(() => {
    const initial: Record<string, ItemTransform> = {};
    STICKERS.forEach((stk) => {
      initial[stk.id] = { x: 0, y: 0, rotation: stk.defaultRotation, zIndex: 2 };
    });
    initial['japanese-quote'] = { x: 0, y: 0, rotation: -2, zIndex: 1 };
    initial['arabic-letter'] = { x: 0, y: 0, rotation: -5, zIndex: 1 };
    return initial;
  });

  // User-created Sticky Notes
  const [userNotes, setUserNotes] = useState<UserStickyNote[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // fallback
      }
    }
    // Default initial sample note
    return [
      {
        id: 'note-default-1',
        text: 'Building remarkable things 🚀',
        color: '#3b82f6',
        defaultLeft: '48%',
        defaultTop: '46%',
        defaultRotation: 2,
        x: 0,
        y: 0,
        rotation: 2,
        zIndex: 5,
        createdAt: Date.now(),
      },
    ];
  });

  // Save notes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userNotes));
      } catch {
        // ignore quota errors
      }
    }
  }, [userNotes]);

  // Bring any item to front on grab
  const bringToFront = (id: string) => {
    setMaxZIndex((prev) => {
      const nextZ = prev + 1;
      setStickerTransforms((curr) => ({
        ...curr,
        [id]: {
          ...(curr[id] || { x: 0, y: 0, rotation: 0 }),
          zIndex: nextZ,
        },
      }));
      setUserNotes((currNotes) =>
        currNotes.map((n) => (n.id === id ? { ...n, zIndex: nextZ } : n))
      );
      return nextZ;
    });
  };

  // Sticker Shuffle / Random Sprinkle Physics
  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => setIsShuffling(false), 550);

    setStickerTransforms((curr) => {
      const updated: Record<string, ItemTransform> = {};
      STICKERS.forEach((stk) => {
        // Random displacement within board safe zone
        const randX = Math.round((Math.random() - 0.5) * 360);
        const randY = Math.round((Math.random() - 0.5) * 260);
        const randRot = Math.round((Math.random() - 0.5) * 32);
        updated[stk.id] = {
          x: randX,
          y: randY,
          rotation: randRot,
          zIndex: curr[stk.id]?.zIndex || 2,
        };
      });

      updated['japanese-quote'] = {
        x: Math.round((Math.random() - 0.5) * 200),
        y: Math.round((Math.random() - 0.5) * 160),
        rotation: Math.round((Math.random() - 0.5) * 18),
        zIndex: curr['japanese-quote']?.zIndex || 1,
      };

      updated['arabic-letter'] = {
        x: Math.round((Math.random() - 0.5) * 200),
        y: Math.round((Math.random() - 0.5) * 160),
        rotation: Math.round((Math.random() - 0.5) * 18),
        zIndex: curr['arabic-letter']?.zIndex || 1,
      };

      return updated;
    });

    setUserNotes((currNotes) =>
      currNotes.map((note) => ({
        ...note,
        x: Math.round((Math.random() - 0.5) * 320),
        y: Math.round((Math.random() - 0.5) * 220),
        rotation: Math.round((Math.random() - 0.5) * 24),
      }))
    );
  };

  // Reset to original layout
  const handleReset = () => {
    setStickerTransforms(() => {
      const reset: Record<string, ItemTransform> = {};
      STICKERS.forEach((stk) => {
        reset[stk.id] = { x: 0, y: 0, rotation: stk.defaultRotation, zIndex: 2 };
      });
      reset['japanese-quote'] = { x: 0, y: 0, rotation: -2, zIndex: 1 };
      reset['arabic-letter'] = { x: 0, y: 0, rotation: -5, zIndex: 1 };
      return reset;
    });

    setUserNotes((currNotes) =>
      currNotes.map((note) => ({
        ...note,
        x: 0,
        y: 0,
        rotation: note.defaultRotation,
      }))
    );
  };

  // Add a Quick Sticky Note direct from Homepage
  const handleAddQuickNote = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = quickNoteText.trim();
    if (!trimmed) return;

    // Confetti burst
    confetti({
      particleCount: 38,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
    });

    const palette = NOTE_PALETTES[Math.floor(Math.random() * NOTE_PALETTES.length)];
    const randomRot = Math.round((Math.random() - 0.5) * 16);
    const randomLeft = `${Math.floor(32 + Math.random() * 32)}%`;
    const randomTop = `${Math.floor(30 + Math.random() * 32)}%`;

    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);

    const newNote: UserStickyNote = {
      id: `user-note-${Date.now()}`,
      text: trimmed.slice(0, 28),
      color: palette.accent,
      defaultLeft: randomLeft,
      defaultTop: randomTop,
      defaultRotation: randomRot,
      x: 0,
      y: 0,
      rotation: randomRot,
      zIndex: nextZ,
      createdAt: Date.now(),
    };

    setUserNotes((prev) => [newNote, ...prev.slice(0, 7)]);
    setQuickNoteText('');
  };

  // Delete / unpin sticky note
  const handleDeleteNote = (id: string) => {
    setUserNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <section id="wall" className="py-20 md:py-28 relative">
      {/* 1. Header */}
      <div className="mb-14 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-[var(--color-text)]"
            >
              Misc &amp; The Wall
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 h-1 w-16 rounded-full bg-primary"
            />
          </div>

          <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-mono max-w-md">
            Interactive canvas with physics: grab, fling, peel vinyl corners, or pin your own note directly to the board.
          </p>
        </div>
      </div>

      {/* 2. Interactive Dot Board Canvas */}
      <div className="max-w-6xl mx-auto px-6">
        <div>
          <div className="misc-board-dots relative rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-2xl bg-black/60">
            {/* Top Board Status Badge */}
            <div className="absolute top-4 left-4 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300 font-mono pointer-events-none select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <span>Physics Board · Grab &amp; Throw</span>
            </div>

            {/* Top-Right Board Controls: Shuffle & Reset */}
            <div className="absolute top-4 right-4 z-40 flex items-center gap-1.5 p-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl">
              <button
                type="button"
                onClick={handleShuffle}
                className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                title="Shuffle & Sprinkle Stickers"
                data-cursor="pointer"
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-500 ${
                    isShuffling ? 'rotate-180 text-primary' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
                  <path d="m18 2 4 4-4 4" />
                  <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
                  <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
                  <path d="m18 14 4 4-4 4" />
                </svg>
                <span className="hidden sm:inline">Shuffle</span>
              </button>

              <div className="h-4 w-px bg-white/10" />

              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                title="Reset Board"
                data-cursor="pointer"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* The Draggable Physics Stage */}
            <div
              ref={boardRef}
              className="relative w-full h-[550px] sm:h-[650px] lg:h-[700px] overflow-hidden"
            >
              {/* SVG Sticker Cutline Filter */}
              <svg
                width="0"
                height="0"
                aria-hidden="true"
                focusable="false"
                className="pointer-events-none absolute overflow-hidden"
              >
                <defs>
                  <filter
                    id="misc-image-sticker-cutline"
                    x="-30%"
                    y="-30%"
                    width="165%"
                    height="175%"
                    filterUnits="objectBoundingBox"
                    primitiveUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feMorphology
                      in="SourceAlpha"
                      operator="dilate"
                      radius="2.75"
                      result="expandedAlpha"
                    />
                    <feGaussianBlur
                      in="expandedAlpha"
                      stdDeviation="0.25"
                      result="smoothAlpha"
                    />
                    <feGaussianBlur
                      in="expandedAlpha"
                      stdDeviation="3.5"
                      result="softShadowBlur"
                    />
                    <feOffset
                      in="softShadowBlur"
                      dx="1.5"
                      dy="4"
                      result="softShadowOffset"
                    />
                    <feFlood
                      floodColor="#000000"
                      floodOpacity="0.24"
                      result="softShadowColor"
                    />
                    <feComposite
                      in="softShadowColor"
                      in2="softShadowOffset"
                      operator="in"
                      result="softShadow"
                    />
                    <feGaussianBlur
                      in="expandedAlpha"
                      stdDeviation="0.8"
                      result="contactShadowBlur"
                    />
                    <feOffset
                      in="contactShadowBlur"
                      dx="0.5"
                      dy="1.5"
                      result="contactShadowOffset"
                    />
                    <feFlood
                      floodColor="#000000"
                      floodOpacity="0.2"
                      result="contactShadowColor"
                    />
                    <feComposite
                      in="contactShadowColor"
                      in2="contactShadowOffset"
                      operator="in"
                      result="contactShadow"
                    />
                    <feFlood floodColor="#ffffff" result="paperColor" />
                    <feComposite
                      in="paperColor"
                      in2="smoothAlpha"
                      operator="in"
                      result="paperCutline"
                    />
                    <feMerge>
                      <feMergeNode in="softShadow" />
                      <feMergeNode in="contactShadow" />
                      <feMergeNode in="paperCutline" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Japanese Quote Card Note - Draggable & Throwable */}
              <motion.div
                drag
                dragConstraints={boardRef}
                dragElastic={0.15}
                dragTransition={{ bounceStiffness: 380, bounceDamping: 24, power: 0.28 }}
                onDragStart={() => bringToFront('japanese-quote')}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                animate={{
                  x: stickerTransforms['japanese-quote']?.x || 0,
                  y: stickerTransforms['japanese-quote']?.y || 0,
                  rotate: stickerTransforms['japanese-quote']?.rotation ?? -2,
                }}
                whileHover={{ scale: 1.08, zIndex: 40 }}
                whileDrag={{ scale: 1.15, zIndex: 100, cursor: 'grabbing' }}
                data-cursor="sticker"
                className="misc-item absolute cursor-grab select-none touch-none will-change-transform"
                style={{
                  left: '25%',
                  top: '48%',
                  zIndex: stickerTransforms['japanese-quote']?.zIndex || 1,
                }}
              >
                <div className="w-[140px] sm:w-[170px] lg:w-[200px] rounded-xl p-3 lg:p-4 bg-[var(--color-card)]/90 backdrop-blur-md border border-[var(--color-border)] shadow-xl hover:border-primary/40 transition-colors">
                  <div className="w-8 h-2 rounded-xs bg-white/10 mx-auto mb-2" />
                  <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed font-medium">
                    痛みを知らぬ者に、本当の平和は分からん
                  </p>
                  <span className="text-[10px] text-primary/70 font-mono mt-1 block">
                    — Nagato (Pain)
                  </span>
                </div>
              </motion.div>

              {/* Arabic Letter "س" Glyph - Draggable & Throwable */}
              <motion.div
                drag
                dragConstraints={boardRef}
                dragElastic={0.15}
                dragTransition={{ bounceStiffness: 380, bounceDamping: 24, power: 0.28 }}
                onDragStart={() => bringToFront('arabic-letter')}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                animate={{
                  x: stickerTransforms['arabic-letter']?.x || 0,
                  y: stickerTransforms['arabic-letter']?.y || 0,
                  rotate: stickerTransforms['arabic-letter']?.rotation ?? -5,
                }}
                whileHover={{ scale: 1.12, zIndex: 40 }}
                whileDrag={{ scale: 1.2, zIndex: 100, cursor: 'grabbing' }}
                data-cursor="sticker"
                className="misc-item absolute cursor-grab select-none touch-none will-change-transform"
                style={{
                  left: '3%',
                  top: '5%',
                  zIndex: stickerTransforms['arabic-letter']?.zIndex || 1,
                }}
              >
                <svg
                  viewBox="0 0 109 88"
                  width="109"
                  height="88"
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  aria-label="S"
                  className="pointer-events-none drop-shadow-lg"
                >
                  <g fontSize="72" fontWeight="800">
                    <text
                      x="54.5"
                      y="51"
                      textAnchor="middle"
                      dominantBaseline="alphabetic"
                      fill="#fafafa"
                      stroke="#fafafa"
                      strokeWidth="13"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      paintOrder="stroke fill"
                    >
                      س
                    </text>
                    <text
                      x="54.5"
                      y="51"
                      textAnchor="middle"
                      dominantBaseline="alphabetic"
                      fill="#050505"
                    >
                      س
                    </text>
                  </g>
                </svg>
              </motion.div>

              {/* 13 Interactive Image Stickers with Corner Peel & Throw Physics */}
              {STICKERS.map((stk, idx) => {
                const transform = stickerTransforms[stk.id] || {
                  x: 0,
                  y: 0,
                  rotation: stk.defaultRotation,
                  zIndex: 2,
                };

                return (
                  <motion.div
                    key={stk.id}
                    drag
                    dragConstraints={boardRef}
                    dragElastic={0.15}
                    dragTransition={{ bounceStiffness: 380, bounceDamping: 24, power: 0.28 }}
                    onDragStart={() => bringToFront(stk.id)}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 22,
                      delay: 0.03 * idx,
                    }}
                    animate={{
                      x: transform.x,
                      y: transform.y,
                      rotate: transform.rotation,
                    }}
                    whileHover={{
                      scale: 1.1,
                      zIndex: 50,
                    }}
                    whileDrag={{
                      scale: 1.18,
                      rotate: transform.rotation + 4,
                      zIndex: 100,
                      cursor: 'grabbing',
                    }}
                    data-cursor="sticker"
                    className="misc-item absolute cursor-grab select-none touch-none will-change-transform"
                    style={{
                      left: stk.defaultLeft,
                      top: stk.defaultTop,
                      zIndex: transform.zIndex,
                    }}
                  >
                    <div className="relative group/sticker perspective-[800px]">
                      {/* Main Sticker Graphic */}
                      <div className="relative transition-transform duration-300 ease-out transform-gpu group-hover/sticker:-rotate-1 group-hover/sticker:-translate-y-1">
                        <img
                          alt={stk.name}
                          width={180}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="block w-[90px] sm:w-[130px] lg:w-[180px] h-auto drop-shadow-lg select-none pointer-events-none"
                          src={stk.file}
                          style={{ filter: 'url("#misc-image-sticker-cutline")' }}
                        />

                        {/* Realistic 3D Vinyl Corner Peel Dog-Ear Flap */}
                        <div
                          className="absolute -bottom-0.5 -right-0.5 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none opacity-0 group-hover/sticker:opacity-100 transition-all duration-300 ease-out origin-bottom-right scale-0 group-hover/sticker:scale-100"
                          style={{ filter: 'drop-shadow(-3px -3px 4px rgba(0,0,0,0.5))' }}
                        >
                          <div
                            className="w-full h-full bg-gradient-to-tl from-zinc-100 via-white to-zinc-300 border-l border-t border-white/80 rounded-tl-sm"
                            style={{
                              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                              boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.18)',
                            }}
                          />
                        </div>

                        {/* Surface Gloss Sheen Overlay on Hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/sticker:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* User Dynamic Sticky Notes (Draggable & Throwable) */}
              <AnimatePresence>
                {userNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    drag
                    dragConstraints={boardRef}
                    dragElastic={0.15}
                    dragTransition={{ bounceStiffness: 380, bounceDamping: 24, power: 0.28 }}
                    onDragStart={() => bringToFront(note.id)}
                    initial={{ opacity: 0, scale: 0.4, y: 25 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: note.x,
                      y: note.y,
                      rotate: note.rotation,
                    }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    whileHover={{ scale: 1.08, zIndex: 60 }}
                    whileDrag={{ scale: 1.15, zIndex: 100, cursor: 'grabbing' }}
                    data-cursor="sticker"
                    className="absolute cursor-grab select-none touch-none will-change-transform group/note"
                    style={{
                      left: note.defaultLeft,
                      top: note.defaultTop,
                      zIndex: note.zIndex,
                    }}
                  >
                    <div
                      className="relative px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-xl border shadow-xl backdrop-blur-md min-w-[130px] sm:min-w-[160px] max-w-[210px]"
                      style={{
                        backgroundColor: '#151420',
                        borderColor: `${note.color}50`,
                        boxShadow: `0 12px 28px -6px rgba(0,0,0,0.7), 0 0 20px ${note.color}25`,
                      }}
                    >
                      {/* Semi-transparent Frosted Tape Strip at Top */}
                      <div
                        className="w-12 h-3 -mt-4 mb-2 mx-auto rounded-xs opacity-75 backdrop-blur-sm border border-white/20 transform -rotate-1 shadow-xs"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 100%)',
                        }}
                      />

                      {/* Delete Note Button (Visible on hover) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center text-[10px] opacity-0 group-hover/note:opacity-100 transition-opacity hover:scale-110 shadow-md cursor-pointer"
                        title="Remove Note"
                        data-cursor="pointer"
                      >
                        ✕
                      </button>

                      {/* Note Content */}
                      <p className="text-xs sm:text-sm font-medium text-white leading-snug break-words">
                        {note.text}
                      </p>

                      {/* Footer Badge */}
                      <div className="mt-2.5 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_currentColor]"
                            style={{ backgroundColor: note.color, color: note.color }}
                          />
                          Sticky Note
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* 3. Interactive Quick Sticky Note Input Pill & Visitor Wall CTA */}
          <div className="flex flex-col items-center gap-4 -mt-6 relative z-30 px-4">
            {/* Direct Sticky Note Creator Pill */}
            <form
              onSubmit={handleAddQuickNote}
              className="flex flex-wrap items-center gap-2 p-1.5 sm:p-2 rounded-full bg-[var(--color-card)]/95 backdrop-blur-xl border border-[var(--color-border)] shadow-2xl hover:border-primary/40 transition-all duration-300 max-w-xl w-full"
            >
              {/* Emoji Quick Click Chips */}
              <div className="flex items-center gap-1 pl-2">
                {EMOJI_CHIPS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() =>
                      setQuickNoteText((prev) =>
                        (prev ? `${prev} ${emoji}` : emoji).slice(0, 28)
                      )
                    }
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-sm transition-transform active:scale-90 cursor-pointer"
                    title={`Add ${emoji}`}
                    data-cursor="pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="h-4 w-px bg-white/10 hidden sm:block" />

              {/* Text Input */}
              <input
                type="text"
                value={quickNoteText}
                onChange={(e) => setQuickNoteText(e.target.value.slice(0, 28))}
                placeholder="Stick a quick greeting or emoji... ✨"
                className="flex-1 min-w-[140px] px-2 py-1 text-xs sm:text-sm bg-transparent border-none text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:outline-none"
                maxLength={28}
              />

              {/* Stick It Button */}
              <button
                type="submit"
                disabled={!quickNoteText.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold shadow-md hover:shadow-primary/30 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shrink-0"
                data-cursor="pointer"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="17" x2="12" y2="22" />
                  <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
                </svg>
                <span>Stick It</span>
              </button>
            </form>

            {/* Bottom Link to Full Visitor Wall */}
            <button
              type="button"
              onClick={() => onNavigate?.('/wall')}
              className="group flex items-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-primary transition-colors cursor-pointer"
              data-cursor="pointer"
            >
              <span>wanna leave a bigger mark?</span>
              <span className="font-semibold text-primary group-hover:text-primary-light underline decoration-primary/40 underline-offset-4 flex items-center gap-1">
                open visitor wall
                <svg
                  className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
