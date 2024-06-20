import Link from "next/link";
import LoginForm from "../components/loginForm";

export default function Login () {

    return (
        <>
            <h2>Acesse sua conta</h2>
            <LoginForm />
            <p>Esqueceu a senha? Redefina a senha <Link className="underline hover:text-orange" href={"/reset"} >aqui</Link></p>
            <p>Não tem uma conta? Cadastre-se <Link className="underline hover:text-orange" href={"/register"} >aqui</Link></p>
        </>
    )
}