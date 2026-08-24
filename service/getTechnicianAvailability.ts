import type { ApiResult } from "@/lib/api"
import { ITechnicianAvailabilityResponse } from "@/lib/types"

export async function getTechnicianAvailability(
  technicianId: string,
  date: string,
  serviceId?: string
): Promise<ApiResult<ITechnicianAvailabilityResponse>> {
  const params = new URLSearchParams({ date })
  if (serviceId) params.set("serviceId", serviceId)

  try {
    const res = await fetch(`/api/technicians/${technicianId}/availability?${params}`)
    const body = await res.json()
    if (!res.ok || body.data === undefined) {
      return { ok: false, message: body.message || "Something went wrong" }
    }
    return { ok: true, data: body.data }
  } catch {
    return { ok: false, message: "Could not reach the server" }
  }
}