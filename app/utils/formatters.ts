export function formatPhone(phone: string | undefined | null): string {
  if (!phone) return "+55 (00) 0 0000-0000"

  const numbers = phone.replace(/\D/g, "")

  if (numbers.length !== 11) return phone

  return `+55 (${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7)}`
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
