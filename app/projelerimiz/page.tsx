"use client"

import React, { use } from "react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { PageHeroIndustrial } from "@/components/page-hero-industrial"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MapPin, Calendar, ArrowRight, ImageIcon } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

/** Slate-style placeholder for project photo 1, 2, or 3 */
function SlatePhoto({ number }: { number: 1 | 2 | 3 }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-700 dark:bg-slate-800 border border-slate-600/50 dark:border-slate-600/30 shadow-xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
        <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16" />
        <span className="text-sm font-medium tracking-widest">FOTOĞRAF {number}</span>
      </div>
    </div>
  )
}

const PROJECTS = [
  {
    id: "metro-tramvay",
    slug: "metro-tramvay",
    photo: 1 as const,
    categoryTr: "Raylı Sistemler",
    categoryEn: "Rail Systems",
    titleTr: "Metro ve Tramvay Yolcu Bilgilendirme Sistemleri",
    titleEn: "Metro and Tram Passenger Information Systems",
    locationTr: "Türkiye Geneli",
    locationEn: "Turkey-wide",
    year: "2019–2024",
    clientTr: "Çeşitli belediyeler ve raylı sistem operatörleri",
    clientEn: "Various municipalities and rail system operators",
    paragraphsTr: [
      "Metro ve tramvay hatlarında yolcu bilgilendirme sistemleri (PIS), sadece durakları ve hat bilgisini göstermekle kalmaz; operatörün anonsları, acil durum mesajları ve reklam içeriklerini tek bir ağ üzerinden yönetebilmesini sağlar. Atak Ulaşım olarak, EN 50155 ve EN 50121 standartlarına uygun tasarladığımız sürücü kontrol üniteleri, amfi sistemleri ve LED panel çözümleri, Türkiye genelinde onlarca metro ve tramvay aracında kesintisiz çalışmaktadır.",
      "Projeler fizibilite aşamasından sahada devreye almaya kadar tek elden yürütülür. Termal simülasyon, EMC analizi ve titreşim testleri, Kağıthane Ar-Ge merkezimizde ve akredite laboratuvarlarda gerçekleştirilir. Müşteri kabul kriterleri proje başında netleştirilir; teslimat sonrası eğitim ve teknik destek ile uzun ömürlü bir ortaklık hedeflenir.",
      "Yerli tasarım ve üretim sayesinde yedek parça ve güncelleme süreçleri hızlı yönetilir. Raylı sistem araçlarının zorlu çalışma koşullarına dayanıklı, bakımı kolay ve ölçeklenebilir çözümler sunuyoruz.",
    ],
    paragraphsEn: [
      "On metro and tram lines, passenger information systems (PIS) do more than display stops and line information; they allow the operator to manage announcements, emergency messages and advertising content over a single network. Atak Ulaşım’s driver control units, amplifier systems and LED panel solutions, designed in compliance with EN 50155 and EN 50121, operate without interruption on dozens of metro and tram vehicles across Turkey.",
      "Projects are run single-handedly from the feasibility phase through to site commissioning. Thermal simulation, EMC analysis and vibration tests are carried out at our Kağıthane R&D center and in accredited laboratories. Customer acceptance criteria are defined at project start; post-delivery training and technical support aim at a long-term partnership.",
      "Thanks to domestic design and production, spare parts and updates are managed quickly. We deliver solutions that are resilient to the harsh operating conditions of rail vehicles, easy to maintain and scalable.",
    ],
  },
  {
    id: "elektrikli-otobus",
    slug: "elektrikli-otobus",
    photo: 2 as const,
    categoryTr: "Sürdürülebilir Ulaşım",
    categoryEn: "Sustainable Transport",
    titleTr: "Elektrikli Otobüs Dönüşüm Projesi",
    titleEn: "Electric Bus Conversion Project",
    locationTr: "Ankara",
    locationEn: "Ankara",
    year: "2024",
    clientTr: "Ankara EGO ve belediyeler",
    clientEn: "Ankara EGO and municipalities",
    paragraphsTr: [
      "Dizel otobüslerin elektrikli tahrik sistemine dönüştürülmesi, hem karbon ayak izini azaltan hem de operatör maliyetlerini uzun vadede düşüren stratejik bir adımdır. Atak Ulaşım, batarya yönetimi, güç elektroniği ve araç üstü entegrasyon konusundaki mühendislik birikimini bu alanda da devreye sokarak pilot dönüşüm projeleri yürütmektedir.",
      "Dönüşüm süreci mevcut aracın teknik analizi, uygun batarya ve motor seçimi, güvenlik ve sertifikasyon adımlarını kapsar. EN 50155 ve ilgili standartlara uygun tasarım, araç ömrünü ve güvenilirliğini korur. Pilot uygulamalarla elde edilen veriler, filo genelinde ölçeklendirilebilir bir model sunar.",
      "Belediyelerin mevcut filolarını ekonomik ve çevre dostu bir şekilde elektrikli ulaşıma geçirmesine destek vermek, sürdürülebilir ulaşım vizyonumuzun somut çıktısıdır.",
    ],
    paragraphsEn: [
      "Converting diesel buses to electric propulsion is a strategic step that both reduces carbon footprint and lowers operator costs in the long term. Atak Ulaşım is running pilot conversion projects by deploying its engineering expertise in battery management, power electronics and on-board integration.",
      "The conversion process covers technical analysis of the existing vehicle, selection of suitable battery and motor, and safety and certification steps. Design compliant with EN 50155 and related standards preserves vehicle life and reliability. Data from pilot applications provide a model that can be scaled across the fleet.",
      "Supporting municipalities in transitioning their existing fleets to electric transport in an economical and environmentally friendly way is a concrete outcome of our sustainable transport vision.",
    ],
  },
  {
    id: "istanbul-van-mobil",
    slug: "istanbul-mobil",
    photo: 3 as const,
    categoryTr: "Toplu Taşıma Sistemleri",
    categoryEn: "Public Transport Systems",
    titleTr: "İstanbul ve Van Mobil Otobüs Sistemleri",
    titleEn: "Istanbul and Van Mobile Bus Systems",
    locationTr: "İstanbul, Van",
    locationEn: "Istanbul, Van",
    year: "2020–2024",
    clientTr: "IETT, Van Büyükşehir Belediyesi",
    clientEn: "IETT, Van Metropolitan Municipality",
    paragraphsTr: [
      "İstanbul ve Van’daki şehir içi otobüs filoları için entegre yolcu bilgilendirme (PIS/PAS), CCTV ve anons sistemleri tasarlanmış, üretilmiş ve sahada devreye alınmıştır. Binlerce araçlık filoda tutarlı bilgilendirme ve güvenlik altyapısı, operatörün merkezi yönetimini kolaylaştırır.",
      "Sistemler araç içi ve dışı LED paneller, sürücü birimleri, kamera ve kayıt altyapısı ile birlikte teslim edilir. Kurulum sonrası eğitim, dokümantasyon ve teknik destek ile operatörlerin sistemleri kendi bünyesinde yönetebilmesi hedeflenir. Proje kapsamında binlerce kamera ve yolcu bilgilendirme ünitesi devreye alınmıştır.",
      "Bu projeler, Atak Ulaşım’ın büyük ölçekli şehir içi toplu taşıma projelerinde kanıtlanmış deneyimini yansıtır.",
    ],
    paragraphsEn: [
      "Integrated passenger information (PIS/PAS), CCTV and announcement systems have been designed, manufactured and commissioned for the urban bus fleets in Istanbul and Van. A consistent information and security infrastructure across thousands of vehicles simplifies central management for the operator.",
      "Systems are delivered together with in-vehicle and exterior LED panels, driver units, cameras and recording infrastructure. Post-installation training, documentation and technical support aim to enable operators to manage the systems in-house. Thousands of cameras and passenger information units have been commissioned under these projects.",
      "These projects reflect Atak Ulaşım’s proven experience in large-scale urban public transport projects.",
    ],
  },
]

