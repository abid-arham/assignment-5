import { api } from "@/lib/api"
import { ITechnicianProfile } from "@/lib/types"

export const getAllTechnicians = async(): Promise<ITechnicianProfile[]>=>{
    const result  = await api<ITechnicianProfile[]>("/api/technicians",{
        cache: "no-store"
    })
    return result.ok ? result.data : []
}

export const getTechnicianById = async(id: string): Promise<ITechnicianProfile | null>=>{
    const result = await api<ITechnicianProfile>(`/api/technicians/${id}`,{
        cache:"no-store"
    })
    console.log(result)
    return result.ok ? result.data : null
}