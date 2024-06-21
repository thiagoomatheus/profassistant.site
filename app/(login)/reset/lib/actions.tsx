"use server"

import { createClient } from "@/app/lib/supabase/server"

export async function resetPassword(formData:FormData) {
    const supabase = createClient()
    const email = formData.get("email") as string
    const result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset/update"
    })
    if (result.error?.message) {
        return {
            code: 401,
            message: `Não foi possível enviar o email. Tente novamente mais tarde!`
        }
    }
    return {
        code: 200,
        message: "Email enviado com sucesso!"
    }
}

export async function updatePassword(formData:FormData) {
    const password = formData.get("password") as string
    const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
    if (!regexPassword.test(password)) {
        return {
            code: 401,
            message: "Senha inválida. Atente-se as exigências especificadas!"
        }
    }
    const supabase = createClient()
    const result = await supabase.auth.updateUser({
        password: password
    })
    if (result.error?.status) {
        return {
            code: 401,
            message: `Não foi possível atualizar sua senha. Tente novamente mais tarde!`
        }
    }
    return {
        code: 200,
        message: "Senha atualizada com sucesso!"
    }
}