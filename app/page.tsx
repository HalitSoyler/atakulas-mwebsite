"use client"

import { use } from "react"
import { HeroSlideshow } from "@/components/hero-slideshow"
import { Footer } from "@/components/footer"
import { FadeInUp } from "@/components/fade-in-up"
import Link from "next/link"
import Image from "next/image"
import { Marquee } from "@/components/ui/marquee"
import { motion } from "framer-motion"
import { ArrowRight, ImageIcon } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
/** public/images/Referances klasöründeki referans logoları (SEO uyumlu alt) */
const referenceLogos = [
  { src: "/images/Referances/ARUS.jpeg", name: "ARUS" },
  { src: "/images/Referances/Bozankaya.jpeg", name: "Bozankaya" },
  { src: "/images/Referances/HRS.jpeg", name: "HRS" },
  { src: "/images/Referances/Kayseri.jpeg", name: "Kayseri" },
  { src: "/images/Referances/Sakaraya.jpeg", name: "Sakaraya" },
  { src: "/images/Referances/SIEMENS.jpeg", name: "SIEMENS" },
  { src: "/images/Referances/THY.jpeg", name: "THY" },
  { src: "/images/Referances/TURASAS.jpeg", name: "TURASAS" },
]

/** 5 ana birim — Faaliyet sayfasına linkler */
const ACTIVITY_UNITS = [
  { key: "elektronik", labelTr: "Atak Ulaşım ve Elektronik", labelEn: "Atak Transportation & Electronics", href: "/faaliyet-alanlari" },
  { key: "turizm", labelTr: "Turizm", labelEn: "Tourism", href: "/faaliyet-alanlari" },
  { key: "lojistik", labelTr: "Lojistik & AtakTrans", labelEn: "Logistics & AtakTrans", href: "/faaliyet-alanlari" },
  { key: "filo", labelTr: "Filo", labelEn: "Fleet", href: "/faaliyet-alanlari" },
  { key: "arge", labelTr: "Ar-Ge", labelEn: "R&D", href: "/faaliyet-alanlari" },
]

