import { getBookingStatusConfig } from "@/lib/booking-status"

export function StatusBadge({ status }: { status: string }) {
  const { label, className } = getBookingStatusConfig(status)
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${className}`}>
      {label}
    </span>
  )
}