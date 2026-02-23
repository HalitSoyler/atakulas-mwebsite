"use client"

import Link from "next/link"
import { ArrowRight, Phone, Mail } from "lucide-react"

export function CtaDirective() {
  return (
    <section
      data-section="cta"
      data-header-theme="light"
      className="border-t border-[var(--gray-100)] bg-white py-[clamp(4rem,8vw,6rem)]"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
          {/* Left */}
          <div className="sr sr--left">
            <p
              className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[var(--tech-blue)]"
              style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
            >
              Çözüm Ortaklığı
            </p>
            <h2
              className="mb-6 font-display text-[var(--navy-dark)] uppercase leading-tight"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Projenizi Birlikte Şekillendirelim.
            </h2>
            <p className="max-w-lg text-base leading-[1.8] text-[var(--gray-500)]" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}>
              Ürün sunmakla yetinmiyoruz. Projenizin gereksinimlerini, sahaya özgü koşullarını ve uzun vadeli bakım ihtiyacını anlayan, uçtan uca bir çözüm ortağıyız.
            </p>
          </div>

          {/* Right: CTA button + contact */}
          <div className="sr sr--right">
            <Link
              href="/iletisim"
              className="flex w-full items-center justify-center gap-2 rounded bg-[var(--tech-blue)] px-6 py-4 text-sm font-medium text-white transition-all duration-250 hover:bg-[var(--tech-blue-dark)] hover:-translate-y-0.5"
            >
              Teknik Görüşme Talep Edin
              <ArrowRight className="h-4 w-4 transition-transform duration-250 group-hover:translate-x-1" />
            </Link>
            <div className="mt-6 border-t border-[var(--gray-200)] pt-6">
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+903123874437"
                  className="flex items-center gap-3 text-sm text-[var(--gray-600)] transition-colors hover:text-[var(--navy)]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[var(--gray-400)]" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  0312 387 44 37
                </a>
                <a
                  href="mailto:info@atakulasim.com"
                  className="flex items-center gap-3 text-sm text-[var(--gray-600)] transition-colors hover:text-[var(--navy)]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[var(--gray-400)]" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  info@atakulasim.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