type PageProps = { params?: Promise<Record<string, string | string[]>>; searchParams?: Promise<Record<string, string | string[]>> }
export default function HomePage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const { t, language } = useLanguage()

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <HeroSlideshow />

      {/* —— 1. Ürünlerimiz — header blue theme (#0f172a), accent #38bdf8, modern layout —— */}
      <section
        data-section="products"
        data-header-theme="dark"
        className="relative min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-stone-100 dark:bg-[#0f172a] overflow-hidden"
      >
        <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.08),transparent)] pointer-events-none" aria-hidden />
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-12 relative">
          <FadeInUp amount={0.2} staggerDelay={0.06} className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            {/* Left: accent bar + heading block */}
            <div className="lg:w-[280px] shrink-0 mb-8 lg:mb-0">
              <div className="h-1 w-12 rounded-full bg-[#38bdf8] mb-6" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500 dark:text-[#38bdf8] mb-3">
                {language === "tr" ? "Teknolojinin Somut Hali" : "Technology in Form"}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-light text-[#0f172a] dark:text-white tracking-tight leading-tight">
                {language === "tr" ? "Ürünlerimiz" : "Our Products"}
              </h2>
            </div>
            {/* Center: content + list + CTA */}
            <div className="flex-1 min-w-0 space-y-8">
              <div className="prose prose-stone dark:prose-invert prose-p:text-stone-600 dark:prose-p:text-white/80 prose-p:leading-[1.9] max-w-none space-y-5">
                <p className="text-base sm:text-lg">
                  {language === "tr"
                    ? "PIS/PAS sistemleri, YBS Panel PC ve CCTV çözümlerimiz EN50155 ve EN50121 standartlarına uygun, raylı sistem ve toplu taşıma için güvenilir mühendislik çıktılarıdır. Yerli tasarım ve Kağıthane üretim hattıyla donanımdan yazılıma uçtan uca kontrol altında."
                    : "Our PIS/PAS systems, YBS Panel PC and CCTV solutions are reliable engineering outputs compliant with EN50155 and EN50121 for rail and public transport. End-to-end control from hardware to software through domestic design and our Kağıthane production line."}
                </p>
                <p className="text-base sm:text-lg">
                  {language === "tr"
                    ? "Otomatik anons, yolcu ve sürücü bilgilendirme ile güvenlik kamera sistemlerinde donanım, tasarım ve yazılım geliştiriyoruz; metro, tramvay, hafif raylı sistem, otobüs ve metrobüs araçları için uluslararası testleri tamamlayıp sertifikalarımızı aldık. Ürün portföyümüz, tek bir çatı altında entegre çözüm ortağı olma taahhüdünü yansıtır."
                    : "We develop hardware, design and software for automatic announcement, passenger and driver information and security camera systems; we have completed international tests and obtained our certificates for metro, tram, light rail, bus and BRT vehicles. Our product portfolio reflects our commitment to being an integrated solution partner under one roof."}
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:text-base text-stone-600 dark:text-white/75">
                {(
                  language === "tr"
                    ? [
                        "PIS/PAS yolcu bilgilendirme sistemleri",
                        "YBS Panel PC ve sürücü kontrol üniteleri",
                        "IP anons, anfi ve kabin anfisi",
                        "IP Intercom yolcu–sürücü iletişim",
                        "CCTV ve güvenlik kamera altyapısı",
                        "EN50155, EN50121 uyumlu yerli üretim",
                      ]
                    : [
                        "PIS/PAS passenger information systems",
                        "YBS Panel PC and driver control units",
                        "IP announcement, amplifier and cabin amplifier",
                        "IP Intercom passenger–driver communication",
                        "CCTV and security camera infrastructure",
                        "EN50155, EN50121 compliant domestic production",
                      ]
                ).map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/urunlerimiz"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.18em] uppercase text-[#0f172a] hover:text-[#0c4a6e] dark:text-[#38bdf8] dark:hover:text-[#7dd3fc] transition-colors"
              >
                {language === "tr" ? "Ürünleri Keşfet" : "Explore Products"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Right: product thumbnails strip — discrete */}
            <div className="lg:w-[140px] shrink-0 flex lg:flex-col flex-wrap justify-center gap-2 sm:gap-2.5 pt-8 lg:pt-0">
              {[
                { src: "/images/products/anons.jpg", alt: "IP Amfi" },
                { src: "/images/products/IPanons.jpg", alt: "IP Anons" },
                { src: "/images/products/amfi.jpeg", alt: "Anfi" },
                { src: "/images/products/kabinanfi.jpeg", alt: "Kabin anfisi" },
              ].map((img, i) => (
                <div
                  key={i}
                  className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-[#1e293b] border border-stone-200/80 dark:border-[#38bdf8]/20"
                >
                  <Image src={img.src} alt={img.alt} fill className="object-contain" sizes="56px" />
                  <span className="absolute inset-0 pointer-events-none rounded-lg bg-stone-100 dark:bg-[#0f172a] mix-blend-soft-light opacity-30 dark:opacity-25" aria-hidden />
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* —— 2. Projelerimiz — full-width bg, hero copy, fade-in-up —— */}
      <section
        data-section="projects"
        data-header-theme="dark"
        className="relative min-h-screen flex flex-col justify-center py-32 sm:py-40"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/tramway-showcase.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative mx-auto max-w-3xl px-8 lg:px-12 text-center">
          <FadeInUp amount={0.12} staggerDelay={0.1}>
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-white/60 mb-8" >
              {language === "tr" ? "Hayata Geçen Vizyonlar" : "Visions Realized"}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-10" >
              {language === "tr" ? "Projelerimiz" : "Our Projects"}
            </h2>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-12" >
              {language === "tr" ? "Çalışma Felsefemiz" : "Our Working Philosophy"}
            </p>
            <p className="text-lg sm:text-xl text-white/85 leading-[1.9] max-w-2xl mx-auto mb-16" >
              {language === "tr"
                ? "Projelerimizi, fizibiliteden teslimata kadar titiz bir mühendislik disipliniyle yürütüyoruz. EN50155, EN50121 ve ilgili Avrupa standartlarına tam uyum, tasarım kararlarından saha devreye almaya kadar her aşamada önceliğimizdir. Müşteri kabul kriterleri proje başında netleştirilir; laboratuvar ve saha testleriyle doğrulanan çözümler, raylı sistem ve toplu taşıma operatörlerinin güvenilir altyapısına dönüşür. Bu vizyon, sadece cihaz teslimi değil, uzun ömürlü ve bakım dostu sistemlerle sürdürülebilir bir ortaklık kurmaktır."
                : "We run our projects with rigorous engineering discipline from feasibility to delivery. Full compliance with EN50155, EN50121 and related European standards is our priority at every stage from design decisions to site commissioning. Customer acceptance criteria are defined at project start; solutions validated through laboratory and field tests become the reliable infrastructure of rail and public transport operators. This vision is not merely equipment delivery but building a sustainable partnership through long-life, maintenance-friendly systems."}
            </p>
            <Link
              href="/projelerimiz"
              className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.2em] uppercase text-white hover:text-white/90 transition-colors"
            >
              {language === "tr" ? "Projeleri İncele" : "Explore Projects"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* —— 3. Faaliyet Alanlarımız — header blue theme (#0f172a), accent #38bdf8, modern layout —— */}
      <section
        data-section="activity"
        data-header-theme="dark"
        className="relative min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-stone-100 dark:bg-[#0f172a] overflow-hidden"
      >
        <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_70%_60%_at_80%_50%,rgba(56,189,248,0.06),transparent)] pointer-events-none" aria-hidden />
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-12 relative">
          <FadeInUp amount={0.2} staggerDelay={0.06} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: title block with accent */}
            <div className="lg:col-span-5">
              <div className="h-1 w-12 rounded-full bg-[#38bdf8] mb-6" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500 dark:text-[#38bdf8] mb-3">
                {language === "tr" ? "Eko-Sistem Özeti" : "Ecosystem Overview"}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-light text-[#0f172a] dark:text-white tracking-tight leading-tight mb-8">
                {language === "tr" ? "Faaliyet Alanlarımız" : "Our Activity Areas"}
              </h2>
              <p className="text-stone-600 dark:text-white/80 text-sm sm:text-base leading-[1.85]">
                {language === "tr"
                  ? "Atak Ulaşım grubu, ulaşımın her noktasında operasyonel gücünü hissettiren entegre bir yapı sunar. Atak Ulaşım ve Elektronik birimi raylı sistem ve toplu taşıma için yerli donanım ve yazılımdan üretime, testten sahaya teslimata tüm süreçleri yönetir."
                  : "The Atak Ulaşım group offers an integrated structure that conveys its operational strength at every point of transport. The Atak Transportation and Electronics unit manages all processes from domestic hardware and software for rail and public transport through production, testing and field delivery."}
              </p>
            </div>
            {/* Right: unit pills + optional visual */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <p className="text-stone-600 dark:text-white/75 text-sm sm:text-base">
                {language === "tr"
                  ? "Turizm, Lojistik ve AtakTrans, filo ve Ar-Ge yatırımlarıyla tek çatı altında uçtan uca çözüm ortağı taahhüdünü somutlaştırır."
                  : "Tourism, Logistics and AtakTrans, fleet and R&D investments embody the commitment to being an end-to-end solution partner under one roof."}
              </p>
              <div className="flex flex-wrap gap-3">
                {ACTIVITY_UNITS.map((u) => (
                  <Link
                    key={u.key}
                    href={u.href}
                    className="inline-flex items-center gap-2 rounded-full border border-stone-200 dark:border-[#38bdf8]/30 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-sm px-5 py-2.5 text-sm font-medium tracking-[0.08em] uppercase text-stone-700 hover:text-[#0f172a] dark:text-white/90 dark:hover:text-white dark:hover:border-[#38bdf8]/50 transition-all hover:shadow-lg hover:shadow-[#38bdf8]/5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shrink-0" />
                    {language === "tr" ? u.labelTr : u.labelEn}
                  </Link>
                ))}
              </div>
              <div className="relative w-full aspect-[21/9] sm:aspect-[3/1] max-h-[200px] rounded-xl overflow-hidden border border-stone-200/80 dark:border-[#38bdf8]/20 bg-stone-200/50 dark:bg-[#1e293b]/50 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 sm:w-14 sm:h-14 text-stone-400 dark:text-[#38bdf8]/40" />
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-widest uppercase text-stone-500 dark:text-white/40">
                  {language === "tr" ? "Görsel alanı" : "Image placeholder"}
                </span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* —— 4. Elektrikli Otobüs (light option — light by default, dark variants) —— */}
      <section
        data-section="electric-bus"
        data-header-theme="light"
        className="relative min-h-screen flex flex-col justify-center py-32 sm:py-40 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50/95 to-white dark:from-[#0f172a] dark:via-slate-900 dark:to-[#0f172a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_30%,rgba(16,185,129,0.04),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_70%_30%,rgba(16,185,129,0.06),transparent)]" />
        <LeafFloat />

        <div className="relative mx-auto max-w-6xl w-full px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeInUp amount={0.15} staggerDelay={0.08} className="order-2 lg:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500 dark:text-stone-400 mb-8" >
              {language === "tr" ? "Yenilikçi & Doğa Dostu" : "Innovative & Eco-Friendly"}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#0a0a0a] dark:text-white tracking-tight leading-tight mb-10" >
              {language === "tr" ? "Elektrikli Otobüs Dönüşümü" : "Electric Bus Conversion"}
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-[1.9] mb-12" >
              {language === "tr"
                ? "Dizel otobüslerin elektrikli tahrik sistemine dönüştürülmesi, Atak Ulaşım'ın sürdürülebilir ulaşım vizyonunun somut adımıdır. Karbon ayak izini azaltan, yerel hava kalitesine katkı sunan ve operatör maliyetlerini uzun vadede düşüren bu proje, sadece teknolojik bir yükseltme değil; geleceğe yatırımdır. Batarya yönetimi, güç elektroniği ve araç üstü entegrasyonu konusundaki mühendislik birikimimiz, dönüşümün güvenilir ve ölçeklenebilir olmasını sağlar."
                : "Converting diesel buses to electric propulsion is a concrete step in Atak Ulaşım's sustainable transport vision. This project reduces carbon footprint, improves local air quality and lowers operator costs in the long term—it is not only a technological upgrade but an investment in the future. Our engineering expertise in battery management, power electronics and on-vehicle integration ensures the conversion is reliable and scalable."}
            </p>
            <Link
              href="/hizmetler/elektrikli-otobus"
              className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.2em] uppercase text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white transition-colors"
            >
              {language === "tr" ? "Projeyi İncele" : "Explore Project"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeInUp>
          <FadeInUp amount={0.12} staggerDelay={0.15} className="relative aspect-[4/3] rounded-sm overflow-hidden border border-stone-200/80 dark:border-white/10 bg-stone-100/50 dark:bg-white/5 order-1 lg:order-2">
            <div className="absolute inset-0 flex items-center justify-center text-stone-400 dark:text-stone-500 text-sm font-medium tracking-wider" >
              {language === "tr" ? "Elektrikli otobüs görseli" : "Electric bus image"}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Referanslar — premium whitespace, fade-in-up */}
      <section
        data-section="references"
        data-header-theme="light"
        className="py-24 sm:py-32 bg-white dark:bg-[#0f172a]"
      >
        <div className="mx-auto max-w-6xl px-8 lg:px-12">
          <FadeInUp amount={0.2} className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.28em] text-stone-500 dark:text-stone-400 mb-4" >
              {t.clients.title}
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-[#0a0a0a] dark:text-white tracking-tight" >
              {language === "tr" ? "Çözüm Ortaklarımız" : "Our Solution Partners"}
            </h2>
          </FadeInUp>
          <div className="relative">
            <Marquee duration={40} pauseOnHover className="py-4">
              {referenceLogos.map((ref) => (
                <div
                  key={ref.name}
                  className="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/30 px-4"
                >
                  <Image
                    src={ref.src}
                    alt={`Atak Ulaşım - ${ref.name}`}
                    width={120}
                    height={56}
                    className="object-contain max-h-14 w-auto"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Footer — DOKUNMA */}
      <div data-section="footer" data-header-theme="muted">
        <Footer />
      </div>
    </main>
  )
}

/** Soft sallanan yaprak / doğa efekti — yeşil enerji hissi */
function LeafFloat() {
  return (
    <>
      <motion.div
        className="absolute w-32 h-32 sm:w-48 sm:h-48 opacity-[0.07] dark:opacity-[0.08] pointer-events-none"
        style={{ top: "15%", right: "10%" }}
        animate={{
          rotate: [0, 5, -3, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-600 dark:text-emerald-400">
          <path d="M50 5 C20 30 10 60 50 95 C80 60 90 30 50 5Z" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute w-24 h-24 sm:w-36 sm:h-36 opacity-[0.06] dark:opacity-[0.07] pointer-events-none"
        style={{ bottom: "25%", left: "8%" }}
        animate={{
          rotate: [0, -4, 6, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-teal-600 dark:text-teal-400">
          <path d="M50 5 C20 30 10 60 50 95 C80 60 90 30 50 5Z" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute w-20 h-20 sm:w-28 sm:h-28 opacity-[0.05] dark:opacity-[0.06] pointer-events-none"
        style={{ top: "40%", left: "15%" }}
        animate={{
          rotate: [0, 3, -2, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-500 dark:text-emerald-400">
          <path d="M50 5 C20 30 10 60 50 95 C80 60 90 30 50 5Z" fill="currentColor" />
        </svg>
      </motion.div>
    </>
  )
}
