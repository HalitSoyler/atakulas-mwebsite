"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Shield,
  Target,
  Leaf,
  Cpu,
  Wrench,
  Radio,
  Camera,
  Monitor,
  Mic,
  Database,
  FileCode,
  Play,
} from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { MagicCard } from "@/components/ui/magic-card"
import { Marquee } from "@/components/ui/marquee"

/** Sıra: 1 Yerli Malı, 1 TSE, 3 ISO. public/images/certificates ile eşleşir. */
const certifications = [
  { name: "Yerli Malı Belgesi", description: "T.C. Sanayi ve Teknoloji Bakanlığı", src: "/images/certificates/Yerli_Mali.png" },
  { name: "TSE Hizmet Yeterlilik", description: "Türk Standartları Enstitüsü", src: "/images/certificates/TSE.png" },
  { name: "ISO 9001:2015", description: "Kalite Yönetim Sistemi", src: "/images/certificates/ISO_9001.jpg" },
  { name: "ISO 14001:2015", description: "Çevre Yönetim Sistemi", src: "/images/certificates/ISO_14001.jpg" },
  { name: "ISO 10002", description: "Müşteri Memnuniyeti Yönetimi", src: "/images/certificates/ISO_10002.jpg" },
]

/** public/images/Referances klasöründeki referans logoları (ana sayfa ile aynı) */
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

export default function HakkimizdaPage() {
  const { t, language } = useLanguage()

  const values = [
    {
      icon: Shield,
      title: t.about.values.quality.title,
      description: t.about.values.quality.description,
    },
    {
      icon: Target,
      title: t.about.values.innovation.title,
      description: t.about.values.innovation.description,
    },
    {
      icon: Leaf,
      title: t.about.values.trust.title,
      description: t.about.values.trust.description,
    },
  ]

  const serviceIcons = [Mic, Monitor, Radio, Camera, Database, Cpu, FileCode, Wrench]
  const services = t.about.servicesList.map((title, index) => ({
    icon: serviceIcons[index] || Cpu,
    title,
  }))

  return (
    <main className="bg-background min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-muted/30 relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-medium text-primary mb-2">
            {t.about.pageTitle}
          </p>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            {t.about.pageSubtitle}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-3xl">
            {language === "tr"
              ? "ATAK ULASIM LTD. STI., rayli sistem ekipmanlari ve elektronik cozumler alaninda Turkiye'nin oncu kuruluslarindan biridir."
              : "ATAK ULASIM LTD. STI. is one of Turkey's leading companies in rail system equipment and electronic solutions."}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t.about.historyTitle}
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>{t.about.historyText}</p>
                <p>
                  {language === "tr"
                    ? "Sirketimiz urun tasarlamis ve uretmis oldugu urunlerin tum uluslararasi testlerini yapmis ve belgelerini almis, Metro, Tramvay, Hafif Rayli sistem araclari, Otobusler, Metrobusler icin otomatik anons, yolcu ve surucu bilgilendirme, guvenlik kamerasi sistemleri konusunda donanim, tasarim ve yazilim gelistirme asamalarinin, bakim ve uretimini yapan bir sirkettir."
                    : "Our company has completed all international tests and obtained certificates for the products it has designed and manufactured, developing hardware, design and software for automatic announcement, passenger and driver information, and security camera systems for Metro, Tram, Light Rail vehicles, Buses, and Metrobuses."}
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {values.map((value) => (
                  <div key={value.title} className="flex gap-4 p-4 border border-border rounded-lg">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{value.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Video Placeholder */}
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                  <p className="text-muted-foreground mt-3 text-sm">
                    {language === "tr" ? "Sirket Tanitim Videosu" : "Company Introduction Video"}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white border border-border rounded-lg p-6">
                <div className="text-center mb-4">
                  <Image
                    src="/images/Logos/svg_files/header_250x100.svg"
                    alt="Atak Ulaşım"
                    width={250}
                    height={100}
                    className="mx-auto h-10 w-auto"
                  />
                </div>
                <div className="text-center">
                  <div className="text-4xl font-semibold text-primary">25+</div>
                  <div className="text-sm text-muted-foreground mt-1">{t.trust.experience.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section — MagicCard border-only, 1 Yerli Malı + 1 TSE + 3 ISO */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              {language === "tr" ? "Sertifikalarımız" : "Our Certificates"}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {language === "tr"
                ? "Uluslararası standartlara uygun kalite belgeleri"
                : "Quality certificates compliant with international standards"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {certifications.map((cert) => (
              <MagicCard key={cert.name} className="p-4 text-center h-full flex flex-col">
                <h3 className="font-medium text-foreground text-sm">{cert.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cert.description}</p>
                <div className="aspect-[3/4] relative mt-3 rounded-lg overflow-hidden border border-border bg-muted flex-1 min-h-[140px]">
                  <Image
                    src={cert.src}
                    alt={`Atak Ulaşım - ${cert.name}`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services — Şirketimiz Bünyesinde: glassy, modern, compact */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary/80 uppercase mb-2">
              {language === "tr" ? "KURUMSAL" : "CORPORATE"}
            </p>
            <h2 className="text-2xl font-semibold text-foreground">{t.about.ourServices}</h2>
          </div>

          <div className="relative rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(30,90,158,0.06)] overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-transparent" />
            <div className="relative p-6 sm:p-8">
              <p className="text-[10px] font-medium tracking-widest text-muted-foreground/80 uppercase mb-4 text-center">
                {language === "tr"
                  ? "Tasarım · Üretim · Entegrasyon · Destek"
                  : "Design · Manufacturing · Integration · Support"}
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/80 border border-white/90 backdrop-blur-sm"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground/90">{service.title}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-muted-foreground/70 text-center font-light tracking-wide">
                {language === "tr"
                  ? "Uçtan uca çözüm ortağınız"
                  : "Your end-to-end solution partner"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Referanslar / Çözüm Ortaklarımız — ana sayfa ile aynı format (Marquee + logo) */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary mb-2">{t.clients.title}</p>
            <h2 className="text-xl font-semibold text-foreground">
              {language === "tr" ? "Çözüm Ortaklarımız" : "Our Solution Partners"}
            </h2>
          </div>
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

      <Footer />
    </main>
  )
}
