"use client"

import Link from "next/link";
import Form from "../components/form";
import useLogin from "../lib/hooks/useLogin";

export default function Login () {

    const { handleLogin } = useLogin()

    return (
        <>
            <h2>Acesse sua conta</h2>
            <Form btnText="Entrar" handleSubmit={handleLogin} />
            <p className="text-base">Não tem uma conta? Cadastre-se <Link className="text-base underline hover:text-orange" href={"/register"} >aqui</Link></p>
        </>
    )
}