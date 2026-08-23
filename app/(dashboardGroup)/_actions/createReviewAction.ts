"use server"

import { api } from "@/lib/api"

export type CreateReviewState = {
  success: boolean
  message: string
}

export const createReviewAction = async (input: {
  bookingId: string
  technicianId: string
  rating: number
  comment?: string
}): Promise<CreateReviewState> => {
  const result = await api("/api/reviews", {
    method: "POST",
    body: JSON.stringify(input),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Review submitted." }
}