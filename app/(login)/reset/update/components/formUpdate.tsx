"use client"

import toast from "react-hot-toast";
import { updatePassword } from "../../lib/actions";
import { useRouter } from "next/navigation";

export default function FormUpdate () {
    const router = useRouter()
    return (
        <form action={async (formData:FormData) => {
            const { code, message } = await updatePassword(formData)
            if (code !== 200) {
                return toast.error(message)
            }
            toast.success(message)
            return router.push("/login")
        }} className="flex flex-col gap-7 w-full max-w-2xl">
            <input type="password" name="password"/>
            <input type="submit" value="Redefinir senha" />
        </form>
    )
}