"use client"

import Modal from "@/app/components/layout/modal";
import Label from "../../gerador/components/label"
import toast from "react-hot-toast";
import { createData } from "../../lib/actions";
import Select from "../../gerador/components/select";
import { materiaOptions } from "../../gerador/components/options";
import { useState } from "react";
import Button from "@/app/components/layout/button";

export default function Modals({ type, close }: { type: "text" | "question" | "phrase" | "math_expression", close: () => void }) {

    const [quantity, setQuantity] = useState<number>(0)

    const closeModal = () => {
        setQuantity(0)
        close()
    }

    const alternativeLetter = (index: number) => {
        switch (index) {
            case 0:
                return "A"
            case 1:
                return "B"
            case 2:
                return "C"
            case 3:
                return "D"
            case 4:
                return "E"
            default:
                break;
        }
    }

    return (
        <>
            {type === "text" && (
                <Modal key={type} close={closeModal}>
                    <h3>Adicionar Texto</h3>
                    <p>Inisira um texto para salvar em seu banco de dados e conseguir utilizá-los em suas provas e atividades.</p>
                    <form className="flex flex-col gap-3 md:gap-5" action={async (formData: FormData) => {
                        const toastId = toast.loading("Salvando...")
                        const text = formData.get("text") as string
                        const title = formData.get("title") as string
                        const data = `Título: ${title}\nTexto: ${text}`
                        const subject = formData.get("subject") as string
                        const result = await createData(type, data, subject)
                        if (result.error) return toast.error(`Erro ao salvar. Tente novamente mais tarde! Erro: ${result.error}`, {id: toastId})
                        toast.success("Texto salvo com sucesso!", {id: toastId})
                        return closeModal()
                    }}>
                        <Label key={"materia"} label="Matéria">
                            <Select key={"materia"} name="subject" options={materiaOptions} />
                        </Label>
                        <Label key={"title"} label="Título">
                            <input type="text" placeholder="Insira seu título" className="font-normal p-2" name="title" required></input>
                        </Label>
                        <Label key={"text"} label="Texto">
                            <textarea placeholder="Insira seu texto aqui" className="font-normal overflow-auto h-[180px] max-h-[300px]" name="text" required></textarea>
                        </Label>
                        <input type="submit" value={"Salvar"} />
                    </form>
                </Modal>
            )}
            {type === "phrase" && (
                <Modal key={type} close={closeModal}>
                    <h3>Adicionar Frase</h3>
                    <p>Inisira uma frase para salvar em seu banco de dados e conseguir utilizá-las em suas provas e atividades.</p>
                    <form className="flex flex-col gap-3 md:gap-5" action={async (formData: FormData) => {
                        const toastId = toast.loading("Salvando...")
                        const data = "Frase: " + formData.get("phrase") as string
                        const subject = formData.get("subject") as string
                        const result = await createData(type, data, subject)
                        if (result.error) return toast.error(`Erro ao salvar. Tente novamente mais tarde! Erro: ${result.error}`, {id: toastId})
                        toast.success("Frase salva com sucesso!", {id: toastId})
                        return closeModal()
                    }}>
                        <Label key={"materia"} label="Matéria">
                            <Select key={"materia"} name="subject" options={materiaOptions} />
                        </Label>
                        <Label key={"phrase"} label="Frase">
                            <textarea placeholder="Insira sua frase aqui" className="font-normal overflow-auto h-[180px] max-h-[300px]" name="phrase" required></textarea>
                        </Label>
                        <input type="submit" value={"Salvar"} />
                    </form>
                </Modal>
            )}
            {type === "math_expression" && (
                <Modal key={type} close={closeModal}>
                    <h3>Adicionar Expressões Matemáticas</h3>
                    <p>Inisira expressões matemáticas para salvar em seu banco de dados e conseguir utilizá-las em suas provas e atividades.</p>
                    <p>Inserindo mais de 1 expressão matemática nós criaremos uma grade de questões para você.</p>
                    <form className="flex flex-col gap-3 md:gap-5" action={async (formData: FormData) => {
                        
                        const toastId = toast.loading("Salvando...")

                        const expressions = []
                        for (let i = 0; i < quantity; i++) {
                            expressions.push("--" + formData.get(`expression_${i}`) as string)
                        }

                        const data = expressions.join("\n")
                        
                        const result = await createData(type, data)

                        if (result.error) return toast.error(`Erro ao salvar. Tente novamente mais tarde! Erro: ${result.error}`, {id: toastId})

                        toast.success("Expressões matemáticas salvas com sucesso!", {id: toastId})

                        return closeModal()
                    }}>
                        <div className="flex gap-3 justify-start items-start">
                            <Button text="+" handleClick={() => setQuantity(quantity + 1)} aditionalCSS={`font-bold ${quantity > 3 ? "hidden" : ""}`} />
                            <Button text="-" handleClick={() => setQuantity(quantity - 1)} aditionalCSS={`font-bold ${quantity === 0 ? "hidden" : ""}`} />
                        </div>
                        {Array.from({length: quantity}).map((_, index) => (
                            <Label key={index} label={`Expressão ${index + 1}`}>
                                <input placeholder="Insira sua expressão aqui" className="font-normal" name={`expression_${index}`} required></input>
                            </Label>
                        ))}
                        <input type="submit" value={"Salvar"} />
                    </form>
                </Modal>
            )}
            {type === "question" && (
                <Modal key={type} close={closeModal}>
                    <h3>Adicionar Questão</h3>
                    <p>Inisira uma questão para salvar em seu banco de dados e conseguir utilizá-las em suas provas e atividades.</p>
                    <form className="flex flex-col gap-3 md:gap-5" action={async (formData: FormData) => {
                        const toastId = toast.loading("Salvando...")
                        
                        const subject = formData.get("subject") as string
                        const body = formData.get("body") as string
                        const alternatives = []
                        for (let i = 0; i < quantity; i++) {
                            alternatives.push(alternativeLetter(i) + ") " + (formData.get(`alternative_${alternativeLetter(i)}`) as string))
                        }
                        const correct = formData.get("correct") as string

                        const data = `${body}\n${alternatives.join("\n")}${correct ? `\nResposta correta: ${correct}` : ""}`
                        
                        const result = await createData(type, data, subject)

                        if (result.error) return toast.error(`Erro ao salvar. Tente novamente mais tarde! Erro: ${result.error}`, {id: toastId})

                        toast.success("Expressões matemáticas salvas com sucesso!", {id: toastId})

                        return closeModal()
                    }}>
                        <Label key={"subject"} label="Matéria">
                            <Select name="subject" options={materiaOptions} />
                        </Label>
                        <Label key={"question"} label="Corpo da Questão">
                            <textarea className="font-normal overflow-auto" name="body" placeholder="Insira sua questão aqui" required></textarea>
                        </Label>
                        <label>Alternativas</label>
                        <div className="flex gap-3 justify-start items-start">
                            <Button text="+" handleClick={() => setQuantity(quantity + 1)} aditionalCSS={`font-bold ${quantity > 4 ? "hidden" : ""}`} />
                            <Button text="-" handleClick={() => setQuantity(quantity - 1)} aditionalCSS={`font-bold ${quantity === 0 ? "hidden" : ""}`} />
                        </div>
                        {Array.from({length: quantity}).map((_, index) => (
                            <Label key={index} label={`Alternativa ${alternativeLetter(index)}`}>
                                <textarea placeholder="Insira sua alternativa aqui" className="font-normal" name={`alternative_${alternativeLetter(index)}`} required></textarea>
                            </Label>
                        ))}
                        {quantity > 1 && (
                            <Label key={"correct"} label="Alternativa Correta">
                                <input placeholder="Insira a letra da alternativa correta" type="text" name="correct" maxLength={1} required />
                            </Label>
                        )}
                        <input type="submit" value={"Salvar"} />
                    </form>
                </Modal>
            )}
        </>
    )
}