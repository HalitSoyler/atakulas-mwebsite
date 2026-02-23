"use client"
import { makeProjectPage } from "@/components/project-detail-page"

export default makeProjectPage({
  title:    { tr: "Van Mobil Ulaşım Projesi", en: "Van Mobile Transport Project" },
  client:   "Van Büyükşehir Belediyesi",
  location: "Van",
  year:     "2022–2023",
  summary: {
    tr: "100'den fazla belediye otobüsü için entegre CCTV, GPS filo yönetimi ve yolcu bilgilendirme sistemlerinin tasarım, üretim ve kurulumu.",
    en: "Design, production and installation of integrated CCTV, GPS fleet management and passenger information systems for 100+ municipal buses.",
  },
  scope: {
    tr: ["100+ araç için CCTV kamera sistemi","Yolcu bilgilendirme sistemi (PIS/PAS)","İnterkom sistemleri","GPS takip ve filo yönetimi","Merkezi izleme yazılımı","Kurulum ve devreye alma"],
    en: ["CCTV camera system for 100+ vehicles","Passenger information system (PIS/PAS)","Intercom systems","GPS tracking and fleet management","Central monitoring software","Installation and commissioning"],
  },
  technical: {
    tr: ["Araç Sayısı: 100+ otobüs","Kamera Tipi: IP tabanlı HD kameralar","Bağlantı: 4G/LTE kablosuz iletişim","GPS Doğruluğu: < 3 metre","Depolama: Araç içi DVR + Merkezi sunucu"],
    en: ["Vehicle Count: 100+ buses","Camera Type: IP-based HD cameras","Connectivity: 4G/LTE wireless communication","GPS Accuracy: < 3 meters","Storage: In-vehicle DVR + Central server"],
  },
  about: {
    tr: "Van Büyükşehir Belediyesi toplu taşıma araçları için entegre yolcu bilgilendirme ve güvenlik sistemleri sağlanmıştır.",
    en: "Integrated passenger information and security systems were provided for Van Metropolitan Municipality public transport vehicles.",
  },
  images:        ["/images/projects/van.jpg"],
  metric:        { value: "100+", label: { tr: "Araç", en: "Vehicles" } },
  progress:      100,
  progressLabel: { tr: "Tamamlandı", en: "Completed" },
  tags:          ["CCTV", "GPS", "PIS/PAS"],
})
