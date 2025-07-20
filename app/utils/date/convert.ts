import { formatInTimeZone, toDate } from "date-fns-tz"

const DEFAULT_TZ = "UTC"

export function toZonedDate(date: Date | number | string, timeZone = DEFAULT_TZ): Date {
  return toDate(date, { timeZone })
}

export function toZonedDateString(date: Date | number | string, timeZone = DEFAULT_TZ): string {
  return formatInTimeZone(date, timeZone, "dd/MM/yyyy")
}
