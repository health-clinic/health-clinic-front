import { format, formatDistanceToNowStrict, isToday, isYesterday } from "date-fns"
import { ptBR } from "date-fns/locale"

export function formatPhone(phone: string | undefined | null): string {
  if (!phone) return "+55 (00) 0 0000-0000"

  const numbers = phone.replace(/\D/g, "")

  if (numbers.length === 9) {
    const withAreaCode = "54" + numbers
    return `+55 (${withAreaCode.slice(0, 2)}) ${withAreaCode.slice(2, 3)} ${withAreaCode.slice(3, 7)}-${withAreaCode.slice(7)}`
  }

  if (numbers.length === 11) {
    return `+55 (${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7)}`
  }

  return phone
}

export function formatDocument(document: string | undefined | null): string {
  if (!document) return "000.000.000-00"

  const numbers = document.replace(/\D/g, "")

  if (numbers.length !== 11) return document

  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`
}

export function formatCNS(cns: string | undefined | null): string {
  if (!cns) return "000 0000 0000 0000"

  const numbers = cns.replace(/\D/g, "")

  if (numbers.length !== 15) return cns

  return `${numbers.slice(0, 3)} ${numbers.slice(3, 7)} ${numbers.slice(7, 11)} ${numbers.slice(11)}`
}

export function formatRelativeDate(date: Date): string {
  if (isToday(date)) {
    const distance = formatDistanceToNowStrict(date, {
      locale: ptBR,
      roundingMethod: "floor",
      addSuffix: false,
    })
      .replace("segundo", "segundo")
      .replace("minuto", "minuto")
      .replace("hora", "hora")
    
    return `Há ${distance}`
  }

  if (isYesterday(date)) {
    return "Ontem"
  }

  return format(date, "dd 'de' MMMM", { locale: ptBR })
}
