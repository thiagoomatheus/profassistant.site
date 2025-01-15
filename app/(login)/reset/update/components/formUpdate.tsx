"use client"
import toast from "react-hot-toast"
import { updatePassword } from "../../lib/actions"
import { useRouter } from "next/navigation"
export default function FormUpdate () {
    const router = useRouter()
    return (
        <form action={async (formData:FormData) => {
            const toastUpdate = toast.loading('Atualizando...')
            const result = await updatePassword(formData)
            if (result !== "success") return toast.error(`Não foi possível atualizar sua senha. Erro: ${result.error}`, {id: toastUpdate})
            toast.success("Senha atualizada com sucesso!", {id: toastUpdate})
            return router.push("/login")
        }} className="flex flex-col gap-7 w-full max-w-2xl">
            <input type="password" name="password"/>
            <input type="submit" value="Redefinir senha" />
        </form>
    )
}