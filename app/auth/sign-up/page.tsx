"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [studyPreference, setStudyPreference] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (!studyPreference) {
      setError("Por favor, selecione sua preferência de estudo")
      setIsLoading(false)
      return
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
            study_preference: studyPreference,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        router.push("/auth/sign-up-success")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Erro ao criar conta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image src="/uergs-logo.png" alt="UERGS" width={150} height={50} className="h-12 w-auto" />
            <span className="text-3xl font-bold text-[#1b5e20]">Check</span>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Criar conta</CardTitle>
              <CardDescription>Configure sua conta para começar a organizar seus estudos</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Nome completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Curso</Label>
                    <Select value="engenharia-computacao" disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu curso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engenharia-computacao">Engenharia da Computação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Preferência de estudo</Label>
                    <Select value={studyPreference} onValueChange={setStudyPreference}>
                      <SelectTrigger>
                        <SelectValue placeholder="Quando você pode estudar?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Apenas manhã</SelectItem>
                        <SelectItem value="afternoon">Apenas tarde</SelectItem>
                        <SelectItem value="both">Manhã e tarde</SelectItem>
                        <SelectItem value="flexible">Flexível</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Criando conta..." : "Criar conta"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Já tem uma conta?{" "}
                  <Link href="/auth/login" className="underline underline-offset-4 text-blue-600">
                    Fazer login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
