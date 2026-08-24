import { api } from "@/lib/api"
import { ITechnicianProfile } from "@/lib/types"

export const getMyTechnicianProfile = async (): Promise<ITechnicianProfile | null> => {
  const result = await api<ITechnicianProfile>("/api/technicians/profile", {
    method: "GET",
    cache: "no-store",
    auth: true,
  })

  return result.ok ? result.data : null
}