-- Create super admin user in auth.users manually through Supabase dashboard with:
-- Email: admin.admin@uergs.com
-- Password: 130905

-- After creating the user in Supabase Auth, run this to set super admin status
-- Replace 'USER_ID_HERE' with the actual UUID from auth.users after creating the account

-- This script will be run after the super admin user is created in Supabase Auth
-- You need to create the user first through Supabase dashboard or Auth UI

-- Instructions:
-- 1. First, use the sign-up page to create user: admin.admin@uergs.com with password: 130905
-- 2. Then get the user ID from Supabase dashboard
-- 3. Run this SQL in Supabase SQL editor replacing the UUID:
-- 
-- UPDATE profiles 
-- SET is_super_admin = true, is_admin = true 
-- WHERE email = 'admin.admin@uergs.com';
