"use client"

import useLogin from "@/app/(login)/lib/hooks/useLogin";
import Button from "../layout/button";
import { useContext } from "react"
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";

export default function Login () {

    const { handleLogout } = useLogin()
    const { isLogged, user } = useContext(AuthContext)
    
    return (
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center font-bold">
            {!isLogged && !user ? (
                <Button href="/login" text="Login" />
            ):(
                <>
                    {user?.name !== undefined && (
                        <p className="font-normal">Olá, {user.name}</p>
                    )}
                    <Button text="Sair" handleClick={handleLogout}/>
                </>
            )}
        </div>
    )
}