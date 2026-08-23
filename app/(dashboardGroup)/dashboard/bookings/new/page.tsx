// app/(dashboardGroup)/dashboard/bookings/new/page.tsx
import { getAllTechnicians } from "@/service/getTechnicians"
import { getAllService } from "@/service/getService"
import { BookingForm } from "../../../_components/booking-form" // adjust path to your actual structure

export default async function NewBookingPage() {
  
  const [technicians, services] = await Promise.all([
    getAllTechnicians(),
    getAllService(),
  ])
  

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Book a service</h1>
      <BookingForm
        technicians={technicians.map((t) => ({
          id: t.id,
          name: t.user.name, // from the join you already added to the backend
          hourlyRate: t.hourlyRate,
        }))}
        services={services
          .filter((s) => s.isActive)
          .map((s) => ({
            id: s.id,
            title: s.title,
            price: s.price,
            durationMins: s.durationMins,
          }))}
      />
    </main>
  )
}