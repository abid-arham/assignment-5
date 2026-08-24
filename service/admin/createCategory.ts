import { api } from "@/lib/api"
import { ICategory } from "@/lib/types"

export interface CreateCategoryPayload {
  name: string
  description?: string
}

export type CreateCategoryResult =
  | { success: true; data: ICategory }
  | { success: false; message: string }

export const createCategory = async (
  payload: CreateCategoryPayload
): Promise<CreateCategoryResult> => {
  const result = await api<ICategory>("/api/admin/categories", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true, data: result.data }
}