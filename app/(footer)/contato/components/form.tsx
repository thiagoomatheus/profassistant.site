"use client"

import Label from "@/app/(generator)/gerador/components/label"
import Button from "@/app/components/layout/button"
import { postMessageForContact } from "../lib/actions"
import toast from "react-hot-toast"

export default function Form() {
    return (
        <form action={async (data: FormData) => {

            const toastMessage = toast.loading("Enviando...")

            const result = await postMessageForContact(data)

            if (result === "error") return toast.error("Erro ao enviar. Tente novamente mais tarde!", { id: toastMessage })

            return toast.success("Mensagem enviada com sucesso!", { id: toastMessage })

        }} className="flex flex-col gap-2 max-w-xl">
            <fieldset className="border-2 border-blue-2 p-3 gap-2">
                <legend className="font-bold">Seus dados</legend>
                <Label label="Nome">
                    <input type="text" name="name" required />
                </Label>
                <Label label="Email">
                    <input type="email" name="email" required />
                </Label>
                <Label label="Telefone">
                    <input type="phone" name="phone" required />
                </Label>
            </fieldset>
            <fieldset className="border-2 border-blue-2 p-3 gap-2">
                <legend className="font-bold">Sua mensagem</legend>
                <Label label="Assunto">
                    <input type="text" name="subject" required />
                </Label>
                <Label label="Mensagem">
                    <textarea placeholder="Maxímo de 700 caracteres" className="font-normal" name="message" minLength={5} maxLength={700} required></textarea>
                </Label>
            </fieldset>
            <Button text="Enviar" type="submit" />
        </form>
    )
}