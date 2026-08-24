import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["CUSTOMER", "TECHNICIAN"], "Please select a valid role."),
})

export const bookingSchema = z.object({
  technicianId: z.string().min(1, "Please select a technician."),
  serviceId: z.string().min(1, "Please select a service."),
  scheduledAt: z.string().min(1, "Please select a date and time."),
  location: z.string().min(3, "Location must be at least 3 characters."),
  notes: z.string().optional(),
  totalAmount: z.number().positive("Total amount must be positive."),
})

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters."),
  description: z.string().optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z.string().min(6, "New password must be at least 6 characters."),
})

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
})
