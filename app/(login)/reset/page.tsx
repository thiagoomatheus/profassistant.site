"use client"

import { resetPassword } from "./lib/actions";
import { useFormState } from "react-dom";
import Notification from "@/app/(notifications)/components/notification";
import { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";

export default function Reset () {

    const [ data, formAction ] = useFormState(resetPassword, 0)

    return (
        <>
            <h2>Insira o email cadastrado</h2>
            <p className="max-w-3xl text-center">Caso o email inserido seja válido e conste em nossa base de dados você receberá um email para redefinir sua senha.</p>
            <form action={formAction} className="flex flex-col gap-7 w-full max-w-2xl">
                <input type="email" name="email" placeholder="Digite seu email" />
                <input type="submit" value="Continuar" />
                {data === 401 && <Notification message={NotificationTypes.ResetPasswordEmailFailed} type="error" />}
                {data === 200 && <Notification message={NotificationTypes.ResetPasswordEmailSuccess} type="success" />}
            </form>
        </>
    )
}