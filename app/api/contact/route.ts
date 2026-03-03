import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"

import { checkRateLimit } from "@/lib/rate-limit"
import {
  honeypotTriggered,
  sanitizeEmail,
  sanitizeInput,
  sanitizePhone,
} from "@/lib/sanitize"

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10).max(2000),
  honeypot: z.string().optional(),
})

function getClientIp(req: NextRequest): string {
  const xff =
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip")

  if (xff) {
    return xff.split(",")[0]?.trim()
  }

  return "unknown"
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    const { allowed } = checkRateLimit(
      `contact:${ip}`,
      {
        windowMs: 60_000,
        maxRequests: 5,
      },
    )

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.",
        },
        { status: 429 },
      )
    }

    const body = await req.json().catch(() => null)

    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Gönderdiğiniz bilgiler doğrulanamadı. Lütfen alanları kontrol edip tekrar deneyin.",
        },
        { status: 400 },
      )
    }

    const data = parsed.data

    if (honeypotTriggered(data.honeypot)) {
      return NextResponse.json(
        { success: true },
        { status: 200 },
      )
    }

    const firstName = sanitizeInput(
      data.firstName,
      100,
    )
    const lastName = sanitizeInput(
      data.lastName,
      100,
    )
    const email = sanitizeEmail(data.email)
    const phone = sanitizePhone(data.phone)
    const company = sanitizeInput(
      data.company ?? "",
      200,
    )
    const service = sanitizeInput(
      data.service ?? "",
      100,
    )
    const message = sanitizeInput(
      data.message,
      2000,
    )

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Zorunlu alanlar eksik veya geçersiz.",
        },
        { status: 400 },
      )
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Mesaj içeriği geçersiz görünüyor.",
        },
        { status: 400 },
      )
    }

    // Burada isteğe göre e-posta gönderimi,
    // ticket oluşturma veya loglama gibi işlemler yapılabilir.
    // Güvenlik açısından, kullanıcıya teknik detay
    // döndürmüyoruz.

    return NextResponse.json(
      {
        success: true,
        message:
          "Mesajınız başarıyla alındı. En kısa sürede size dönüş yapacağız.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error", error)

    return NextResponse.json(
      {
        success: false,
        error:
          "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      },
      { status: 500 },
    )
  }
}

