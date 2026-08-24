import { api } from "@/lib/api"
import { ITechnicianProfile } from "@/lib/types"

export interface UpdateTechnicianProfilePayload {
  skills: string[]
  experience: number
  hourlyRate: number
  location: string
}

export type UpdateTechnicianProfileResult =
  | { success: true; data: ITechnicianProfile }
  | { success: false; message: string }

export const updateTechnicianProfile = async (
  payload: UpdateTechnicianProfilePayload
): Promise<UpdateTechnicianProfileResult> => {
  const result = await api<ITechnicianProfile>("/api/technicians/profile", {
    method: "PUT", 
    body: JSON.stringify(payload),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, data: result.data }
}