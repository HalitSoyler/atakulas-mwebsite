"use client"

import { use } from "react"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Marquee } from "@/components/ui/marquee"
import { AnimatedCounter } from "@/components/ui/animated-counter"

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

type PageProps = { params?: Promise<Record<string, string | string[]>>; searchParams?: Promise<Record<string, string | string[]>> }
export default function HakkimizdaPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const { t, language } = useLanguage()
  const isTr = language === "tr"

  const stats = [
    { value: 31, suffix: "+", label: t.about.statsYears, labelEn: "Years of Experience" },
    { value: 1500, suffix: "+", label: t.about.statsVehicles, labelEn: "Vehicle Fleet" },
    { value: 8000, suffix: "+", label: t.about.statsPassengers, labelEn: "Daily Passenger Capacity" },
    { value: 120, suffix: "+", label: t.about.statsContracts, labelEn: "Active Contracts" },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden bg-white dark:bg-[#0f172a]">
      {/* ─── HERO: Full-width overlay ─── */}
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

      {/* ─── STATS: Full-width strip ─── */}
      <section className="relative py-20 sm:py-24 border-y border-stone-200 dark:border-white/5 bg-stone-50 dark:bg-[#0f172a]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} staggerIndex={i}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-semibold text-[#38bdf8] editorial-heading">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} locale={isTr ? "tr-TR" : "en-US"} />
                  </div>
                  <p className="mt-3 text-sm text-stone-600 dark:text-white/60 editorial-label tracking-widest">
                    {isTr ? stat.label : stat.labelEn}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOCK 1: Kağıthane Ar-Ge (dark option — always dark) ─── */}
      <section className="relative min-h-[80vh] flex flex-col lg:flex-row bg-[#0f172a]">
        <div className="lg:w-1/2 relative min-h-[50vh] lg:min-h-[80vh]">
          <div className="sticky top-20 h-[50vh] lg:h-[80vh]">
            <Image
              src="/images/tramway-showcase.jpg"
              alt="Kağıthane Ar-Ge Merkezi — Raylı sistem ekipmanları"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] to-transparent lg:from-transparent lg:via-transparent lg:to-[#0f172a]" />
          </div>
        </div>
        <div className="lg:w-1/2 flex items-center py-20 lg:py-32 px-6 lg:px-16 xl:px-24">
          <ScrollReveal staggerIndex={0} className="max-w-xl">
            <p className="editorial-label text-[#38bdf8] mb-4">
              {isTr ? "Kağıthane Ar-Ge Merkezi" : "Kağıthane R&D Center"}
            </p>
            <h2 className="editorial-heading text-3xl sm:text-4xl font-semibold text-white mb-8">
              {isTr ? "Atak Ulaşım ve Elektronik" : "Atak Transportation and Electronics"}
            </h2>
            <div className="editorial-body space-y-6 text-white/80 text-base">
              <p>
                {isTr
                  ? "Kağıthane'deki Ar-Ge merkezimiz, Türkiye'nin raylı sistem alanındaki teknoloji üssüdür. Metro, tramvay ve metrobüsler için yolcu bilgilendirme sistemlerinden donanım tasarımına, yerli kart üretiminden gömülü yazılım geliştirmeye uzanan süreç, bir mühendislik destanına dönüşür."
                  : "Our R&D center in Kağıthane is Turkey's technology hub in the rail sector. The journey from hardware design to domestic board production for metro, tram and BRT vehicles—from passenger information systems to embedded software development—becomes an engineering epic."}
              </p>
              <p>
                {isTr
                  ? "Sinyalizasyon ve kontrol sistemleri alanında EN 50155, EN 50121 standartlarına uygun tasarım, otomatik anons ve güvenlik kamera sistemlerinde tam entegrasyon. Yerli üretim, gömülü yazılım ve sinyalizasyon mühendisliği bu birimin omurgasını oluşturur."
                  : "Signaling and control systems compliant with EN 50155 and EN 50121 standards, full integration in automatic announcement and security camera systems. Domestic production, embedded software and signaling engineering form the backbone of this unit."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BLOCK 2: Atak Turizm — Metin sol, görsel sağ ─── */}
      <section className="relative min-h-[80vh] flex flex-col lg:flex-row-reverse bg-white dark:bg-[#0f172a]">
        <div className="lg:w-1/2 relative min-h-[50vh] lg:min-h-[80vh]">
          <div className="sticky top-20 h-[50vh] lg:h-[80vh] bg-stone-200 dark:bg-[#1e293b]">
            {/* Placeholder: bus/fleet — gradient + geometric pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(rgba(56,189,248,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(56,189,248,0.15) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 to-[#0f172a]" />
          </div>
        </div>
        <div className="lg:w-1/2 flex items-center py-20 lg:py-32 px-6 lg:px-16 xl:px-24">
          <ScrollReveal staggerIndex={0} className="max-w-xl ml-auto">
            <p className="editorial-label text-[#38bdf8] mb-4">
              {isTr ? "Personel ve VIP Taşımacılığı" : "Staff and VIP Transportation"}
            </p>
            <h2 className="editorial-heading text-3xl sm:text-4xl font-semibold text-[#0f172a] dark:text-white mb-8">
              {isTr ? "Atak Turizm" : "Atak Tourism"}
            </h2>
            <div className="editorial-body space-y-6 text-stone-600 dark:text-white/80 text-base">
              <p>
                {isTr
                  ? "Günlük 8.000 yolcu kapasitesi sadece bir rakam değil; devasa bir operasyonel gücün somut ifadesidir. 120'den fazla aktif sözleşme ile kurumsal personel taşımacılığında ve VIP transfer hizmetlerinde güven temel değerdir."
                  : "8,000 daily passenger capacity is not merely a number; it is the concrete expression of a massive operational force. With over 120 active contracts, trust is the core value in corporate staff transportation and VIP transfer services."}
              </p>
              <p>
                {isTr
                  ? "Düzenli hat seferleri ve özel charter hizmetlerinde zamanında teslimat, operasyonel mükemmelliğin ölçüsüdür. Her yolcu, her sefer, güvenilir bir taahhüttür."
                  : "On-time delivery in scheduled line services and private charter is the measure of operational excellence. Every passenger, every trip, is a promise kept."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BLOCK 3: Atak Lojistik & AtakTrans — Görsel sol, metin sağ ─── */}
      <section className="relative min-h-[80vh] flex flex-col lg:flex-row bg-white dark:bg-[#0f172a]">
        <div className="lg:w-1/2 relative min-h-[50vh] lg:min-h-[80vh]">
          <div className="sticky top-20 h-[50vh] lg:h-[80vh] bg-stone-200 dark:bg-[#1e293b]">
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(56,189,248,0.08) 20px, rgba(56,189,248,0.08) 21px)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/40 to-[#0f172a]" />
          </div>
        </div>
        <div className="lg:w-1/2 flex items-center py-20 lg:py-32 px-6 lg:px-16 xl:px-24">
          <ScrollReveal staggerIndex={0} className="max-w-xl">
            <p className="editorial-label text-[#38bdf8] mb-4">
              {isTr ? "Kıtalararası Köprü" : "Transcontinental Bridge"}
            </p>
            <h2 className="editorial-heading text-3xl sm:text-4xl font-semibold text-[#0f172a] dark:text-white mb-8">
              {isTr ? "Atak Lojistik & AtakTrans" : "Atak Logistics & AtakTrans"}
            </h2>
            <div className="editorial-body space-y-6 text-stone-600 dark:text-white/80 text-base">
              <p>
                {isTr
                  ? "31 yıllık deneyim ve 1.500'den fazla araçlık filo, Türkiye'nin lojistik omurgasında stratejik bir konum işaret eder. Ulusal ve uluslararası kara, deniz ve havayolu entegrasyonu ile multimodal taşımacılık, küresel ağ derinliğinin temelidir."
                  : "31 years of experience and a fleet of over 1,500 vehicles mark a strategic position on Turkey's logistics backbone. Multimodal transport with national and international road, sea and air integration is the foundation of global network depth."}
              </p>
              <p>
                {isTr
                  ? "Tedarik zinciri yönetiminde uzmanlaşmış multimodal çözümler, proje bazlı taşımacılıktan depolama ve dağıtıma kadar uçtan uca operasyonel mükemmellik sunar. Her kilometre, güvenilir bir köprüdür."
                  : "Multimodal solutions specializing in supply chain management deliver end-to-end operational excellence from project-based transport to warehousing and distribution. Every kilometer is a bridge of trust."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BLOCK 4: Atak Filo — Metin sol, görsel sağ ─── */}
      <section className="relative min-h-[80vh] flex flex-col lg:flex-row-reverse bg-white dark:bg-[#0f172a]">
        <div className="lg:w-1/2 relative min-h-[50vh] lg:min-h-[80vh]">
          <div className="sticky top-20 h-[50vh] lg:h-[80vh] bg-stone-200 dark:bg-[#1e293b]">
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 30% 70%, rgba(56,189,248,0.12) 0%, transparent 50%),
                  radial-gradient(circle at 70% 30%, rgba(34,197,94,0.08) 0%, transparent 40%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/50 to-[#0f172a]" />
          </div>
        </div>
        <div className="lg:w-1/2 flex items-center py-20 lg:py-32 px-6 lg:px-16 xl:px-24">
          <ScrollReveal staggerIndex={0} className="max-w-xl ml-auto">
            <p className="editorial-label text-[#38bdf8] mb-4">
              {isTr ? "Gelecek Vizyonu" : "Future Vision"}
            </p>
            <h2 className="editorial-heading text-3xl sm:text-4xl font-semibold text-[#0f172a] dark:text-white mb-8">
              {isTr ? "Atak Filo" : "Atak Fleet"}
            </h2>
            <div className="editorial-body space-y-6 text-stone-600 dark:text-white/80 text-base">
              <p>
                {isTr
                  ? "İş makinesi ve ekipman kiralama hizmetleri, altyapı projelerinin temelidir. Sürdürülebilir atık yönetimi ise grubun gelecek vizyonunu taşır."
                  : "Construction equipment and machinery rental services are the foundation of infrastructure projects. Sustainable waste management carries the group's vision for the future."}
              </p>
              <p>
                {isTr
                  ? "Çevre dostu operasyonlar ve döngüsel ekonomi odaklı çözümler, Atak Filo'yu sadece bir kiralama birimi olmaktan çıkarıp sürdürülebilir lojistiğin parçası kılar."
                  : "Eco-friendly operations and circular economy focused solutions elevate Atak Fleet beyond a rental unit to become part of sustainable logistics."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BLOCK 5: Ar-Ge & İnovasyon — GRAND FINALE: Full-width overlay ─── */}
      <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/tramway-showcase.jpg"
            alt="Kağıthane Ar-Ge ve İnovasyon Merkezi"
            fill
            className="object-cover scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-[#0f172a]/30" />
        </div>
        <div className="relative z-10 pb-24 sm:pb-32 pt-40 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <ScrollReveal staggerIndex={0}>
            <p className="editorial-label text-[#38bdf8] mb-4">
              {isTr ? "Grubun Teknolojik Kalbi" : "The Group's Technological Heart"}
            </p>
            <h2 className="editorial-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
              {isTr ? "Ar-Ge & İnovasyon Merkezi" : "R&D & Innovation Center"}
            </h2>
            <p className="editorial-lead mt-8 text-white/90 max-w-2xl mx-auto">
              {isTr
                ? "Kağıthane'deki üs, grubun teknolojik kalbidir. Yolcu bilgilendirme sistemleri, otomatik anons ve güvenlik kamera sistemlerinde uluslararası standartlara uygun tasarım ve üretim. Sinyalizasyon mühendisliği ve yerli üretim odaklı Ar-Ge faaliyetleri burada hayat bulur."
                : "The hub in Kağıthane is the group's technological heart. Design and manufacturing compliant with international standards in passenger information, automatic announcement and security camera systems. Signaling engineering and domestic production focused R&D activities come to life here."}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Kalite ve Etik: Bulk text editorial ─── */}
      <section className="py-24 sm:py-32 bg-stone-50 dark:bg-[#0f172a] border-t border-stone-200 dark:border-white/5">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <ScrollReveal staggerIndex={0} className="text-center mb-16">
            <p className="editorial-label text-[#38bdf8] mb-4">{t.about.qualityTitle}</p>
            <h2 className="editorial-heading text-2xl sm:text-3xl font-semibold text-[#0f172a] dark:text-white">
              {t.about.qualityTitle}
            </h2>
          </ScrollReveal>
          <div className="editorial-body space-y-8 text-stone-600 dark:text-white/80 text-base">
            <ScrollReveal staggerIndex={1}>
              <p>
                {isTr
                  ? "ISO 9001:2015 standartlarında kalite yönetimi, tüm operasyonlarımızın temelidir. Uluslararası kalite yönetim standartlarına uygun süreçler ve belgelendirme, müşterilerimize verdiğimiz sözün somut kanıtıdır."
                  : "Quality management per ISO 9001:2015 standards is the foundation of all our operations. Processes and certification compliant with international quality management standards are the concrete proof of our promise to customers."}
              </p>
            </ScrollReveal>
            <ScrollReveal staggerIndex={2}>
              <p>
                {isTr
                  ? "Kişiye Bağımsızlık ilkesi, kararlarımızı müşteri ilişkilerinden bağımsız, nesnel kriterlere dayandırır. Yasal ve Etik Kalmak mottosu ise tüm operasyonlarımızda yasal düzenlemelere ve etik standartlara tam uyum anlamına gelir."
                  : "The Independence from Individuals principle bases our decisions on objective criteria, independent of client relationships. The motto of Staying Legal and Ethical means full compliance with legal regulations and ethical standards in all our operations."}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Sertifikalar: Editorial strip ─── */}
      <section className="py-20 sm:py-24 border-t border-stone-200 dark:border-white/5 bg-white dark:bg-[#0f172a]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <ScrollReveal staggerIndex={0} className="text-center mb-12">
            <p className="editorial-label text-[#38bdf8] mb-2">
              {isTr ? "Sertifikalarımız" : "Our Certificates"}
            </p>
            <p className="text-stone-600 dark:text-white/60 editorial-body max-w-xl mx-auto">
              {isTr ? "Uluslararası standartlara uygun kalite belgeleri" : "Quality certificates compliant with international standards"}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.name} staggerIndex={i}>
                <div className="flex flex-col items-center text-center p-6 rounded-lg border border-stone-200 dark:border-white/10 bg-stone-50 dark:bg-white/5">
                  <div className="aspect-[3/4] relative w-full min-h-[120px] rounded overflow-hidden mb-4">
                    <Image
                      src={cert.src}
                      alt={`Atak Ulaşım — ${cert.name}`}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                  <h3 className="font-medium text-[#0f172a] dark:text-white text-sm">{cert.name}</h3>
                  <p className="text-xs text-stone-500 dark:text-white/50 mt-1">{cert.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Referanslar ─── */}
      <section className="py-24 sm:py-32 border-t border-stone-200 dark:border-white/5 bg-stone-50 dark:bg-[#0f172a]">
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
                  className="flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 px-4"
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
