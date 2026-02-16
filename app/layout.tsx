import React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import { ScrollBackground } from "@/components/scroll-background"
import { GlobalBusAnimation } from "@/components/global-bus-animation"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Atak Ulaşım | Raylı Sistem Ekipmanları ve Elektronik Çözümler",
  description:
    "Metro ve tramvay yolcu bilgilendirme sistemleri, elektronik tasarım-üretim, yazılım çözümleri. 1998'den beri Türkiye'nin teknoloji ortağı.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/images/Logos/png_files/favicon_32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/Logos/png_files/favicon_64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],
    apple: "/images/Logos/png_files/favicon_64x64.png",
  },
  openGraph: {
    title: "Atak Ulaşım | Raylı Sistem Ekipmanları ve Elektronik Çözümler",
    description:
      "Metro ve tramvay yolcu bilgilendirme sistemleri, elektronik tasarım-üretim, yazılım çözümleri. 1998'den beri Türkiye'nin teknoloji ortağı.",
    images: [
      {
        url: "/images/Logos/png_files/social_1200x630.png",
        width: 1200,
        height: 630,
        alt: "Atak Ulaşım",
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className="font-sans antialiased">
        <LanguageProvider>
          <ScrollBackground />
          <GlobalBusAnimation />
          <div className="relative z-10">{children}</div>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
