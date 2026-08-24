"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createReviewAction } from "../_actions/createReviewAction"
import { createCheckoutSessionAction } from "../_actions/createCheckoutSessionAction"
import { cancelBookingAction } from "../_actions/cancelBookingAction"
import { IBooking } from "@/lib/types"

export function CustomerBookingActions({ booking }: { booking: IBooking }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Pay Now
  const [payError, setPayError] = useState<string | null>(null)

  // Review
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  // Cancel
  const [confirmingCancel, setConfirmingCancel] = useState(false)
  const [cancelError, setCancelError] = useState<string | null>(null)

  if (booking.status === "REQUESTED") {
    return (
      <div className="flex flex-col gap-1.5">
        {cancelError && <p className="text-sm text-destructive">{cancelError}</p>}
        {!confirmingCancel ? (
          <button
            type="button"
            onClick={() => setConfirmingCancel(true)}
            className="self-start rounded-full border border-destructive/30 px-4 py-2 text-sm font-semibold text-destructive"
          >
            Cancel booking
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Cancel this booking?</span>
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                setCancelError(null)
                startTransition(async () => {
                  const result = await cancelBookingAction(booking.id)
                  if (!result.success) {
                    setCancelError(result.message)
                    return
                  }
                  router.refresh()
                })
              }}
              className="rounded-full bg-destructive px-3 py-1.5 text-sm font-semibold text-destructive-foreground disabled:opacity-50"
            >
              {isPending ? "Cancelling..." : "Yes, cancel"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmingCancel(false)}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground"
            >
              No
            </button>
          </div>
        )}
      </div>
    )
  }

  if (booking.status === "ACCEPTED") {
    return (
      <div className="flex flex-col gap-1.5">
        {payError && <p className="text-sm text-destructive">{payError}</p>}
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            setPayError(null)
            startTransition(async () => {
              const result = await createCheckoutSessionAction(booking.id)
              if (!result.success) {
                setPayError(result.message)
                return
              }
              window.location.href = result.paymentUrl
            })
          }}
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "Redirecting..." : "Pay Now"}
        </button>
      </div>
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