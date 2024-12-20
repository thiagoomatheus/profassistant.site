"use server"
import { createClient } from "@/app/lib/supabase/server"
export async function resetPassword(formData:FormData) {
    const supabase = createClient()
    const email = formData.get("email") as string
    const result = await supabase.auth.resetPasswordForEmail(email, {redirectTo: `${process.env.URL_SITE}/reset/update`})
    if (result.error?.message) return {error: result.error.message}
    return "success"
}
export async function updatePassword(formData:FormData) {
    const password = formData.get("password") as string
    const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
    if (!regexPassword.test(password)) return {error: "Senha inválida."}
    const supabase = createClient()
    const result = await supabase.auth.updateUser({password: password})
    if (result.error?.status) return {error: result.error.message}
    return "success"
}