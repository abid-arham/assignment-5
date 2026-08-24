"use server"

import {
  updateTechnicianProfile,
  UpdateTechnicianProfilePayload,
} from "@/service/updateTechnicianProfile"

export type UpdateTechnicianProfileState = {
  success: boolean
  message: string
}

export const updateTechnicianProfileAction = async (
  payload: UpdateTechnicianProfilePayload
): Promise<UpdateTechnicianProfileState> => {
  if (!Array.isArray(payload.skills)) {
    return { success: false, message: "Skills must be a list." }
  }

  if (!Number.isFinite(payload.experience) || payload.experience < 0) {
    return { success: false, message: "Experience must be a valid number." }
  }

  if (!Number.isFinite(payload.hourlyRate) || payload.hourlyRate < 0) {
    return { success: false, message: "Hourly rate must be a valid number." }
  }

  if (!payload.location.trim()) {
    return { success: false, message: "Location cannot be empty." }
  }

  const cleanedSkills = payload.skills.map((skill) => skill.trim()).filter(Boolean)

  const response = await updateTechnicianProfile({
    skills: cleanedSkills,
    experience: payload.experience,
    hourlyRate: payload.hourlyRate,
    location: payload.location.trim(),
  })

  if (!response.success) {
    return { success: false, message: response.message }
  }

  return { success: true, message: "Technician profile updated successfully." }
}