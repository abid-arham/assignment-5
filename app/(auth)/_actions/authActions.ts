
"use server"

import { api } from "@/lib/api"
import { LoginState } from "@/lib/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"






export const setAuthCookies = async({accessToken, refreshToken}:{accessToken:string, refreshToken: string})=>{
    const cookie = await cookies()

    cookie.set("accessToken", accessToken,
        {
            httpOnly: true,
            maxAge: 24*60*60,
            sameSite: "lax"
        }
    )

    cookie.set("refreshToken", refreshToken,
        {
            httpOnly: true,
            maxAge: 24*60*60,
            sameSite: "lax"
        }
    )
}





export const loginAction = async(prevState: LoginState, formData: FormData) => {

    const res = await api(`/auth/login`, {
        method:"POST",
        body: JSON.stringify({
            "email": formData.get("email"),
            "password": formData.get("password")
        })
    })

    if(!res.ok){
        return{
            success: false,
            message: "Invalid Login"
        }
    }

    await setAuthCookies(res.data)


    redirect("/dashboard")


    

}



export const registerAction = async(prevState: LoginState, formData: FormData) => {


    const email = formData.get("email");
    const password = formData.get("password")
    const res = await api(`/auth/register`, {
        method:"POST",
        body: JSON.stringify({
            "name":formData.get("name"),
            email,
            password,
            "role":formData.get("role")
        })
    })

    if(!res.ok){
        return{
            success: false,
            message: "Invalid Login"
        }
    }

    const login = await api(`/auth/login`, {
        method:"POST",
        body: JSON.stringify({
            email,
            password
        })
    })

    if(!res.ok){
        return{
            success: false,
            message: "Invalid Login"
        }
    }

    await setAuthCookies(login.data)


    redirect("/dashboard")



}

export const logoutAction = async()=>{
     const cookie = await cookies()

    cookie.delete("accessToken")

    cookie.delete("refreshToken")

    redirect("/login")
    
}