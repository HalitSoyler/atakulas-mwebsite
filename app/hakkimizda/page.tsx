"use client"

import { use } from "react"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Marquee } from "@/components/ui/marquee"

const certifications = [
  { name: "Yerli Malı Belgesi", description: "T.C. Sanayi ve Teknoloji Bakanlığı", src: "/images/certificates/Yerli_Mali.png" },
  { name: "TSE Hizmet Yeterlilik", description: "Türk Standartları Enstitüsü", src: "/images/certificates/TSE.png" },
  { name: "ISO 9001:2015", description: "Kalite Yönetim Sistemi", src: "/images/certificates/ISO_9001.jpg" },
  { name: "ISO 14001:2015", description: "Çevre Yönetim Sistemi", src: "/images/certificates/ISO_14001.jpg" },
  { name: "ISO 10002", description: "Müşteri Memnuniyeti Yönetimi", src: "/images/certificates/ISO_10002.jpg" },
]

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

const timelineItems = [
  { year: "1998", title: "Kuruluş — Bilişim Dönemi", desc: "Bilgisayar donanım ve yazılım alanında faaliyet. Teknik adaptasyon kültürünün temelleri atılıyor." },
  { year: "2000'ler", title: "Endüstriyel Dönüşüm", desc: "Raylı sistemlere yönelik özel yazılım ve donanım geliştirme alanına stratejik geçiş." },
  { year: "2010'lar", title: "Ekosistem Olgunluğu", desc: "IP Anons, PIS/PAS, İnterkom ve CCTV sistemlerinin tek bir çatıda entegre edilmesi." },
  { year: "Bugün", title: "Ar-Ge ve Gelecek", desc: "Kayseri Teknopark'ta sürdürülen araştırmalarla bir sonraki nesil akıllı ulaşım sistemleri şekilleniyor." },
]

const timelineItemsEn = [
  { year: "1998", title: "Foundation — IT Era", desc: "Activity in computer hardware and software. Laying the foundations of technical adaptation culture." },
  { year: "2000s", title: "Industrial Transformation", desc: "Strategic shift to custom software and hardware development for rail systems." },
  { year: "2010s", title: "Ecosystem Maturity", desc: "IP announcement, PIS/PAS, intercom and CCTV systems integrated under one roof." },
  { year: "Today", title: "R&D and Future", desc: "Next-generation smart transport systems taking shape through research at Kayseri Technopark." },
]

const locationCards = [
  {
    city: "Ankara",
    role: "Üretim & Genel Merkez",
    roleEn: "Production & Headquarters",
    badge: "Merkez",
    badgeEn: "HQ",
    desc: "Şirketin kalbi. Elektronik kart tasarımından sistem entegrasyonuna, kalite süreçlerinden teknik dokümantasyona kadar tüm üretim döngüsü burada yönetilir. Uluslararası demiryolu dayanıklılık standartlarına uygun montaj ve test altyapısı, Ankara merkezinde konuşlandırılmıştır.",
    descEn: "The heart of the company. The entire production cycle—from electronic board design to system integration, quality processes to technical documentation—is managed here. Assembly and test infrastructure compliant with international railway durability standards is deployed at the Ankara headquarters.",
    stats: ["Donanım üretimi ve sistem entegrasyonu", "Kalite güvence ve teknik dokümantasyon", "Proje yönetimi ve mühendislik desteği"],
  },
  {
    city: "İstanbul",
    role: "Mobil Projeler & Saha Operasyonları",
    roleEn: "Mobile Projects & Field Operations",
    badge: "Operasyon",
    badgeEn: "Operations",
    desc: "Türkiye'nin en yoğun raylı sistem trafiğinin tam merkezinde. İstanbul ofisi; aktif projelerde hızlı saha müdahalesi, devreye alma desteği ve sistem bakımı için kritik bir operasyon üssü olarak konumlanmıştır.",
    descEn: "At the heart of Turkey's busiest rail system traffic. The Istanbul office is positioned as a critical operations hub for rapid field intervention, commissioning support and system maintenance on active projects.",
    stats: ["Saha devreye alma ve teknik destek", "Metro ve hafif raylı sistem projeleri", "Hızlı müdahale ve bakım operasyonları"],
  },
  {
    city: "Kayseri",
    role: "Teknopark — Araştırma & Geliştirme",
    roleEn: "Technopark — Research & Development",
    badge: "Ar-Ge",
    badgeEn: "R&D",
    desc: "Geleceğin sistemleri burada tasarlanıyor. Kayseri Teknopark'taki Ar-Ge birimi; yazılım mimarisi, gömülü sistem geliştirme ve yeni nesil ulaşım teknolojileri üzerine yoğunlaşıyor.",
    descEn: "Tomorrow's systems are designed here. The R&D unit at Kayseri Technopark focuses on software architecture, embedded system development and next-generation transport technologies.",
    stats: ["Gömülü yazılım ve donanım geliştirme", "TÜBİTAK destekli Ar-Ge projeleri", "Akademik iş birlikleri ve inovasyon"],
  },
]

