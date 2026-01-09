"use client"

import { useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LogOut, CheckCircle2, Circle, Lightbulb, Shield, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Subject {
  id: string
  name: string
  credits: number
  hours: number
  semester: number
  prerequisites: string | null
  is_elective: boolean
  is_optional: boolean
}

interface UserSubject {
  id: string
  subject_id: string
  completed: boolean
}

interface Profile {
  full_name: string | null
  study_preference: string
  is_admin: boolean
  is_super_admin: boolean
}

interface DashboardClientProps {
  user: any
  profile: Profile | null
  subjects: Subject[]
  userSubjects: UserSubject[]
}

export function DashboardClient({ user, profile, subjects, userSubjects }: DashboardClientProps) {
  const router = useRouter()
  const [completedSubjects, setCompletedSubjects] = useState<Set<string>>(
    new Set(userSubjects.filter((us) => us.completed).map((us) => us.subject_id)),
  )
  const [isUpdating, setIsUpdating] = useState(false)

  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const toggleSubject = async (subjectId: string) => {
    setIsUpdating(true)
    const isCompleted = completedSubjects.has(subjectId)

    try {
      if (isCompleted) {
        await supabase.from("user_subjects").delete().eq("user_id", user.id).eq("subject_id", subjectId)

        setCompletedSubjects((prev) => {
          const newSet = new Set(prev)
          newSet.delete(subjectId)
          return newSet
        })
      } else {
        await supabase.from("user_subjects").upsert({
          user_id: user.id,
          subject_id: subjectId,
          completed: true,
          completed_at: new Date().toISOString(),
        })

        setCompletedSubjects((prev) => new Set(prev).add(subjectId))
      }
    } catch (error) {
      console.error("Error toggling subject:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const hasCompletedPrerequisites = (subject: Subject): boolean => {
    if (!subject.prerequisites || subject.prerequisites === "Sem pré-requisitos") {
      return true
    }

    // Parse prerequisites - look for subject names mentioned
    const prereqNames = subject.prerequisites.split(/[;,]/).map((p) => p.trim())

    // Check if all prerequisites are completed
    for (const prereqName of prereqNames) {
      // Skip co-requisites and credit requirements
      if (
        prereqName.toLowerCase().includes("co-requisito") ||
        prereqName.toLowerCase().includes("créditos") ||
        prereqName.toLowerCase().includes("ter cursado")
      ) {
        continue
      }

      // Find the prerequisite subject
      const prereqSubject = subjects.find(
        (s) =>
          prereqName.toLowerCase().includes(s.name.toLowerCase()) ||
          s.name.toLowerCase().includes(prereqName.toLowerCase()),
      )

      // If we found a prerequisite and it's not completed, return false
      if (prereqSubject && !completedSubjects.has(prereqSubject.id)) {
        return false
      }
    }

    return true
  }

  const stats = useMemo(() => {
    const mandatory = subjects.filter((s) => !s.is_elective)
    const electives = subjects.filter((s) => s.is_elective)

    const completedMandatory = mandatory.filter((s) => completedSubjects.has(s.id))
    const completedElectives = electives.filter((s) => completedSubjects.has(s.id))

    const totalMandatoryCredits = mandatory.reduce((sum, s) => sum + s.credits, 0)
    const completedMandatoryCredits = completedMandatory.reduce((sum, s) => sum + s.credits, 0)

    // Eletivas: 360 horas = 24 créditos (15h por crédito) = 10% do curso
    const electiveCreditsNeeded = 24
    const completedElectiveCredits = Math.min(
      completedElectives.reduce((sum, s) => sum + s.credits, 0),
      electiveCreditsNeeded,
    )

    const totalCreditsNeeded = totalMandatoryCredits + electiveCreditsNeeded
    const totalCompletedCredits = completedMandatoryCredits + completedElectiveCredits

    const progressPercentage = (totalCompletedCredits / totalCreditsNeeded) * 100

    // Calculate remaining only from mandatory subjects
    const mandatoryRemaining = mandatory.filter((s) => !completedSubjects.has(s.id)).length
    const electiveCreditsRemaining = Math.max(0, electiveCreditsNeeded - completedElectiveCredits)

    const creditsRemaining = totalCreditsNeeded - totalCompletedCredits
    const semestersRemaining = Math.ceil(creditsRemaining / 25)

    return {
      totalCreditsNeeded,
      totalCompletedCredits,
      creditsRemaining,
      progressPercentage,
      semestersRemaining,
      completedSubjectsCount: completedMandatory.length,
      totalSubjectsCount: mandatory.length,
      electiveCreditsRemaining,
      completedElectiveCredits,
      electiveCreditsNeeded,
    }
  }, [subjects, completedSubjects])

  const subjectsBySemester = useMemo(() => {
    const grouped: Record<number, Subject[]> = {}
    subjects.forEach((subject) => {
      if (!subject.is_elective) {
        if (!grouped[subject.semester]) {
          grouped[subject.semester] = []
        }
        grouped[subject.semester].push(subject)
      }
    })
    return grouped
  }, [subjects])

  const electives = subjects.filter((s) => s.is_elective)

  const recommendations = useMemo(() => {
    const available: Subject[] = []

    subjects.forEach((subject) => {
      if (completedSubjects.has(subject.id)) return
      if (subject.is_elective) return // Don't recommend electives automatically

      // Check if prerequisites are completed
      if (!hasCompletedPrerequisites(subject)) return

      available.push(subject)
    })

    // Sort by semester and return first 5
    return available.sort((a, b) => a.semester - b.semester).slice(0, 5)
  }, [subjects, completedSubjects])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/uergs-logo.png" alt="UERGS" width={100} height={33} className="h-8 w-auto" />
            <span className="text-2xl font-bold text-[#1b5e20]">Check</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://academico.uergs.edu.br/core/agregador" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="bg-[#1b5e20] text-white hover:bg-[#2e7d32] hover:text-white"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Solis
              </Button>
            </a>
            <a href="https://moodle.uergs.edu.br/my/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="bg-[#c62828] text-white hover:bg-[#d32f2f] hover:text-white"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Moodle
              </Button>
            </a>
            {(profile?.is_admin || profile?.is_super_admin) && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
            <span className="text-sm text-slate-600">{profile?.full_name || user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Progresso Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#1b5e20]">{Math.round(stats.progressPercentage)}%</div>
              <Progress value={stats.progressPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Créditos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.totalCompletedCredits}
                <span className="text-lg text-slate-500">/{stats.totalCreditsNeeded}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">Faltam {stats.creditsRemaining} créditos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Matérias Obrigatórias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.completedSubjectsCount}
                <span className="text-lg text-slate-500">/{stats.totalSubjectsCount}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Eletivas: {stats.completedElectiveCredits}/{stats.electiveCreditsNeeded} créditos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Previsão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#1b5e20]">{stats.semestersRemaining}</div>
              <p className="text-sm text-slate-600 mt-1">
                {stats.semestersRemaining === 1 ? "semestre" : "semestres"} restantes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-yellow-50 border-[#1b5e20]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1b5e20]">
                <Lightbulb className="h-5 w-5" />
                Próximas matérias recomendadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {recommendations.map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium">{subject.name}</p>
                      <p className="text-sm text-slate-600">
                        {subject.credits} créditos • {subject.hours}h • {subject.semester}º semestre
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => toggleSubject(subject.id)}
                      disabled={isUpdating}
                      className="bg-[#1b5e20] hover:bg-[#2e7d32]"
                    >
                      Marcar como feita
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subjects by Semester */}
        <Card>
          <CardHeader>
            <CardTitle>Matérias do Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="1" className="w-full">
              <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
                {Object.keys(subjectsBySemester)
                  .sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
                  .map((semester) => (
                    <TabsTrigger key={semester} value={semester}>
                      {semester}º
                    </TabsTrigger>
                  ))}
                <TabsTrigger value="electives">Eletivas</TabsTrigger>
              </TabsList>

              {Object.keys(subjectsBySemester)
                .sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
                .map((semester) => (
                  <TabsContent key={semester} value={semester} className="space-y-3 mt-6">
                    {subjectsBySemester[Number.parseInt(semester)].map((subject) => {
                      const isCompleted = completedSubjects.has(subject.id)
                      const prereqsCompleted = hasCompletedPrerequisites(subject)

                      return (
                        <button
                          key={subject.id}
                          onClick={() => toggleSubject(subject.id)}
                          disabled={isUpdating}
                          className="w-full text-left"
                        >
                          <div
                            className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                              isCompleted
                                ? "bg-green-50 border-green-200"
                                : prereqsCompleted
                                  ? "bg-white border-slate-200 hover:border-[#1b5e20]"
                                  : "bg-slate-50 border-slate-200 opacity-60"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              ) : (
                                <Circle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <h3
                                  className={`font-medium ${
                                    isCompleted ? "text-green-900 line-through" : "text-slate-900"
                                  }`}
                                >
                                  {subject.name}
                                  {subject.is_optional && (
                                    <Badge variant="secondary" className="ml-2">
                                      Opcional
                                    </Badge>
                                  )}
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge variant="outline">{subject.credits} créditos</Badge>
                                  <Badge variant="outline">{subject.hours}h</Badge>
                                  {!prereqsCompleted && !isCompleted && (
                                    <Badge variant="destructive" className="text-xs">
                                      Pré-requisitos pendentes
                                    </Badge>
                                  )}
                                </div>
                                {subject.prerequisites && subject.prerequisites !== "Sem pré-requisitos" && (
                                  <p className="text-xs text-slate-600 mt-2">Pré-requisitos: {subject.prerequisites}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </TabsContent>
                ))}

              <TabsContent value="electives" className="space-y-3 mt-6">
                <p className="text-sm text-slate-600 mb-4">
                  Você precisa completar 24 créditos de matérias eletivas ao longo do curso.
                </p>
                {electives.map((subject) => {
                  const isCompleted = completedSubjects.has(subject.id)
                  const prereqsCompleted = hasCompletedPrerequisites(subject)

                  return (
                    <button
                      key={subject.id}
                      onClick={() => toggleSubject(subject.id)}
                      disabled={isUpdating}
                      className="w-full text-left"
                    >
                      <div
                        className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                          isCompleted
                            ? "bg-green-50 border-green-200"
                            : prereqsCompleted
                              ? "bg-white border-slate-200 hover:border-[#1b5e20]"
                              : "bg-slate-50 border-slate-200 opacity-60"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-medium ${
                                isCompleted ? "text-green-900 line-through" : "text-slate-900"
                              }`}
                            >
                              {subject.name}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline">{subject.credits} créditos</Badge>
                              <Badge variant="outline">{subject.hours}h</Badge>
                              {!prereqsCompleted && !isCompleted && (
                                <Badge variant="destructive" className="text-xs">
                                  Pré-requisitos pendentes
                                </Badge>
                              )}
                            </div>
                            {subject.prerequisites && subject.prerequisites !== "Sem pré-requisitos" && (
                              <p className="text-xs text-slate-600 mt-2">Pré-requisitos: {subject.prerequisites}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
