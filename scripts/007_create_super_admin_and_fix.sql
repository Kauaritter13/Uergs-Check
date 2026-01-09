-- Create super admin user profile
-- Note: User must first sign up with email admin.admin@admin.com and password 130905
-- Then run this script to give them super admin privileges

DO $$
DECLARE
  super_admin_email TEXT := 'admin.admin@admin.com';
  super_admin_id UUID;
BEGIN
  -- Try to find the user in auth.users (if they've signed up)
  SELECT id INTO super_admin_id
  FROM auth.users
  WHERE email = super_admin_email;

  IF super_admin_id IS NOT NULL THEN
    -- Update or insert profile with super admin privileges
    INSERT INTO profiles (id, email, full_name, course_id, study_preference, is_admin, is_super_admin, created_at)
    VALUES (
      super_admin_id,
      super_admin_email,
      'Super Admin',
      '123e4567-e89b-12d3-a456-426614174000',
      'flexible',
      true,
      true,
      NOW()
    )
    ON CONFLICT (id) 
    DO UPDATE SET 
      is_admin = true,
      is_super_admin = true,
      full_name = 'Super Admin';
    
    RAISE NOTICE 'Super admin privileges granted to user: %', super_admin_email;
  ELSE
    RAISE NOTICE 'User % not found. Please sign up first, then run this script again.', super_admin_email;
  END IF;
END $$;
