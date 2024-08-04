"use client"
import useAuth from "../lib/hooks/useLogin"
export default function LoginForm () {
    const { handleLogin } = useAuth()
    return (
        <form action={async (formData: FormData) => await handleLogin(formData)} className="max-w-md flex flex-col gap-5">
            <label>Seu email:
                <input name="email" type="email" placeholder="Insira seu email" />
            </label>
            <label>Sua senha:
                <input name="password" type="password" placeholder="Insira sua senha" />
            </label>
            <p className="text-sm">Lembre-se: Sua senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial ($*&@#), um número e 8 caracteres.</p>
            <input type="submit" value={"Entrar"} />
        </form>
    )
}