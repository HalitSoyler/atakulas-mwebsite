"use client"
import { makeProjectPage } from "@/components/project-detail-page"

export default makeProjectPage({
  title:    { tr: "İstanbul Mobil Otobüs Sistemleri", en: "Istanbul Mobile Bus Systems" },
  client:   "IETT Genel Müdürlüğü",
  location: "İstanbul",
  year:     "2020–2024",
  summary: {
    tr: "İstanbul'un 5.000'den fazla toplu taşıma aracı için CCTV, PIS/PAS ve LED güzergah panellerini kapsayan Türkiye'nin en büyük filo dönüşüm projelerinden biri.",
    en: "One of Turkey's largest fleet transformation projects, covering CCTV, PIS/PAS and LED route panels for over 5,000 Istanbul public transport vehicles.",
  },
  scope: {
    tr: [
      "30.000 adet araç için CCTV kamera sistemi tasarımı ve üretimi",
      "PIS/PAS yolcu bilgilendirme sistemi donanımları",
      "LED güzergah panelleri",
      "Sürücü kontrol ünitelerinin tasarımı ve üretimi",
      "Merkezi yönetim yazılımı geliştirme",
      "Sistem entegrasyonu ve kurulum",
      "Teknik destek ve bakım hizmetleri",
    ],
    en: [
      "CCTV camera system design and production for 30,000 vehicles",
      "PIS/PAS passenger information system hardware",
      "LED route panels",
      "Driver control unit design and production",
      "Central management software development",
      "System integration and installation",
      "Technical support and maintenance services",
    ],
  },
  technical: {
    tr: [
      "Kamera Sayısı: 30.000+ adet",
      "Araç Sayısı: 5.000+ otobüs",
      "Veri Depolama: Merkezi sunucu sistemi",
      "Bağlantı: 4G/LTE kablosuz iletişim",
      "Yazılım: Özel geliştirilmiş filo yönetim yazılımı",
      "Standartlar: EN 50155, EN 45545 uyumlu",
    ],
    en: [
      "Camera Count: 30,000+ units",
      "Vehicle Count: 5,000+ buses",
      "Data Storage: Central server system",
      "Connectivity: 4G/LTE wireless communication",
      "Software: Custom developed fleet management software",
      "Standards: EN 50155, EN 45545 compliant",
    ],
  },
  about: {
    tr: "Bu proje kapsamında İstanbul Elektrik Tramvay ve Tünel (İETT) İşletmeleri Genel Müdürlüğü'ne bağlı toplu taşıma araçlarının tamamına CCTV güvenlik kamera sistemleri, yolcu bilgilendirme sistemleri (PIS/PAS) ve LED güzergah panelleri sağlanmıştır.",
    en: "Within the scope of this project, CCTV security camera systems, passenger information systems (PIS/PAS) and LED route panels were provided to all public transport vehicles affiliated to Istanbul Electric Tramway and Tunnel (IETT) Enterprises General Directorate.",
  },
  about2: {
    tr: "Sistem, merkezi yönetim yazılımı ile entegre çalışarak gerçek zamanlı izleme, kayıt ve raporlama imkânı sunmaktadır. Tüm donanımlar EN 50155 ve EN 45545 standartlarına uygun olarak üretilmiş olup araç içi zorlu koşullara dayanıklıdır.",
    en: "The system works integrated with central management software, offering real-time monitoring, recording and reporting capabilities. All hardware is manufactured in accordance with EN 50155 and EN 45545 standards and is resistant to harsh in-vehicle conditions.",
  },
  images:        ["/images/projects/istanbul.jpg"],
  metric:        { value: "30.000+", label: { tr: "IP Kamera", en: "IP Cameras" } },
  progress:      100,
  progressLabel: { tr: "Tamamlandı", en: "Completed" },
  tags:          ["CCTV", "PIS/PAS", "LED Güzergah", "GPS"],
  certifications: ["EN 50155", "EN 45545"],
})
