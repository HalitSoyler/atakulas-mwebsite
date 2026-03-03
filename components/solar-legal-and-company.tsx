"use client"

import { useLanguage } from "@/lib/language-context"
import { Sun, Train, Building2, Wrench, Lightbulb, BatteryCharging, Target, Users } from "lucide-react"

const SOLAR_STEPS = {
  tr: [
    {
      title: "Elektrik Dağıtım Şirketi Çağrı Mektubu Başvurusu",
      subtitle: "Her ayın 20'sine kadar",
    },
    {
      title: "Elektrik Projelerinin Hazırlanması",
    },
    {
      title: "Statik Projelerin Hazırlanması",
    },
    {
      title: "Hazırlanan Projelerin TEDAŞ Tarafından Onaylanması",
      badge: "+15 Gün",
    },
    {
      title: "Elektrik Dağıtım Şirketi ile Bağlantı Anlaşması",
    },
    {
      title: "Santral Montajı ve Devreye Alma",
    },
    {
      title: "Elektrik Dağıtım Şirketi ile Sistem Kullanım Anlaşması İmzalanması",
    },
    {
      title: "TEDAŞ Geçici Kabulünün Yapılması",
    },
  ],
  en: [
    {
      title: "Application for Call Letter to Distribution Company",
      subtitle: "Until the 20th of each month",
    },
    {
      title: "Preparation of Electrical Projects",
    },
    {
      title: "Preparation of Static Projects",
    },
    {
      title: "Approval of Projects by TEDAŞ",
      badge: "+15 Days",
    },
    {
      title: "Connection Agreement with Distribution Company",
    },
    {
      title: "Plant Installation and Commissioning",
    },
    {
      title: "System Usage Agreement with Distribution Company",
    },
    {
      title: "Temporary Acceptance by TEDAŞ",
    },
  ],
} as const

const COMPANY_PARAGRAPH = {
  tr: "1998 yılında Halil SÖYLER tarafından kurulmuş olan firmamız; sinyalizasyon, kontrol, haberleşme, yolcu anons ve bilgilendirme sistemleri, reklam oynatma sistemleri, uzaktan izleme sistemleri, güneş enerjisi sistemleri ve yenilenebilir enerji üretimi üzerine çözümler sunar.",
  en: "Founded in 1998 by Halil SÖYLER, our company delivers solutions for signalling, control, communication, passenger announcement and information systems, digital signage, remote monitoring, solar power systems and renewable energy production.",
} as const

const COMPANY_PILLS = {
  tr: [
    { label: "Ulaşım metro–tramvay–otobüs çözümleri", icon: Train },
    { label: "Yolcu istasyonları çözümleri", icon: Building2 },
    { label: "Bakım, onarım ve işletme çözümleri", icon: Wrench },
    {
      label: "Araştırma, geliştirme, tasarım ve entegrasyon kabiliyetlerine yönelik çözümler",
      icon: Lightbulb,
    },
    { label: "Enerji sistemleri çözümleri", icon: BatteryCharging },
    { label: "Milli ve kritik teknolojilere odaklı çözümler", icon: Target },
    { label: "Yetişmiş insan kaynaklarına dayalı ekip", icon: Users },
  ],
  en: [
    { label: "Metro–tram–bus transportation solutions", icon: Train },
    { label: "Passenger station solutions", icon: Building2 },
    { label: "Maintenance, repair and operation solutions", icon: Wrench },
    {
      label: "R&D, design and integration focused solutions",
      icon: Lightbulb,
    },
    { label: "Energy systems solutions", icon: BatteryCharging },
    { label: "National and critical technology focused solutions", icon: Target },
    { label: "Team built on experienced human resources", icon: Users },
  ],
} as const

