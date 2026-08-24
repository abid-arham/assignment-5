import { api } from "@/lib/api"
import { IBooking } from "@/lib/types"

export const getTechnicianBookings = async (): Promise<IBooking[]> => {
  const result = await api<IBooking[]>("/api/technicians/bookings", {
    method: "GET",
    cache: "no-store",
    auth: true,
  })

  return result.ok ? result.data : []
}