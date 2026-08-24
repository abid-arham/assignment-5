import { api } from "@/lib/api"
import { IBooking } from "@/lib/types"

export const getAllBookingsAdmin = async (): Promise<IBooking[]> => {
  const result = await api<IBooking[]>("/api/admin/bookings", {
    method: "GET",
    cache: "no-store",
    auth: true,
  })

  return result.ok ? result.data : []
}