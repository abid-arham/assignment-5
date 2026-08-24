"use server"

import { api } from "@/lib/api"
import { IBooking } from "@/lib/types"

export type CancelBookingState = {
  success: boolean
  message: string
}

export const cancelBookingAction = async (bookingId: string): Promise<CancelBookingState> => {
  const result = await api<IBooking>(`/api/bookings/${bookingId}/cancel`, {
    method: "PATCH",
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Booking cancelled." }
}