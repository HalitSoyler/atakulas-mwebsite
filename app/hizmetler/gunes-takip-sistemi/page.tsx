"use client"

import { use } from "react"
import { Footer } from "@/components/footer"
import { PageHeroIndustrial } from "@/components/page-hero-industrial"
import { CompanyOverviewSection } from "@/components/solar-legal-and-company"
import {
  Sun,
  Shield,
  TrendingUp,
  Wind,
  Leaf,
  Gauge,
  CheckCircle,
  Zap,
  Wrench,
  Globe,
  Snowflake,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

type PageProps = { params?: Promise<Record<string, string>>; searchParams?: Promise<Record<string, string>> }
export default function GunesTakipSistemiPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const { t, language } = useLanguage()

  const benefits =
    language === "tr"
      ? [
          {
            icon: Sun,
            title: "Yüksek Verimlilik",
            description:
              "Güneş takip sistemi fotovoltaik enerji üretimini %25'e varan oranda artırır. Yatırım geri dönüş süresini kısaltır.",
          },
          {
            icon: Shield,
            title: "Dayanıklılık",
            description:
              "Yerli tasarım, sekizgen boru ve güçlü kontrol sistemleriyle yüksek dayanım. Rüzgarda yatay, karda dik pozisyonda güvenlik.",
          },
          {
            icon: Gauge,
            title: "Esnek Tasarım",
            description:
              "3 serbestlik dereceli mafsal yapısı ile farklı araziye uyum. %15–25 daha fazla enerji üretimi sağlar.",
          },
          {
            icon: Leaf,
            title: "Çevreci ve Ekonomik",
            description:
              "Artan verimlilik ile enerji maliyetlerini düşürür, karbon ayak izini azaltır. Sürdürülebilir enerji çözümü.",
          },
        ]
      : [
          {
            icon: Sun,
            title: "High Efficiency",
            description:
              "Solar tracking system increases photovoltaic energy production by up to 25%. Shortens investment payback period.",
          },
          {
            icon: Shield,
            title: "Durability",
            description:
              "Domestic design with octagonal tube and robust control systems. Horizontal in wind, vertical in snow for safety.",
          },
          {
            icon: Gauge,
            title: "Flexible Design",
            description:
              "3-degree-of-freedom joint adapts to variable terrain. Delivers 15–25% more energy production.",
          },
          {
            icon: Leaf,
            title: "Eco-Friendly & Economic",
            description:
              "Lowers energy costs with increased efficiency, reduces carbon footprint. Sustainable energy solution.",
          },
        ]

  const systemFeatures =
    language === "tr"
      ? [
          {
            step: 1,
            title: "Akıllı Takip",
            description:
              "Dinamik güneş takip algoritması ile her sahada tek kurulumla güneşi sürekli takip eder, elektrik üretimini artırır.",
            duration: "7/24",
          },
          {
            step: 2,
            title: "Otomatik Koruma",
            description:
              "Rüzgar ölçümüne göre düz konuma geçerek aşırı rüzgara karşı koruma. Kar yağışında dik durumda kar tutmama.",
            duration: "Otomatik",
          },
          {
            step: 3,
            title: "Web Tabanlı İzleme",
            description:
              "Yönetici, bakımcı ve kullanıcı yetkilendirmesi. Anlık ve geçmiş veriler, tarayıcı üzerinden uzaktan kontrol.",
            duration: "Uzaktan",
          },
          {
            step: 4,
            title: "Backtracking",
            description:
              "Kış aylarında daha az açıda hareket ile ek %3'e kadar üretim artışı. Gölgelenme optimizasyonu.",
            duration: "Algoritma",
          },
          {
            step: 5,
            title: "Yerli Üretim",
            description:
              "Elektronik kartlar, mafsallar ve mekanik parçalar yerli. Yerli yatırımcılar yerli üretim avantajlarından faydalanabilir.",
            duration: "%100",
          },
        ]
      : [
          {
            step: 1,
            title: "Smart Tracking",
            description:
              "Dynamic solar tracking algorithm continuously follows the sun on any site with a single installation, boosting power generation.",
            duration: "24/7",
          },
          {
            step: 2,
            title: "Automatic Protection",
            description:
              "Switches to flat position based on wind measurement for storm protection. Vertical stance in snow prevents accumulation.",
            duration: "Automatic",
          },
          {
            step: 3,
            title: "Web-Based Monitoring",
            description:
              "Admin, maintainer and user roles. Real-time and historical data, remote control via browser.",
            duration: "Remote",
          },
          {
            step: 4,
            title: "Backtracking",
            description:
              "Reduced angle movement in winter adds up to 3% extra production. Shading optimization.",
            duration: "Algorithm",
          },
          {
            step: 5,
            title: "Domestic Production",
            description:
              "Electronic boards, joints and mechanical parts are domestic. Local investors benefit from domestic production incentives.",
            duration: "100%",
          },
        ]

  const technicalSpecs =
    language === "tr"
      ? [
          { label: "İzleme Tipi", value: "Doğu-Batı tek yatay eksen" },
          { label: "Takip Aralığı", value: "120° (asimetrik ayarlanabilir)" },
          { label: "Besleme", value: "220V AC, 50 Hz" },
          { label: "Tracker Başına Güç", value: "75 W" },
          { label: "Panel Dizilimi", value: "Maks. 54–65 panel" },
          { label: "Garanti", value: "Statik 10 yıl, elektronik 5 yıl" },
        ]
      : [
          { label: "Tracking Type", value: "East-West single horizontal axis" },
          { label: "Tracking Range", value: "120° (asymmetric adjustable)" },
          { label: "Power Supply", value: "220V AC, 50 Hz" },
          { label: "Power per Tracker", value: "75 W" },
          { label: "Panel Array", value: "Max. 54–65 panels" },
          { label: "Warranty", value: "Structure 10 years, electronics 5 years" },
        ]

  const scope =
    language === "tr"
      ? [
        "Sekizgen mafsal ile dayanıklı yapı",
        "Mikro işlemci tabanlı numerik kontrol",
        "Kar ve rüzgar sensörleri ile hava koruması",
        "Aktüatör: 24V DC, 20 kN, IP65",
        "Manuel / Kar / Rüzgar / Panel temizleme modları",
        "Sabit sisteme göre 1 yıl içinde amortisman",
        "Web tabanlı izleme yazılımı",
        "30 yıla kadar garanti uzatma imkanı",
      ]
      : [
        "Robust structure with octagonal joint",
        "Microprocessor-based numerical control",
        "Snow and wind sensors for weather protection",
        "Actuator: 24V DC, 20 kN, IP65",
        "Manual / Snow / Wind / Panel cleaning modes",
        "Payback vs. fixed system within 1 year",
        "Web-based monitoring software",
        "Warranty extension up to 30 years",
      ]

  return (
    <main className="relative overflow-hidden">
      <PageHeroIndustrial
        label={language === "tr" ? "Güneş Enerjisi" : "Solar Energy"}
        title={t.sunTracking.pageTitle}
        description={
          language === "tr"
            ? "Güneşi takip ederek panelin maksimum ışık almasını sağlayan sistem. Yaz ve kış aylarında güneş açısını dik yakalayarak %15–25 daha fazla enerji üretimi sunar."
            : "System that maximizes panel exposure by tracking the sun. Captures solar angle vertically year-round, delivering 15–25% more energy production."
        }
      />

      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              {t.sunTracking.benefits.title}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {language === "tr" ? "Avantajları" : "Benefits"}
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="glass rounded-2xl p-8 text-center card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              {t.sunTracking.processTitle}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {language === "tr" ? "Sistem Özellikleri" : "System Features"}
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-border" />
            <div className="grid gap-8 lg:grid-cols-5">
              {systemFeatures.map((step, index) => (
                <div key={step.step} className="relative">
                  <div className="lg:flex lg:flex-col lg:items-center">
                    <div className="flex items-center gap-4 lg:flex-col lg:gap-0">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg z-10 lg:mb-6 neon-blue">
                        {step.step}
                      </div>
                      <div className="lg:text-center">
                        <h3 className="font-semibold text-foreground">{step.title}</h3>
                        <p className="text-xs text-primary font-medium mt-1">{step.duration}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 lg:text-center">{step.description}</p>
                  </div>
                  {index < systemFeatures.length - 1 && (
                    <div className="lg:hidden absolute left-5 top-10 w-0.5 h-full bg-border -z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                {t.sunTracking.specsTitle}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                {language === "tr" ? "Teknik Özellikler" : "Technical Specifications"}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {language === "tr"
                  ? "Aynı arazi ve kurulu güçte sabit sisteme göre %15–25 daha fazla elektrik üretimi sağlayan güneş takip sistemi."
                  : "Solar tracking system that delivers 15–25% more electricity than fixed systems on the same land and capacity."}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {technicalSpecs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between p-4 glass rounded-lg">
                    <span className="text-sm text-muted-foreground">{spec.label}</span>
                    <span className="font-semibold text-primary text-right max-w-[60%]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  {language === "tr" ? "Sistem Kapsamı" : "System Scope"}
                </h3>
              </div>
              <ul className="space-y-3">
                {scope.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sun className="h-4 w-4" />
            {language === "tr" ? "Yenilenebilir Enerji" : "Renewable Energy"}
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {language === "tr"
              ? "Yatırımlarınızı Karlılığa Dönüştürün"
              : "Turn Your Investments into Profit"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "tr"
              ? "Yenilikçi güneş takip sistemleri ile geleceğin enerji ihtiyacını bugünden karşılamaya başlayabilirsiniz."
              : "Start meeting tomorrow's energy needs today with innovative solar tracking systems."}
          </p>
        </div>
      </section>

      <CompanyOverviewSection />

      <Footer />
    </main>
  )
}
