"use client"

import useLogin from "@/app/(login)/lib/useLogin";
import Button from "./button";
import { useContext } from "react"
import { AuthContext } from "@/app/lib/contexts/AuthContext";

export default function Login () {

    const { handleLogoff } = useLogin()
    const { auth } = useContext(AuthContext)
    console.log(auth);

    return (
        <div className="flex flex-row gap-5 items-center">
            {!auth ? (
                <>
                    <Button href="/login" text="Login" />
                    <Button href="/register" text="Registrar-se" />
                </>
            ): (
                <Button href="/" text="Sair" handleClick={handleLogoff} />
            )}
        </div>
    )
}