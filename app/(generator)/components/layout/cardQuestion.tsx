"use client"

import { useContext, useState } from "react"
import ActionQuestion from "./actionQuestion"
import useQuestions from "../../lib/hooks/useQuestions"
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext"
import Button from "@/app/components/layout/button"

export default function CardQuestion ({ question, id }: {
    question: string
    id: number
}) {
    const { user } = useContext(AuthContext)
    const { separateQuestion, saveQuestion } = useQuestions()
    const [status, setStatus] = useState<"read" | "edit" | "saved">("read")
    const questionRead = separateQuestion(question)

    return (
        <div key={id} className="p-3 flex flex-col items-start gap-2 border border-orange rounded-lg shadow-md">
            {status === "read" && questionRead && (
                <>
                    <p>Pergunta: {questionRead.body}</p>
                    <p>a&#41; {questionRead.alternativeA}</p>
                    <p>b&#41; {questionRead.alternativeB}</p>
                    <p>c&#41; {questionRead.alternativeC}</p>
                    <p>d&#41; {questionRead.alternativeD}</p>
                    <p>Alternativa correta: {questionRead.correctAlternative}</p>
                </>
            )}
            {status === "saved" && questionRead && (
                <>
                    <p>Pergunta: {questionRead.body}</p>
                    <p>a&#41; {questionRead.alternativeA}</p>
                    <p>b&#41; {questionRead.alternativeB}</p>
                    <p>c&#41; {questionRead.alternativeC}</p>
                    <p>d&#41; {questionRead.alternativeD}</p>
                    <p>Alternativa correta: {questionRead.correctAlternative}</p>
                </>
            )}
            {status === "edit" && (
                <>
                   <textarea className="w-full h-40">{`${question}`}</textarea> 
                </>
            )}
            {user?.plan == "basic" && (
                <ActionQuestion>
                    {status !== "saved" && (
                        <Button text="Salvar" handleClick={() => {
                            saveQuestion(user, question, setStatus)
                        }}/>
                    )}
                    {status === "saved" && (
                        <Button text="Salvo" />
                    )}
                </ActionQuestion>
            )}
            {user?.plan === "premium" || user?.plan === "pro" && (
                <ActionQuestion>
                    {status !== "saved" && (
                        <Button text="Salvar" handleClick={() => {
                            saveQuestion(user, question, setStatus)
                        }}/>
                    )}
                    {status === "saved" && (
                        <Button text="Salvo" />
                    )}
                    <Button text="Editar" handleClick={() => setStatus("edit")} />
                    <Button text="Copiar" />
                </ActionQuestion>
            )}
        </div>
    )
}