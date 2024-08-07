"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import { updateProfile } from "../../lib/actions"
import { setTheme } from "@/app/lib/theme/action"
export default function useProfile(setValue: React.Dispatch<React.SetStateAction<string | undefined>>, close: () => void) {
    const [data, setData] = useState<string | undefined>(undefined)
    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement
        setData(target.value)
    }
    async function handleSave(column: string, defaultData?: string) {
        const toastId = toast.loading(`Atualizando...`)
        if (!data) return toast.error(`Insira um valor válido`, { id: toastId })
        if (data === defaultData) return toast.error(`Insira um valor diferente`, { id: toastId })
        if (column === "phone") {
            const regexPhone: RegExp = /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/
            if (!regexPhone.test(data)) return toast.error(`Insira um telefone válido`, { id: toastId })
        }
        const result = await updateProfile(column, data)
        if (result !== "success") return toast.error(`Falha ao atualizar perfil. Erro: ${result.error}`, { id: toastId })
        toast.success("Perfil atualizado com sucesso!", { id: toastId })
        setValue(data)
        return close()
    }
    async function handleSaveTheme(defaultData: string) {
        const toastId = toast.loading(`Atualizando...`)
        if (data !== defaultData) return toast.error(`Insira um valor diferente`, { id: toastId })
        const result = await setTheme(data!)
        if (result !== "success") return toast.error(`Falha ao atualizar perfil. Erro: ${result.error}`, { id: toastId })
        const html = document.querySelector("html")
        if (data === "dark") html!.classList.add("dark")
        if (data === "light") html!.classList.remove("dark")
        toast.success("Perfil atualizado com sucesso!", { id: toastId })
        setValue(data)
        return close()
    }
    return {
        handleChange,
        handleSave,
        handleSaveTheme
    }
}