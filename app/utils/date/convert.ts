import { toDate } from "date-fns-tz"

const DEFAULT_TZ = "America/Sao_Paulo"

export function toZonedDate(date: Date | number | string, timeZone = DEFAULT_TZ): Date {
  return toDate(date, { timeZone })
}
