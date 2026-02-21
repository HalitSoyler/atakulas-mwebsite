"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import React, { useRef } from "react"
import { cn } from "@/lib/utils"

/** Matches EN 50155, EN 50121 (with space), EN50155, EN50121, 3D, EMC, etc. Longer phrases first. */
const TECHNICAL_TERMS_REGEX = /(EN 50155|EN 50121|EN50155|EN50121|EMC\/EMI|EMC|EMI|IEC|3D|PCB|SCADA|OTA)/gi

/** Wraps technical terms in bold electric blue spans for stronger technical emphasis */
function highlightTerms(text: string): React.ReactNode {
  const parts = text.split(TECHNICAL_TERMS_REGEX)
  const matches = text.match(TECHNICAL_TERMS_REGEX) || []
  const result: React.ReactNode[] = []
  parts.forEach((part, i) => {
    if (part) result.push(part)
    if (matches[i]) {
      result.push(
        <span key={`term-${i}`} className="text-[#38bdf8]/90 font-bold">
          {matches[i]}
        </span>
      )
    }
  })
  return result.length > 0 ? result : text
}

type Step = {
  id: string
  badge: { tr: string; en: string }
  title: { tr: string; en: string }
  body: { tr: string; en: string }
  imageTheme: "industrial" | "pcb" | "laboratory"
  layout: "image-left" | "image-right"
  /** When set, use this image instead of placeholder (e.g. for Mimari Tasarım card) */
  image?: { src: string; alt: string }
}

const STEPS: Step[] = [
  {
    id: "engineering",
    badge: { tr: "Mühendislik Analizi", en: "Engineering Analysis" },
    title: { tr: "Mimari Tasarım ve Simülasyon", en: "Architectural Design & Simulation" },
    body: {
      tr: "Raylı sistemler ve otobüs dönüşüm projelerinde EN 50155, EN 50121 ve ilgili Avrupa standartlarına tam uyumlu mimari tasarım süreçlerimizi yürütüyoruz. Fizibilite aşamasından itibaren 3D modelleme, termal simülasyon ve elektromanyetik uyumluluk (EMC) analizleri ile kritik kararlar alınıyor. Sistem entegrasyonu öncesinde sanal ortamda doğrulama yapılarak maliyet ve risk minimize edilir.",
      en: "We conduct architectural design processes fully compliant with EN 50155, EN 50121 and related European standards for rail systems and bus conversion projects. From the feasibility stage, critical decisions are made through 3D modeling, thermal simulation and electromagnetic compatibility (EMC) analyses. Virtual validation before system integration minimizes cost and risk.",
    },
    imageTheme: "industrial",
    layout: "image-left",
    image: { src: "/images/Faaliyet/1.foto.jpeg", alt: "Atak Ulaşım - İleri Seviye Mühendislik ve Simülasyon Süreçleri" },
  },
  {
    id: "production",
    badge: { tr: "Yerli Üretim", en: "Domestic Production" },
    title: { tr: "Ar-Ge Merkezi ve Uçtan Uca Üretim", en: "R&D Center & End-to-End Production" },
    body: {
      tr: "Kağıthane Ar-Ge merkezimizde yüksek dayanımlı PCB tasarımları, askeri standartlarda kablolama disiplini ve uçtan uca üretim kapasitemiz bir mühendislik başarısı olarak öne çıkar. Yerli tasarım ve montaj ile tedarik zinciri kontrolü sağlanır. Kabin montajından son ürün testine kadar tüm süreçler dokümante edilir ve izlenebilir kılınır.",
      en: "At our Kağıthane R&D center, rugged PCB designs, military-grade cabling discipline and end-to-end production capacity stand out as an engineering achievement. Domestic design and assembly ensure supply chain control. All processes from cabinet assembly to final product testing are documented and made traceable.",
    },
    imageTheme: "pcb",
    layout: "image-right",
  },
  {
    id: "certification",
    badge: { tr: "Uluslararası Standartlar", en: "International Standards" },
    title: { tr: "Sertifikasyon ve Kabul Süreçleri", en: "Certification & Acceptance" },
    body: {
      tr: "EN50121 gibi uluslararası demiryolu standartlarına göre laboratuvar testleri, saha devreye alma protokollerini ve kabul süreçlerindeki titizliğimizi vurguluyoruz. EMC/EMI, titreşim, sıcaklık ve yangın davranışı testleri akredite laboratuvarlarda gerçekleştirilir. Müşteri kabul kriterleri önceden tanımlanır ve proje boyunca şeffaf bir şekilde takip edilir.",
      en: "We emphasize laboratory testing per international rail standards such as EN50121, commissioning protocols and rigor in acceptance processes. EMC/EMI, vibration, temperature and fire behavior tests are conducted in accredited laboratories. Customer acceptance criteria are defined in advance and tracked transparently throughout the project.",
    },
    imageTheme: "laboratory",
    layout: "image-left",
  },
]

