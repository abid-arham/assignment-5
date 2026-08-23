"use server"

import { api } from "@/lib/api"
import { IBooking } from "@/lib/types"
import { BookingStatusValue } from "@/lib/booking-status"

export type UpdateBookingStatusState = {
  success: boolean
  message: string
}

export const updateBookingStatusAction = async (
  bookingId: string,
  status: BookingStatusValue
): Promise<UpdateBookingStatusState> => {
  const result = await api<IBooking>(`/api/technicians/bookings/${bookingId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Booking status updated." }
}