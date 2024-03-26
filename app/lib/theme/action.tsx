"use server"

import { cookies } from "next/headers"
import { UserSession } from "../types/types"

export async function setTheme(theme:string) {

    const cookieStore = cookies().get("sb-tzohqwteaoakaifwffnm-auth-token")?.value
    const auth: UserSession = JSON.parse(cookieStore!)

    await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?select=theme&id=eq.${auth.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            theme: theme
        }),
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.access_token}`,
        }
    })
    .then(result=> {
        cookies().set("theme", theme)
    })
    .catch(error => {
        console.log(error);
        return "erro"
    })

    return "ok"
}