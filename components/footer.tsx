"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { DOCK_SOCIAL } from "@/components/dock"

export function Footer() {
  const { t, language } = useLanguage()

  const footerLinks = {
    quick: [
      { name: language === "tr" ? "Ana Sayfa" : "Home", href: "/" },
      { name: t.nav.about, href: "/hakkimizda" },
      { name: t.nav.products, href: "/urunlerimiz" },
      { name: t.nav.projects, href: "/projelerimiz" },
      { name: t.nav.contact, href: "/iletisim" },
    ],
    services: [
      { name: language === "tr" ? "Raylı Sistem Ekipmanları" : "Rail System Equipment", href: "/urunlerimiz" },
      { name: t.nav.electricBus, href: "/hizmetler/elektrikli-otobus" },
      { name: language === "tr" ? "CCTV Sistemleri" : "CCTV Systems", href: "/urunlerimiz" },
      { name: language === "tr" ? "Bakım Hizmetleri" : "Maintenance Services", href: "/faaliyet-alanlari" },
    ],
    legal: [
      { name: t.footer.privacy, href: "#" },
      { name: t.footer.terms, href: "#" },
      { name: t.footer.kvkk, href: "#" },
    ],
  }

  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Logo + açıklama */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/Logos/svg_files/header_250x100.svg"
                alt="Atak Ulaşım"
                width={250}
                height={100}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{t.footer.description}</p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              {language === "tr" ? "Hızlı Linkler" : "Quick Links"}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.quick.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hizmetlerimiz */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              {t.footer.services}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim + sosyal ikonlar */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              {t.footer.contact}
            </h3>
            <address className="mt-4 not-italic text-sm text-white/60 space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-white/90">{t.footer.headquarters}</p>
                  <p>Çamlıca Mah. Timko Sok. P4 No:1</p>
                  <p>Yenimahalle / ANKARA</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-white/90">{t.footer.branch}</p>
                  <p>Kayseri Teknopark</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+903123874437" className="hover:text-white transition-colors">
                  0312 387 44 37
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:info@atakulasim.com" className="hover:text-white transition-colors">
                  info@atakulasim.com
                </a>
              </div>
            </address>
            <div className="mt-6 flex gap-3">
              {Object.values(DOCK_SOCIAL).map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Alt çizgi: telif + yasal */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Atak Ulaşım Ltd. Şti. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
