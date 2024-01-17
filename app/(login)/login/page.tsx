import Link from "next/link";
import Form from "../components/form";

export default async function Login () {
    return (
        <>
            <h2>Acesse sua conta</h2>
            <Form btnText="Entrar" />
            <p>Não tem uma conta? Cadastre-se <Link className="text-base underline hover:text-orange" href={"/register"} >aqui</Link></p>
        </>
    )
}