const capabilityCards = [
  {
    num: "01",
    title: "Yolcu Bilgilendirme — PIS/PAS",
    titleEn: "Passenger Information — PIS/PAS",
    desc: "Gerçek zamanlı hat bilgisi, sefer takibi ve çok dilli yönlendirme. Yolcu, aracın içinde nerede olduğunu, nereye gideceğini ve ne zaman ineceğini her zaman bilir.",
    descEn: "Real-time line information, trip tracking and multilingual guidance. The passenger always knows where they are, where they're going and when to get off.",
  },
  {
    num: "02",
    title: "IP İnterkom ve Anons Sistemleri",
    titleEn: "IP Intercom and Announcement Systems",
    desc: "Sürücü-yolcu ve tren-kontrol merkezi iletişimini kesintisiz yöneten altyapı. Acil durum anonslarından rutin yolculuk bildirimlerine uzanan tüm sesli iletişim tek bir platformdan sağlanır.",
    descEn: "Infrastructure that seamlessly manages driver-passenger and train-control center communication. All voice communication—from emergency announcements to routine journey notifications—is delivered from a single platform.",
  },
  {
    num: "03",
    title: "CCTV ve Güvenlik Gözetimi",
    titleEn: "CCTV and Security Surveillance",
    desc: "Araç içi ve araç dışı kamera sistemleri; titreşim, nem ve sıcaklık değişimlerine dayanıklı endüstriyel donanımlarla donatılmıştır.",
    descEn: "In-vehicle and external camera systems; equipped with industrial hardware resistant to vibration, humidity and temperature changes.",
  },
  {
    num: "04",
    title: "Uçtan Uca Yazılım Ekosistemi",
    titleEn: "End-to-End Software Ecosystem",
    desc: "Tüm sistemlerin arka planında çalışan, yerli olarak geliştirilen, sahada kanıtlanmış bir yazılım mimarisi. Üçüncü taraf bağımlılığı olmadan tam kontrol.",
    descEn: "A domestically developed, field-proven software architecture running behind all systems. Full control without third-party dependency.",
  },
]

const standardsBadges = [
  { code: "EN 50155", desc: "Raylı taşıt elektroniği için titreşim ve iklim dayanıklılığı", descEn: "Vibration and climate durability for rail vehicle electronics" },
  { code: "EN 50121-4", desc: "Sinyal ve iletişim cihazları için EMC uyumluluğu", descEn: "EMC compliance for signal and communication equipment" },
  { code: "Yerli Üretim", desc: "Tasarım, geliştirme ve üretimin tamamı Türkiye'de", descEn: "Design, development and production entirely in Turkey" },
  { code: "Teknopark Ar-Ge", desc: "Kayseri Teknopark'ta sürekli inovasyon ve geliştirme", descEn: "Continuous innovation and development at Kayseri Technopark" },
]

