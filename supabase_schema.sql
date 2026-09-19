-- ==============================================================================
-- THE WALL - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Instructions:
-- 1. Go to your Supabase project: https://app.supabase.com
-- 2. Open the "SQL Editor" from the left menu.
-- 3. Paste this entire script and click "Run".
-- ==============================================================================

-- 1. Create the wall_notes table
CREATE TABLE IF NOT EXISTS public.wall_notes (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    author TEXT DEFAULT 'Guest',
    color TEXT DEFAULT '#d4547e',
    x NUMERIC DEFAULT 0,
    y NUMERIC DEFAULT 0,
    rotation NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.wall_notes ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow any visitor (anon) to read notes
CREATE POLICY "Allow public read access"
ON public.wall_notes
FOR SELECT
TO anon, authenticated
USING (true);

-- 4. Policy: Allow any visitor (anon) to insert new notes
CREATE POLICY "Allow public insert access"
ON public.wall_notes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 5. Enable Realtime on wall_notes table so visitors see new notes live!
ALTER PUBLICATION supabase_realtime ADD TABLE public.wall_notes;

-- 6. Insert initial welcome / signature notes
INSERT INTO public.wall_notes (id, text, author, color, x, y, rotation)
VALUES 
  ('note-1', '痛みを知らぬ者に、本当の平和は分からん', 'Pain (Nagato)', '#d4547e', 200, 160, -2),
  ('note-2', 'Building remarkable things from Muscat with Flutter & passion 🚀', 'Visitor from Dubai', '#3b82f6', 480, 200, 3),
  ('note-3', 'س س — Cleanest design system seen all year.', 'Anonymous', '#10b981', 720, 360, -4)
ON CONFLICT (id) DO NOTHING;
