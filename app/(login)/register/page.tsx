"use client"

import Form from "../components/form";
import useLogin from "../lib/hooks/useLogin"

export default function Register () {

    const { handleRegister } = useLogin()

    return (
        <>
            <h1 className="font-bold text-3xl">Crie uma conta</h1>
            <Form btnText="Criar conta" handleSubmit={handleRegister} />
        </>
    )
}