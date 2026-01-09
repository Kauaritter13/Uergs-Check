-- Script to grant super admin privileges to admin.admin@admin.com
-- This user must be created manually first via sign up

-- First, you need to sign up with admin.admin@admin.com and password 130905
-- Then, find the user ID and update the profile

-- You can run this after the user signs up:
-- UPDATE profiles 
-- SET is_admin = true, is_super_admin = true 
-- WHERE email = (SELECT email FROM auth.users WHERE email = 'admin.admin@admin.com');

-- Or if you know the user_id:
-- UPDATE profiles 
-- SET is_admin = true, is_super_admin = true 
-- WHERE id = 'USER_ID_HERE';

-- Note: Execute this via the SQL editor after creating the user account
