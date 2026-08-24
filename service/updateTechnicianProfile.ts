import { api } from "@/lib/api"

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface UpdateTechnicianProfilePayload {
  skills: string[]
  experience: number
  hourlyRate: number
  location: string
}

export const updateTechnicianProfile = async (
  payload: UpdateTechnicianProfilePayload
) => {
  const response = await api<
    ApiResponse<unknown>
  >("/technicians/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  })

  return response
}