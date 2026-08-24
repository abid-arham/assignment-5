import Link from "next/link"

export default function PaymentCancel() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Payment Cancelled</h1>
        <p className="text-muted-foreground">Your payment was cancelled. You can try again from your bookings.</p>
        <Link href="/dashboard" className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
