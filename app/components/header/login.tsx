"use client"

import useLogin from "@/app/(login)/lib/hooks/useLogin";
import Button from "../layout/button";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";

export default function Login () {

    const { handleLogout } = useLogin()
    const { auth } = useContext(AuthContext)

    const [isLogged, setIsLogged] = useState<boolean>(false)

    useEffect(() => {
        fetch("/api/login")
        .then(r => {
            if (r.status === 200) {
                return setIsLogged(true)
            }
            return setIsLogged(false)
        })
    },[auth])

    return (
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center font-bold">
            {!isLogged ? (
                <>
                    <Button href="/login" text="Login" />
                    <Button href="/register" text="Registrar-se" />
                </>
            ):(
                <button className="p-2 w-28 md:w-32 bg-white flex flex-col justify-center items-center rounded-xl shadow-slate-400 shadow-sm" onClick={handleLogout}>
                    Sair
                </button>
            )}
        </div>
    )
}