import { api } from "@/lib/api"
import { ITechnicianProfile } from "@/lib/types"

export interface UpdateTechnicianAvailabilityPayload {
  days: string[]
  hours: string
}

export type UpdateTechnicianAvailabilityResult =
  | { success: true; data: ITechnicianProfile }
  | { success: false; message: string }

export const updateTechnicianAvailability = async (
  payload: UpdateTechnicianAvailabilityPayload
): Promise<UpdateTechnicianAvailabilityResult> => {
  const result = await api<ITechnicianProfile>("/api/technicians/availability", {
    method: "PUT",
    body: JSON.stringify(payload),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, data: result.data }
}