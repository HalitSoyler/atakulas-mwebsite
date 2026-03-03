"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X, Globe, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { useScrollMorph } from "@/lib/scroll-morph-context"
import { LOGO } from "@/lib/logo"

export function HeaderIndustrial() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { isMorphed } = useScrollMorph()
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen])

  const navItems = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/hakkimizda" },
    { name: t.nav.products, href: "/urunlerimiz" },
    { name: t.nav.projects, href: "/projelerimiz" },
    { name: t.nav.activityAreas, href: "/faaliyet-alanlari" },
    { name: t.nav.electricBus, href: "/hizmetler/elektrikli-otobus" },
    { name: t.nav.contact, href: "/iletisim" },
  ]

  const showLogo = pathname !== "/" || isMorphed
  const transparent = !isScrolled && pathname === "/" && !isMorphed

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          transparent
            ? "bg-[var(--navy-deeper)]/70 backdrop-blur-md border-b border-white/10"
            : "bg-white/80 dark:bg-[#0f172a]/90 backdrop-blur-xl border-b border-stone-200/50 dark:border-white/10 shadow-lg shadow-black/5"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            <Link
              href="/"
              className="relative z-10 flex items-center shrink-0 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tech-blue)] rounded-sm"
              aria-label="Atak Ulaşım – Ana Sayfa"
            >
              <div className="flex h-10 w-[140px] md:h-12 md:w-[180px] items-center">
                {showLogo && pathname === "/" && isMorphed ? (
                  <motion.div
                    layoutId="atak-logo"
                    transition={{ layout: { type: "spring", damping: 20, stiffness: 100 } }}
                    style={{ backfaceVisibility: "hidden" }}
                    className="flex items-center"
                  >
                    <Image
                      src={LOGO.main}
                      alt="Atak Ulaşım"
                      width={250}
                      height={100}
                      priority
                      className="h-9 md:h-10 w-auto object-contain"
                    />
                  </motion.div>
                ) : showLogo ? (
                  <Image
                    src={LOGO.main}
                    alt="Atak Ulaşım"
                    width={250}
                    height={100}
                    priority
                    className="h-9 md:h-10 w-auto object-contain"
                  />
                ) : (
                  <Image
                    src={LOGO.mainLight}
                    alt="Atak Ulaşım"
                    width={250}
                    height={100}
                    priority
                    className="h-9 md:h-10 w-auto object-contain"
                  />
                )}
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
                      isActive
                        ? "text-[var(--tech-blue)]"
                        : transparent
                        ? "text-white/80 hover:text-white"
                        : "text-stone-700 dark:text-white/80 hover:text-[var(--tech-blue)] dark:hover:text-white"
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-[var(--tech-blue)] rounded-full" />
                    )}
                    {!transparent && !isActive && (
                      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--tech-blue)]/5" />
                    )}
                    {transparent && !isActive && (
                      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
                className={cn(
                  "hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  transparent
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-white/80 hover:bg-stone-200 dark:hover:bg-white/20"
                )}
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase tracking-wider">{language}</span>
              </button>

              {mounted && (
                <button
                  type="button"
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className={cn(
                    "hidden md:flex items-center justify-center h-10 w-10 rounded-lg transition-all duration-300",
                    transparent
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-stone-100 dark:bg-white/10 text-stone-600 dark:text-white/80 hover:bg-stone-200 dark:hover:bg-white/20"
                  )}
                  aria-label={resolvedTheme === "dark" ? "Açık tema" : "Koyu tema"}
                >
                  {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors duration-300",
                  transparent
                    ? "text-white hover:bg-white/10"
                    : "text-stone-700 dark:text-white hover:bg-stone-100 dark:hover:bg-white/10"
                )}
                aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500 ease-in-out",
            mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="border-t border-stone-200/50 dark:border-white/10 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-[var(--tech-blue)]/10 text-[var(--tech-blue)]"
                        : "text-stone-700 dark:text-white/80 hover:bg-stone-100 dark:hover:bg-white/10"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <button
                onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-white/80 hover:bg-stone-200 dark:hover:bg-white/20 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase tracking-wider">{language}</span>
              </button>
              {mounted && (
                <button
                  type="button"
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-white/80 hover:bg-stone-200 dark:hover:bg-white/20 transition-colors"
                >
                  {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span>{resolvedTheme === "dark" ? (language === "tr" ? "Açık tema" : "Light theme") : (language === "tr" ? "Koyu tema" : "Dark theme")}</span>
                </button>
              )}
              <Link
                href="/iletisim"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-lg text-sm font-semibold bg-[var(--tech-blue)] text-white hover:bg-[var(--tech-blue-dark)] transition-colors mt-4"
              >
                {language === "tr" ? "İletişime Geçin" : "Get in Touch"}
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="h-16 md:h-20" />
    </>
  )
}
