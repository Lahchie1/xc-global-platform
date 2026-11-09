-- Add admin_level column to public.users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS admin_level text CHECK (admin_level IN ('super_admin', 'service_admin', 'reader_admin'));

-- Update default for any existing admins
UPDATE public.users SET admin_level = 'super_admin' WHERE role = 'admin' AND admin_level IS NULL;
