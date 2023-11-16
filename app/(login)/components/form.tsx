"use client"

import { useState } from "react"
import { User } from "@/app/lib/types/types";
import useLogin from "../lib/useLogin"

export default function Form ({btnText}: {
    btnText: string
}) {

    const [user, setUser] = useState<User>({
        email: "",
        password: ""
    })

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const { handleLogin, handleLoginGoogle } = useLogin()

    return (
        <>
            <form className="w-[450px] flex flex-col gap-2" onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                handleLogin(user)
            }}>
                <label>Seu email:
                    <input name="email" type="email" placeholder="Insira seu email" onChange={handleChange} />
                </label>
                <label>Sua senha:
                    <input name="password" type="password" placeholder="Insira sua senha" onChange={handleChange} />
                </label>
                <p>Lembre-se: Sua senha deve conter pelo menos uma letra miníscula, uma letra maiúscula, um caractere especial ($*&@#), um número e 8 caracteres.</p>
                <input type="submit" value={btnText} />
            </form>
            <button onClick={handleLoginGoogle} className=" w-[450px] flex flex-row justify-center gap-x-6 p-1 sm:p-2 items-center bg-sky-500 sm:text-2xl font-bold text-white hover:bg-sky-700 duration-500 rounded-xl">
                <span>Login com Google</span>
                <span className="bg-white text-3xl p-1"></span>
            </button>
        </>
    )
}