function PlaceholderImageWithLang({
  theme,
  language,
}: {
  theme: Step["imageTheme"]
  language: "tr" | "en"
}) {
  const themes = {
    industrial: {
      gradient: "from-slate-700/90 via-slate-800/95 to-slate-900",
      label: { tr: "Endüstriyel Mühendislik", en: "Industrial Engineering" },
      icon: (
        <svg className="w-16 h-16 text-[#38bdf8]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
    pcb: {
      gradient: "from-emerald-900/80 via-slate-800/90 to-slate-900",
      label: { tr: "PCB Üretimi", en: "PCB Production" },
      icon: (
        <svg className="w-16 h-16 text-[#38bdf8]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    laboratory: {
      gradient: "from-blue-900/80 via-slate-800/90 to-slate-900",
      label: { tr: "Laboratuvar Testleri", en: "Laboratory Testing" },
      icon: (
        <svg className="w-16 h-16 text-[#38bdf8]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  }
  const t = themes[theme]
  return (
    <div className={cn("relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br", t.gradient)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
        {t.icon}
      </div>
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />
      <div className="absolute bottom-3 left-3 right-3 text-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8]/70">
          {language === "tr" ? t.label.tr : t.label.en}
        </span>
      </div>
    </div>
  )
}

export function IndustrialEditorialFlow({ language = "tr" }: { language?: "tr" | "en" }) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const lineFillProgress = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0.33, 0.66, 1, 1])

  return (
    <section
      ref={sectionRef}
      data-section="standards"
      data-header-theme="muted"
      className="relative py-24 sm:py-32 overflow-hidden bg-stone-100 dark:bg-[#0f172a]"
    >
      {/* Large step numbers in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="absolute text-[clamp(8rem,20vw,16rem)] font-mono font-bold text-stone-300 dark:text-white/[0.03] tracking-tighter"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              top: n === 1 ? "10%" : n === 2 ? "45%" : "80%",
              lineHeight: 0.9,
            }}
          >
            {String(n).padStart(2, "0")}
          </div>
        ))}
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 lg:pl-20">
        {/* Connection line — vertical, left column, fills on scroll */}
        <div className="hidden lg:block absolute left-8 top-48 bottom-32 w-px bg-[#38bdf8]/15">
          <motion.div
            className="absolute inset-x-0 top-0 w-full bg-[#38bdf8]/60 origin-top"
            style={{
              scaleY: lineFillProgress,
              height: "100%",
            }}
          />
        </div>

        {/* Section header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#38bdf8] mb-2">
            {language === "tr" ? "STANDARTLAR" : "STANDARDS"}
          </p>
          <h2 className="font-mono text-2xl sm:text-3xl font-semibold text-[#0f172a] dark:text-white tracking-wide max-w-2xl mx-auto">
            {language === "tr"
              ? "Atak Ulaşım Dönüşüm Standartları"
              : "Atak Ulaşım Transformation Standards"}
          </h2>
          <p className="mt-4 text-sm text-stone-600 dark:text-white/60 max-w-xl mx-auto">
            {language === "tr"
              ? "Projeler; fizibilite, üretim ve sertifikasyon adımlarının tamamının izlendiği şeffaf bir dönüşüm süreci ile yönetilir."
              : "Projects are managed through a transparent transformation process covering feasibility, production and certification steps end to end."}
          </p>
        </motion.div>

        {/* Steps — Z-pattern editorial */}
        <div className="space-y-24 sm:space-y-32">
          {STEPS.map((step, index) => (
            <StepBlock
              key={step.id}
              step={step}
              index={index}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepBlock({
  step,
  index,
  language,
}: {
  step: Step
  index: number
  language: "tr" | "en"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const badge = language === "tr" ? step.badge.tr : step.badge.en
  const title = language === "tr" ? step.title.tr : step.title.en
  const body = language === "tr" ? step.body.tr : step.body.en

  const isImageLeft = step.layout === "image-left"
  const imageEl = (
    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800">
      {step.image ? (
        <Image
          src={step.image.src}
          alt={step.image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      ) : (
        <PlaceholderImageWithLang theme={step.imageTheme} language={language} />
      )}
    </div>
  )
  const contentEl = (
    <div className="flex flex-col justify-center">
      <motion.span
        className="inline-flex items-center gap-2 w-fit rounded border border-[#38bdf8]/40 bg-[#38bdf8]/10 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#38bdf8] mb-4"
        initial={{ opacity: 0, x: isImageLeft ? -20 : 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
        {badge}
      </motion.span>
      <motion.h3
        className="text-xl sm:text-2xl font-semibold text-[#0f172a] dark:text-white font-mono tracking-wide mb-4"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className={cn(
          "text-sm sm:text-base text-stone-600 dark:text-white/75",
          step.id === "engineering" ? "leading-loose" : "leading-relaxed"
        )}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {highlightTerms(body)}
      </motion.p>
    </div>
  )

  return (
    <div ref={ref} className="relative pl-0 lg:pl-0">
      {/* Connection dot on timeline */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#38bdf8]/50 bg-stone-100 dark:bg-[#0f172a] z-10" />

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {isImageLeft ? (
          <>
            <div className="order-1">{imageEl}</div>
            <div className="order-2">{contentEl}</div>
          </>
        ) : (
          <>
            <div className="order-1 lg:order-2">{contentEl}</div>
            <div className="order-2 lg:order-1">{imageEl}</div>
          </>
        )}
      </div>
    </div>
  )
}
