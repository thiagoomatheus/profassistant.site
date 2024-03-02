"use client"

import { useState } from "react"
import { User } from "@/app/lib/types/types";


export default function Form ({btnText, handleSubmit, register}: {
    btnText: string,
    handleSubmit: (user: User) => void
    register?: boolean
}) {

    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
        plan: "free",
    })

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    return (
        <>
            <form className="max-w-md flex flex-col gap-5" onSubmit={async (e: React.FormEvent) => {
                e.preventDefault()
                handleSubmit(user)
            }}>
                {register && (
                    <label>Seu nome:
                        <input name="name" type="text" placeholder="Insira seu nome" onChange={handleChange} />
                    </label>
                )}
                <label>Seu email:
                    <input name="email" type="email" placeholder="Insira seu email" onChange={handleChange} />
                </label>
                <label>Sua senha:
                    <input name="password" type="password" placeholder="Insira sua senha" onChange={handleChange} />
                </label>
                <p className="text-sm">Lembre-se: Sua senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial ($*&@#), um número e 8 caracteres.</p>
                <input type="submit" value={btnText} />
            </form>
        </>
    )
}