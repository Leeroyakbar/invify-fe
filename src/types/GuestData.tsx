export interface GuestData {
  guestId?: string // Ada jika sudah tersimpan di DB
  tempId: string // ID unik sementara (uuid atau timestamp) untuk keperluan key React
  guestName: string
  isSaved: boolean // Untuk kontrol mode edit/disable
}