export function SolarLegalAndCompanySection() {
  const { language } = useLanguage()
  const isEn = language === "en"

  const solarSteps = isEn ? SOLAR_STEPS.en : SOLAR_STEPS.tr
  const companyPills = isEn ? COMPANY_PILLS.en : COMPANY_PILLS.tr

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12 lg:space-y-14">
        <div className="rounded-3xl bg-[#0f172a] px-6 py-10 text-white shadow-xl lg:px-10 lg:py-12">
          <div className="mb-8 lg:mb-10 max-w-5xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
              <Sun className="h-4 w-4" />
              <span>{isEn ? "Legal Workflow" : "Yasal Süreç"}</span>
            </p>
            <h2 className="mt-4 text-xl font-semibold lg:text-2xl">
              {isEn ? "Solar Power Installation / Legal Workflow" : "Güneş Enerjisi Kurulumu / Yasal Süreç İş Akışı"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80 lg:text-[0.9375rem]">
              {isEn
                ? "Solar power plant installation requires permits from local authorities and compliance with national and regional energy regulations, together with evaluation of environmental impacts. After permits, safe electrical connections and structural installation must be completed. Carefully tracking each step of this legal process ensures smooth commissioning."
                : "Güneş enerjisi sistemi kurulumu; yerel yönetimlerden izin almayı, ulusal ve bölgesel enerji düzenlemelerine uyumu ve çevresel etkilerin değerlendirilmesini gerektirir. İzinlerin alınması sonrasında, kurulumun elektrik bağlantıları ve yapısal montaj güvenliğinin sağlanmasıyla tamamlanır. Bu yasal sürecin adım adım takip edilmesi, sistemin sorunsuz şekilde devreye alınmasını sağlar."}
            </p>
          </div>

          <div className="relative">
            <div className="hidden h-[2px] w-full translate-y-10 bg-sky-500/30 lg:block" />
            <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-stretch lg:justify-center lg:gap-6">
              {solarSteps.map((step, index, arr) => (
                <div
                  key={step.title}
                  className="flex flex-1 flex-col items-center lg:min-w-[9rem] lg:basis-1/4"
                >
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-sky-400 bg-[#020617] text-center text-[11px] font-semibold leading-snug shadow-[0_0_0_6px_rgba(15,23,42,1)] lg:h-24 lg:w-24 lg:text-[12px]">
                    <span className="max-w-[7.5rem]">{step.title}</span>
                    {step.badge && (
                      <span className="absolute -top-3 right-0 rounded-full bg-[#f97316] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-lg">
                        {step.badge}
                      </span>
                    )}
                  </div>
                  {index < arr.length - 1 && (
                    <div className="hidden h-[2px] w-full max-w-[6rem] translate-y-[-40px] bg-sky-400/60 lg:block" />
                  )}
                  <p className="mt-3 text-center text-[11px] text-sky-200/80 lg:text-[12px]">
                    {step.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-10 rounded-3xl bg-white/90 p-6 shadow-sm backdrop-blur lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              {isEn ? "Who Is Atak Ulaşım?" : "Atak Ulaşım ve Elektronik Kimdir?"}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 lg:text-[0.95rem]">
              {isEn ? COMPANY_PARAGRAPH.en : COMPANY_PARAGRAPH.tr}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {companyPills.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-full bg-[#0f172a] text-white px-4 py-2.5 shadow-sm lg:gap-4 lg:px-5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 lg:h-9 lg:w-9">
                    <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                  </div>
                  <p className="text-xs font-medium lg:text-sm">{item.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CompanyOverviewSection() {
  const { language } = useLanguage()
  const isEn = language === "en"
  const companyPills = isEn ? COMPANY_PILLS.en : COMPANY_PILLS.tr

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 rounded-3xl bg-white/90 p-6 shadow-sm backdrop-blur lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              {isEn ? "Who Is Atak Ulaşım?" : "Atak Ulaşım ve Elektronik Kimdir?"}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 lg:text-[0.95rem]">
              {isEn ? COMPANY_PARAGRAPH.en : COMPANY_PARAGRAPH.tr}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {companyPills.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-full bg-[#0f172a] text-white px-4 py-2.5 shadow-sm lg:gap-4 lg:px-5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 lg:h-9 lg:w-9">
                    <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                  </div>
                  <p className="text-xs font-medium lg:text-sm">{item.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


