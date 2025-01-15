"use client"
import Link from "next/link"
import useAuth from "../lib/hooks/useLogin"
export default function RegisterForm () {
    const { handleRegister } = useAuth()
    return (
        <form action={async (formData: FormData) => await handleRegister(formData)} className="max-w-md flex flex-col gap-5">
            <label>Seu nome completo:
                <input required name="name" type="text" placeholder="Insira seu nome" />
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
            <label className="flex flex-row justify-between items-center">
                <p className="text-xs md:text-sm flex-1">Declaro que aceito o uso de cookies especificados na <Link className="text-xs md:text-sm underline underline-offset-4" href="/politica-de-privacidade">Política de Privacidade</Link>, bem como os outros termos especificados nela</p>
                <input required className="w-4 mr-2" type="checkbox"/>
            </label>
            <p className="text-sm text-center">Lembre-se: Sua senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial ($*&@#), um número e 8 caracteres.</p>
            <input type="submit" value="Criar conta" />
        </form>
    )
}