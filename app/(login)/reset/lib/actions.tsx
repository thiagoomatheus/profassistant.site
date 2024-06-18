"use server"

import { createClient } from "@/app/lib/supabase/server"
import { redirect } from "next/navigation"

export async function resetPassword(previousState:number ,formData:FormData) {

    const supabase = createClient()
    const email = formData.get("email") as string

    const result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset/update"
    })

    if (result.error?.message) {
        return 401
    }

    return 200
}

export async function updatePassword(previousState: number | null, formData:FormData): Promise<number> {

    const password = formData.get("password") as string

    const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

    if (!regexPassword.test(password)) {
        return 401
    }

    const supabase = createClient()

    const result = await supabase.auth.updateUser({
        password: password
    })

    if (result.error?.status) {
        return 401
    }
    redirect("/login")
}