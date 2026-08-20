"use server"

import { cookies } from "next/headers"

export const getNewAccessToken = async()=>{
    const cookieStore = await cookies()

    const refreshToken = cookieStore.get("refreshToken")?.value
    console.log(refreshToken)
    if(!refreshToken){
        // throw new Error("User not logged in")
        return{
            success: false,
            message: "User Not logged in"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
        headers:{
            Authorization: `${refreshToken}`
        },
        cache: "no-store",
        
    })

    const result = res.json()
    

    return result
}