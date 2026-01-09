import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardClient } from "@/components/dashboard-client"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

  if (!profile) {
    const { data: newProfile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || null,
        course_id: "123e4567-e89b-12d3-a456-426614174000",
        study_preference: user.user_metadata?.study_preference || "flexible",
        is_admin: false,
        is_super_admin: false,
      })
      .select()
      .single()

    if (profileError && profileError.code !== "23505") {
      // If it's not a duplicate key error, redirect to error page
      redirect("/auth/error")
    }

    // If duplicate, try to fetch again
    if (profileError?.code === "23505") {
      const { data: existingProfile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      if (!existingProfile) {
        redirect("/auth/error")
      }

      return (
        <DashboardClient
          user={user}
          profile={existingProfile}
          subjects={await getSubjects(supabase, existingProfile.course_id)}
          userSubjects={await getUserSubjects(supabase, user.id)}
        />
      )
    }

    return (
      <DashboardClient
        user={user}
        profile={newProfile}
        subjects={await getSubjects(supabase, newProfile?.course_id)}
        userSubjects={await getUserSubjects(supabase, user.id)}
      />
    )
  }

  // Get all subjects for the course
  const subjects = await getSubjects(supabase, profile.course_id)

  // Get user's completed subjects
  const userSubjects = await getUserSubjects(supabase, user.id)

  return <DashboardClient user={user} profile={profile} subjects={subjects} userSubjects={userSubjects} />
}

async function getSubjects(supabase: any, courseId: string) {
  const { data } = await supabase
    .from("subjects")
    .select("*")
    .eq("course_id", courseId)
    .order("semester", { ascending: true })
    .order("name", { ascending: true })

  return data || []
}

async function getUserSubjects(supabase: any, userId: string) {
  const { data } = await supabase.from("user_subjects").select("*").eq("user_id", userId)

  return data || []
}
