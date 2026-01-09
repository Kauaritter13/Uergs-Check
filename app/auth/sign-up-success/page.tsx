import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-slate-900">Uergs Check</span>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Verifique seu email</CardTitle>
              <CardDescription className="text-center">
                Enviamos um link de confirmação para o seu email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-slate-600 text-center">
                  Por favor, verifique sua caixa de entrada e clique no link de confirmação para ativar sua conta e
                  começar a usar o Uergs Check.
                </p>
                <Link href="/auth/login" className="block">
                  <Button className="w-full bg-transparent" variant="outline">
                    Voltar para o login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
