import Link from "next/link"
import { getMe } from "@/service/getMe"
import { redirect } from "next/navigation"

const NAV_ITEMS = [
  { href: "/admin-dashboard", label: "Overview" },
  { href: "/admin-dashboard/users", label: "Users" },
  { href: "/admin-dashboard/bookings", label: "Bookings" },
  { href: "/admin-dashboard/categories", label: "Categories" },
]

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getMe()

  if (!user || user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-64 shrink-0 border-r bg-muted/30 p-6">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Admin
        </p>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}