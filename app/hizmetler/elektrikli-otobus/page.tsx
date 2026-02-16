"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Zap,
  Leaf,
  PiggyBank,
  Wrench,
  Battery,
  Gauge,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function ElektrikliOtobusPage() {
  const { t, language } = useLanguage()

  const benefits = [
    {
      icon: Leaf,
      title: t.electricBus.benefits.eco.title,
      description: t.electricBus.benefits.eco.description,
    },
    {
      icon: PiggyBank,
      title: t.electricBus.benefits.cost.title,
      description: t.electricBus.benefits.cost.description,
    },
    {
      icon: Wrench,
      title: t.electricBus.benefits.maintenance.title,
      description: t.electricBus.benefits.maintenance.description,
    },
    {
      icon: Battery,
      title: t.electricBus.benefits.life.title,
      description: t.electricBus.benefits.life.description,
    },
  ]

  const conversionSteps =
    language === "tr"
      ? [
          {
            step: 1,
            title: "Araç Analizi",
            description:
              "Mevcut dizel aracın teknik analizi, dönüşüm uygunluğunun değerlendirilmesi ve proje planlaması.",
            duration: "1-2 Hafta",
          },
          {
            step: 2,
            title: "Tasarım ve Mühendislik",
            description:
              "Elektrik motoru, batarya paketi ve kontrol sistemlerinin araç tipine özel tasarımı.",
            duration: "2-4 Hafta",
          },
          {
            step: 3,
            title: "Dizel Sistemin Sökümü",
            description:
              "Motor, şanzıman, yakıt deposu ve egzoz sisteminin profesyonel olarak sökülmesi.",
            duration: "1 Hafta",
          },
          {
            step: 4,
            title: "Elektrik Sistemin Montajı",
            description:
              "Elektrik motoru, batarya paketi, BMS, şarj sistemi ve kontrol ünitesinin montajı.",
            duration: "2-3 Hafta",
          },
          {
            step: 5,
            title: "Test ve Sertifikasyon",
            description:
              "Kapsamlı yol testleri, güvenlik kontrolleri ve yasal sertifikasyon süreçleri.",
            duration: "1-2 Hafta",
          },
        ]
      : [
          {
            step: 1,
            title: "Vehicle Analysis",
            description:
              "Technical analysis of the existing diesel vehicle, evaluation of conversion suitability and project planning.",
            duration: "1-2 Weeks",
          },
          {
            step: 2,
            title: "Design and Engineering",
            description:
              "Vehicle-specific design of electric motor, battery pack and control systems.",
            duration: "2-4 Weeks",
          },
          {
            step: 3,
            title: "Diesel System Removal",
            description:
              "Professional removal of engine, transmission, fuel tank and exhaust system.",
            duration: "1 Week",
          },
          {
            step: 4,
            title: "Electric System Installation",
            description:
              "Installation of electric motor, battery pack, BMS, charging system and control unit.",
            duration: "2-3 Weeks",
          },
          {
            step: 5,
            title: "Testing and Certification",
            description:
              "Comprehensive road tests, safety checks and legal certification processes.",
            duration: "1-2 Weeks",
          },
        ]

  const technicalSpecs =
    language === "tr"
      ? [
          { label: "Motor Gücü", value: "150-300 kW" },
          { label: "Batarya Kapasitesi", value: "200-400 kWh" },
          { label: "Menzil", value: "200-350 km" },
          { label: "Şarj Süresi (DC)", value: "1-2 saat" },
          { label: "Şarj Süresi (AC)", value: "6-8 saat" },
          { label: "Maksimum Hız", value: "80 km/s" },
        ]
      : [
          { label: "Motor Power", value: "150-300 kW" },
          { label: "Battery Capacity", value: "200-400 kWh" },
          { label: "Range", value: "200-350 km" },
          { label: "Charging Time (DC)", value: "1-2 hours" },
          { label: "Charging Time (AC)", value: "6-8 hours" },
          { label: "Maximum Speed", value: "80 km/h" },
        ]

  const conversionScope =
    language === "tr"
      ? [
          "Elektrik motoru ve sürücü sistemi",
          "Lityum-iyon batarya paketi",
          "Batarya Yönetim Sistemi (BMS)",
          "DC/DC dönüştürücü",
          "Şarj sistemi (AC/DC)",
          "Isıtma/soğutma sistemi adaptasyonu",
          "Dijital gösterge paneli",
          "Teşhis ve izleme yazılımı",
          "Şarj altyapısı danışmanlığı",
        ]
      : [
          "Electric motor and drive system",
          "Lithium-ion battery pack",
          "Battery Management System (BMS)",
          "DC/DC converter",
          "Charging system (AC/DC)",
          "Heating/cooling system adaptation",
          "Digital dashboard",
          "Diagnostics and monitoring software",
          "Charging infrastructure consulting",
        ]

  return (
    <main className="relative overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-background" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                {language === "tr" ? "Elektrikli Donusum" : "Electric Conversion"}
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                <span className="text-gradient">{t.electricBus.pageTitle}</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {language === "tr"
                  ? "Dizel otobüslerin elektrikli araca dönüştürülmesine yönelik teknik çözümler, güç elektroniği tasarımları ve araç üstü sistem entegrasyonları sunulmaktadır."
                  : "Technical solutions, power electronics designs and on-vehicle system integrations are provided for converting diesel buses to electric vehicles."}
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="hidden lg:block">
              <div className="relative aspect-video glass rounded-2xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 glass rounded-full flex items-center justify-center mx-auto group-hover:neon-green transition-all duration-300">
                      <Play className="h-10 w-10 text-accent ml-1" />
                    </div>
                    <p className="text-muted-foreground mt-4 text-sm">
                      {language === "tr"
                        ? "Dönüşüm Sürecini İzleyin"
                        : "Watch the Conversion Process"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              {t.electricBus.benefits.title}
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
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Process Timeline */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              {t.electricBus.processTitle}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {language === "tr"
                ? "5 Adımda Elektrikli Dönüşüm"
                : "Electric Conversion in 5 Steps"}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line - Desktop */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-border" />

            <div className="grid gap-8 lg:grid-cols-5">
              {conversionSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  {/* Step Number */}
                  <div className="lg:flex lg:flex-col lg:items-center">
                    <div className="flex items-center gap-4 lg:flex-col lg:gap-0">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg z-10 lg:mb-6 neon-blue">
                        {step.step}
                      </div>
                      <div className="lg:text-center">
                        <h3 className="font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-xs text-primary font-medium mt-1">
                          {step.duration}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 lg:text-center">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile Timeline Line */}
                  {index < conversionSteps.length - 1 && (
                    <div className="lg:hidden absolute left-5 top-10 w-0.5 h-full bg-border -z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
                {t.electricBus.specsTitle}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                {language === "tr" ? "Performans Değerleri" : "Performance Values"}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {language === "tr"
                  ? "Elektrikli dönüşüm sistemlerimiz, orijinal araç performansını korurken çevre dostu ve ekonomik bir çözüm sunar."
                  : "Our electric conversion systems offer an eco-friendly and economical solution while maintaining original vehicle performance."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {technicalSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between p-4 glass rounded-lg"
                  >
                    <span className="text-sm text-muted-foreground">
                      {spec.label}
                    </span>
                    <span className="font-semibold text-primary">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Gauge className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  {language === "tr" ? "Dönüşüm Kapsamı" : "Conversion Scope"}
                </h3>
              </div>
              <ul className="space-y-3">
                {conversionScope.map((item) => (
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

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Leaf className="h-4 w-4" />
            {language === "tr" ? "Sürdürülebilir Ulaşım" : "Sustainable Transportation"}
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {language === "tr"
              ? "Filonuzu Elektrikli Geleceğe Taşıyın"
              : "Bring Your Fleet to the Electric Future"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "tr"
              ? "Elektrikli dönüşüm projeleri kapsamında fizibilite çalışmaları ve teknik değerlendirmeler sunulmaktadır."
              : "Feasibility studies and technical evaluations are provided as part of electric conversion projects."}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
