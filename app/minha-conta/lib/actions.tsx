"use server"

import { createClient } from "@/app/lib/supabase/server"
import { UserDBComplete } from "@/app/lib/types/types"

export async function getProfile() {

    const supabase = createClient()

    let data: UserDBComplete = {
        id: "",
        name: "",
        plan: "free",
        created_at: "",
        school_name: "",
        theme: "",
        user_email: ""
    }

    const session = await supabase.auth.getSession()
    
    await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?id=eq.${session.data.session?.user.id}`, {
    headers: {
        "apikey": process.env.SUPABASE_ANON_KEY!,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.data.session?.access_token}`,
    }
    }).then(result=> {
        return result.json()
    })
    .then(response => {
        data = response[0]
    })
    .catch(error => {
        console.log(error);
    })
    return data
}

export async function updateProfile(column: string, newData: string) {

    const supabase = createClient()

    const data = `{"${column}": "${newData}"}`

    const session = await supabase.auth.getSession()

    await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?id=eq.${session.data.session?.user.id}`, {
        method: "PATCH",
        headers: {
            "apikey": process.env.SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.data.session?.access_token}`,
        },
        body: (data)
    })
    .catch(error => {
        console.log(error)
        return "erro"
    })
    return "ok"
}