interface StatusBadgeProps {
  status: string
}

const statusStyles: Record<string, string> = {
  REQUESTED:
    "bg-yellow-100 text-yellow-800 border-yellow-200",

  ACCEPTED:
    "bg-blue-100 text-blue-800 border-blue-200",

  DECLINED:
    "bg-red-100 text-red-800 border-red-200",

  PAID:
    "bg-purple-100 text-purple-800 border-purple-200",

  IN_PROGRESS:
    "bg-green-100 text-green-800 border-green-200",

  COMPLETED:
    "bg-gray-100 text-gray-800 border-gray-200",

  CANCELLED:
    "bg-red-200 text-red-900 border-red-300",
}

const formatStatus = (status: string) => {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    )
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const normalizedStatus = status.toUpperCase()

  const className =
    statusStyles[normalizedStatus] ??
    "bg-gray-100 text-gray-800 border-gray-200"

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${className}`}
    >
      {formatStatus(normalizedStatus)}
    </span>
  )
}