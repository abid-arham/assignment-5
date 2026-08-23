export const BOOKING_STATUS_CONFIG = {
  REQUESTED:   { label: "Requested",   className: "bg-amber-100 text-amber-800" },
  ACCEPTED:    { label: "Accepted",    className: "bg-blue-100 text-blue-800" },
  DECLINED:    { label: "Declined",    className: "bg-red-100 text-red-700" },
  PAID:        { label: "Paid",        className: "bg-purple-100 text-purple-800" },
  IN_PROGRESS: { label: "In progress", className: "bg-green-100 text-green-800" },
  COMPLETED:   { label: "Completed",   className: "bg-gray-200 text-gray-700" },
  CANCELLED:   { label: "Cancelled",   className: "bg-red-900 text-white" },
} as const

export type BookingStatusValue = keyof typeof BOOKING_STATUS_CONFIG

export function getBookingStatusConfig(status: string) {
  return BOOKING_STATUS_CONFIG[status as BookingStatusValue] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  }
}