import { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_API_URL
  if (!backend) return Response.json({ message: "Backend URL not configured" }, { status: 500 })

  const { id } = await params
  const url = new URL(req.url)
  const res = await fetch(`${backend}/api/technicians/${id}/availability?${url.searchParams}`)
  return Response.json(await res.json(), { status: res.status })
}
