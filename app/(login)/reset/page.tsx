"use client"

import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";
import { createClient } from "@/app/lib/supabase/client";
import { useState } from "react"

export default function Reset () {

    const { generateNotification } = useNotification()

    const [email, setEmail] = useState<string>("")

    const supabase = createClient()

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setEmail(target.value)
    }

    return (
        <>
            <h2>Insira o email cadastrado</h2>
            <p className="max-w-3xl text-center">Caso o email inserido seja válido e conste em nossa base de dados você receberá um email para redefinir sua senha.</p>
            <form className="flex flex-col gap-7 w-full max-w-3xl" onSubmit={async (e: React.FormEvent) => {
                e.preventDefault()
                await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: "http://localhost:3000/reset/update"
                })
                .then(() => {
                    generateNotification(NotificationTypes.ResetPasswordEmailSuccess, "success")
                })
                .catch(() => {
                    generateNotification(NotificationTypes.UpdatePasswordFailed, "error")
                })
            }}>
                <input type="email" onChange={handleChange} />
                <input type="submit" value="Continuar" />
            </form>
        </>
    )
}