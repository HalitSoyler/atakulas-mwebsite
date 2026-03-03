import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hakkımızda | Atak Ulaşım",
  description:
    "1998'den beri raylı sistem ekipmanları ve elektronik çözümler. Ankara, İstanbul ve Kayseri Teknopark'ta PIS/PAS, CCTV, IP Anons ve Ar-Ge.",
  openGraph: {
    title: "Hakkımızda | Atak Ulaşım",
    description:
      "1998'den beri raylı sistem ekipmanları ve elektronik çözümler. Ankara, İstanbul ve Kayseri Teknopark'ta PIS/PAS, CCTV, IP Anons ve Ar-Ge.",
  },
}

export default function HakkimizdaLayout({ children }: { children: React.ReactNode }) {
  return children
}