type PageProps = { params?: Promise<Record<string, string | string[]>>; searchParams?: Promise<Record<string, string | string[]>> }
export default function ProjelerimizPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const { language } = useLanguage()
  const isTr = language === "tr"

  return (
    <main className="min-h-screen">
      <PageHeroIndustrial
        label={isTr ? "PROJELERIMIZ" : "OUR PROJECTS"}
        title={isTr ? "Projelerimiz" : "Our Projects"}
        description={
          isTr
            ? "Fizibiliteden sahaya kadar mühendislik odaklı projeler."
            : "Engineering-focused projects from feasibility to the field."
        }
      />

      {/* Intro */}
      <section className="py-12 sm:py-16 border-b border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-[#0f172a]">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <ScrollReveal staggerIndex={0}>
            <p className="text-stone-600 dark:text-white/80 leading-relaxed text-base sm:text-lg">
              {isTr
                ? "Raylı sistem, otobüs ve sürdürülebilir ulaşım projelerimizde müşteri ihtiyaçlarını fizibilite aşamasından teslimata kadar tek elden yönetiyoruz. Aşağıda öne çıkan proje alanlarımız ve bu alanlardaki yaklaşımımız özetlenmektedir."
                : "In our rail, bus and sustainable transport projects we manage customer needs single-handedly from the feasibility phase through to delivery. Below we summarise our main project areas and our approach in each."}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects — 3 detailed blocks with slate photos */}
      <section className="py-16 sm:py-24 bg-white dark:bg-[#0f172a]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 space-y-20 sm:space-y-28">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={project.id} staggerIndex={index}>
              <article className="flex flex-col gap-10 lg:gap-14">
                {/* Slate photo placeholder */}
                <SlatePhoto number={project.photo} />

                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest uppercase text-[#38bdf8]">
                    <span>{isTr ? project.categoryTr : project.categoryEn}</span>
                    <span className="text-stone-400 dark:text-white/40">·</span>
                    <span className="flex items-center gap-1.5 text-stone-500 dark:text-white/60 font-normal">
                      <MapPin className="h-3.5 w-3.5" />
                      {isTr ? project.locationTr : project.locationEn}
                    </span>
                    <span className="flex items-center gap-1.5 text-stone-500 dark:text-white/60 font-normal">
                      <Calendar className="h-3.5 w-3.5" />
                      {project.year}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0f172a] dark:text-white tracking-tight">
                    {isTr ? project.titleTr : project.titleEn}
                  </h2>
                  <p className="text-sm text-stone-500 dark:text-white/50">
                    {isTr ? project.clientTr : project.clientEn}
                  </p>

                  <div className="space-y-6 pt-2">
                    {(isTr ? project.paragraphsTr : project.paragraphsEn).map((para, i) => (
                      <p
                        key={i}
                        className="text-stone-600 dark:text-white/80 text-base sm:text-lg leading-[1.85]"
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  <Link
                    href={`/projelerimiz/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#38bdf8] hover:text-[#0ea5e9] dark:hover:text-sky-400 transition-colors mt-4"
                  >
                    {isTr ? "Proje detayı" : "Project detail"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
