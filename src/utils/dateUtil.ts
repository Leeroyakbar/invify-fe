export function parseEventDate(dateTime: string): Date {
  // "2027-02-27 09:00:00" -> "2027-02-27T09:00:00"
  return new Date(dateTime.replace(" ", "T"))
}

export function formatTime(timeString: string) {
  if (!timeString) return ""

  // Jika formatnya ISO atau ada spasi (2027-02-28 08:00 atau 2027-02-28T08:00)
  if (timeString.includes("T") || timeString.includes(" ")) {
    return timeString.split(/[T ]/)[1].substring(0, 5)
  }
  return timeString.substring(0, 5)
}
