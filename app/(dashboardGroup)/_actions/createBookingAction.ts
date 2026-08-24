"use server"

import { api } from "@/lib/api"
import { IBooking } from "@/lib/types"

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
  if (!payload.technicianId || !payload.serviceId || !payload.scheduledAt || !payload.location) {
    return { success: false, message: "Please provide all required booking information." }
  }

  const result = await api<IBooking>("/api/bookings", {
    method: "POST",
    body: JSON.stringify({
      technicianId: payload.technicianId,
      serviceId: payload.serviceId,
      scheduledAt: payload.scheduledAt,
      location: payload.location,
      notes: payload.notes ?? "",
      totalAmount: payload.totalAmount,
    }),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Booking created successfully.", data: result.data }
}