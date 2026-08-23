import { api } from "@/lib/api"
import { IService } from "@/lib/types"

export const getAllService = async (): Promise<IService[]> => {
  const result = await api<IService[]>("/api/services", { cache: "no-store" })
  return result.ok ? result.data : []
}