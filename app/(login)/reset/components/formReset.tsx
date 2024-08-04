"use client"
import toast from "react-hot-toast"
import { resetPassword } from "../lib/actions"
export default function FormReset() {
    return (
        <form action={async (formData:FormData) => {
            const { code, message } = await resetPassword(formData)
            if (code !== 200) return toast.error(message)
            return toast.success(message)
        }} className="flex flex-col gap-7 w-full max-w-2xl">
            <input type="email" name="email" placeholder="Digite seu email" />
            <input type="submit" value="Continuar" />
        </form>
    )
}