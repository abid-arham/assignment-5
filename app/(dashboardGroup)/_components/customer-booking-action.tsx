"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { cancelBookingAction } from "@/app/(dashboardGroup)/_actions/cancelBookingAction"
import { createCheckoutSessionAction } from "@/app/(dashboardGroup)/_actions/createCheckoutSessionAction"
import { createReviewAction } from "@/app/(dashboardGroup)/_actions/createReviewAction"
import { IBooking } from "@/lib/types"

interface CustomerBookingActionProps {
  booking: IBooking
}

export default function CustomerBookingAction({ booking }: CustomerBookingActionProps) {
  
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showReview, setShowReview] = useState(false)

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    )

    if (!confirmed) {
      return
    }

    setLoading(true)
    setError("")

    const result = await cancelBookingAction(
      booking.id
    )

    setLoading(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    router.refresh()
  }

  const handlePayment = async () => {
    setLoading(true)
    setError("")

    const result =
      await createCheckoutSessionAction(
        booking.id
      )

    if (!result.success) {
      setLoading(false)
      setError(result.message)
      return
    }

    if (!result.url) {
      setLoading(false)
      setError(
        "Payment checkout URL was not returned."
      )
      return
    }

    window.location.href = result.url
  }

  const handleReview = async () => {
    setLoading(true)
    setError("")
const result = await createReviewAction({
  bookingId: booking.id,
  technicianId: booking.technicianId,
  rating,
  comment: comment || undefined,
})

    setLoading(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    setShowReview(false)
    setComment("")
    setRating(5)

    router.refresh()
  }

  if (booking.status === "CANCELLED") {
    return (
      <div className="text-sm text-muted-foreground">
        This booking has been cancelled.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {booking.status === "REQUESTED" && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Cancelling..."
              : "Cancel Booking"}
          </button>
        )}

        {booking.status === "ACCEPTED" && (
          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Redirecting..."
              : "Pay Now"}
          </button>
        )}

        {booking.status === "COMPLETED" && (
          <button
            type="button"
            onClick={() =>
              setShowReview((current) => !current)
            }
            disabled={loading}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Leave Review
          </button>
        )}

        {booking.status === "IN_PROGRESS" && (
          <p className="text-sm text-muted-foreground">
            This booking is currently in progress.
            It cannot be cancelled.
          </p>
        )}

        {booking.status === "PAID" && (
          <p className="text-sm text-muted-foreground">
            Payment completed. Your technician can now
            start the job.
          </p>
        )}

        {booking.status === "DECLINED" && (
          <p className="text-sm text-red-600">
            The technician declined this booking.
          </p>
        )}
      </div>

      {showReview && (
        <div className="max-w-lg rounded-lg border p-5">
          <h3 className="font-semibold">
            Leave a Review
          </h3>

          <div className="mt-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium"
            >
              Rating
            </label>

            <select
              id="rating"
              value={rating}
              onChange={(event) =>
                setRating(
                  Number(event.target.value)
                )
              }
              disabled={loading}
              className="mt-2 w-full rounded-md border px-3 py-2"
            >
              <option value={5}>
                5 — Excellent
              </option>
              <option value={4}>
                4 — Good
              </option>
              <option value={3}>
                3 — Average
              </option>
              <option value={2}>
                2 — Poor
              </option>
              <option value={1}>
                1 — Very Poor
              </option>
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium"
            >
              Comment
            </label>

            <textarea
              id="comment"
              value={comment}
              onChange={(event) =>
                setComment(event.target.value)
              }
              disabled={loading}
              rows={4}
              placeholder="Tell us about your experience..."
              className="mt-2 w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleReview}
              disabled={loading}
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : "Submit Review"}
            </button>

            <button
              type="button"
              onClick={() =>
                setShowReview(false)
              }
              disabled={loading}
              className="rounded-md border px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}