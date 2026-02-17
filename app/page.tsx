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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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

      {/* —— 1. Ürünlerimiz — left: text card, right: product photo slider —— */}
      <section
        data-section="products"
        data-header-theme="dark"
        className="min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-stone-100 dark:bg-[#0a0a0a]"
      >
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeInUp amount={0.2} staggerDelay={0} className="order-2 lg:order-1">
              <div className="rounded-2xl border border-stone-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-8 sm:p-10 shadow-xl">
                <p className="text-xs font-medium uppercase tracking-[0.32em] text-stone-500 dark:text-white/60 mb-4">
                  {language === "tr" ? "Teknolojinin Somut Hali" : "Technology in Form"}
                </p>
                <h2 className="text-3xl sm:text-4xl font-light text-[#0f172a] dark:text-white tracking-tight leading-tight mb-6">
                  {language === "tr" ? "Ürünlerimiz" : "Our Products"}
                </h2>
                <p className="text-stone-600 dark:text-white/75 text-sm sm:text-base leading-[1.85] mb-8">
                  {language === "tr"
                    ? "PIS/PAS sistemleri, YBS Panel PC ve CCTV çözümlerimiz EN50155 ve EN50121 standartlarına uygun, raylı sistem ve toplu taşıma için güvenilir mühendislik çıktılarıdır. Yerli tasarım ve Kağıthane üretim hattıyla donanımdan yazılıma uçtan uca kontrol altında."
                    : "Our PIS/PAS systems, YBS Panel PC and CCTV solutions are reliable engineering outputs compliant with EN50155 and EN50121 for rail and public transport. End-to-end control from hardware to software through domestic design and our Kağıthane production line."}
                </p>
                <Link
                  href="/urunlerimiz"
                  className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.18em] uppercase text-[#0f172a] hover:text-stone-700 dark:text-white/90 dark:hover:text-white transition-colors"
                >
                  {language === "tr" ? "Ürünleri Keşfet" : "Explore Products"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeInUp>
            <FadeInUp amount={0.2} staggerDelay={0.08} className="order-1 lg:order-2">
              <div className="relative w-full max-w-md mx-auto">
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                  <CarouselContent className="-ml-2 sm:-ml-4">
                    {[
                      { src: "/images/tramway-showcase.jpg", alt: "PIS/PAS sistemleri" },
                      { src: "/images/tramway-showcase.jpg", alt: "YBS Panel PC" },
                      { src: "/images/tramway-showcase.jpg", alt: "CCTV çözümleri" },
                      { src: "/images/tramway-showcase.jpg", alt: "Raylı sistem ekipmanları" },
                    ].map((slide, i) => (
                      <CarouselItem key={i} className="pl-2 sm:pl-4 basis-full">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-200/80 dark:border-white/10 bg-stone-200 dark:bg-white/5 shadow-lg">
                          <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0 sm:-left-10 top-1/2 -translate-y-1/2 border-stone-200 dark:border-white/20 bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20" />
                  <CarouselNext className="right-0 sm:-right-10 top-1/2 -translate-y-1/2 border-stone-200 dark:border-white/20 bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20" />
                </Carousel>
              </div>
            </FadeInUp>
          </div>
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

      {/* —— 3. Faaliyet Alanlarımız — text on the right in glassy box, image placeholder below —— */}
      <section
        data-section="activity"
        data-header-theme="dark"
        className="min-h-screen flex flex-col justify-center py-20 sm:py-28 bg-stone-100 dark:bg-[#0a0a0a]"
      >
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-stretch">
            <FadeInUp amount={0.2} staggerDelay={0} className="flex justify-end">
              <div className="w-full max-w-xl ml-0 lg:ml-auto rounded-2xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-2xl p-8 sm:p-10 lg:p-12">
                <p className="text-xs font-medium uppercase tracking-[0.32em] text-stone-500 dark:text-white/60 mb-4">
                  {language === "tr" ? "Eko-Sistem Özeti" : "Ecosystem Overview"}
                </p>
                <h2 className="text-3xl sm:text-4xl font-light text-[#0f172a] dark:text-white tracking-tight leading-tight mb-6">
                  {language === "tr" ? "Faaliyet Alanlarımız" : "Our Activity Areas"}
                </h2>
                <p className="text-stone-600 dark:text-white/75 text-sm sm:text-base leading-[1.85] mb-8">
                  {language === "tr"
                    ? "Atak Ulaşım grubu, ulaşımın her noktasında operasyonel gücünü hissettiren entegre bir yapı sunar. Atak Ulaşım ve Elektronik birimi raylı sistem ve toplu taşıma için yerli donanım ve yazılımdan üretime, testten sahaya teslimata tüm süreçleri yönetir. Turizm, Lojistik ve AtakTrans, filo ve Ar-Ge yatırımlarıyla tek çatı altında uçtan uca çözüm ortağı taahhüdünü somutlaştırır."
                    : "The Atak Ulaşım group offers an integrated structure that conveys its operational strength at every point of transport. The Atak Transportation and Electronics unit manages all processes from domestic hardware and software for rail and public transport through production, testing and field delivery. Tourism, Logistics and AtakTrans, fleet and R&D investments embody the commitment to being an end-to-end solution partner under one roof."}
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {ACTIVITY_UNITS.map((u) => (
                    <Link
                      key={u.key}
                      href={u.href}
                      className="text-sm font-medium tracking-[0.12em] uppercase text-stone-600 hover:text-[#0f172a] dark:text-white/70 dark:hover:text-white transition-colors"
                    >
                      {language === "tr" ? u.labelTr : u.labelEn}
                    </Link>
                  ))}
                </div>
              </div>
            </FadeInUp>
            <FadeInUp amount={0.15} staggerDelay={0.1} className="mt-10 lg:mt-12 w-full">
              <div className="relative w-full aspect-[21/9] sm:aspect-[3/1] max-h-[280px] rounded-xl overflow-hidden border border-stone-200/80 dark:border-white/10 bg-slate-200 dark:bg-slate-800/80 flex items-center justify-center">
                <ImageIcon className="w-14 h-14 sm:w-16 sm:h-16 text-stone-400 dark:text-slate-500" />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium tracking-widest uppercase text-stone-500 dark:text-slate-400">
                  {language === "tr" ? "Görsel alanı" : "Image placeholder"}
                </span>
              </div>
            </FadeInUp>
          </div>
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
