import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elektrikli Otobüs Çözümleri | Atak Ulaşım",
  description:
    "Elektrikli otobüs için PIS/PAS, enerji yönetimi, bakım ve operasyon yazılımları. Sürdürülebilir toplu taşıma teknolojileri.",
  openGraph: {
    title: "Elektrikli Otobüs Çözümleri | Atak Ulaşım",
    description:
      "Elektrikli otobüs için yolcu bilgilendirme ve operasyon çözümleri.",
  },
}

export default function ElektrikliOtobusLayout({ children }: { children: React.ReactNode }) {
  return children
}
