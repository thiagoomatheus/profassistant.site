"use client"

import useAuth from "../lib/hooks/useLogin"

export default function RegisterForm () {

    const { handleRegister } = useAuth()

    return (
        <form action={async (formData: FormData) => {
            await handleRegister(formData)
        }} className="max-w-md flex flex-col gap-5">
            <label>Seu nome completo:
                <input required name="name" type="text" placeholder="Insira seu nome" />
            </label>
            <label>Seu CPF:
                <input required name="cpf" type="text" placeholder="Insira seu CPF (somente números)" maxLength={11} />
            </label>
            <label>Seu telefone:
                <input required name="phone" type="tel" placeholder="Insira seu telefone (somente números)" maxLength={11} />
            </label>
            <label>Seu email:
                <input required name="email" type="email" placeholder="Insira seu email" />
            </label>
            <label>Sua senha:
                <input required name="password" type="password" placeholder="Insira sua senha" />
            </label>
            <p className="text-sm">Lembre-se: Sua senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial ($*&@#), um número e 8 caracteres.</p>
            <input type="submit" value="Criar conta" />
        </form>
    )
}