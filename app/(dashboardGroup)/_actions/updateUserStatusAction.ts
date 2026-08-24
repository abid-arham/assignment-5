"use server"

import { revalidatePath } from "next/cache"
import { updateUserStatus } from "@/service/admin/updateUserStatus"
import { IActiveStatus } from "@/lib/types"

export type UpdateUserStatusState = {
  success: boolean
  message: string
}

export const updateUserStatusAction = async (
  userId: string,
  activeStatus: IActiveStatus
): Promise<UpdateUserStatusState> => {
  if (!userId) {
    return { success: false, message: "Missing user id." }
  }

  const response = await updateUserStatus(userId, activeStatus)

  if (!response.success) {
    return { success: false, message: response.message }
  }

  revalidatePath("/admin-dashboard/users")

  return {
    success: true,
    message: activeStatus === "BLOCKED" ? "User blocked successfully." : "User unblocked successfully.",
  }
}