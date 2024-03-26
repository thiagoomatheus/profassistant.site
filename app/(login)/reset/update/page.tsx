"use client"

import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";
import { createClient } from "@/app/lib/supabase/client";
import { useState } from "react"

export default function Update () {

    const { generateNotification } = useNotification()

    const [password, setPassword] = useState<string>("")

    const supabase = createClient()

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setPassword(target.value)
    }

    return (
        <>
            <h2>Redefina sua senha</h2>
            <p className="max-w-3xl text-center">Lembre-se: Sua senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial ($*&@#), um número e 8 caracteres.</p>
            <form className="flex flex-col gap-7 w-full max-w-3xl" onSubmit={(e: React.FormEvent) => {

                e.preventDefault()

                const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

                if (!regexPassword.test(password)) {
                    return generateNotification(NotificationTypes.PasswordInvalid, "error")
                }

                supabase.auth.updateUser({
                    password: password
                })
                .then(() => {
                    generateNotification(NotificationTypes.UpdatePasswordSuccess, "success", "/login")
                })
                .catch(() => {
                    generateNotification(NotificationTypes.UpdatePasswordFailed, "error")
                })
            }}>
                <input type="password" onChange={handleChange} />
                <input type="submit" value="Redefinir senha" />
            </form>
        </>
    )
}