import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  createWallNote,
  subscribeWallNotes,
  isSupabaseConfigured,
  type WallNote,
} from '@/lib/supabase';
import {
  Heart,
  Sparkles,
  Plus,
  RefreshCw,
  PenTool,
  Image as ImageIcon,
  StickyNote,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import {
  type WallItem,
  SHARED_WALL_STORAGE_KEY,
  SHARED_LIKED_NOTES_KEY,
  INITIAL_STICKERS,
  INITIAL_NOTES,
  AVAILABLE_STICKERS,
  NOTE_PALETTES,
} from '@/data/wallData';
import { useLanguage } from '@/context/LanguageContext';

interface WallPageProps {
  onNavigate?: (route: string) => void;
}

export const WallPage: React.FC<WallPageProps> = ({ onNavigate }) => {
  const { t, isHindi } = useLanguage();
  // Synchronized Wall Items (Exactly 3 stickers + 3 notes initially)
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

  // Track liked note IDs for Like / Unlike toggle
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

  const [modalOpen, setModalOpen] = useState(false);
  const [stickerPickerOpen, setStickerPickerOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ec4899');
  const [dropMode, setDropMode] = useState<'only-note' | 'note-with-sticker'>('note-with-sticker');
  const [selectedStickerId, setSelectedStickerId] = useState<string>(AVAILABLE_STICKERS[0].id);
  const [justDroppedId, setJustDroppedId] = useState<string | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);

  // Sync to shared localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SHARED_WALL_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.warn('Could not save wall items', e);
      }
    }
  }, [items]);

  // Sync liked notes to shared localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SHARED_LIKED_NOTES_KEY, JSON.stringify(Array.from(likedNoteIds)));
      } catch (e) {
        console.warn('Could not save liked notes', e);
      }
    }
  }, [likedNoteIds]);

  // Realtime subscription for incoming notes from other users
  useEffect(() => {
    const unsubscribe = subscribeWallNotes((newRemoteNote: WallNote) => {
      setItems((prev) => {
        if (prev.some((item) => item.id === newRemoteNote.id)) return prev;

        const noteX = newRemoteNote.x || Math.random() * 400 + 160;
        const noteY = newRemoteNote.y || Math.random() * 250 + 100;

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
          particleCount: 18,
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

  // Handle Note Pinning -> Option for "Only Note" OR "Note + Sticker"
  const handlePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    // Confetti explosion
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
    });

    // Randomize coordinates
    const noteX = Math.round(Math.random() * 460 + 120);
    const noteY = Math.round(Math.random() * 260 + 90);
    const noteRot = Math.round((Math.random() - 0.5) * 14);

    const newNoteId = `note-${Date.now()}`;
    const newNoteItem: WallItem = {
      id: newNoteId,
      type: 'note',
      content: newNote.trim(),
      author: authorName.trim() || 'Anonymous Explorer',
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

      const stickerX = Math.min(860, Math.max(40, noteX + (Math.random() > 0.5 ? 190 : -90)));
      const stickerY = Math.min(520, Math.max(50, noteY + (Math.random() > 0.5 ? 45 : -35)));
      const stickerRot = Math.round((Math.random() - 0.5) * 22);

      const newStickerItem: WallItem = {
        id: `st-companion-${Date.now()}`,
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

    // Reset Form
    setNewNote('');
    setAuthorName('');
    setModalOpen(false);

    // Persist note to Supabase if live
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

  // Direct Sticker placement
  const handleDropDirectSticker = (stickerSrc: string) => {
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#ec4899', '#3b82f6', '#10b981'],
    });

    const newStickerItem: WallItem = {
      id: `st-direct-${Date.now()}`,
      type: 'sticker',
      content: stickerSrc,
      x: Math.round(Math.random() * 500 + 100),
      y: Math.round(Math.random() * 300 + 80),
      rotation: Math.round((Math.random() - 0.5) * 20),
    };

    setItems((prev) => [...prev, newStickerItem]);
    setStickerPickerOpen(false);
  };

  // Shuffle items
  const handleShuffleWall = () => {
    setItems((prev) =>
      prev.map((it) => ({
        ...it,
        x: Math.round(Math.random() * 700 + 50),
        y: Math.round(Math.random() * 380 + 50),
        rotation: Math.round((Math.random() - 0.5) * 26),
      }))
    );
  };

  // Reset to initial 3 stickers and 3 notes
  const handleResetWall = () => {
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

  const noteCount = items.filter((it) => it.type === 'note').length;
  const stickerCount = items.filter((it) => it.type === 'sticker').length;
  const selectedStickerObj =
    AVAILABLE_STICKERS.find((s) => s.id === selectedStickerId) || AVAILABLE_STICKERS[0];

  return (
    <div className="min-h-screen py-24 md:py-32 px-4 sm:px-6 max-w-6xl mx-auto selection:bg-primary/30">
      {/* Soft Ambient Glow */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-[850px] h-[350px] pointer-events-none -z-10 blur-[140px] opacity-25 bg-[radial-gradient(ellipse_at_center,#ec4899_0%,transparent_70%)]" />

      {/* Breadcrumb Bar */}
      <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 mb-5">
        <button
          type="button"
          onClick={() => onNavigate?.('/')}
          className="hover:text-primary transition-colors cursor-pointer"
        >
          {t.nav.home}
        </button>
        <span>/</span>
        <span className="text-zinc-300">{t.nav.wall}</span>
      </div>

      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3 font-mono inline-flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.wall.sectionBadge}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4"
        >
          {t.wall.heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed mb-6"
        >
          {t.wall.subtitle}
        </motion.p>

        {/* Action Controls & Live Stats */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary hover:brightness-110 text-white font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <PenTool className="w-4 h-4" />
            <span>{isHindi ? 'नोट छोड़ें (केवल नोट / + स्टिकर)' : 'Drop a Note (Only Note / + Sticker)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setStickerPickerOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200 text-xs sm:text-sm font-medium transition-all cursor-pointer hover:border-pink-500/40 active:scale-95"
          >
            <ImageIcon className="w-4 h-4 text-pink-400" />
            <span>{isHindi ? 'स्टिकर चुनें' : 'Pick a Sticker'}</span>
          </button>

          <button
            type="button"
            onClick={handleShuffleWall}
            className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Shuffle Canvas Items"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleResetWall}
            className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Reset to 3 Stickers & 3 Notes"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Board Count Badges */}
        <div className="flex items-center justify-center gap-4 mt-5 text-xs font-mono text-zinc-400 select-none">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            {noteCount} Sticky Notes
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            {stickerCount} Vinyl Stickers
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-500">
            {isSupabaseConfigured ? '⚡ Live Supabase Synced' : 'Physics Active'}
          </span>
        </div>
      </div>

      {/* The Main Board Canvas */}
      <div className="relative rounded-3xl border border-white/10 bg-[#090a10] shadow-2xl overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Corner Peel Filter */}
        <svg width="0" height="0" className="hidden">
          <defs>
            <filter id="wall-sticker-cutline-v2">
              <feMorphology in="SourceAlpha" operator="dilate" radius="2.5" result="expandedAlpha" />
              <feGaussianBlur in="expandedAlpha" stdDeviation="0.3" result="smoothAlpha" />
              <feGaussianBlur in="expandedAlpha" stdDeviation="3.5" result="softShadowBlur" />
              <feOffset in="softShadowBlur" dx="1.5" dy="4" result="softShadowOffset" />
              <feFlood floodColor="#000000" floodOpacity="0.25" result="softShadowColor" />
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

        {/* Physics Drag Stage */}
        <div
          ref={boardRef}
          className="relative w-full h-[580px] sm:h-[680px] lg:h-[720px] overflow-hidden select-none"
        >
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
                        alt="Aniket Meshram Wall Sticker"
                        width={150}
                        loading="lazy"
                        draggable={false}
                        className="w-20 sm:w-28 md:w-36 h-auto drop-shadow-xl select-none pointer-events-none transition-transform duration-300 group-hover/sticker:-rotate-2"
                        style={{ filter: 'url("#wall-sticker-cutline-v2")' }}
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
                    className={`relative w-56 sm:w-64 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
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

      {/* Modal: Add Note with Mode ("Only Note" OR "Note + Sticker") */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-[#0f111a] border border-white/15 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-white">Stick a Note to The Wall</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Mode Selector Toggle: Only Note vs Note + Sticker */}
              <div className="mb-4 p-1.5 rounded-2xl bg-black/50 border border-white/10 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setDropMode('only-note')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
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
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    dropMode === 'note-with-sticker'
                      ? 'bg-gradient-to-r from-primary to-pink-500 text-white font-bold shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{t.wall.noteWithSticker}</span>
                </button>
              </div>

              {/* If "Note + Sticker" mode is active: Show horizontal sticker picker */}
              {dropMode === 'note-with-sticker' && (
                <div className="mb-4 p-3 rounded-2xl bg-black/40 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-zinc-400">
                      {t.wall.chooseSticker}
                    </span>
                    <span className="text-xs font-mono text-primary font-bold">
                      {selectedStickerObj.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
                            alt={`Aniket Meshram Wall Sticker — ${stk.name}`}
                            className="w-10 h-10 object-contain pointer-events-none drop-shadow"
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

              <form onSubmit={handlePin} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Your Name / Handle
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Maya Lin, Senior Architect"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 text-xs sm:text-sm font-mono"
                    maxLength={30}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Note Message *
                  </label>
                  <textarea
                    rows={3}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Share feedback, leave an encouragement, or shout out..."
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 text-xs sm:text-sm resize-none"
                    maxLength={140}
                  />
                  <div className="flex justify-between items-center text-[10.5px] font-mono text-zinc-500 mt-1">
                    <span>Markdown/Emojis supported</span>
                    <span>{newNote.length}/140</span>
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Sticky Note Color
                  </label>
                  <div className="flex items-center gap-2">
                    {NOTE_PALETTES.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setSelectedColor(c.hex)}
                        className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                          selectedColor === c.hex
                            ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-pink-500 hover:brightness-110 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-pink-500/30 transition-all cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      {dropMode === 'only-note'
                        ? 'Drop Note Only'
                        : `Drop Note + ${selectedStickerObj.name}`}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Direct Sticker Picker */}
      <AnimatePresence>
        {stickerPickerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="w-full max-w-lg p-6 rounded-3xl bg-[#0f111a] border border-white/15 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-pink-400" />
                  <h3 className="text-lg font-bold text-white">Choose a Sticker to Place</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setStickerPickerOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center text-sm transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto p-1">
                {AVAILABLE_STICKERS.map((st) => (
                  <button
                    key={st.src}
                    type="button"
                    onClick={() => handleDropDirectSticker(st.src)}
                    className="p-3 rounded-2xl bg-white/[0.03] hover:bg-pink-500/15 border border-white/10 hover:border-pink-500/40 transition-all flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <img
                      src={st.src}
                      alt={`Aniket Meshram Wall Sticker — ${st.name}`}
                      className="w-16 h-16 object-contain group-hover:scale-110 transition-transform drop-shadow"
                      loading="lazy"
                    />
                    <span className="text-[11px] font-mono text-zinc-300">{st.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cross-Page Redirection Navigation Banner */}
      <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#14121d] to-[#090810] border border-white/10 text-center relative overflow-hidden">
        <h3 className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
          {isHindi ? 'पोर्टफोलियो के अन्य आयाम देखें' : 'Explore Other Corners of the Portfolio'}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
          {isHindi
            ? 'सब-सेकंड रिटेल पीओएस इंजन व एआई प्लेटफॉर्म्स देखें, तकनीकी ब्लॉग पढ़ें, या सीधे संपर्क करें।'
            : 'Inspect sub-second retail POS engines and AI learning platforms, read technical architecture journals, or connect directly.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {onNavigate && (
            <>
              <button
                type="button"
                onClick={() => onNavigate('/projects')}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg shadow-pink-500/25 flex items-center gap-1.5"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/blog')}
                className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/10 text-xs sm:text-sm font-medium active:scale-95 transition-all cursor-pointer"
              >
                {isHindi ? 'आर्किटेक्चर ब्लॉग' : 'Architecture Blog'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/10 text-xs sm:text-sm font-medium active:scale-95 transition-all cursor-pointer"
              >
                {t.hero.contactMe}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
