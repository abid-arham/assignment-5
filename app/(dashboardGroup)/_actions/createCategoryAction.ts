"use server"

import { revalidatePath } from "next/cache"
import { createCategory } from "@/service/admin/createCategory"
import { categorySchema } from "@/lib/validations"

export type CreateCategoryState = {
  success: boolean
  message: string
}

export const createCategoryAction = async (
  prevState: CreateCategoryState,
  formData: FormData
): Promise<CreateCategoryState> => {
  const parsed = categorySchema.safeParse({
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || undefined,
  })

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid category details." }
  }

  const response = await createCategory(parsed.data)

  if (!response.success) {
    return { success: false, message: response.message }
  }

  revalidatePath("/admin-dashboard/categories")

  return { success: true, message: `Category "${parsed.data.name}" created successfully.` }
}