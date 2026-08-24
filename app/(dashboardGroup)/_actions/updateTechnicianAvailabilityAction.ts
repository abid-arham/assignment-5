"use server"

import {
  updateTechnicianAvailability,
  UpdateTechnicianAvailabilityPayload,
} from "@/service/updateTechnicianAvailability"

export type UpdateTechnicianAvailabilityState = {
  success: boolean
  message: string
}

export const updateTechnicianAvailabilityAction = async (
  payload: UpdateTechnicianAvailabilityPayload
): Promise<UpdateTechnicianAvailabilityState> => {
  if (!Array.isArray(payload.days)) {
    return { success: false, message: "Days must be a list." }
  }

  if (payload.days.length === 0) {
    return { success: false, message: "Select at least one working day." }
  }

  if (!payload.hours.trim()) {
    return { success: false, message: "Working hours cannot be empty." }
  }

  const days = payload.days.map((day) => day.trim()).filter(Boolean)

  const response = await updateTechnicianAvailability({
    days,
    hours: payload.hours.trim(),
  })

  if (!response.success) {
    return { success: false, message: response.message }
  }

  return { success: true, message: "Availability updated successfully." }
}