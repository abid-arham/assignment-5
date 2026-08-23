"use server"

import { api } from "@/lib/api";
import { IBooking } from "@/lib/types"
import { getMe } from "@/service/getMe"
import { error } from "console";


export const getAllBookingsAction = async():Promise<IBooking[]>=>{

    const user = await getMe();

    if(!user){
        throw new Error("You are not logged in!")

    }

    const result = await api<IBooking[]>("/api/bookings", {
        cache:"no-store",
        auth:true
    })

    return result.ok ? result.data : []

}