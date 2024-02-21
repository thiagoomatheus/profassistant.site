"use client"

import Link from "next/link";
import Form from "../components/form";
import useAuth from "../lib/hooks/useLogin";

export default function Login () {

    const { handleLogin } = useAuth()

    return (
        <>
            <h2>Acesse sua conta</h2>
            <Form btnText="Entrar" handleSubmit={handleLogin} />
            <p>Não tem uma conta? Cadastre-se <Link className="text-base underline hover:text-orange" href={"/register"} >aqui</Link></p>
        </>
    )
}