type PageProps = { params?: Promise<Record<string, string>>; searchParams?: Promise<Record<string, string>> }
export default function HakkimizdaPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const { t, language } = useLanguage()
  const isTr = language === "tr"
  const tlItems = isTr ? timelineItems : timelineItemsEn

  return (
    <main className="min-h-screen overflow-x-hidden bg-white dark:bg-[#0f172a]">
      {/* ─── HERO: Full-width overlay (UNCHANGED) ─── */}
      <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/tramway-showcase.jpg"
            alt="Atak Ulaşım — Raylı Sistem"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-[#0f172a]/20" />
        </div>
        <div className="relative z-10 pb-24 sm:pb-32 pt-32 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <ScrollReveal staggerIndex={0}>
            <p className="editorial-label text-[#38bdf8] mb-4">{t.about.pageTitle}</p>
            <h1 className="editorial-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
              {t.about.heroSlogan}
            </h1>
            <p className="editorial-lead mt-8 text-white/90 max-w-2xl mx-auto">
              {t.about.heroDesc}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ BÖLÜM 1 — EVRİM VE VİZYON ═══ */}
      <section className="py-16 sm:py-24 lg:py-28 bg-white dark:bg-[#0f172a] relative overflow-hidden">
        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[clamp(6rem,14vw,12rem)] font-serif font-semibold text-[#f8fafc] dark:text-[#1e293b]/50 pointer-events-none select-none">
          1998
        </span>
        <div className="mx-auto max-w-[1160px] px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <ScrollReveal staggerIndex={0}>
                <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-medium tracking-[0.16em] uppercase text-[#64748b] dark:text-[#94a3b8] mb-5">
                  <span className="w-5 h-px bg-[#38bdf8]" />
                  {t.about.evrimTag}
                </span>
              </ScrollReveal>
              <ScrollReveal staggerIndex={1}>
                <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-[#0f172a] dark:text-white leading-tight tracking-tight mb-6">
                  {t.about.evrimHeadline}
                </h2>
              </ScrollReveal>
              <ScrollReveal staggerIndex={2}>
                <p className="text-base leading-[1.85] text-[#334155] dark:text-[#94a3b8] font-light mt-7">
                  {t.about.evrimP1}
                </p>
              </ScrollReveal>
              <ScrollReveal staggerIndex={2}>
                <p className="text-base leading-[1.85] text-[#334155] dark:text-[#94a3b8] font-light mt-4">
                  {t.about.evrimP2}
                </p>
              </ScrollReveal>
              <ScrollReveal staggerIndex={3}>
                <blockquote className="border-l-2 border-[#38bdf8] pl-6 mt-9 font-serif text-lg italic text-[#1e293b] dark:text-[#94a3b8] leading-relaxed">
                  {t.about.evrimQuote}
                </blockquote>
              </ScrollReveal>
            </div>
            <ScrollReveal staggerIndex={1}>
              <div className="relative pl-4">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#e2e8f0] to-transparent dark:from-[#334155]" />
                {tlItems.map((item, i) => (
                  <div key={item.year} className="grid grid-cols-[48px_1fr] gap-5 pb-10 last:pb-0 relative">
                    <div className="w-8 h-8 rounded-full border border-[#e2e8f0] dark:border-white/10 bg-white dark:bg-[#0f172a] flex items-center justify-center shrink-0 relative z-10 group-hover:border-[#38bdf8] transition-colors">
                      <svg className="w-3.5 h-3.5 text-[#64748b] dark:text-[#94a3b8]" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-mono text-[0.72rem] tracking-wider text-[#64748b] dark:text-[#94a3b8] mb-1">{item.year}</div>
                      <div className="font-semibold text-[#0f172a] dark:text-white text-[0.95rem] mb-1">{item.title}</div>
                      <p className="text-sm leading-relaxed text-[#64748b] dark:text-[#94a3b8] font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ BÖLÜM 2 — STRATEJİK GÜÇ ODAKLARI ═══ */}
      <section className="py-16 sm:py-24 lg:py-28 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="mx-auto max-w-[1160px] px-6 lg:px-16 relative z-10">
          <div className="max-w-[640px] mb-16">
            <ScrollReveal staggerIndex={0}>
              <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-medium tracking-[0.16em] uppercase text-[#94a3b8] mb-5">
                <span className="w-5 h-px bg-[#38bdf8]" />
                {t.about.lokasyonlarTag}
              </span>
            </ScrollReveal>
            <ScrollReveal staggerIndex={1}>
              <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-white leading-tight mb-6">
                {t.about.lokasyonlarTitle}
              </h2>
            </ScrollReveal>
            <ScrollReveal staggerIndex={2}>
              <p className="text-[#94a3b8] text-[1.05rem] font-light leading-relaxed">
                {t.about.lokasyonlarDesc}
              </p>
            </ScrollReveal>
          </div>
          <div className="grid md:grid-cols-3 gap-px border border-white/[0.06] rounded-xl overflow-hidden">
            {locationCards.map((loc, i) => (
              <ScrollReveal key={loc.city} staggerIndex={i + 2}>
                <div className="group bg-white/[0.025] p-6 sm:p-8 hover:bg-white/[0.055] transition-colors duration-300">
                  <div className="flex items-start justify-between mb-7">
                    <div className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-[#38bdf8] transition-colors">
                      {loc.city === "Ankara" ? (
                        <svg className="w-5 h-5 text-[#94a3b8] group-hover:text-[#38bdf8] transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" />
                          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                          <line x1="12" y1="12" x2="12" y2="16" />
                          <line x1="10" y1="14" x2="14" y2="14" />
                        </svg>
                      ) : loc.city === "İstanbul" ? (
                        <svg className="w-5 h-5 text-[#94a3b8] group-hover:text-[#38bdf8] transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-[#94a3b8] group-hover:text-[#38bdf8] transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                    </div>
                    <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#64748b] border border-white/[0.08] px-2.5 py-1 rounded">
                      {isTr ? loc.badge : loc.badgeEn}
                    </span>
                  </div>
                  <div className="font-serif text-[1.7rem] font-medium text-white mb-1">{loc.city}</div>
                  <div className="font-mono text-[0.68rem] tracking-widest uppercase text-[#38bdf8] mb-5">
                    {isTr ? loc.role : loc.roleEn}
                  </div>
                  <p className="text-sm font-light leading-relaxed text-[#94a3b8]">
                    {isTr ? loc.desc : loc.descEn}
                  </p>
                  <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col gap-2">
                    {loc.stats.map((stat, j) => (
                      <div key={j} className="flex items-center gap-2 font-mono text-[0.72rem] text-[#64748b]">
                        <span className="w-1 h-1 rounded-full bg-[#38bdf8] shrink-0" />
                        {stat}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BÖLÜM 3 — MÜHENDİSLİK EKOSİSTEMİ ═══ */}
      <section className="py-16 sm:py-24 lg:py-28 bg-[#f4f7fa] dark:bg-[#0f172a]/50">
        <div className="mx-auto max-w-[1160px] px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16 lg:mb-20">
            <div>
              <ScrollReveal staggerIndex={0}>
                <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-medium tracking-[0.16em] uppercase text-[#64748b] dark:text-[#94a3b8] mb-5">
                  <span className="w-5 h-px bg-[#38bdf8]" />
                  {t.about.ekosistemTag}
                </span>
              </ScrollReveal>
              <ScrollReveal staggerIndex={1}>
                <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-[#0f172a] dark:text-white leading-tight">
                  {t.about.ekosistemHeadline}
                </h2>
              </ScrollReveal>
            </div>
            <div className="space-y-4">
              <ScrollReveal staggerIndex={2}>
                <p className="text-base leading-[1.85] font-light text-[#334155] dark:text-[#94a3b8]">
                  {isTr
                    ? "Raylı sistemlerde güvenilirlik, tek bir ürünün mükemmelliğiyle değil; birbirine sıkıca kenetlenmiş bir ekosistemin bütünlüğüyle ölçülür. Atak Ulaşım'ın geliştirdiği sistemler, her biri bağımsız bir mühendislik ürünü olmakla birlikte; yolcunun araçta geçirdiği deneyimi başından sonuna tek bir mimari içinde yönetir."
                    : "In rail systems, reliability is measured not by the perfection of a single product, but by the integrity of an ecosystem tightly knit together. The systems developed by Atak Ulaşım are each independent engineering products, while managing the passenger's in-vehicle experience from start to finish within a single architecture."}
                </p>
              </ScrollReveal>
              <ScrollReveal staggerIndex={2}>
                <p className="text-base leading-[1.85] font-light text-[#334155] dark:text-[#94a3b8]">
                  {isTr
                    ? "Yazılım ve donanımı aynı çatıda geliştirmek, entegrasyon sürtünmesini ortadan kaldırır. Bu, saha gerçekliğinde şuna dönüşür: daha az arıza, daha hızlı müdahale, daha öngörülebilir bir sistem ömrü."
                    : "Developing software and hardware under one roof eliminates integration friction. In the field, this translates to: fewer failures, faster response and a more predictable system lifetime."}
                </p>
              </ScrollReveal>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-px border border-[#0f172a]/10 dark:border-white/10 rounded-xl overflow-hidden bg-[#0f172a]/10 dark:bg-white/5">
            {capabilityCards.map((cap, i) => (
              <ScrollReveal key={cap.num} staggerIndex={i}>
                <div className="bg-white dark:bg-[#0f172a] p-6 sm:p-8 hover:bg-[#fafcff] dark:hover:bg-[#0f172a]/95 transition-colors relative group overflow-hidden">
                  <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] group-hover:w-full transition-all duration-300 ease-out" />
                  <div className="font-mono text-[0.68rem] tracking-widest text-[#94a3b8] mb-6">{cap.num} / 04</div>
                  <div className="w-11 h-11 border border-[#e2e8f0] dark:border-white/10 rounded-lg flex items-center justify-center mb-5 group-hover:border-[#38bdf8] group-hover:bg-[#38bdf8]/10 transition-colors">
                    {cap.num === "01" ? (
                      <svg className="w-5 h-5 text-[#64748b] dark:text-[#94a3b8] group-hover:text-[#38bdf8] transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    ) : cap.num === "02" ? (
                      <svg className="w-5 h-5 text-[#64748b] dark:text-[#94a3b8] group-hover:text-[#38bdf8] transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.6 19.79 19.79 0 0 1 1.61 4a2 2 0 0 1 1.99-2H6.5a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.08 6.08l.81-1.33a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16" />
                      </svg>
                    ) : cap.num === "03" ? (
                      <svg className="w-5 h-5 text-[#64748b] dark:text-[#94a3b8] group-hover:text-[#38bdf8] transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 7l-7 5 7 5V7z" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-[#64748b] dark:text-[#94a3b8] group-hover:text-[#38bdf8] transition-colors" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#0f172a] dark:text-white mb-3">{isTr ? cap.title : cap.titleEn}</h3>
                  <p className="text-sm font-light leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                    {isTr ? cap.desc : cap.descEn}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BÖLÜM 4 — KALİTE VE DAYANIKLILIK ═══ */}
      <section className="py-16 sm:py-24 lg:py-28 bg-white dark:bg-[#0f172a] border-t border-[#0f172a]/10 dark:border-white/5">
        <div className="mx-auto max-w-[1160px] px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
            <div>
              <ScrollReveal staggerIndex={0}>
                <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-medium tracking-[0.16em] uppercase text-[#64748b] dark:text-[#94a3b8] mb-5">
                  <span className="w-5 h-px bg-[#38bdf8]" />
                  {t.about.guvenilirlikTag}
                </span>
              </ScrollReveal>
              <ScrollReveal staggerIndex={1}>
                <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-[#0f172a] dark:text-white leading-tight mb-6">
                  {t.about.guvenilirlikHeadline}
                </h2>
              </ScrollReveal>
              <ScrollReveal staggerIndex={2}>
                <p className="text-base leading-[1.8] font-light text-[#334155] dark:text-[#94a3b8] max-w-[60ch] mt-6">
                  {t.about.guvenilirlikLead}
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-12">
                <ScrollReveal staggerIndex={1}>
                  <div>
                    <div className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold text-[#0f172a] dark:text-white leading-none">
                      25<span className="text-[1.25rem] text-[#38bdf8]">+</span>
                    </div>
                    <div className="text-sm font-normal text-[#64748b] dark:text-[#94a3b8] mt-1 tracking-wide">
                      {isTr ? "Yıllık Sektör Deneyimi" : "Years of Industry Experience"}
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal staggerIndex={2}>
                  <div>
                    <div className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold text-[#0f172a] dark:text-white leading-none">3</div>
                    <div className="text-sm font-normal text-[#64748b] dark:text-[#94a3b8] mt-1 tracking-wide">
                      {isTr ? "Stratejik Operasyon Merkezi" : "Strategic Operations Centers"}
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal staggerIndex={3}>
                  <div>
                    <div className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold text-[#0f172a] dark:text-white leading-none">
                      100<span className="text-[1.25rem] text-[#38bdf8]">%</span>
                    </div>
                    <div className="text-sm font-normal text-[#64748b] dark:text-[#94a3b8] mt-1 tracking-wide">
                      {isTr ? "Yerli Yazılım Geliştirme" : "Domestic Software Development"}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
            <ScrollReveal staggerIndex={2}>
              <div className="bg-[#0f172a] dark:bg-[#1e293b] rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="relative">
                  <h3 className="font-serif text-xl font-medium text-white mb-2">
                    {isTr ? "Kalite ve Dayanıklılık Standartları" : "Quality and Durability Standards"}
                  </h3>
                  <p className="text-sm font-light text-[#94a3b8] leading-relaxed mb-8">
                    {isTr
                      ? "Ürettiğimiz sistemler, demiryolu araçlarına özgü zorlu koşullar için tasarlanmış uluslararası endüstriyel standartları temel alır."
                      : "Our systems are based on international industrial standards designed for the demanding conditions specific to railway vehicles."}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {standardsBadges.map((badge, i) => (
                      <div
                        key={badge.code}
                        className="border border-white/[0.08] rounded-lg p-4 flex items-start gap-3 hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/5 transition-colors cursor-default"
                      >
                        <div className="w-8 h-8 rounded-md bg-[#38bdf8]/10 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-[#38bdf8]" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-mono text-[0.7rem] font-medium text-[#38bdf8] tracking-wider mb-0.5">{badge.code}</div>
                          <div className="text-[0.76rem] font-light text-[#94a3b8] leading-snug">{isTr ? badge.desc : badge.descEn}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ SERTİFİKALAR — New badge-style aligned with design ═══ */}
      <section className="py-16 sm:py-24 border-t border-[#0f172a]/10 dark:border-white/5 bg-white dark:bg-[#0f172a]">
        <div className="mx-auto max-w-[1160px] px-6 lg:px-16">
          <ScrollReveal staggerIndex={0} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] font-medium tracking-[0.16em] uppercase text-[#38bdf8] mb-4">
              <span className="w-5 h-px bg-[#38bdf8]" />
              {t.about.certificationsTitle}
            </span>
            <p className="text-[#64748b] dark:text-[#94a3b8] text-sm max-w-xl mx-auto mt-2">
              {isTr ? "Uluslararası standartlara uygun kalite belgeleri" : "Quality certificates compliant with international standards"}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.name} staggerIndex={i}>
                <div className="border border-[#0f172a]/10 dark:border-white/10 rounded-xl p-5 flex flex-col items-center text-center hover:border-[#38bdf8]/30 hover:bg-[#38bdf8]/5 transition-all duration-300 group">
                  <div className="relative w-full aspect-[3/4] min-h-[100px] rounded-lg overflow-hidden mb-4 bg-[#f8fafc] dark:bg-white/5 group-hover:bg-[#38bdf8]/5 transition-colors">
                    <Image
                      src={cert.src}
                      alt={`Atak Ulaşım — ${cert.name}`}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                  <div className="font-mono text-[0.7rem] font-medium text-[#38bdf8] tracking-wider mb-0.5">{cert.name}</div>
                  <p className="text-[0.75rem] font-light text-[#64748b] dark:text-[#94a3b8] leading-snug">{cert.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REFERANSLAR (UNCHANGED) ─── */}
      <section className="py-24 sm:py-32 border-t border-[#0f172a]/10 dark:border-white/5 bg-[#f4f7fa] dark:bg-[#0f172a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal staggerIndex={0} className="text-center mb-12">
            <p className="editorial-label text-[#38bdf8] mb-2">{t.clients.title}</p>
            <h2 className="text-xl font-semibold text-[#0f172a] dark:text-white">
              {isTr ? "Çözüm Ortaklarımız" : "Our Solution Partners"}
            </h2>
          </ScrollReveal>
          <div className="relative">
            <Marquee duration={40} pauseOnHover className="py-4">
              {referenceLogos.map((ref) => (
                <div
                  key={ref.name}
                  className="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-[#0f172a]/10 dark:border-white/10 bg-white dark:bg-white/5 px-4"
                >
                  <Image
                    src={ref.src}
                    alt={`Atak Ulaşım — ${ref.name}`}
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
