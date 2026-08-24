import { api } from "@/lib/api"
import { IActiveStatus } from "@/lib/types"

export type UpdateUserStatusResult =
  | { success: true }
  | { success: false; message: string }

export const updateUserStatus = async (
  userId: string,
  activeStatus: IActiveStatus
): Promise<UpdateUserStatusResult> => {
  const result = await api<null>(`/api/admin/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ activeStatus }),
    auth: true,
  })

  if (!result.ok) {
    return { success: false, message: result.message }
  }

  return { success: true }
}