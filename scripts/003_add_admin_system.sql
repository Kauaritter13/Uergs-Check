-- Add is_admin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Add is_super_admin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN DEFAULT FALSE;

-- RLS Policies for admin operations on courses
CREATE POLICY "Admins can insert courses" ON courses FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (is_admin = true OR is_super_admin = true))
);

CREATE POLICY "Admins can update courses" ON courses FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (is_admin = true OR is_super_admin = true))
);

CREATE POLICY "Admins can delete courses" ON courses FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (is_admin = true OR is_super_admin = true))
);

-- RLS Policies for admin operations on subjects
CREATE POLICY "Admins can insert subjects" ON subjects FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (is_admin = true OR is_super_admin = true))
);

CREATE POLICY "Admins can update subjects" ON subjects FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (is_admin = true OR is_super_admin = true))
);

CREATE POLICY "Admins can delete subjects" ON subjects FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (is_admin = true OR is_super_admin = true))
);

-- RLS Policies for super admin to manage other admins
CREATE POLICY "Super admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_super_admin = true)
);

CREATE POLICY "Super admins can update admin status" ON profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_super_admin = true)
);
