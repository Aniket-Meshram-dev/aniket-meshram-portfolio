import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface WallItem {
  id: string;
  type: 'sticker' | 'note';
  content: string;
  author?: string;
  x: number;
  y: number;
  rotation: number;
  color?: string;
}

export const WallPage: React.FC = () => {
  const [items, setItems] = useState<WallItem[]>([
    {
      id: 'st-1',
      type: 'sticker',
      content: '/misc/aizen.png',
      x: 80,
      y: 60,
      rotation: -6,
    },
    {
      id: 'st-2',
      type: 'sticker',
      content: '/misc/maki.png',
      x: 650,
      y: 40,
      rotation: 8,
    },
    {
      id: 'st-3',
      type: 'sticker',
      content: '/misc/flutter.png',
      x: 380,
      y: 120,
      rotation: -12,
    },
    {
      id: 'st-4',
      type: 'sticker',
      content: '/misc/itachi.png',
      x: 850,
      y: 220,
      rotation: 10,
    },
    {
      id: 'st-5',
      type: 'sticker',
      content: '/misc/hutao.png',
      x: 120,
      y: 320,
      rotation: 4,
    },
    {
      id: 'st-6',
      type: 'sticker',
      content: '/misc/gwen.png',
      x: 520,
      y: 350,
      rotation: -5,
    },
    {
      id: 'note-1',
      type: 'note',
      content: '痛みを知らぬ者に、本当の平和は分からん',
      author: 'Pain (Nagato)',
      x: 200,
      y: 160,
      rotation: -2,
      color: '#d4547e',
    },
    {
      id: 'note-2',
      type: 'note',
      content: 'Building remarkable things from Muscat with Flutter & passion 🚀',
      author: 'Visitor from Dubai',
      x: 480,
      y: 200,
      rotation: 3,
      color: '#3b82f6',
    },
    {
      id: 'note-3',
      type: 'note',
      content: 'س س — Cleanest design system seen all year.',
      author: 'Anonymous',
      x: 720,
      y: 360,
      rotation: -4,
      color: '#10b981',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handlePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#d4547e', '#3b82f6', '#f59e0b'],
    });

    const colors = ['#d4547e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newItem: WallItem = {
      id: `note-${Date.now()}`,
      type: 'note',
      content: newNote.trim(),
      author: authorName.trim() || 'Guest',
      x: Math.random() * 500 + 100,
      y: Math.random() * 250 + 100,
      rotation: (Math.random() - 0.5) * 14,
      color: randomColor,
    };

    setItems([...items, newItem]);
    setNewNote('');
    setAuthorName('');
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen py-24 md:py-32 px-6 max-w-6xl mx-auto">
      {/* Signature Header matching aniketmeshram.me/en/wall */}
      <div className="text-center mb-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 font-mono"
        >
          THE WALL REMEMBERS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 font-serif"
        >
          Words Left in the{' '}
          <span
            className="italic font-bold bg-clip-text text-transparent inline-block -mx-2 px-4 -my-1 py-1"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgb(255, 0, 153), rgb(255, 154, 210))',
            }}
          >
            Ruins
          </span>
        </motion.h1>

        {/* Pin Something Button with radiant glow */}
        <div className="relative inline-flex items-center justify-center py-2">
          <span
            className="absolute inset-0 rounded-full bg-primary/25 blur-xl pointer-events-none animate-pulse"
            style={{ transform: 'scale(1.2)' }}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-semibold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Pin Something
          </button>
        </div>
      </div>

      {/* Interactive Corkboard Canvas */}
      <div className="relative h-[600px] md:h-[700px] w-full rounded-3xl border border-white/10 bg-[#0a0a0c] overflow-hidden shadow-2xl p-4 select-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {items.map((item) => (
          <motion.div
            key={item.id}
            drag
            dragConstraints={{ left: 20, right: 900, top: 20, bottom: 500 }}
            whileHover={{ scale: 1.1, zIndex: 40 }}
            whileDrag={{ scale: 1.18, zIndex: 50 }}
            initial={{
              x: item.x,
              y: item.y,
              rotate: item.rotation,
            }}
            className="absolute cursor-grab active:cursor-grabbing touch-none"
          >
            {item.type === 'sticker' ? (
              <img
                src={item.content}
                alt=""
                className="w-24 md:w-32 h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] pointer-events-none select-none"
              />
            ) : (
              <div
                className="p-4 rounded-xl max-w-xs shadow-2xl backdrop-blur-md border border-white/15 text-white"
                style={{
                  backgroundColor: `${item.color}25`,
                  borderLeft: `4px solid ${item.color}`,
                }}
              >
                {/* Pin Head */}
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-2 shadow-md"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-sm font-medium leading-relaxed mb-2 font-serif">
                  {item.content}
                </p>
                {item.author && (
                  <p className="text-xs text-zinc-400 text-right font-mono">
                    — {item.author}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pin Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md p-6 rounded-2xl bg-[#0e0e12] border border-white/15 shadow-2xl relative"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Leave your mark on the Wall
              </h3>
              <form onSubmit={handlePin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 font-mono">
                    Your Note
                  </label>
                  <textarea
                    rows={3}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write a message, a thought, or a quote..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 transition-all resize-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1 font-mono">
                    Your Name / Handle
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Satoshi from Tokyo"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 transition-all text-sm"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-primary text-white font-semibold text-xs shadow-lg shadow-primary/30 hover:scale-105 transition-all cursor-pointer"
                  >
                    Pin Note
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
