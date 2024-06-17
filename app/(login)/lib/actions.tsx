"use server"

import { UserDBSimple, UserSession } from "@/app/lib/types/types"
import { cookies } from "next/headers"

export async function getUser() {

    const cookieStore = cookies().get("sb-tzohqwteaoakaifwffnm-auth-token")?.value

    if (!cookieStore) {
        return
    }
    
    const auth: UserSession = JSON.parse(cookieStore!)

    const data: UserDBSimple = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?select=id,name,plan,theme&id=eq.${auth.user.id}`, {
        headers: {
            "apikey": process.env.SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.access_token}`,
        },
        cache: "force-cache",
        next: {
            tags: ["user"]
        }
        }).then(result=> {
            return result.json()
        })
        .then(response => {
            return response[0]
        })

    return data
}