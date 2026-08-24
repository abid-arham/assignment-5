"use server"

import { api } from "@/lib/api"

interface CreateReviewPayload {
  bookingId: string
  technicianId: string
  rating: number
  comment?: string
}

export const createReviewAction = async (
  payload: CreateReviewPayload
): Promise<{ success: boolean; message: string }> => {
  if (!payload.bookingId || !payload.technicianId) {
    return { success: false, message: "Booking and technician information is required." }
  }

  if (!Number.isInteger(payload.rating) || payload.rating < 1 || payload.rating > 5) {
    return { success: false, message: "Rating must be between 1 and 5." }
  }

  const result = await api("/api/reviews", {
    method: "POST",
    body: JSON.stringify({
      bookingId: payload.bookingId,
      technicianId: payload.technicianId,
      rating: payload.rating,
      comment: payload.comment?.trim() ?? "",
    }),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, message: "Review submitted successfully." }
}