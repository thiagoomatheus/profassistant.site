"use client"

import Form from "../components/form";
import useLogin from "../lib/hooks/useLogin";

export default function Login () {

    const { handleLogin } = useLogin()

    return (
        <>
            <h1 className="font-bold text-3xl">Acesse sua conta</h1>
            <Form btnText="Entrar" handleSubmit={handleLogin} />
        </>
    )
}