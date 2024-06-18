"use client"

import { useFormState } from "react-dom";
import { updatePassword } from "../lib/actions";
import { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";
import Notification from "@/app/(notifications)/components/notification";

export default function Update () {

    const [ data, formAction ]= useFormState(updatePassword, null)
    
    return (
        <>
            <h2>Redefina sua senha</h2>
            <p className="max-w-3xl text-center">Lembre-se: Sua senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial ($*&@#), um número e 8 caracteres.</p>
            <form action={formAction} className="flex flex-col gap-7 w-full max-w-2xl">
                <input type="password" name="password"/>
                <input type="submit" value="Redefinir senha" />
                {data === 401 && <Notification message={NotificationTypes.UpdatePasswordFailed} type="error" />}
            </form>
        </>
    )
}