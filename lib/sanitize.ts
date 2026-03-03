export function sanitizeInput(
  value: unknown,
  maxLength = 1000,
): string {
  if (typeof value !== "string") {
    return ""
  }

  let cleaned = value
    .replace(/\0/g, "")
    .trim()

  if (maxLength > 0 && cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength)
  }

  cleaned = cleaned.replace(/<\s*\/?\s*script\b[^>]*>/gi, "")
  cleaned = cleaned.replace(/on\w+\s*=\s*(['"]).*?\1/gi, "")

  return cleaned
}

export function sanitizeEmail(value: unknown): string {
  const email = sanitizeInput(value, 254)
  const basicEmailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!basicEmailRegex.test(email)) {
    return ""
  }

  return email
}

export function sanitizePhone(value: unknown): string {
  if (typeof value !== "string") {
    return ""
  }

  const digits = value.replace(/[^\d+]/g, "")

  if (digits.length < 7 || digits.length > 20) {
    return ""
  }

  return digits
}

export function honeypotTriggered(value: unknown): boolean {
  if (typeof value !== "string") {
    return false
  }

  return value.trim().length > 0
}

