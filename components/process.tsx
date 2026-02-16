import { ClipboardCheck, Cpu, Wrench, TestTube, CheckCircle } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: ClipboardCheck,
    title: "İhtiyaç Analizi",
    description: "Müşteri gereksinimlerinin detaylı analizi ve proje kapsamının belirlenmesi."
  },
  {
    step: "02",
    icon: Cpu,
    title: "Tasarım & Ar-Ge",
    description: "TÜBİTAK destekli yerli tasarım ve araştırma-geliştirme çalışmaları."
  },
  {
    step: "03",
    icon: Wrench,
    title: "Üretim",
    description: "ISO sertifikalı tesislerimizde yüksek kaliteli yerli üretim."
  },
  {
    step: "04",
    icon: TestTube,
    title: "Test & Kalite",
    description: "EN50155, EN50121 standartlarında kapsamlı test süreçleri."
  },
  {
    step: "05",
    icon: CheckCircle,
    title: "Kurulum & Destek",
    description: "Anahtar teslim kurulum ve 7/24 teknik destek hizmetleri."
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[#1e3a5f] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-4">
            Çalışma Metodolojimiz
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Adım Adım Proje Süreci
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Her aşamada şeffaf iletişim ve kalite güvencesi ile projelerinizi hayata geçiriyoruz.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-white/20" />
          
          {/* Timeline Line - Mobile */}
          <div className="lg:hidden absolute top-0 bottom-0 left-7 w-0.5 bg-white/20" />
          
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-4">
            {steps.map((item, index) => (
              <div key={item.step} className="relative flex lg:flex-col items-start lg:items-center text-left lg:text-center">
                {/* Step Number Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-14 h-14 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  {/* Connector dot for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full" />
                  )}
                </div>
                
                {/* Content */}
                <div className="ml-6 lg:ml-0 lg:mt-8">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3 lg:mx-auto">
                    <item.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
