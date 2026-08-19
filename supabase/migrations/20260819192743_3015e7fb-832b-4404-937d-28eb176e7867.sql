ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_type text;

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'house';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS location jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS site jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS requirements jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS objects jsonb NOT NULL DEFAULT '{}'::jsonb;