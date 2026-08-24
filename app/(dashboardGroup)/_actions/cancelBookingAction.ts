"use server"

import { api } from "@/lib/api"

export const cancelBookingAction = async (
  bookingId: string
): Promise<{ success: boolean; message: string }> => {
  if (!bookingId) {
    return { success: false, message: "Booking ID is required." }
  }

  const result = await api(`/api/bookings/${bookingId}/cancel`, {
    method: "PATCH",
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Booking cancelled successfully." }
}