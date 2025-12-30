export function parseEventDate(dateTime: string): Date {
  // "2027-02-27 09:00:00" -> "2027-02-27T09:00:00"
  return new Date(dateTime.replace(" ", "T"))
}
