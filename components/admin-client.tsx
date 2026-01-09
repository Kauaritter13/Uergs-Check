"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { LogOut, Users, BookOpen, Upload, PlusCircle, Code, Trash2, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Profile {
  id: string
  email: string
  full_name: string | null
  is_admin: boolean
  is_super_admin: boolean
  created_at: string
}

interface Course {
  id: string
  name: string
  created_at: string
}

interface AdminClientProps {
  user: any
  profile: Profile
  allProfiles: Profile[]
  courses: Course[]
}

export function AdminClient({ user, profile, allProfiles, courses }: AdminClientProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Course creation state
  const [newCourseName, setNewCourseName] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const [sqlCode, setSqlCode] = useState("")

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const handleToggleAdmin = async (userId: string, currentStatus: boolean) => {
    setIsLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.from("profiles").update({ is_admin: !currentStatus }).eq("id", userId)

      if (error) throw error

      setMessage({ type: "success", text: "Status de admin atualizado com sucesso!" })
      router.refresh()
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao atualizar status de admin" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.from("courses").insert({ name: newCourseName })

      if (error) throw error

      setMessage({ type: "success", text: "Curso criado com sucesso!" })
      setNewCourseName("")
      router.refresh()
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao criar curso" })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePdfUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pdfFile) {
      setMessage({ type: "error", text: "Por favor, selecione um arquivo PDF" })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      // This is a placeholder for PDF processing
      // In production, you would use an AI service to parse the PDF
      setMessage({
        type: "success",
        text: "Funcionalidade de análise de PDF em desenvolvimento. Use o formulário manual para adicionar matérias.",
      })
      setPdfFile(null)
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao processar PDF" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteCourse = async (courseId: string, courseName: string) => {
    if (!confirm(`Tem certeza que deseja excluir o curso "${courseName}"? Esta ação não pode ser desfeita.`)) {
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.from("courses").delete().eq("id", courseId)

      if (error) throw error

      setMessage({ type: "success", text: "Curso excluído com sucesso!" })
      router.refresh()
    } catch (error: any) {
      setMessage({ type: "error", text: error?.message || "Erro ao excluir curso" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExecuteSQL = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!sqlCode.trim()) {
      setMessage({ type: "error", text: "Por favor, insira o código SQL" })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      // Execute the SQL using Supabase's RPC or direct query
      const { error } = await supabase.rpc("exec_sql", { sql_query: sqlCode })

      if (error) throw error

      setMessage({
        type: "success",
        text: "SQL executado com sucesso! Atualize a página para ver as mudanças.",
      })
      setSqlCode("")
    } catch (error: any) {
      setMessage({
        type: "error",
        text: `Erro ao executar SQL: ${error?.message || "Erro desconhecido"}. Use o painel SQL do Supabase para queries complexas.`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/uergs-logo.png" alt="UERGS" width={100} height={33} className="h-8 w-auto" />
            <span className="text-2xl font-bold text-[#1b5e20]">Check</span>
            <Badge variant="destructive" className="ml-2">
              Admin
            </Badge>
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
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Voltar ao Dashboard
              </Button>
            </Link>
            <span className="text-sm text-slate-600">{profile.full_name || user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Painel de Administração</h1>
          <p className="text-slate-600">Gerencie usuários, cursos e matérias do sistema</p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <Tabs defaultValue={profile.is_super_admin ? "users" : "courses"} className="space-y-6">
          <TabsList>
            {profile.is_super_admin && (
              <TabsTrigger value="users">
                <Users className="h-4 w-4 mr-2" />
                Usuários
              </TabsTrigger>
            )}
            <TabsTrigger value="courses">
              <BookOpen className="h-4 w-4 mr-2" />
              Cursos
            </TabsTrigger>
            <TabsTrigger value="pdf">
              <Upload className="h-4 w-4 mr-2" />
              Upload PDF
            </TabsTrigger>
            <TabsTrigger value="sql">
              <Code className="h-4 w-4 mr-2" />
              Executar SQL
            </TabsTrigger>
          </TabsList>

          {profile.is_super_admin && (
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Usuários</CardTitle>
                  <CardDescription>Conceda ou revogue privilégios de administrador</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allProfiles.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{p.full_name || "Sem nome"}</p>
                            {p.is_super_admin && (
                              <Badge variant="destructive" className="text-xs">
                                Super Admin
                              </Badge>
                            )}
                            {p.is_admin && !p.is_super_admin && (
                              <Badge variant="secondary" className="text-xs">
                                Admin
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">{p.email}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            Cadastrado em {new Date(p.created_at).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        {!p.is_super_admin && (
                          <div className="flex items-center gap-3">
                            <Label htmlFor={`admin-${p.id}`} className="text-sm">
                              Admin
                            </Label>
                            <Switch
                              id={`admin-${p.id}`}
                              checked={p.is_admin}
                              onCheckedChange={() => handleToggleAdmin(p.id, p.is_admin)}
                              disabled={isLoading}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="courses">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Criar Novo Curso</CardTitle>
                  <CardDescription>Adicione um novo curso ao sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateCourse} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseName">Nome do Curso</Label>
                      <Input
                        id="courseName"
                        placeholder="Ex: Engenharia de Software"
                        value={newCourseName}
                        onChange={(e) => setNewCourseName(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Criar Curso
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cursos Existentes</CardTitle>
                  <CardDescription>Lista de todos os cursos cadastrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {courses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-xs text-slate-500">
                            Criado em {new Date(course.created_at).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCourse(course.id, course.name)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pdf">
            <Card>
              <CardHeader>
                <CardTitle>Analisar PDF de Grade Curricular</CardTitle>
                <CardDescription>
                  Faça upload de um PDF com a grade curricular e o sistema irá extrair automaticamente as matérias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePdfUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pdfFile">Arquivo PDF</Label>
                    <Input
                      id="pdfFile"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-slate-500">
                      O sistema irá analisar o PDF e extrair as informações das matérias automaticamente
                    </p>
                  </div>
                  <Button type="submit" disabled={isLoading || !pdfFile}>
                    <Upload className="h-4 w-4 mr-2" />
                    {isLoading ? "Processando..." : "Analisar PDF"}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Nota:</strong> A funcionalidade de análise automática de PDF está em desenvolvimento. Por
                    enquanto, você pode adicionar matérias manualmente através do SQL ou criar scripts de migração.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sql">
            <Card>
              <CardHeader>
                <CardTitle>Executar Script SQL</CardTitle>
                <CardDescription>
                  Cole o código SQL para criar tabelas de matérias ou fazer alterações no banco de dados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleExecuteSQL} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sqlCode">Código SQL</Label>
                    <Textarea
                      id="sqlCode"
                      placeholder="INSERT INTO subjects (course_id, name, credits, hours, semester) VALUES ..."
                      value={sqlCode}
                      onChange={(e) => setSqlCode(e.target.value)}
                      rows={15}
                      className="font-mono text-sm"
                      required
                    />
                    <p className="text-xs text-slate-500">
                      Cole aqui o script SQL para criar matérias de um curso. Exemplo: scripts de INSERT INTO subjects
                    </p>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    <Code className="h-4 w-4 mr-2" />
                    {isLoading ? "Executando..." : "Executar SQL"}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Atenção:</strong> Tenha cuidado ao executar comandos SQL. Comandos incorretos podem
                    danificar o banco de dados. Para operações complexas, use o painel SQL do Supabase diretamente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
