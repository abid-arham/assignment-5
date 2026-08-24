"use server"

import { api } from "@/lib/api"

export const createCheckoutSessionAction = async (
  bookingId: string
): Promise<{ success: boolean; message: string; url?: string }> => {
  if (!bookingId) {
    return { success: false, message: "Booking ID is required." }
  }

  const result = await api<{ paymentUrl: string }>("/api/payments/create", {
    method: "POST",
    body: JSON.stringify({ bookingId }),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Checkout session created.", url: result.data.paymentUrl }
}