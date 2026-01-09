import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminClient } from "@/components/admin-client"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || (!profile.is_admin && !profile.is_super_admin)) {
    redirect("/dashboard")
  }

  // Get all users if super admin
  let allProfiles = []
  if (profile.is_super_admin) {
    const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })
    allProfiles = profiles || []
  }

  // Get all courses
  const { data: courses } = await supabase.from("courses").select("*").order("name")

  return <AdminClient user={user} profile={profile} allProfiles={allProfiles} courses={courses || []} />
}
