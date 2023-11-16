import Form from "../components/form";
import useLogin from "../lib/useLogin";

export default function Login () {
    return (
        <>
            <h1 className="font-bold text-3xl">Acesse sua conta</h1>
            <Form btnText="Entrar" />
        </>
    )
}