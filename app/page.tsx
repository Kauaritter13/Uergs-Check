import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, TrendingUp, Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/uergs-logo.png" alt="UERGS" width={120} height={40} className="h-10 w-auto" />
            <span className="text-2xl font-bold text-[#1b5e20]">Check</span>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Começar</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 text-balance">
              Organize sua jornada acadêmica na <span className="text-[#1b5e20]">UERGS</span>
            </h1>
            <p className="text-xl text-slate-600 text-pretty">
              Gerencie suas matérias, acompanhe seu progresso e receba recomendações personalizadas para concluir seu
              curso com eficiência.
            </p>
            <div className="flex gap-4 justify-center pt-4 flex-wrap">
              <Link href="/auth/sign-up">
                <Button size="lg" className="text-lg">
                  Criar conta grátis
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="text-lg bg-transparent">
                  Fazer login
                </Button>
              </Link>
            </div>
            <div className="flex gap-4 justify-center pt-6 flex-wrap">
              <a
                href="https://academico.uergs.edu.br/core/agregador"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 bg-[#1b5e20] text-white hover:bg-[#2e7d32] hover:text-white border-[#1b5e20]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Solis
                </Button>
              </a>
              <a
                href="https://moodle.uergs.edu.br/my/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 bg-[#c62828] text-white hover:bg-[#d32f2f] hover:text-white border-[#c62828]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Moodle
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-[#1b5e20]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Marque suas matérias</h3>
              <p className="text-slate-600">
                Controle visual de todas as disciplinas do seu curso. Marque as concluídas e veja o que falta.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-[#f9a825]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Acompanhe seu progresso</h3>
              <p className="text-slate-600">Veja quantos créditos você já completou e quanto falta para se formar.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-[#c62828]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recomendações inteligentes</h3>
              <p className="text-slate-600">
                Receba sugestões de matérias baseadas na sua preferência de horário e pré-requisitos.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-[#1b5e20] rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para organizar seus estudos?</h2>
            <p className="text-xl text-green-100 mb-8">Junte-se aos estudantes que já estão usando o Uergs Check</p>
            <Link href="/auth/sign-up">
              <Button size="lg" variant="secondary" className="text-lg">
                Começar agora
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>© 2026 Uergs Check. Feito para estudantes da UERGS.</p>
        </div>
      </footer>
    </div>
  )
}
