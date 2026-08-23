"use client"

import { useState, useTransition } from "react"
import { createReviewAction } from "../_actions/createReviewAction"
import { IBooking } from "@/lib/types"

export function CustomerBookingActions({ booking }: { booking: IBooking }) {
  const [isPending, startTransition] = useTransition()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  if (booking.status === "ACCEPTED") {
    return (
      <button
        type="button"
        disabled
        title="Payments aren't available yet"
        className="rounded-full bg-primary/50 px-4 py-2 text-sm font-semibold text-primary-foreground cursor-not-allowed"
      >
        Pay Now
      </button>
    )
  }

  if (booking.status === "COMPLETED") {
    if (message) {
      return <p className="text-sm text-muted-foreground">{message}</p>
    }

    if (!showReviewForm) {
      return (
        <button
          type="button"
          onClick={() => setShowReviewForm(true)}
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground"
        >
          Leave a Review
        </button>
      )
    }

    return (
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/40 p-4">
        <label className="text-sm font-medium text-foreground">
          Rating
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="ml-2 rounded-md border border-border bg-background px-2 py-1 text-sm"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="How was the service?"
          rows={2}
          className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
        />
        <div className="flex gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                const result = await createReviewAction({
                  bookingId: booking.id,
                  technicianId: booking.technicianId,
                  rating,
                  comment: comment || undefined,
                })
                setMessage(result.success ? "Thanks for your review!" : result.message)
              })
            }}
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => setShowReviewForm(false)}
            className="rounded-full px-4 py-1.5 text-sm font-semibold text-muted-foreground"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return null
}