import React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Syne, Inter, Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import { ScrollBackground } from "@/components/scroll-background"
import { GlobalBusAnimation } from "@/components/global-bus-animation"
import { AppShell } from "@/components/app-shell"
import { LenisSmoothScroll } from "@/components/lenis-smooth-scroll"
import { ThemeProvider } from "@/components/theme-provider"
import { LOGO } from "@/lib/logo"
import "./globals.css"
import "lenis/dist/lenis.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" })
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
})
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.atakulasim.com.tr"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Atak Ulaşım | Raylı Sistem Ekipmanları ve Elektronik Çözümler",
  description:
    "Metro ve tramvay yolcu bilgilendirme sistemleri, elektronik tasarım-üretim, yazılım çözümleri. 1998'den beri Türkiye'nin teknoloji ortağı.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: LOGO.icon, sizes: "32x32", type: "image/png" },
      { url: LOGO.icon64, sizes: "64x64", type: "image/png" },
    ],
    apple: LOGO.appleTouch,
  },
  openGraph: {
    title: "Atak Ulaşım | Raylı Sistem Ekipmanları ve Elektronik Çözümler",
    description:
      "Metro ve tramvay yolcu bilgilendirme sistemleri, elektronik tasarım-üretim, yazılım çözümleri. 1998'den beri Türkiye'nin teknoloji ortağı.",
    images: [
      {
        url: LOGO.social,
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
    <html lang="tr" className={`${inter.variable} ${syne.variable} ${barlow.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[300] -translate-y-24 rounded-md bg-[var(--tech-blue)] px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--tech-blue)] focus:ring-offset-2"
        >
          İçeriğe atla
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <LenisSmoothScroll>
              <ScrollBackground />
              <GlobalBusAnimation />
              <AppShell>
                <div id="main-content" className="relative z-10" tabIndex={-1}>
                  {children}
                </div>
              </AppShell>
            </LenisSmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
