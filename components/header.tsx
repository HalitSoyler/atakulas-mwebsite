"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Globe } from "lucide-react"
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
    const handleScroll = () => setScrolled(window.scrollY > 24)
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

  const theme = sectionContext.theme
  const isDark = theme === "dark"

  const barClass = cn(
    "fixed inset-x-0 top-0 z-50 transition-all duration-300",
    "backdrop-blur-xl",
    scrolled && "shadow-lg shadow-black/5",
    isDark && "bg-foreground/88 border-b border-white/10",
    !isDark && "bg-white/90 border-b border-border/60"
  )

  const linkClass = (active: boolean) =>
    cn(
      "relative text-sm font-medium transition-colors py-2",
      isDark
        ? active ? "text-white" : "text-white/70 hover:text-white"
        : active ? "text-primary" : "text-foreground/70 hover:text-primary"
    )

  return (
    <header className={barClass}>
      {/* Asimetrik layout: sol boşluk fazla, nav orta-sağa kayık, dil sağda vurgulu */}
      <div className="flex items-center justify-between gap-6 px-5 sm:px-8 md:pl-12 md:pr-10 lg:pl-16 lg:pr-14 py-3">
        {/* Logo — sola yaslı, max-width yok */}
        <Link
          href="/"
          className={cn(
            "relative z-10 flex items-center shrink-0 transition-opacity hover:opacity-90",
            "ml-0 mr-auto"
          )}
        >
          <picture className="block h-12 sm:h-14 md:h-16">
            <source
              srcSet="/images/no%20background.png"
              media="(max-width: 767px)"
              type="image/png"
            />
            <img
              src="/images/no%20background.png"
              alt="Atak Ulaşım"
              width={250}
              height={100}
              className="h-full w-auto"
            />
          </picture>
        </Link>

        {/* Desktop nav — asimetrik: ortadan sağa doğru, eşit olmayan boşluklar */}
        <nav className="hidden lg:flex items-center gap-1 pl-8 pr-6">
          <Link href="/" className={cn(linkClass(pathname === "/"), "pl-2")}>
            {t.nav.home}
          </Link>
          <span className="w-px h-4 bg-current opacity-20" aria-hidden />
          <Link href="/hakkimizda" className={cn(linkClass(pathname === "/hakkimizda"), "pl-3")}>
            {t.nav.about}
          </Link>
          <Link href="/urunlerimiz" className={cn(linkClass(pathname === "/urunlerimiz"), "pl-4")}>
            {t.nav.products}
          </Link>
          <Link href="/projelerimiz" className={cn(linkClass(pathname === "/projelerimiz"), "pl-2")}>
            {t.nav.projects}
          </Link>
          <Link href="/faaliyet-alanlari" className={cn(linkClass(pathname === "/faaliyet-alanlari"), "pl-4")}>
            {t.nav.activityAreas}
          </Link>
          <Link href="/hizmetler/elektrikli-otobus" className={cn(linkClass(pathname === "/hizmetler/elektrikli-otobus"), "pl-4")}>
            {t.nav.electricBus}
          </Link>
          <span className="w-px h-4 bg-current opacity-20 ml-1" aria-hidden />
          <Link href="/iletisim" className={cn(linkClass(pathname === "/iletisim"), "pl-3")}>
            {t.nav.contact}
          </Link>
        </nav>

        {/* Dil seçici — sağda, hafif vurgulu kutu */}
        <div className="hidden lg:flex items-center shrink-0">
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
          className="lg:hidden -m-2 p-2 text-foreground"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Menüyü aç"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobil menü — tam ekran, asimetrik içerik */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
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
