"use server"

import { api } from "@/lib/api"
import { IBooking, IBookingFormInput } from "@/lib/types"
import { getMe } from "@/service/getMe"
import { AsyncCallbackSet } from "next/dist/server/lib/async-callback-set"

export type CreateBookingState = {
    success: boolean
    message: string
}

export const createBookingAction = async(input: IBookingFormInput):Promise<CreateBookingState>=>{
    const user = await getMe();
    if(!user){
        return{
            success:false,
            message:"You must be logged in to book a service"
        }
    }

    const result = await api<IBooking>("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
            ...input,
            customerId: user.id
        }),
        auth: true
    })

    if(!result.ok){
        return{
            success: false,
            message: result.message
        }
    }

    return {
        success: true,
        message: "Booking created successfully"
    }
}