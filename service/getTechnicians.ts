import { api } from "@/lib/api"
import { ITechnicianProfile } from "@/lib/types"

export const getTechnicians = async (): Promise<ITechnicianProfile[]> => {
  const result = await api<ITechnicianProfile[]>("/api/technicians", {
    method: "GET",
    cache: "no-store",
  })

  return result.ok ? result.data : []
}

export const getAllTechnicians = getTechnicians

export const getTechnicianById = async (id: string): Promise<ITechnicianProfile | null> => {
  if (!id) return null

  const result = await api<ITechnicianProfile>(`/api/technicians/${id}`, {
    method: "GET",
    cache: "no-store",
  })

  return result.ok ? result.data : null
}