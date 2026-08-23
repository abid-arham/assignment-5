// "use server"

import { api } from "@/lib/api"
import { IUser } from "@/lib/types"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"




export const getMe = async():Promise<IUser | null> =>{

    const token =  (await cookies()).get("accessToken")?.value as string

    //console.log(token, "TOKEN")

    if(!token) return null

    const res = await api("/api/auth/me",{
        cache:"no-store",
        headers:{
            Authorization : `Bearer ${token}`
        }
    })

    //console.log(res, "RES")

    //if(!res.ok) return null
    //console.log(jwt.decode(token))


    return jwt.decode(token) as IUser

}
