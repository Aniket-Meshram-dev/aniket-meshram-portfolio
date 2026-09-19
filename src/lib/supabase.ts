import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface WallNote {
  id: string;
  text: string;
  author: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
  created_at?: string;
}

const DEFAULT_FALLBACK_NOTES: WallNote[] = [
  {
    id: 'note-1',
    text: '痛みを知らぬ者に、本当の平和は分からん',
    author: 'Pain (Nagato)',
    color: '#d4547e',
    x: 200,
    y: 160,
    rotation: -2,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'note-2',
    text: 'Building remarkable things from Muscat with Flutter & passion 🚀',
    author: 'Visitor from Dubai',
    color: '#3b82f6',
    x: 480,
    y: 200,
    rotation: 3,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'note-3',
    text: 'س س — Cleanest design system seen all year.',
    author: 'Anonymous',
    color: '#10b981',
    x: 720,
    y: 360,
    rotation: -4,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const LOCAL_STORAGE_CACHE_KEY = 'portfolio_cached_wall_notes';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim() ||
  'https://xmpzbwnyfbitgdpxkdif.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcHpid255ZmJpdGdkcHhrZGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3OTU1ODYsImV4cCI6MjEwNTM3MTU4Nn0.Lpm58jtp52hj8DEEmpvxFJJwAIIfBCllMrSXn0cX6y4';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('YOUR_SUPABASE')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Fetch all wall notes from Supabase or fallback to local storage / defaults.
 */
export async function fetchWallNotes(): Promise<WallNote[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('wall_notes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(60);

      if (!error && data && data.length > 0) {
        const formattedNotes: WallNote[] = data.map((item) => ({
          id: String(item.id),
          text: String(item.text),
          author: String(item.author || 'Guest'),
          color: String(item.color || '#d4547e'),
          x: Number(item.x || 0),
          y: Number(item.y || 0),
          rotation: Number(item.rotation || 0),
          created_at: item.created_at,
        }));

        // Cache locally for instant next load
        try {
          localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(formattedNotes));
        } catch {
          // ignore storage error
        }

        return formattedNotes;
      }
    } catch (err) {
      console.warn('[Wall] Supabase fetch error, falling back to cache:', err);
    }
  }

  // Fallback to local storage if available
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return DEFAULT_FALLBACK_NOTES;
}

/**
 * Save a new note to Supabase and update local storage.
 */
export async function createWallNote(
  note: Omit<WallNote, 'created_at'>
): Promise<{ success: boolean; note: WallNote }> {
  const fullNote: WallNote = {
    ...note,
    created_at: new Date().toISOString(),
  };

  // Always update local cache first
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
    const existing = cached ? JSON.parse(cached) : DEFAULT_FALLBACK_NOTES;
    localStorage.setItem(
      LOCAL_STORAGE_CACHE_KEY,
      JSON.stringify([fullNote, ...existing.filter((n: WallNote) => n.id !== fullNote.id)])
    );
  } catch {
    // ignore
  }

  if (supabase) {
    try {
      const { error } = await supabase.from('wall_notes').insert([
        {
          id: fullNote.id,
          text: fullNote.text,
          author: fullNote.author,
          color: fullNote.color,
          x: fullNote.x,
          y: fullNote.y,
          rotation: fullNote.rotation,
        },
      ]);

      if (error) {
        console.warn('[Wall] Supabase insert error:', error.message);
        return { success: false, note: fullNote };
      }

      return { success: true, note: fullNote };
    } catch (err) {
      console.warn('[Wall] Supabase network error:', err);
      return { success: false, note: fullNote };
    }
  }

  return { success: true, note: fullNote };
}

/**
 * Subscribe to real-time additions to the wall.
 */
export function subscribeWallNotes(onInsert: (note: WallNote) => void): () => void {
  if (!supabase) {
    return () => {};
  }

  try {
    const channel = supabase
      .channel('public:wall_notes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wall_notes' },
        (payload) => {
          if (payload.new) {
            const raw = payload.new as Record<string, unknown>;
            const newNote: WallNote = {
              id: String(raw.id),
              text: String(raw.text),
              author: String(raw.author || 'Guest'),
              color: String(raw.color || '#d4547e'),
              x: Number(raw.x || 0),
              y: Number(raw.y || 0),
              rotation: Number(raw.rotation || 0),
              created_at: String(raw.created_at || new Date().toISOString()),
            };
            onInsert(newNote);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('[Wall] Realtime subscription error:', err);
    return () => {};
  }
}
