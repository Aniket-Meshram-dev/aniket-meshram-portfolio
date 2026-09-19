export interface WallItem {
  id: string;
  type: 'sticker' | 'note';
  content: string;
  author?: string;
  x: number;
  y: number;
  rotation: number;
  color?: string;
  likes?: number;
  createdAt?: string;
  isCompanion?: boolean;
}

export const SHARED_WALL_STORAGE_KEY = 'aniket_portfolio_interactive_wall_synced_v5';
export const SHARED_LIKED_NOTES_KEY = 'aniket_portfolio_liked_notes_v5';

// Exactly 3 initial stickers positioned aesthetically on the board
export const INITIAL_STICKERS: WallItem[] = [
  {
    id: 'init-st-aizen',
    type: 'sticker',
    content: '/stickers/aizen.png',
    x: 70,
    y: 60,
    rotation: -6,
  },
  {
    id: 'init-st-itachi',
    type: 'sticker',
    content: '/stickers/itachi.png',
    x: 740,
    y: 70,
    rotation: 8,
  },
  {
    id: 'init-st-gwen',
    type: 'sticker',
    content: '/stickers/gwen.png',
    x: 430,
    y: 110,
    rotation: -8,
  },
];

// Exactly 3 initial notes with genuine engineering appreciations
export const INITIAL_NOTES: WallItem[] = [
  {
    id: 'init-note-1',
    type: 'note',
    content: 'Building high-performance full-stack systems with sub-second latency ⚡',
    author: 'Aniket Meshram',
    x: 160,
    y: 150,
    rotation: -2,
    color: '#ec4899',
    likes: 18,
    createdAt: 'Featured',
  },
  {
    id: 'init-note-2',
    type: 'note',
    content: 'Cleanest design system and smoothest micro-interactions seen all year 🚀',
    author: 'Senior Tech Lead',
    x: 490,
    y: 190,
    rotation: 3,
    color: '#3b82f6',
    likes: 14,
    createdAt: 'Verified',
  },
  {
    id: 'init-note-3',
    type: 'note',
    content: 'Sub-200ms POS & AI trading terminals — exceptional engineering caliber.',
    author: 'Lead Evaluator',
    x: 180,
    y: 350,
    rotation: -3,
    color: '#10b981',
    likes: 16,
    createdAt: 'Recent',
  },
];

// Available anime & tech stickers users can select when posting a note
export const AVAILABLE_STICKERS = [
  { id: 'mikasa', name: 'Mikasa', src: '/stickers/mikasa.png' },
  { id: 'sawako', name: 'Sawako', src: '/stickers/sawako.png' },
  { id: 'mikey', name: 'Mikey', src: '/stickers/mikey.png' },
  { id: 'kurapika', name: 'Kurapika', src: '/stickers/kurapika.png' },
  { id: 'flutter', name: 'Flutter', src: '/stickers/flutter.png' },
  { id: 'yuta', name: 'Yuta', src: '/stickers/yuta.png' },
  { id: 'android', name: 'Android', src: '/stickers/android.png' },
  { id: 'tung', name: 'Tung', src: '/stickers/tung.png' },
  { id: 'hutao', name: 'Hu Tao', src: '/stickers/hutao.png' },
  { id: 'spirit', name: 'Spirit', src: '/stickers/unknown_stick.png' },
];

export const NOTE_PALETTES = [
  { hex: '#ec4899', name: 'Rose' },
  { hex: '#3b82f6', name: 'Sky' },
  { hex: '#10b981', name: 'Emerald' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#8b5cf6', name: 'Violet' },
  { hex: '#06b6d4', name: 'Cyan' },
];

export const EMOJI_CHIPS = ['👋', '🚀', '🔥', '⚡', '❤️', '✨'];
