import React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Syne, Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import { ScrollBackground } from "@/components/scroll-background"
import { GlobalBusAnimation } from "@/components/global-bus-animation"
import { AppShell } from "@/components/app-shell"
import { LenisSmoothScroll } from "@/components/lenis-smooth-scroll"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import "lenis/dist/lenis.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" })
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
})
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
})
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
})

export const metadata: Metadata = {
  title: "Atak Ulaşım | Raylı Sistem Ekipmanları ve Elektronik Çözümler",
  description:
    "Metro ve tramvay yolcu bilgilendirme sistemleri, elektronik tasarım-üretim, yazılım çözümleri. 1998'den beri Türkiye'nin teknoloji ortağı.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/images/hubele/icon.svg", type: "image/svg+xml" },
      { url: "/images/hubele/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: "/images/hubele/icon.svg",
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
    <html lang="tr" className={`${syne.variable} ${barlow.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-[#0a0a0a] dark:bg-[#0f172a] dark:text-white">
        <ThemeProvider>
          <LanguageProvider>
            <LenisSmoothScroll>
              <ScrollBackground />
              <GlobalBusAnimation />
              <AppShell>
                <div className="relative z-10">{children}</div>
              </AppShell>
            </LenisSmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
