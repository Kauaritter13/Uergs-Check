import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Uergs Check - Organize sua jornada acadêmica",
  description:
    "Gerencie suas matérias, acompanhe seu progresso e receba recomendações personalizadas para concluir seu curso na UERGS",
  author: {
    name: "Kauã Ritter da Silva",
  },
  applicationName: "Uergs Check",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {/* 
          Projeto desenvolvido por Kauã Ritter da Silva
          Uergs Check – Sistema de organização acadêmica
        */}
        {children}
        <Analytics />
      </body>
    </html>
  )
}
