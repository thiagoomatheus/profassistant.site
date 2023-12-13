"use client"

import { useContext, useState } from "react"
import ActionQuestion from "./actionQuestion"
import useQuestions from "../../lib/hooks/useQuestions"
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext"
import Button from "@/app/components/layout/button"
import { FaCheckCircle } from "react-icons/fa";

export default function CardQuestion ({ question, id }: {
    question: string
    id: number
}) {
    const { user } = useContext(AuthContext)
    const { separateQuestion, saveQuestion } = useQuestions()
    const [status, setStatus] = useState<"read" | "edit">("read")
    const [isSaved, setIsSaved] = useState<boolean>(false)
    const questionRead = separateQuestion(question)

    return (
        <div key={id} className="p-3 flex flex-col items-start gap-2 border border-orange rounded-lg shadow-md">
            {status === "read" && questionRead && (
                <>
                    {isSaved && <div className="text-green-500 m-[-12px]"><FaCheckCircle /></div>}
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
                    {!isSaved && (
                        <Button text="Salvar" handleClick={() => {
                            saveQuestion(user, question, setIsSaved)
                        }}/>
                    )}
                    {isSaved && (
                        <Button text="Salvo" />
                    )}
                </ActionQuestion>
            )}
            {user?.plan === "premium" || user?.plan === "pro" && (
                <ActionQuestion>
                    {status !== "edit" && (
                        <Button text="Editar" handleClick={() => {
                            setStatus("edit")
                        }} />
                    )}
                    {status === "edit" && (
                        <Button text="Voltar" handleClick={() => setStatus("read")} />
                    )}
                    {!isSaved && (
                        <Button text="Salvar" handleClick={() => {
                            saveQuestion(user, question, setIsSaved)
                        }}/>
                    )}
                    {isSaved && (
                        <Button text="Salvo" />
                    )}
                   
                    <Button text="Copiar" />
                </ActionQuestion>
            )}
        </div>
    )
}