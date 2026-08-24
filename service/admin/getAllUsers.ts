import { api } from "@/lib/api"
import { IAdminUser } from "@/lib/types"

export const getAllUsers = async (): Promise<IAdminUser[]> => {
  const result = await api<IAdminUser[]>("/api/admin/users", {
    method: "GET",
    cache: "no-store",
    auth: true,
  })

  return result.ok ? result.data : []
}