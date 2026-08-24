"use server"

import { api } from "@/lib/api"
import { IBooking } from "@/lib/types"

export const getAllBookingsAction = async (): Promise<IBooking[]> => {
  const result = await api<IBooking[]>("/api/bookings", { cache: "no-store", auth: true })
  return result.ok ? result.data : []
}