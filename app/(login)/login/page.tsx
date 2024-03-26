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
            <p>Esqueceu a senha? Redefina a senha <Link className="underline hover:text-orange" href={"/reset"} >aqui</Link></p>
            <p>Não tem uma conta? Cadastre-se <Link className="underline hover:text-orange" href={"/register"} >aqui</Link></p>
        </>
    )
}