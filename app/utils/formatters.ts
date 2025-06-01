export function formatPhone(phone: string | undefined | null): string {
  if (!phone) return "Não informado"

  const numbers = phone.replace(/\D/g, "")

  if (numbers.length !== 11) return phone

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7)}`
}

export function formatDocument(document: string | undefined | null): string {
  if (!document) return "Não informado"

  const numbers = document.replace(/\D/g, "")

  if (numbers.length !== 11) return document

  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`
} 