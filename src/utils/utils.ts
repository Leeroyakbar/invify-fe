import type { Invitation } from "../types/Invitation"
export const createGoogleCalendarLink = (data: Invitation) => {
  const title = encodeURIComponent(`The Wedding of ${data.brideName} & ${data.groomName}`)
  const location = encodeURIComponent(`${data.akadVanue}, ${data.akadLocation}`)
  const details = encodeURIComponent(`Mohon doa restu atas pernikahan kami.\n\nLihat undangan: ${window.location.href}`)

  // Format tanggal untuk Google (YYYYMMDDTHHmmSSZ)
  // Menghapus strip dan titik dua dari data.eventDate
  const startDate = data.eventDate.replace(/[-:]/g, "").replace(" ", "T") + "Z"

  // Asumsi durasi 2 jam untuk end date
  const end = new Date(new Date(data.eventDate).getTime() + 2 * 60 * 60 * 1000)
  const endDate = end.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`
}

export const isTokenExpired = (token: string) => {
  if (!token) return true

  try {
    const payloadBase64 = token.split(".")[1]
    const decodedJson = atob(payloadBase64)
    const decoded = JSON.parse(decodedJson)

    const exp = decoded.exp

    return Date.now() >= exp * 1000
  } catch (e) {
    console.log(e)
    return true
  }
}
