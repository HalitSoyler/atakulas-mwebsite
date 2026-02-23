"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Globe, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
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

  const navItems = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/hakkimizda" },
    { name: t.nav.products, href: "/urunlerimiz" },
    { name: t.nav.projects, href: "/projelerimiz" },
    { name: t.nav.activityAreas, href: "/faaliyet-alanlari" },
    { name: t.nav.electricBus, href: "/hizmetler/elektrikli-otobus" },
    { name: t.nav.contact, href: "/iletisim" },
  ]

  /* Directive nav copy (TR): Çözümler | Projeler | Teknoloji | Hakkımızda | İletişim */
  const directiveNav = [
    { name: language === "tr" ? "Çözümler" : "Solutions", href: "/urunlerimiz" },
    { name: language === "tr" ? "Projeler" : "Projects", href: "/projelerimiz" },
    { name: language === "tr" ? "Teknoloji" : "Technology", href: "/faaliyet-alanlari" },
    { name: language === "tr" ? "Hakkımızda" : "About", href: "/hakkimizda" },
  ]

  const theme = sectionContext.theme
  const isDark = theme === "dark"

  const barClass = cn(
    "fixed inset-x-0 top-0 z-[100] h-16 transition-[background] duration-300 ease-out",
    "backdrop-blur-[16px] border-b",
    isDark && "border-[var(--line)]",
    !isDark && "border-[var(--line-dark)]",
    isDark && (scrolled ? "bg-[rgba(1,13,28,0.97)]" : "bg-[rgba(1,13,28,0.85)]"),
    !isDark && "bg-white/90 border-border/60"
  )

  const linkClass = (active: boolean) =>
    cn(
      "relative text-sm font-medium transition-colors duration-200 py-2",
      isDark
        ? active ? "text-white" : "text-white/55 hover:text-white"
        : active ? "text-[var(--tech-blue)]" : "text-foreground/70 hover:text-foreground"
    )

  return (
    <header className={barClass}>
      <div className="flex items-center justify-between gap-6 px-5 sm:px-8 md:pl-12 md:pr-10 lg:pl-16 lg:pr-14 h-16">
        {/* Logo — directive: 36px blue square + activity icon + company name + subtitle */}
        <Link
          href="/"
          className={cn(
            "relative z-10 flex items-center gap-3 shrink-0 transition-opacity hover:opacity-90",
            "ml-0 mr-auto"
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center w-9 h-9 shrink-0 rounded",
              isDark ? "bg-[var(--tech-blue)]" : "bg-[var(--navy)]"
            )}
          >
            <Activity className="h-5 w-5 text-white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </span>
          <span className="hidden sm:flex flex-col">
            <span
              className={cn(
                "font-display font-bold uppercase tracking-tightest text-base",
                isDark ? "text-white" : "text-[var(--navy)]"
              )}
              style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}
            >
              Atak Ulaşım
            </span>
            <span
              className="text-[0.55rem] tracking-[0.08em] text-white/40"
              style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
            >
              {language === "tr" ? "Raylı Sistem Teknolojileri" : "Rail Systems Technologies"}
            </span>
          </span>
          <picture className="block h-10 sm:hidden">
            <img src="/images/no%20background.png" alt="Atak Ulaşım" width={120} height={40} className="h-full w-auto object-contain dark:invert" />
          </picture>
        </Link>

        {/* Desktop nav — directive: IBM Plex Mono 0.65rem uppercase tracking-wide */}
        <nav className="hidden md:flex items-center gap-6 pl-8 pr-4" style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>
          <Link href="/" className={cn(linkClass(pathname === "/"), "text-[0.65rem] uppercase tracking-[0.08em]")}>
            {t.nav.home}
          </Link>
          {directiveNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(linkClass(pathname === item.href), "text-[0.65rem] uppercase tracking-[0.08em]")}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/iletisim"
            className={cn(
              "text-[0.65rem] uppercase tracking-[0.08em] font-medium px-4 py-2 rounded transition-all duration-250",
              "bg-[var(--tech-blue)] text-white hover:bg-[var(--tech-blue-dark)] hover:-translate-y-0.5"
            )}
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* Dil seçici — sağda, hafif vurgulu kutu */}
        <div className="hidden md:flex items-center shrink-0">
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1.5 border",
              isDark ? "border-white/20 bg-white/5" : "border-border bg-muted/80"
            )}
          >
            <Globe className={cn("h-3.5 w-3.5", isDark ? "text-white/60" : "text-primary")} />
            <button
              onClick={() => setLanguage("tr")}
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full transition-colors",
                isDark
                  ? language === "tr" ? "bg-white text-foreground" : "text-white/60 hover:text-white"
                  : language === "tr" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"
              )}
            >
              TR
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full transition-colors",
                isDark
                  ? language === "en" ? "bg-white text-foreground" : "text-white/60 hover:text-white"
                  : language === "en" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"
              )}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobil menü butonu */}
        <button
          type="button"
          className="md:hidden -m-2 p-2 text-foreground"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Menüyü aç"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobil menü — tam ekran, asimetrik içerik */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card shadow-2xl border-l border-border flex flex-col">
            <div className="flex items-center justify-between p-5 pl-6">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <img
                  src="/images/no%20background.png"
                  alt="Atak Ulaşım"
                  width={256}
                  height={256}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                className="-m-2 p-2 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Menüyü kapat"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-auto px-6 pb-8 pt-4">
              <ul className="space-y-0.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block py-3.5 text-base font-medium rounded-lg px-3 -mx-3 transition-colors",
                        pathname === item.href ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-primary" />
                  <button
                    onClick={() => setLanguage("tr")}
                    className={cn(
                      "font-medium px-3 py-2 rounded-lg transition-colors",
                      language === "tr" ? "text-primary bg-primary/10" : "text-muted-foreground"
                    )}
                  >
                    Türkçe
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={cn(
                      "font-medium px-3 py-2 rounded-lg transition-colors",
                      language === "en" ? "text-primary bg-primary/10" : "text-muted-foreground"
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
