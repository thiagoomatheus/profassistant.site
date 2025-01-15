"use client"
import toast from "react-hot-toast"
import { resetPassword } from "../lib/actions"
import { useRouter } from "next/navigation"
export default function FormReset() {
    const router = useRouter()
    return (
        <form action={async (formData:FormData) => {
            const toastReset = toast.loading('Enviando...')
            const result = await resetPassword(formData)
            if (result !== "success") return toast.error(`Não foi possível enviar o email. Erro: ${result.error}`, {id: toastReset})
            toast.success("Email enviado com sucesso!", {id: toastReset})
            return router.push("/login")
        }} className="flex flex-col gap-7 w-full max-w-2xl">
            <input type="email" name="email" placeholder="Digite seu email" />
            <input type="submit" value="Continuar" />
        </form>
    )
}