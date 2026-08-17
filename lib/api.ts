

export const api = async(path: string, options:any)=>{
    try {
        const res = await fetch(`${process.env.API_URL}${path}`, {
            headers:{
           "Content-Type":"application/json"
        },
        ...options
    })
        if(!res.ok){
            return{
                success: false,
                message: "Invalid Login"
            }
        }
        const data = await res.json()
        return{
            ok: true,
            data,
        }
    } catch (error) {
        return {
            ok: false,
            message:"server error"
        }
    }
}