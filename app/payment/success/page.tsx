import Link from "next/link"

export default function PaymentSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Payment Successful</h1>
        <p className="text-muted-foreground">Your booking has been confirmed. The technician will contact you soon.</p>
        <Link href="/dashboard" className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
