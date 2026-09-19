import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  createWallNote,
  subscribeWallNotes,
  isSupabaseConfigured,
  type WallNote,
} from '@/lib/supabase';
import { Heart, Sparkles, RefreshCw, Plus, StickyNote, Image as ImageIcon } from 'lucide-react';
import {
  type WallItem,
  SHARED_WALL_STORAGE_KEY,
  SHARED_LIKED_NOTES_KEY,
  INITIAL_STICKERS,
  INITIAL_NOTES,
  AVAILABLE_STICKERS,
  NOTE_PALETTES,
  EMOJI_CHIPS,
} from '@/data/wallData';
import { useLanguage } from '@/context/LanguageContext';

interface WallSectionProps {
  onNavigate?: (route: string) => void;
}

export const WallSection: React.FC<WallSectionProps> = ({ onNavigate }) => {
  const { t, isHindi } = useLanguage();
  const boardRef = useRef<HTMLDivElement>(null);

  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [quickNoteText, setQuickNoteText] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('#ec4899');
  const [dropMode, setDropMode] = useState<'only-note' | 'note-with-sticker'>('note-with-sticker');
  const [selectedStickerId, setSelectedStickerId] = useState<string>(AVAILABLE_STICKERS[0].id);
  const [justDroppedId, setJustDroppedId] = useState<string | null>(null);

  // Combined Wall Items (Exactly 3 stickers + 3 notes initially, synchronized with /wall)
  const [items, setItems] = useState<WallItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(SHARED_WALL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Could not read saved wall items', e);
      }
    }
    return [...INITIAL_STICKERS, ...INITIAL_NOTES];
  });

  // Track liked notes for like/unlike toggling
  const [likedNoteIds, setLikedNoteIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(SHARED_LIKED_NOTES_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            return new Set(parsed);
          }
        }
      } catch (e) {
        console.warn('Could not read liked notes', e);
      }
    }
    return new Set<string>();
  });

  // Save items to shared localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SHARED_WALL_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.warn('Could not save wall items', e);
      }
    }
  }, [items]);

  // Save liked notes to shared localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SHARED_LIKED_NOTES_KEY, JSON.stringify(Array.from(likedNoteIds)));
      } catch (e) {
        console.warn('Could not save liked notes', e);
      }
    }
  }, [likedNoteIds]);

  // Sync with live incoming Supabase notes without dumping dozens of old entries
  useEffect(() => {
    const unsubscribe = subscribeWallNotes((newRemoteNote: WallNote) => {
      setItems((prev) => {
        if (prev.some((item) => item.id === newRemoteNote.id)) return prev;

        const noteX = newRemoteNote.x || Math.random() * 380 + 150;
        const noteY = newRemoteNote.y || Math.random() * 240 + 90;

        const newWallNote: WallItem = {
          id: newRemoteNote.id,
          type: 'note',
          content: newRemoteNote.text,
          author: newRemoteNote.author || 'Visitor',
          x: noteX,
          y: noteY,
          rotation: newRemoteNote.rotation || (Math.random() - 0.5) * 12,
          color: newRemoteNote.color || '#ec4899',
          likes: 1,
          createdAt: 'Just now',
        };

        return [...prev, newWallNote];
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Bring item to top of stack when clicked or grabbed
  const bringToFront = (id: string) => {
    setItems((prev) => {
      const item = prev.find((it) => it.id === id);
      if (!item) return prev;
      return [...prev.filter((it) => it.id !== id), item];
    });
  };

  // Like AND Unlike Toggle
  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCurrentlyLiked = likedNoteIds.has(id);

    setLikedNoteIds((prev) => {
      const next = new Set(prev);
      if (isCurrentlyLiked) {
        next.delete(id);
      } else {
        next.add(id);
        // Confetti spark when liking
        confetti({
          particleCount: 16,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#ec4899', '#f43f5e', '#fb7185'],
        });
      }
      return next;
    });

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const currentLikes = item.likes || 0;
          return {
            ...item,
            likes: isCurrentlyLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1,
          };
        }
        return item;
      })
    );
  };

  // Delete note
  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Submit Note with Option: "Only Note" OR "Note + Sticker"
  const handleAddNote = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = quickNoteText.trim();
    if (!trimmed) return;

    // Confetti explosion
    confetti({
      particleCount: 45,
      spread: 68,
      origin: { y: 0.75 },
      colors: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
    });

    // Randomize placement
    const noteX = Math.round(Math.random() * 420 + 130);
    const noteY = Math.round(Math.random() * 240 + 80);
    const noteRot = Math.round((Math.random() - 0.5) * 14);

    const newNoteId = `sec-note-${Date.now()}`;
    const newNoteItem: WallItem = {
      id: newNoteId,
      type: 'note',
      content: trimmed.slice(0, 55),
      author: authorName.trim() || 'Visitor',
      x: noteX,
      y: noteY,
      rotation: noteRot,
      color: selectedColor,
      likes: 1,
      createdAt: 'Just now',
    };

    const newItems: WallItem[] = [newNoteItem];

    // If user chose "Note with Sticker", automatically spawn selected sticker beside the note!
    if (dropMode === 'note-with-sticker') {
      const chosenSticker =
        AVAILABLE_STICKERS.find((st) => st.id === selectedStickerId) || AVAILABLE_STICKERS[0];

      const stickerX = Math.min(840, Math.max(40, noteX + (Math.random() > 0.5 ? 180 : -90)));
      const stickerY = Math.min(480, Math.max(50, noteY + (Math.random() > 0.5 ? 40 : -35)));
      const stickerRot = Math.round((Math.random() - 0.5) * 22);

      const newStickerItem: WallItem = {
        id: `sec-st-companion-${Date.now()}`,
        type: 'sticker',
        content: chosenSticker.src,
        x: stickerX,
        y: stickerY,
        rotation: stickerRot,
        isCompanion: true,
      };

      newItems.push(newStickerItem);
    }

    setItems((prev) => [...prev, ...newItems]);
    setJustDroppedId(newNoteId);
    setTimeout(() => setJustDroppedId(null), 3000);

    // Reset input
    setQuickNoteText('');

    // Persist note to Supabase if configured
    createWallNote({
      id: newNoteItem.id,
      text: newNoteItem.content,
      author: newNoteItem.author || 'Visitor',
      color: newNoteItem.color || '#ec4899',
      x: newNoteItem.x,
      y: newNoteItem.y,
      rotation: newNoteItem.rotation,
    });
  };

  // Shuffle items dynamically across canvas
  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => setIsShuffling(false), 500);

    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        x: Math.round(Math.random() * 680 + 40),
        y: Math.round(Math.random() * 380 + 40),
        rotation: Math.round((Math.random() - 0.5) * 24),
      }))
    );
  };

  // Reset to initial 3 stickers + 3 notes
  const handleReset = () => {
    const initial = [...INITIAL_STICKERS, ...INITIAL_NOTES];
    setItems(initial);
    setLikedNoteIds(new Set());
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SHARED_WALL_STORAGE_KEY, JSON.stringify(initial));
        localStorage.removeItem(SHARED_LIKED_NOTES_KEY);
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const selectedStickerObj = AVAILABLE_STICKERS.find((s) => s.id === selectedStickerId) || AVAILABLE_STICKERS[0];

  return (
    <section id="wall" className="py-20 md:py-28 relative">
      {/* 1. Header */}
      <div className="mb-12 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t.wall.sectionBadge}
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-black text-white tracking-tight"
            >
              {t.wall.heading}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 h-1 w-16 rounded-full bg-primary"
            />
          </div>

          <p className="text-xs md:text-sm text-zinc-400 font-mono max-w-md">
            {t.wall.subtitle}
          </p>
        </div>
      </div>

      {/* 2. Interactive Canvas Board */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-[#090a10]">
          {/* Dot Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Top Board Status Badge */}
          <div className="absolute top-4 left-4 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300 font-mono pointer-events-none select-none">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  isSupabaseConfigured ? 'bg-emerald-400' : 'bg-primary'
                } opacity-75`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isSupabaseConfigured ? 'bg-emerald-500' : 'bg-primary'
                }`}
              />
            </span>
            <span>
              {isSupabaseConfigured
                ? '⚡ Live Supabase Sync · Grab & Toss'
                : 'Physics Board · Grab & Toss'}
            </span>
          </div>

          {/* Top-Right Board Controls: Shuffle, Reset & Expand to Full Wall */}
          <div className="absolute top-4 right-4 z-40 flex items-center gap-1.5 p-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl">
            <button
              type="button"
              onClick={handleShuffle}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Shuffle items dynamically"
              data-cursor="pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin text-primary' : ''}`} />
              <span className="hidden sm:inline">{t.wall.shuffle}</span>
            </button>

            <div className="h-4 w-px bg-white/10" />

            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Reset Board to 3 Stickers & 3 Notes"
              data-cursor="pointer"
            >
              <span className="hidden sm:inline">{t.wall.reset}</span>
            </button>

            {onNavigate && (
              <>
                <div className="h-4 w-px bg-white/10" />
                <button
                  type="button"
                  onClick={() => onNavigate('/wall')}
                  className="px-2.5 py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1 text-xs font-semibold font-mono"
                  title="Open Dedicated Fullscreen Wall Page"
                  data-cursor="pointer"
                >
                  <span>{t.wall.fullWall} ↗</span>
                </button>
              </>
            )}
          </div>

          {/* The Draggable Physics Stage */}
          <div
            ref={boardRef}
            className="relative w-full h-[520px] sm:h-[600px] lg:h-[640px] overflow-hidden select-none"
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
                  id="sec-sticker-cutline-v2"
                  x="-30%"
                  y="-30%"
                  width="165%"
                  height="175%"
                  filterUnits="objectBoundingBox"
                  primitiveUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feMorphology in="SourceAlpha" operator="dilate" radius="2.5" result="expandedAlpha" />
                  <feGaussianBlur in="expandedAlpha" stdDeviation="0.25" result="smoothAlpha" />
                  <feGaussianBlur in="expandedAlpha" stdDeviation="3.5" result="softShadowBlur" />
                  <feOffset in="softShadowBlur" dx="1.5" dy="4" result="softShadowOffset" />
                  <feFlood floodColor="#000000" floodOpacity="0.24" result="softShadowColor" />
                  <feComposite in="softShadowColor" in2="softShadowOffset" operator="in" result="softShadow" />
                  <feFlood floodColor="#ffffff" result="paperColor" />
                  <feComposite in="paperColor" in2="smoothAlpha" operator="in" result="paperCutline" />
                  <feMerge>
                    <feMergeNode in="softShadow" />
                    <feMergeNode in="paperCutline" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Render Stickers and Notes with Spring Physics */}
            <AnimatePresence>
              {items.map((item) => {
                if (item.type === 'sticker') {
                  return (
                    <motion.div
                      key={item.id}
                      drag
                      dragConstraints={boardRef}
                      dragElastic={0.15}
                      dragTransition={{ bounceStiffness: 380, bounceDamping: 24, power: 0.28 }}
                      onDragStart={() => bringToFront(item.id)}
                      initial={{ scale: 0, opacity: 0, rotate: item.rotation - 10 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        x: item.x,
                        y: item.y,
                        rotate: item.rotation,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.1, zIndex: 60 }}
                      whileDrag={{ scale: 1.18, rotate: item.rotation + 5, zIndex: 100, cursor: 'grabbing' }}
                      className="absolute top-0 left-0 cursor-grab select-none touch-none will-change-transform group/sticker"
                      data-cursor="sticker"
                    >
                      <div className="relative group/graphic">
                        <img
                          src={item.content}
                          alt="Sticker"
                          width={140}
                          loading="lazy"
                          draggable={false}
                          className="w-20 sm:w-28 md:w-36 h-auto drop-shadow-xl select-none pointer-events-none transition-transform duration-300 group-hover/sticker:-rotate-2"
                          style={{ filter: 'url("#sec-sticker-cutline-v2")' }}
                        />

                        {/* 3D Vinyl Corner Peel */}
                        <div
                          className="absolute -bottom-0.5 -right-0.5 w-6 h-6 pointer-events-none opacity-0 group-hover/sticker:opacity-100 transition-all duration-300 ease-out origin-bottom-right scale-0 group-hover/sticker:scale-100"
                          style={{ filter: 'drop-shadow(-2px -2px 3px rgba(0,0,0,0.5))' }}
                        >
                          <div
                            className="w-full h-full bg-gradient-to-tl from-zinc-200 via-white to-zinc-400 border-l border-t border-white/80 rounded-tl-xs"
                            style={{
                              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                              boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.2)',
                            }}
                          />
                        </div>

                        {/* Companion Badge indicator on newly spawned companion stickers */}
                        {item.isCompanion && (
                          <div className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-primary text-[9px] font-mono text-white font-bold tracking-wider opacity-0 group-hover/sticker:opacity-100 transition-opacity shadow-lg">
                            +Sticker
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                }

                // Sticky Note Item with Like / Unlike Toggle
                const isJustDropped = justDroppedId === item.id;
                const isLiked = likedNoteIds.has(item.id);

                return (
                  <motion.div
                    key={item.id}
                    drag
                    dragConstraints={boardRef}
                    dragElastic={0.15}
                    dragTransition={{ bounceStiffness: 380, bounceDamping: 24, power: 0.28 }}
                    onDragStart={() => bringToFront(item.id)}
                    initial={{ scale: 0.3, opacity: 0, y: 30 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      x: item.x,
                      y: item.y,
                      rotate: item.rotation,
                    }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    whileHover={{ scale: 1.06, zIndex: 70 }}
                    whileDrag={{ scale: 1.12, zIndex: 100, cursor: 'grabbing' }}
                    className="absolute top-0 left-0 cursor-grab select-none touch-none will-change-transform group/note"
                    data-cursor="sticker"
                  >
                    <div
                      className={`relative w-52 sm:w-60 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                        isJustDropped ? 'ring-2 ring-white animate-pulse' : ''
                      }`}
                      style={{
                        backgroundColor: '#121420',
                        borderColor: `${item.color || '#ec4899'}60`,
                        boxShadow: `0 14px 30px -8px rgba(0,0,0,0.8), 0 0 24px ${item.color || '#ec4899'}25`,
                      }}
                    >
                      {/* Washi Tape Strip at Top */}
                      <div
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 rounded-xs opacity-80 backdrop-blur-md shadow-xs pointer-events-none"
                        style={{
                          backgroundColor: `${item.color || '#ec4899'}45`,
                          borderTop: '1px solid rgba(255,255,255,0.4)',
                          borderBottom: '1px solid rgba(0,0,0,0.2)',
                          transform: 'rotate(-2deg)',
                        }}
                      />

                      {/* Header: Author & Remove Button */}
                      <div className="flex items-center justify-between gap-2 mb-2 pt-1">
                        <span
                          className="text-[11px] font-mono font-bold tracking-tight truncate"
                          style={{ color: item.color || '#ec4899' }}
                        >
                          @{item.author || 'Visitor'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteNote(item.id, e)}
                          className="w-4 h-4 rounded-full bg-white/10 hover:bg-rose-500/80 text-zinc-400 hover:text-white flex items-center justify-center text-[10px] opacity-0 group-hover/note:opacity-100 transition-all cursor-pointer"
                          title="Remove note"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Note Content */}
                      <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-relaxed break-words mb-3">
                        {item.content}
                      </p>

                      {/* Footer: Date & Like / Unlike Reaction Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10.5px] font-mono text-zinc-400">
                        <span className="text-zinc-500">{item.createdAt || 'Recent'}</span>
                        <button
                          type="button"
                          onClick={(e) => handleToggleLike(item.id, e)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer active:scale-90 ${
                            isLiked
                              ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                              : 'bg-white/[0.04] hover:bg-white/[0.1] border-white/10 text-zinc-300 hover:text-rose-400'
                          }`}
                          title={isLiked ? 'Click to unlike' : 'Click to like'}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 transition-transform ${
                              isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-zinc-400'
                            }`}
                          />
                          <span className={isLiked ? 'font-bold text-rose-400' : ''}>
                            {item.likes || 0}
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Interactive Note Drop Control Center: Option for "Only Note" OR "Note + Sticker" */}
        <div className="mt-6 max-w-2xl mx-auto px-2">
          <div className="p-4 sm:p-5 rounded-3xl bg-[#121422]/95 backdrop-blur-2xl border border-white/15 shadow-2xl">
            {/* Mode Selector Toggle: Only Note vs Note + Sticker */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
              <span className="text-xs font-mono font-semibold text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>{isHindi ? 'ड्रॉप मोड:' : 'Drop Mode:'}</span>
              </span>

              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setDropMode('only-note')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    dropMode === 'only-note'
                      ? 'bg-white/15 text-white font-bold shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <StickyNote className="w-3.5 h-3.5" />
                  <span>{t.wall.onlyNote}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDropMode('note-with-sticker')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    dropMode === 'note-with-sticker'
                      ? 'bg-gradient-to-r from-primary to-pink-500 text-white font-bold shadow-[0_0_12px_rgba(236,72,153,0.4)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{t.wall.noteWithSticker}</span>
                </button>
              </div>
            </div>

            {/* If "Note + Sticker" mode is active: Show horizontal sticker picker so user selects the sticker */}
            {dropMode === 'note-with-sticker' && (
              <div className="mb-3.5 p-2.5 rounded-2xl bg-black/40 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-zinc-400">
                    {t.wall.chooseSticker}
                  </span>
                  <span className="text-[11px] font-mono text-primary font-bold">
                    Selected: {selectedStickerObj.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                  {AVAILABLE_STICKERS.map((stk) => {
                    const isSelected = selectedStickerId === stk.id;
                    return (
                      <button
                        key={stk.id}
                        type="button"
                        onClick={() => setSelectedStickerId(stk.id)}
                        className={`shrink-0 p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          isSelected
                            ? 'bg-primary/20 border-primary ring-2 ring-primary/60 scale-105 shadow-[0_0_10px_rgba(236,72,153,0.5)]'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                        title={stk.name}
                      >
                        <img
                          src={stk.src}
                          alt={stk.name}
                          className="w-9 h-9 object-contain pointer-events-none drop-shadow"
                          loading="lazy"
                        />
                        <span className="text-[9.5px] font-mono text-zinc-300 truncate max-w-[50px]">
                          {stk.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Note Text & Author Inputs */}
            <form onSubmit={handleAddNote} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value.slice(0, 24))}
                  placeholder={isHindi ? 'आपका नाम / हैंडल' : 'Your Name / Handle'}
                  className="sm:w-1/3 px-3.5 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-primary/60"
                  maxLength={24}
                />
                <input
                  type="text"
                  value={quickNoteText}
                  onChange={(e) => setQuickNoteText(e.target.value.slice(0, 55))}
                  placeholder={
                    dropMode === 'only-note'
                      ? 'Drop a friendly note on the wall... 📝'
                      : `Drop a note (spawns ${selectedStickerObj.name} sticker!) ✨`
                  }
                  required
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm font-medium focus:outline-none focus:border-primary/60"
                  maxLength={55}
                />
              </div>

              {/* Bottom Options: Color Chips, Emojis & Submit Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {/* Colors and Emojis */}
                <div className="flex items-center gap-3">
                  {/* Colors */}
                  <div className="flex items-center gap-1.5">
                    {NOTE_PALETTES.map((pal) => (
                      <button
                        key={pal.hex}
                        type="button"
                        onClick={() => setSelectedColor(pal.hex)}
                        className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                          selectedColor === pal.hex
                            ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-black'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: pal.hex }}
                        title={pal.name}
                      />
                    ))}
                  </div>

                  <div className="h-4 w-px bg-white/10" />

                  {/* Emojis */}
                  <div className="hidden sm:flex items-center gap-0.5">
                    {EMOJI_CHIPS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() =>
                          setQuickNoteText((prev) =>
                            (prev ? `${prev} ${emoji}` : emoji).slice(0, 55)
                          )
                        }
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-xs transition-transform active:scale-90 cursor-pointer"
                        title={`Add ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={!quickNoteText.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-pink-500/30 hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>
                    {dropMode === 'only-note'
                      ? 'Stick Note Only'
                      : `Stick Note + ${selectedStickerObj.name}`}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Direct link to dedicated full page /wall */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-zinc-400 font-mono">
            <span>{isHindi ? 'पूर्ण स्क्रीन गेस्टबुक देखना चाहते हैं?' : 'Want fullscreen guestbook view?'}</span>
            <button
              type="button"
              onClick={() => onNavigate?.('/wall')}
              className="text-primary hover:text-pink-300 font-bold underline underline-offset-4 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{t.wall.fullWall}</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
