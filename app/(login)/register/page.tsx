"use client"

import Form from "../components/form";
import useLogin from "../lib/hooks/useLogin"

export default function Register () {

    const { handleRegister } = useLogin()

    return (
        <>
            <h2>Crie uma conta</h2>
            <Form btnText="Criar conta" handleSubmit={handleRegister} register={true} />
        </>
    )
}