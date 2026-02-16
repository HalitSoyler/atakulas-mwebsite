"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import Link from "next/link"
import Image from "next/image"
import { MagicCard } from "@/components/ui/magic-card"
import { Marquee } from "@/components/ui/marquee"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { ArrowRight, Play } from "lucide-react"
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

export default function HomePage() {
  const { t, language } = useLanguage()

  const products = [
    {
      id: 1,
      title: language === "tr" ? "Surucu Kontrol Unitesi" : "Driver Control Unit",
      description:
        language === "tr"
          ? "EN50155 sertifikali rayli sistem araci icin entegre dokunmatik ekranli endustriyel bilgisayar."
          : "EN50155 certified industrial computer with integrated touch screen for rail vehicles.",
    },
    {
      id: 2,
      title: language === "tr" ? "LED Guzergah Panelleri" : "LED Route Panels",
      description:
        language === "tr"
          ? "RGB ve tek renkli LED modulleri, dahili kontrol karti ve RS-485 haberlesme ozellikli guzergah paneli."
          : "RGB and single color LED modules, built-in control card and RS-485 communication route panel.",
    },
    {
      id: 3,
      title: language === "tr" ? "CCTV Sistemleri" : "CCTV Systems",
      description:
        language === "tr"
          ? "Arac ici guvenlik kamera sistemleri icin merkezi kontrol unitesi ve NVR kayit sistemi."
          : "Central control unit and NVR recording system for in-vehicle security camera systems.",
    },
    {
      id: 4,
      title: language === "tr" ? "Interkom Sistemi" : "Intercom System",
      description:
        language === "tr"
          ? "TUBITAK destekli yerli tasarim ve uretim, RS-485 haberlesme protokolu."
          : "TUBITAK supported domestic design and production, RS-485 communication protocol.",
    },
  ]

  const services = [
    language === "tr" ? "Otomatik Anons Sistemleri" : "Automatic Announcement Systems",
    language === "tr" ? "Yolcu ve Surucu Bilgilendirme" : "Passenger & Driver Information",
    language === "tr" ? "Guvenlik Kamera Sistemleri" : "Security Camera Systems",
    language === "tr" ? "Elektronik Kart Tasarimi" : "Electronic Board Design",
    language === "tr" ? "Ar-Ge Calismalari" : "R&D Activities",
    language === "tr" ? "Bakim ve Onarim" : "Maintenance & Repair",
  ]

  /** Şirketimiz Bünyesinde: 9 items, each with distinct bar color (non-white) */
  const companyLayers = [
    language === "tr" ? "Otomatik Anons Sistemleri" : "Automatic Announcement Systems",
    language === "tr" ? "Yolcu ve Surucu Bilgilendirme" : "Passenger & Driver Information",
    language === "tr" ? "Guvenlik Kamera Sistemleri" : "Security Camera Systems",
    language === "tr" ? "Elektronik Kart Tasarimi" : "Electronic Board Design",
    language === "tr" ? "Ar-Ge Calismalari" : "R&D Activities",
    language === "tr" ? "Bakim ve Onarim" : "Maintenance & Repair",
    language === "tr" ? "Yazilim Gelistirme" : "Software Development",
    language === "tr" ? "Sistem Entegrasyonu" : "System Integration",
    language === "tr" ? "Teknik Destek" : "Technical Support",
  ]

  const transformSteps = [
    {
      key: "projelendirme",
      title: language === "tr" ? "Projelendirme" : "Project Planning",
      description:
        language === "tr"
          ? "Raylı sistem, otobüs ve özel araç projeleri için EN standartlarına uygun mimari ve elektronik tasarım."
          : "Architectural and electronic design compliant with EN standards for rail systems, buses and special vehicles.",
      badge: language === "tr" ? "Mühendislik Analizi" : "Engineering Analysis",
    },
    {
      key: "uretim",
      title: language === "tr" ? "Üretim" : "Manufacturing",
      description:
        language === "tr"
          ? "Yüksek dayanımlı kart tasarımları, kablolama ve kabin montajı dahil uçtan uca üretim süreçleri."
          : "End-to-end production including rugged board design, cabling and cabinet assembly.",
      badge: language === "tr" ? "Yerli Üretim" : "Domestic Production",
    },
    {
      key: "test",
      title: language === "tr" ? "Test ve Onay" : "Testing & Approval",
      description:
        language === "tr"
          ? "EN50155, EN50121 ve ilgili standartlara göre laboratuvar testleri, saha devreye alma ve kabul süreçleri."
          : "Laboratory tests, on-site commissioning and acceptance procedures according to EN50155, EN50121 and related standards.",
      badge: language === "tr" ? "Uluslararası Standartlar" : "International Standards",
    },
  ]

  const capabilities = [
    language === "tr" ? "Gelişmiş EMC/EMI İzolasyonu" : "Advanced EMC/EMI Isolation",
    language === "tr" ? "Akıllı Kontrol ve İzleme Sistemleri" : "Intelligent Control & Monitoring",
    language === "tr" ? "Endüstriyel Sıcaklık Aralıkları" : "Industrial Temperature Ranges",
    language === "tr" ? "Yüksek Erişilebilirlikli Yazılım Mimarisi" : "High-Availability Software Architecture",
    language === "tr" ? "Modüler Kart ve Kablolama Yapısı" : "Modular Board & Cabling",
    language === "tr" ? "Uzaktan Güncelleme ve Teşhis" : "Remote Update & Diagnostics",
  ]

  return (
    <main className="min-h-screen relative">
      <Header />

      {/* Hero — background beams + fluid layout (dark, kurumsal mavi) */}
      <section
        data-section="hero"
        data-header-theme="dark"
        className="section-fluid pt-32 pb-20 sm:pt-36 sm:pb-24 bg-slate-950 text-slate-50 rounded-b-3xl relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 hero-beams">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute inset-0 opacity-80 mix-blend-screen">
            <div className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,#38bdf8_0,#0f172a_55%,transparent_75%)] blur-3xl" />
            <div className="absolute right-[-120px] top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,#1e5a9e_0,#020617_55%,transparent_75%)] blur-3xl" />
            <div className="absolute inset-x-0 bottom-[-260px] h-[520px] bg-[radial-gradient(circle_at_center,#0ea5e9_0,#020617_55%,transparent_80%)] opacity-60 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#38bdf8_0,transparent_55%)] opacity-20" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <ScrollReveal staggerIndex={0}>
                <p className="text-sm font-medium text-sky-400 mb-2">{t.hero.slide1.subtitle}</p>
              </ScrollReveal>
              <ScrollReveal staggerIndex={1}>
                <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl lg:text-5xl">
                  {t.hero.slide1.title}
                </h1>
              </ScrollReveal>
              <ScrollReveal staggerIndex={2}>
                <p className="mt-4 text-slate-200 leading-relaxed">{t.hero.slide1.description}</p>
              </ScrollReveal>
              <ScrollReveal staggerIndex={3} className="mt-6 flex flex-wrap gap-3">
                <InteractiveHoverButton
                  asChild
                  className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-6 shadow-none hover:shadow-lg hover:shadow-sky-500/20"
                >
                  <Link href="/projelerimiz">
                    {t.nav.projects}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </InteractiveHoverButton>
              </ScrollReveal>
            </div>

            <ScrollReveal staggerIndex={2} className="relative">
              <div className="bg-slate-900/60 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-xl shadow-sky-500/20">
                <div className="relative aspect-video bg-slate-900 rounded-xl mb-6 overflow-hidden flex items-center justify-center border border-slate-700/80">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto">
                      <Play className="h-5 w-5 text-sky-400 ml-0.5" />
                    </div>
                    <p className="text-slate-300 mt-2 text-sm">{t.hero.stats.videoLabel}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "25+", label: t.hero.stats.experience },
                    { value: "TUBiTAK", label: t.hero.stats.certified },
                    { value: "ISO", label: "9001:2015" },
                    { value: "%100", label: t.hero.stats.domestic },
                  ].map((stat, i) => (
                    <ScrollReveal key={stat.label} staggerIndex={i}>
                      <div className="text-center p-4 bg-slate-900/80 rounded-xl border border-slate-700/70">
                        <div className="text-2xl font-semibold text-sky-400">{stat.value}</div>
                        <div className="text-xs text-slate-300 mt-1">{stat.label}</div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sticky Scroll — Atak Ulaşım Dönüşüm Standartları */}
      <section
        data-section="standards"
        data-header-theme="dark"
        className="section-fluid py-20 bg-slate-950 text-slate-50"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div className="lg:sticky lg:top-28 self-start space-y-4">
            <ScrollReveal staggerIndex={0}>
              <p className="text-sm font-semibold tracking-widest text-sky-400 uppercase">
                {language === "tr" ? "STANDARTLAR" : "STANDARDS"}
              </p>
            </ScrollReveal>
            <ScrollReveal staggerIndex={1}>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-50">
                {language === "tr"
                  ? "Atak Ulaşım Dönüşüm Standartları"
                  : "Atak Ulaşım Transformation Standards"}
              </h2>
            </ScrollReveal>
            <ScrollReveal staggerIndex={2}>
              <p className="text-sm text-slate-300 max-w-lg">
                {language === "tr"
                  ? "Projeler; fizibilite, üretim ve sertifikasyon adımlarının tamamının izlendiği şeffaf bir dönüşüm süreci ile yönetilir."
                  : "Projects are managed through a transparent transformation process covering feasibility, production and certification steps end to end."}
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            {transformSteps.map((step, index) => (
              <ScrollReveal key={step.key} staggerIndex={index}>
                <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-6">
                  <div className="absolute inset-0 opacity-60 pointer-events-none">
                    <div className="absolute -right-24 top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,#38bdf8_0,transparent_65%)] blur-2xl" />
                    <div className="absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,#1e293b_0,transparent_70%)] blur-2xl" />
                  </div>
                  <div className="relative space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      {step.badge}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-50">{step.title}</h3>
                    <p className="text-sm text-slate-200 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase — overlaps hero (pulls up), light theme */}
      <section
        data-section="showcase"
        data-header-theme="light"
        className="section-fluid section-fluid-overlap-up py-8"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal staggerIndex={0}>
            <div className="relative aspect-[21/9] bg-muted rounded-2xl overflow-hidden border border-border shadow-lg">
              <Image
                src="/images/tramway-showcase.jpg"
                alt="Malatya Tramvay"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-medium">
                  {language === "tr"
                    ? "Malatya Buyuksehir Belediyesi Tramvay Sistemi"
                    : "Malatya Metropolitan Municipality Tramway System"}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About — bento-style grid, overlaps down into next, muted theme */}
      <section
        data-section="about"
        data-header-theme="muted"
        className="section-fluid section-fluid-overlap-down-lg py-16 bg-white rounded-t-3xl shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.08)]"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bento-grid bento-grid-4 gap-6">
            <ScrollReveal staggerIndex={0} className="bento-span-2">
              <p className="text-sm font-medium text-primary mb-2">
                {language === "tr" ? "KURUMSAL" : "CORPORATE"}
              </p>
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                {language === "tr" ? "Atak Ulasim ve Elektronik" : "Atak Transportation and Electronics"}
              </h2>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                {language === "tr"
                  ? "Atak Ulasim ve Elektronik ulkemizde yerlilik ve teknolojik arge-uretim yapan ulasim, askeri ve teknolojik alanlarda cesitli tasarimlar yapan ve bunlari urune donusturen bir sirkettir. Sirketimiz urun tasarlamis ve uretmis oldugu urunlerin tum uluslararasi testlerini yapmis ve belgelerini almis, Metro, Tramvay, Hafif Rayli sistem araclari, Otobusler, Metrobusler icin otomatik anons, yolcu ve surucu bilgilendirme, guvenlik kamerasi sistemleri konusunda donanim, tasarim ve yazilim gelistirme asamalarinin, bakim ve uretimini yapan bir sirkettir."
                  : "Atak Transportation and Electronics is a company that makes various designs in transportation, military and technological fields with domestic and technological R&D production in our country and transforms them into products. Our company has completed all international tests and obtained certificates for the products it has designed and manufactured, developing hardware, design and software for automatic announcement, passenger and driver information, and security camera systems for Metro, Tram, Light Rail vehicles, Buses, and Metrobuses."}
              </p>
              <InteractiveHoverButton asChild className="mt-6 bg-transparent border border-border text-foreground hover:bg-muted/50 hover:shadow-none">
                <Link href="/hakkimizda">
                  {language === "tr" ? "Devami" : "Read More"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </InteractiveHoverButton>
            </ScrollReveal>

            <ScrollReveal staggerIndex={1} className="bento-span-2">
              <div className="rounded-2xl p-6 h-full border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_4px_24px_rgba(30,90,158,0.04)] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent" />
                <div className="relative">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {language === "tr" ? "Uygulama Alanlari" : "Application Areas"}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {language === "tr"
                      ? "Elektronik urunlerin tasarimi, Uretimi, testi, bakimi, montaji Banliyo, Hizli Tren, EMU, DMU, Tramvay, Metro, Hafif Rayli sistem araclari, Otobus, Metrobus vb. ulasim araclari"
                      : "Electronic product design, Production, testing, maintenance, installation for Suburban, High Speed Train, EMU, DMU, Tram, Metro, Light Rail vehicles, Bus, Metrobus etc. transportation vehicles"}
                  </p>
                  <p className="text-[10px] font-medium tracking-widest text-primary/70 uppercase mb-2">
                    {language === "tr" ? "Sirketimiz Bunyesinde" : "Within Our Company"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/70 border border-white/80 text-muted-foreground font-light"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Şirketimiz Bünyesinde — glassy, modern, compact info */}
      <section
        data-section="company-layers"
        data-header-theme="muted"
        className="section-fluid py-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(0.55_0.14_240/0.06),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal staggerIndex={0} className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary/80 uppercase mb-2">
              {language === "tr" ? "KURUMSAL" : "CORPORATE"}
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              {language === "tr" ? "Şirketimiz Bünyesinde" : "Within Our Company"}
            </h2>
          </ScrollReveal>

          <ScrollReveal staggerIndex={1}>
            <div className="relative rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(30,90,158,0.06)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-transparent" />
              <div className="relative p-6 sm:p-8">
                <p className="text-[11px] font-medium tracking-widest text-muted-foreground/80 uppercase mb-4">
                  {language === "tr"
                    ? "Tasarım · Üretim · Entegrasyon · Destek"
                    : "Design · Manufacturing · Integration · Support"}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {companyLayers.map((label, index) => (
                    <span
                      key={label}
                      className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium bg-white/80 border border-white/90 text-foreground/90 shadow-sm backdrop-blur-sm"
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-[10px] text-muted-foreground/70 text-center font-light tracking-wide">
                  {language === "tr"
                    ? "Uçtan uca çözüm ortağınız"
                    : "Your end-to-end solution partner"}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Teknik Yetkinlikler — bento grid, MagicCard */}
      <section
        data-section="capabilities"
        data-header-theme="muted"
        className="section-fluid py-16 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal staggerIndex={0} className="text-center mb-10">
            <p className="text-sm font-medium text-primary mb-2">
              {language === "tr" ? "TEKNİK YETKİNLİKLER" : "TECHNICAL CAPABILITIES"}
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              {language === "tr"
                ? "Raylı Sistemler İçin Mühendislik Altyapısı"
                : "Engineering Foundation for Rail Systems"}
            </h2>
          </ScrollReveal>

          <div className="bento-grid bento-grid-4 gap-4">
            {capabilities.map((capability, index) => (
              <ScrollReveal key={capability} staggerIndex={index + 1}>
                <MagicCard className="h-full p-0 overflow-visible">
                  <div className="h-full rounded-2xl bg-card p-5 flex flex-col justify-between">
                    <p className="text-sm font-medium text-foreground">{capability}</p>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      {language === "tr"
                        ? "Saha koşullarına uygun, uzun ömürlü ve bakım dostu sistem tasarımı yaklaşımı."
                        : "Design approach focused on long-life, field-ready and maintenance-friendly systems."}
                    </p>
                  </div>
                </MagicCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products — bento grid, overlaps up over about, muted theme */}
      <section
        data-section="products"
        data-header-theme="muted"
        className="section-fluid section-fluid-overlap-up-lg py-16 bg-muted/50 rounded-3xl"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal staggerIndex={0} className="text-center mb-10">
            <p className="text-sm font-medium text-primary mb-2">{t.products.pageTitle}</p>
            <h2 className="text-2xl font-semibold text-foreground">{t.products.pageSubtitle}</h2>
          </ScrollReveal>

          <div className="bento-grid bento-grid-4 gap-4">
            {products.map((product, i) => (
              <ScrollReveal key={product.id} staggerIndex={i + 1}>
                <MagicCard className="h-full p-0 overflow-visible">
                  <Link
                    href="/urunlerimiz"
                    className="block h-full rounded-2xl bg-card p-5 hover:opacity-100 transition-opacity"
                  >
                    <div className="aspect-square bg-muted rounded-xl mb-4 flex items-center justify-center border border-border">
                      <p className="text-xs text-muted-foreground">
                        {language === "tr" ? "Urun gorseli" : "Product image"}
                      </p>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{product.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                  </Link>
                </MagicCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal staggerIndex={5} className="text-center mt-8">
            <InteractiveHoverButton asChild className="rounded-full px-6 bg-transparent border border-border text-foreground hover:bg-muted/50 hover:shadow-none">
              <Link href="/urunlerimiz">
                {language === "tr" ? "Tum Urunler" : "All Products"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </InteractiveHoverButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Referanslar / Çözüm Ortaklarımız — Marquee ile kayan logo şeridi */}
      <section
        data-section="references"
        data-header-theme="light"
        className="section-fluid py-16 bg-white rounded-t-3xl shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.06)]"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal staggerIndex={0} className="text-center mb-10">
            <p className="text-sm font-medium text-primary mb-2">{t.clients.title}</p>
            <h2 className="text-xl font-semibold text-foreground">
              {language === "tr" ? "Çözüm Ortaklarımız" : "Our Solution Partners"}
            </h2>
          </ScrollReveal>
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

      {/* Footer — muted theme */}
      <div data-section="footer" data-header-theme="muted">
        <Footer />
      </div>
    </main>
  )
}
