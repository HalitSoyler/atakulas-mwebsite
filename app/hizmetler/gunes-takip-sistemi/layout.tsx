import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Güneş Takip Sistemi | Atak Ulaşım",
  description:
    "Güneşi takip eden fotovoltaik sistem. %25'e varan verim artışı, yerli tasarım, hava koşullarına otomatik uyum. Web tabanlı izleme.",
  openGraph: {
    title: "Güneş Takip Sistemi | Atak Ulaşım",
    description:
      "Güneş takip sistemleri ile enerji üretimini artırın. Yerli üretim, 10 yıl garanti.",
  },
}

export default function GunesTakipSistemiLayout({ children }: { children: React.ReactNode }) {
  return children
}
