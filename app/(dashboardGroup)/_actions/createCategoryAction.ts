"use server"

import { revalidatePath } from "next/cache"
import { createCategory } from "@/service/admin/createCategory"

export type CreateCategoryState = {
  success: boolean
  message: string
}

export const createCategoryAction = async (
  prevState: CreateCategoryState,
  formData: FormData
): Promise<CreateCategoryState> => {
  const name = String(formData.get("name") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()

  if (!name) {
    return { success: false, message: "Category name is required." }
  }

  const response = await createCategory({
    name,
    description: description || undefined,
  })

  if (!response.success) {
    return { success: false, message: response.message }
  }

  revalidatePath("/admin-dashboard/categories")

  return { success: true, message: `Category "${name}" created successfully.` }
}