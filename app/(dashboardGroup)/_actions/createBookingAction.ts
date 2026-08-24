"use server"

import { api } from "@/lib/api"
import { IBooking } from "@/lib/types"
import { bookingSchema } from "@/lib/validations"

interface CreateBookingPayload {
  technicianId: string
  serviceId: string
  scheduledAt: string
  location: string
  notes?: string
  totalAmount: number
}

export const createBookingAction = async (
  payload: CreateBookingPayload
): Promise<{ success: boolean; message: string; data?: IBooking }> => {
  const parsed = bookingSchema.safeParse(payload)

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid booking details." }
  }

  const result = await api<IBooking>("/api/bookings", {
    method: "POST",
    body: JSON.stringify({
      technicianId: parsed.data.technicianId,
      serviceId: parsed.data.serviceId,
      scheduledAt: parsed.data.scheduledAt,
      location: parsed.data.location,
      notes: parsed.data.notes ?? "",
      totalAmount: parsed.data.totalAmount,
    }),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Booking created successfully.", data: result.data }
}