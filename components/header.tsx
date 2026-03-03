"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { LOGO } from "@/lib/logo"
import { useLanguage } from "@/lib/language-context"
import { useHeaderContext } from "@/hooks/use-header-context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const sectionContext = useHeaderContext()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
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

  const directiveNav = [
    { name: language === "tr" ? "Çözümler" : "Solutions", href: "/urunlerimiz" },
    { name: language === "tr" ? "Projeler" : "Projects", href: "/projelerimiz" },
    { name: language === "tr" ? "Teknoloji" : "Technology", href: "/faaliyet-alanlari" },
    { name: language === "tr" ? "Hakkımızda" : "About", href: "/hakkimizda" },
  ]

  const theme = sectionContext.theme
  const isDark = theme === "dark"

  const barClass = cn(
    "fixed inset-x-0 top-0 z-[100] h-16 transition-all duration-300 ease-out",
    "backdrop-blur-[20px] border-b",
    isDark
      ? cn(
          "border-white/[0.06]",
          scrolled ? "bg-[rgba(1,13,28,0.98)] shadow-[0_1px_0_rgba(0,128,255,0.08)]" : "bg-[rgba(1,13,28,0.80)]"
        )
      : cn(
          "border-black/[0.06]",
          scrolled ? "bg-white/95 shadow-sm" : "bg-white/85"
        )
  )

  const linkClass = (active: boolean) =>
    cn(
      "relative text-[0.65rem] font-medium uppercase tracking-[0.09em] py-1.5 transition-colors duration-200",
      "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200",
      isDark
        ? cn(
            active
              ? "text-white after:bg-[var(--tech-blue)] after:scale-x-100"
              : "text-white/50 hover:text-white hover:after:scale-x-100 hover:after:bg-white/30"
          )
        : cn(
            active
              ? "text-[var(--navy)] after:bg-[var(--tech-blue)] after:scale-x-100"
              : "text-foreground/60 hover:text-[var(--navy)] hover:after:scale-x-100 hover:after:bg-[var(--navy)]/30"
          )
    )

  return (
    <header className={barClass}>
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 md:px-10 lg:px-14 h-16">

        {/* ── Logo ── */}
        <Link
          href="/"
          className="relative z-10 flex items-center shrink-0 transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tech-blue)] rounded-sm"
          aria-label="Atak Ulaşım – Ana Sayfa"
        >
          <Image
            src={LOGO.main}
            alt="Atak Ulaşım"
            width={250}
            height={100}
            priority
            className="h-9 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav
          className="hidden md:flex items-center gap-5 lg:gap-7"
          style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
          aria-label="Ana Navigasyon"
        >
          <Link href="/" className={linkClass(pathname === "/")}>
            {t.nav.home}
          </Link>
          {directiveNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(pathname.startsWith(item.href))}
            >
              {item.name}
            </Link>
          ))}

          {/* CTA — İletişim */}
          <Link
            href="/iletisim"
            className={cn(
              "ml-2 inline-flex items-center text-[0.65rem] uppercase tracking-[0.09em] font-semibold",
              "px-4 py-2 rounded-sm border transition-all duration-200",
              isDark
                ? "border-[var(--tech-blue)] text-[var(--tech-blue)] hover:bg-[var(--tech-blue)] hover:text-white"
                : "border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white"
            )}
            style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* ── Language Switcher (Desktop) ── */}
        <div className="hidden md:flex items-center shrink-0">
          <div
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-1 border",
              isDark ? "border-white/15 bg-white/[0.04]" : "border-black/10 bg-black/[0.03]"
            )}
          >
            <Globe className={cn("h-3 w-3 mr-1.5", isDark ? "text-white/40" : "text-foreground/40")} />
            <button
              onClick={() => setLanguage("tr")}
              className={cn(
                "text-[0.6rem] font-semibold uppercase tracking-widest px-2 py-1 rounded-full transition-all duration-150",
                isDark
                  ? language === "tr"
                    ? "bg-white text-[var(--navy-deeper)]"
                    : "text-white/50 hover:text-white"
                  : language === "tr"
                    ? "bg-[var(--navy)] text-white"
                    : "text-foreground/50 hover:text-foreground"
              )}
            >
              TR
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={cn(
                "text-[0.6rem] font-semibold uppercase tracking-widest px-2 py-1 rounded-full transition-all duration-150",
                isDark
                  ? language === "en"
                    ? "bg-white text-[var(--navy-deeper)]"
                    : "text-white/50 hover:text-white"
                  : language === "en"
                    ? "bg-[var(--navy)] text-white"
                    : "text-foreground/50 hover:text-foreground"
              )}
            >
              EN
            </button>
          </div>
        </div>

        {/* ── Mobile: Hamburger ── */}
        <button
          type="button"
          className={cn(
            "md:hidden -m-2 p-2.5 rounded-md transition-colors duration-150",
            isDark
              ? "text-white/80 hover:text-white hover:bg-white/[0.06]"
              : "text-foreground/70 hover:text-foreground hover:bg-black/[0.04]"
          )}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Menüyü aç"
          aria-expanded={mobileMenuOpen}
        >
          <Menu className="h-5 w-5" strokeWidth={1.8} />
        </button>
      </div>

      {/* ── Mobile Drawer: solid panel, dark backdrop, easy tap targets ── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[200] isolate">
          {/* Backdrop — opaque so page is clearly behind; tap to close */}
          <div
            className="absolute inset-0 bg-[#000000] opacity-90 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileMenuOpen(false)}
            aria-hidden="true"
            style={{ cursor: "pointer" }}
          />

          {/* Panel — fully opaque, no transparency; full width on small screens */}
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-[320px] flex flex-col bg-[#0a1628] border-l-2 border-[var(--tech-blue)]/30 shadow-[-8px_0_32px_rgba(0,0,0,0.5)]"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            style={{ backgroundColor: "#0a1628" }}
          >
            {/* Panel header — logo + close */}
            <div className="flex items-center justify-between shrink-0 px-5 py-4 border-b border-white/10 bg-[#0a1628]">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-[44px] -m-2 px-2"
                aria-label="Atak Ulaşım"
              >
                <Image
                  src={LOGO.main}
                  alt="Atak Ulaşım"
                  width={250}
                  height={100}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                className="flex items-center justify-center min-w-[44px] min-h-[44px] -m-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Menüyü kapat"
              >
                <X className="h-6 w-6" strokeWidth={1.8} />
              </button>
            </div>

            {/* Nav links — large tap targets, clear active state */}
            <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-5" aria-label="Mobil Navigasyon">
              <ul className="space-y-0">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center min-h-[48px] py-3 px-4 rounded-lg text-[15px] font-medium transition-colors touch-manipulation -mx-1",
                        pathname === item.href
                          ? "text-white bg-[var(--tech-blue)]/20 text-[var(--tech-blue)]"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact CTA — full width, high contrast */}
              <div className="mt-6 px-0">
                <Link
                  href="/iletisim"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-center min-h-[48px] w-full py-3.5 rounded-lg",
                    "text-[15px] font-semibold tracking-wide touch-manipulation",
                    "bg-[var(--tech-blue)] text-white",
                    "hover:bg-[var(--tech-blue-dark)] active:scale-[0.98] transition-all duration-150"
                  )}
                >
                  {t.nav.contact}
                </Link>
              </div>
            </nav>

            {/* Language switcher — solid bar */}
            <div className="shrink-0 px-5 py-4 border-t border-white/10 bg-[#071018]">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-white/50 shrink-0" aria-hidden />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage("tr")}
                    className={cn(
                      "min-h-[40px] px-4 py-2 rounded-lg text-sm font-medium touch-manipulation transition-all duration-150",
                      language === "tr"
                        ? "bg-[var(--tech-blue)] text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    Türkçe
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={cn(
                      "min-h-[40px] px-4 py-2 rounded-lg text-sm font-medium touch-manipulation transition-all duration-150",
                      language === "en"
                        ? "bg-[var(--tech-blue)] text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
