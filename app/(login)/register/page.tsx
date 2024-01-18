"use client"

import Form from "../components/form";
import useAuth from "../lib/hooks/useLogin";

export default async function Register () {

    const { handleRegister } = useAuth()
    return (
        <>
            <h2>Crie uma conta</h2>
            <Form btnText="Criar conta" handleSubmit={handleRegister} register={true} />
        </>
    )
}