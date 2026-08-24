import { api } from "@/lib/api"
import { ICategory } from "@/lib/types"

export const getAllCategories = async (): Promise<ICategory[]> => {
  const result = await api<ICategory[]>("/api/admin/categories", {
    method: "GET",
    cache: "no-store",
    auth: true,
  })

  return result.ok ? result.data : []
}