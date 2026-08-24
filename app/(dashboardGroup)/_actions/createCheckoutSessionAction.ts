"use server"

import { api } from "@/lib/api"

type CheckoutResult =
  | { success: true; paymentUrl: string }
  | { success: false; message: string }

export const createCheckoutSessionAction = async (bookingId: string): Promise<CheckoutResult> => {
  const result = await api<{ paymentUrl: string }>("/api/payments/create", {
    method: "POST",
    body: JSON.stringify({ bookingId }),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, paymentUrl: result.data.paymentUrl }
}