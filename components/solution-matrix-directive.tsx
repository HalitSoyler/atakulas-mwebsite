"use client"

import Link from "next/link"
import { Sun, Home, Shield, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const FEATURED_SPECS = [
  "Merkezi yazılım omurgası",
  "Üçüncü taraf bağımlılığı yok",
  "Gerçek zamanlı sistem yönetimi",
  "Hızlı güncelleme ve özelleştirme",
]

const CARDS = [
  {
    category: "Kat 01",
    title: "Yolcu Bilgilendirme",
    description: "Hat, durak ve sefer bilgisini gerçek zamanlı yöneten platform. Çok dilli, görsel ve işitsel entegrasyon.",
    icon: Home,
    href: "/urunlerimiz",
  },
  {
    category: "Kat 02",
    title: "Güvenlik ve Gözetim",
    description: "Endüstriyel CCTV sistemleri. Titreşim, nem ve geniş sıcaklık aralıklarına dayanıklı araç içi/dışı izleme.",
    icon: Shield,
    href: "/urunlerimiz",
  },
  {
    category: "Kat 03",
    title: "İletişim Altyapısı",
    description: "IP Anons ve IP İnterkom sistemleri. Sürücü-yolcu-kontrol merkezi üçgeninde kesintisiz iletişim.",
    icon: Phone,
    href: "/urunlerimiz",
  },
]

export function SolutionMatrixDirective() {
  return (
    <section
      data-section="solutions"
      data-header-theme="light"
      className="bg-[var(--gray-50)] py-[clamp(5rem,9vw,9rem)]"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Header: 2-col */}
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="sr d1">
            <p
              className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[var(--tech-blue)]"
              style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
            >
              Çözüm Mimarisi
            </p>
            <h2
              className="font-display text-[var(--navy-dark)] uppercase leading-tight"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Bütünleşik Sistem Matrisi
            </h2>
          </div>
          <p
            className="sr d2 text-base leading-[1.8] text-[var(--gray-500)]"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}
          >
            Atak Ulaşım&apos;ın geliştirdiği çözümler, bağımsız ürünler olarak değil, birbirine entegre bir ekosistem
            olarak tasarlanır. <strong>Her bileşen, bir sonrakinin güvenilirliğini pekiştirir.</strong> Sonuç: yolcunun
            farkında bile olmadığı, kesintisiz bir ulaşım deneyimi.
          </p>
        </div>

        {/* Matrix grid: 3 cols on md+, single col below 900px */}
        <div className="grid gap-px rounded overflow-hidden bg-[var(--gray-200)] grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Featured card — span 2 rows on md+ */}
          <div
            className="relative flex flex-col bg-[var(--navy-dark)] p-8 md:row-span-2"
            style={{ borderLeft: "3px solid var(--tech-blue)" }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border border-white/15">
              <Sun className="h-6 w-6 text-[var(--tech-blue)]" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </div>
            <p
              className="mb-2 text-[0.65rem] font-medium uppercase tracking-wider text-white/35"
              style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
            >
              Merkez Platform
            </p>
            <h3
              className="mb-4 font-display text-lg font-bold uppercase leading-snug text-white"
              style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}
            >
              Uçtan Uca Yazılım Ekosistemi
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-white/65" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}>
              Tüm sistemlerin paylaştığı merkezi yazılım omurgası. Üçüncü taraf bağımlılığı olmadan tasarlanan bu platform; hızlı
              güncelleme, özelleştirme ve gerçek zamanlı sistem yönetimini tek bir mimariden sağlar.
            </p>
            <ul className="mb-6 space-y-2" style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>
              {FEATURED_SPECS.map((s) => (
                <li key={s} className="flex items-center gap-2 text-xs text-white/30">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--tech-blue)]" />
                  {s}
                </li>
              ))}
            </ul>
            <Link
              href="/urunlerimiz"
              className="mt-auto text-[0.65rem] font-medium uppercase tracking-wider text-[var(--tech-blue)] transition-colors hover:underline"
              style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
            >
              Teknik Detaylar →
            </Link>
          </div>

          {/* Light cards — cards 2 & 3 row 1, card 4 spans row 2 */}
          {CARDS.map((card, i) => (
            <SolutionCard key={card.title} {...card} spanBottom={i === 2} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionCard({
  category,
  title,
  description,
  icon: Icon,
  href,
  spanBottom,
}: {
  category: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; strokeLinecap?: string; strokeLinejoin?: string }>
  href: string
  spanBottom?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col bg-white p-6 transition-all duration-350 hover:bg-[#FAFBFD]",
        spanBottom && "md:col-span-2"
      )}
    >
      <span
        className="absolute left-0 top-0 h-full w-[3px] origin-center scale-y-0 bg-[var(--tech-blue)] transition-transform duration-400 ease-out group-hover:scale-y-100"
        style={{ transformOrigin: "center" }}
      />
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded border border-[var(--gray-200)] bg-[var(--gray-50)] transition-all duration-300 group-hover:border-[var(--tech-blue)] group-hover:bg-[var(--tech-blue-pale)]">
        <Icon className="h-6 w-6 text-[var(--gray-500)] transition-colors group-hover:text-[var(--tech-blue)]" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </div>
      <p
        className="mb-1 text-[0.65rem] font-medium uppercase tracking-wider text-[var(--gray-500)]"
        style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
      >
        {category}
      </p>
      <h3
        className="mb-2 font-display text-[1.35rem] font-bold uppercase text-[var(--navy-dark)]"
        style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}
      >
        {title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-[var(--gray-600)]" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}>
        {description}
      </p>
      <span
        className="mt-auto text-[0.65rem] font-medium uppercase tracking-wider text-[var(--tech-blue)] transition-colors group-hover:underline"
        style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
      >
        İncele →
      </span>
    </Link>
  )
}
