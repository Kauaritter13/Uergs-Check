-- Drop the problematic RLS policies that cause infinite recursion
DROP POLICY IF EXISTS "Super admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Super admins can update admin status" ON profiles;

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id 
    AND (is_admin = true OR is_super_admin = true)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id 
    AND is_super_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fix profiles RLS policies - allow viewing own profile OR if requester is super admin
CREATE POLICY "Users can view own profile or super admins can view all" ON profiles 
FOR SELECT USING (
  auth.uid() = id OR is_super_admin(auth.uid())
);

-- Allow super admins to update any profile
CREATE POLICY "Super admins can update any profile" ON profiles 
FOR UPDATE USING (
  auth.uid() = id OR is_super_admin(auth.uid())
);

-- Update admin policies to use the helper functions
DROP POLICY IF EXISTS "Admins can insert courses" ON courses;
DROP POLICY IF EXISTS "Admins can update courses" ON courses;
DROP POLICY IF EXISTS "Admins can delete courses" ON courses;

CREATE POLICY "Admins can insert courses" ON courses 
FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update courses" ON courses 
FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete courses" ON courses 
FOR DELETE USING (is_admin(auth.uid()));

-- Update subject admin policies
DROP POLICY IF EXISTS "Admins can insert subjects" ON subjects;
DROP POLICY IF EXISTS "Admins can update subjects" ON subjects;
DROP POLICY IF EXISTS "Admins can delete subjects" ON subjects;

CREATE POLICY "Admins can insert subjects" ON subjects 
FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update subjects" ON subjects 
FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete subjects" ON subjects 
FOR DELETE USING (is_admin(auth.uid()));
