"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, X, Globe, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { useScrollMorph } from "@/lib/scroll-morph-context"
import { LOGO } from "@/lib/logo"

/** Header avatar - Gemini generated */
const AVATAR_IMAGE = "/images/Gemini_Generated_Image_vcveefvcveefvcve.png"

export function HeaderIndustrial() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { isMorphed } = useScrollMorph()
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const navItems = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/hakkimizda" },
    { name: t.nav.products, href: "/urunlerimiz" },
    { name: t.nav.projects, href: "/projelerimiz" },
    { name: t.nav.activityAreas, href: "/faaliyet-alanlari" },
    { name: t.nav.electricBus, href: "/hizmetler/elektrikli-otobus" },
    { name: t.nav.contact, href: "/iletisim" },
  ]

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors",
        "bg-white/90 border-stone-200/80 text-[#0f172a] dark:bg-[#0f172a]/90 dark:border-white/10 dark:text-white",
        isMorphed && "shadow-lg dark:shadow-black/20 shadow-stone-200/20"
      )}
    >
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 py-3">
        {/* Logo — layoutId ile hero'dan morph eder; ana sayfa dışında her zaman statik logo */}
        <div className="flex h-12 w-[140px] items-center md:h-14 md:w-[180px]">
          {pathname === "/" && isMorphed ? (
            <motion.div
              layoutId="atak-logo"
              transition={{ layout: { type: "spring", damping: 20, stiffness: 100 } }}
              style={{ backfaceVisibility: "hidden" }}
              className="flex items-center"
            >
              <Link
                href="/"
                className="flex items-center transition-opacity hover:opacity-90 focus:outline-none"
                aria-label="Atak Ulaşım - Ana Sayfa"
              >
                <img
                  src={LOGO.main}
                  alt="Atak Ulaşım"
                  width={215}
                  height={48}
                  className="h-8 md:h-10 w-auto object-contain dark:invert"
                />
              </Link>
            </motion.div>
          ) : pathname !== "/" ? (
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-90 focus:outline-none"
              aria-label="Atak Ulaşım - Ana Sayfa"
            >
              <img
                src={LOGO.main}
                alt="Atak Ulaşım"
                width={215}
                height={48}
                className="h-8 md:h-10 w-auto object-contain dark:invert"
              />
            </Link>
          ) : null}
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href ? "text-[#38bdf8]" : "text-stone-600 dark:text-white/70 hover:text-[#0f172a] dark:hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right: theme toggle + language + morphing avatar */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 dark:border-white/20 bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-white/80 hover:bg-stone-200 dark:hover:bg-white/10 transition-colors"
              aria-label={resolvedTheme === "dark" ? "Açık tema" : "Koyu tema"}
            >
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-stone-200 dark:border-white/20 bg-stone-100/50 dark:bg-white/5 px-2.5 py-1.5">
            <Globe className="h-3.5 w-3.5 text-[#38bdf8]" />
            <button
              onClick={() => setLanguage("tr")}
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full transition-colors",
                language === "tr" ? "bg-[#38bdf8] text-[#0f172a]" : "text-stone-600 dark:text-white/60 hover:text-[#0f172a] dark:hover:text-white"
              )}
            >
              TR
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full transition-colors",
                language === "en" ? "bg-[#38bdf8] text-[#0f172a]" : "text-stone-600 dark:text-white/60 hover:text-[#0f172a] dark:hover:text-white"
              )}
            >
              EN
            </button>
          </div>

          {pathname === "/" && isMorphed ? (
            <motion.div
              layoutId="atak-avatar"
              transition={{ layout: { type: "spring", damping: 20, stiffness: 100 } }}
              style={{ backfaceVisibility: "hidden" }}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#1e293b]"
            >
              <Image
                src={AVATAR_IMAGE}
                alt="Atak Ulaşım"
                width={40}
                height={40}
                className="object-cover"
              />
            </motion.div>
          ) : pathname !== "/" ? (
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#1e293b]">
              <Image
                src={AVATAR_IMAGE}
                alt="Atak Ulaşım"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          ) : null}

          <button
            type="button"
            className="lg:hidden -m-2 p-2 text-stone-700 dark:text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menüyü aç"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm border-l border-stone-200 dark:border-white/10 bg-white dark:bg-[#0f172a] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5">
              <span className="text-lg font-semibold text-[#0f172a] dark:text-white">Menü</span>
              <button
                type="button"
                className="-m-2 p-2 text-stone-700 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Menüyü kapat"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-auto px-5 pb-8 pt-4">
              <ul className="space-y-0.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block py-3.5 text-base font-medium rounded-lg px-3 -mx-3 transition-colors",
                        pathname === item.href ? "text-[#38bdf8] bg-stone-100 dark:bg-white/10" : "text-stone-700 dark:text-white/80 hover:bg-stone-100 dark:hover:bg-white/10"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-[#38bdf8]" />
                  <button
                    onClick={() => setLanguage("tr")}
                    className={cn(
                      "font-medium px-3 py-2 rounded-lg transition-colors",
                      language === "tr" ? "text-[#0f172a] bg-[#38bdf8]" : "text-stone-600 dark:text-white/70"
                    )}
                  >
                    Türkçe
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={cn(
                      "font-medium px-3 py-2 rounded-lg transition-colors",
                      language === "en" ? "text-[#0f172a] bg-[#38bdf8]" : "text-stone-600 dark:text-white/70"
                    )}
                  >
                    English
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
