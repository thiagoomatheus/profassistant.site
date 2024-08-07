"use server"
import { cookies } from "next/headers"
import { UserSession } from "../types/types"
export async function setTheme(theme:string) {
    const cookieStore = cookies().get("sb-tzohqwteaoakaifwffnm-auth-token")?.value
    const auth: UserSession = JSON.parse(cookieStore!)
    const result = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?select=theme&id=eq.${auth.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            theme: theme
        }),
        headers: {
            "apikey": process.env.SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.access_token}`,
        }
    })
    if (result.status !== 200) return {error: (await result.json()).error.messsage}
    cookies().set("theme", theme)
    return "success"
}