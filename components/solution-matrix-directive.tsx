"use client"

import { useRef } from "react"
import Link from "next/link"
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion"
import { LayoutGrid, Shield, Phone, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const FEATURED_CONTENT = {
  tr: {
    title: "Yolcu Bilgilendirme",
    description:
      "Hat, durak ve sefer bilgisini gerçek zamanlı yöneten entegre platform. Metro ve tramvay araçları için anons sistemleri, bilgilendirme ekranları ve sürücü konsolu çözümleri. Yüksek titreşim ve geniş sıcaklık aralığında kesintisiz çalışım.",
    href: "/urunlerimiz",
    tag: "PIS / PAS Çözümleri",
  },
  en: {
    title: "Passenger Information",
    description:
      "Integrated platform that manages line, station and trip information in real time. Announcement systems, information displays and driver console solutions for metro and tram vehicles. Designed for high vibration and wide temperature ranges.",
    href: "/urunlerimiz",
    tag: "PIS / PAS Solutions",
  },
} as const

const CARDS_CONTENT = {
  tr: [
    {
      title: "Güvenlik ve Gözetim",
      description:
        "Endüstriyel CCTV sistemleri. Araç içi ve dışı güvenlik kamerası tasarım, üretim ve bakımı. Titreşim ve geniş sıcaklık aralığına dayanıklı.",
      href: "/urunlerimiz",
      tag: "CCTV & Monitoring",
      icon: Shield,
    },
    {
      title: "İletişim Altyapısı",
      description:
        "IP Anons ve IP İnterkom sistemleri. Sürücü, yolcu ve kontrol merkezi arasında kesintisiz iletişim ve acil haberleşme çözümleri.",
      href: "/urunlerimiz",
      tag: "IP Anons & İnterkom",
      icon: Phone,
    },
  ],
  en: [
    {
      title: "Security and Surveillance",
      description:
        "Industrial CCTV systems. Design, production and maintenance of interior and exterior vehicle cameras. Resistant to vibration and wide temperature ranges.",
      href: "/urunlerimiz",
      tag: "CCTV & Monitoring",
      icon: Shield,
    },
    {
      title: "Communication Infrastructure",
      description:
        "IP announcement and IP intercom systems. Continuous communication and emergency call solutions between driver, passengers and control center.",
      href: "/urunlerimiz",
      tag: "IP Announcement & Intercom",
      icon: Phone,
    },
  ],
} as const

/* ── 3-D tilt card wrapper ── */
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  /* Normalize mouse position → −0.5 to 0.5, then map to rotation degrees */
  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7])
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"])

  const springRX = useSpring(rotateX, { stiffness: 200, damping: 22 })
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 22 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
      {/* Glare overlay */}
      <motion.div
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.09) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
        className="absolute inset-0 rounded-2xl"
        aria-hidden
      />
    </motion.div>
  )
}

export function SolutionMatrixDirective() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const { language } = useLanguage()
  const isEn = language === "en"

  const FEATURED = isEn ? FEATURED_CONTENT.en : FEATURED_CONTENT.tr
  const CARDS = isEn ? CARDS_CONTENT.en : CARDS_CONTENT.tr

  return (
    <section
      ref={ref}
      data-section="solutions"
      data-header-theme="light"
      className="bg-[var(--color-bg-secondary)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--tech-blue)]"
            >
              {isEn ? "Our Solutions" : "Çözümlerimiz"}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="max-w-lg text-[var(--color-text-primary)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(1.625rem, 2.8vw, 2.25rem)",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
              }}
            >
              {isEn ? "Comprehensive Systems for Metro & Tram" : "Metro ve Tramvay için Kapsamlı Sistemler"}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="max-w-sm text-[0.875rem] leading-relaxed text-[var(--color-text-body)] md:text-right"
          >
            {isEn
              ? "Compliant with TSE and ISO standards; meets EN 50155 requirements for harsh railway environments."
              : "TSE ve ISO standartlarına uygun; EN 50155 endüstriyel demiryolu ortamı gereksinimlerini karşılar."}
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {/* Featured card — col-span-2 row-span-2 */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <Link
              href={FEATURED.href}
              className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl bg-[var(--navy-deeper)] p-8 transition-transform duration-300 hover:scale-[1.012] lg:min-h-0"
            >
              {/* Background glows */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 55% at 15% 75%, rgba(0,86,179,0.55) 0%, transparent 65%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 40% at 90% 10%, rgba(91,168,245,0.4) 0%, transparent 60%)",
                }}
              />
              {/* Animated floating orb inside the card */}
              <motion.div
                animate={{ x: [0, 20, -15, 10, 0], y: [0, -25, 15, -10, 0], scale: [1, 1.08, 0.96, 1.04, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-8 top-8 h-48 w-48 rounded-full blur-[60px]"
                style={{ background: "radial-gradient(circle, rgba(91,168,245,0.25) 0%, transparent 70%)" }}
                aria-hidden
              />
              {/* Grid lines */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
                aria-hidden
              />

              <div className="relative z-10 flex flex-1 flex-col">
                <span className="mb-5 inline-flex w-fit items-center rounded-full border border-[#0056b3]/40 bg-[#0056b3]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5ba8f5]">
                  {FEATURED.tag}
                </span>
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(0,86,179,0.22)",
                    border: "1px solid rgba(91,168,245,0.25)",
                  }}
                >
                  <LayoutGrid className="h-7 w-7 text-[#5ba8f5]" strokeWidth={1.5} />
                </div>
                <h3
                  className="mb-4 text-2xl font-bold text-white"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  {FEATURED.title}
                </h3>
                <p className="flex-1 text-[0.9375rem] leading-[1.75] text-white/60">
                  {FEATURED.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#5ba8f5] transition-all duration-200 group-hover:gap-3">
                  {isEn ? "View Products" : "Ürünleri İncele"}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Small cards with 3D tilt */}
          {CARDS.map(({ title, description, icon: Icon, href, tag }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.32 + i * 0.12 }}
              className="relative"
            >
              <TiltCard className="relative h-full">
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-all duration-300 hover:border-[var(--navy)] hover:shadow-[0_8px_32px_rgba(30,58,138,0.1)]"
                >
                  <span className="mb-4 inline-flex w-fit items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                    {tag}
                  </span>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] transition-colors duration-200 group-hover:border-[var(--navy)]/30 group-hover:bg-[var(--navy)]/5">
                    <Icon
                      className="h-5 w-5 text-[var(--color-text-body)] transition-colors duration-200 group-hover:text-[var(--navy)]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="mb-2.5 text-[1.0625rem] font-bold text-[var(--color-text-primary)]">
                    {title}
                  </h3>
                  <p className="flex-1 text-[0.875rem] leading-relaxed text-[var(--color-text-body)]">
                    {description}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[var(--navy)] transition-all duration-200 group-hover:gap-2.5">
                    {isEn ? "More Details" : "Detaylı Bilgi"}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
