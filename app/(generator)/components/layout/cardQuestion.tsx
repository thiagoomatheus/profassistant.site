"use client"

import { useContext, useState } from "react"
import ActionQuestion from "./actionQuestion"
import useQuestions from "../../lib/hooks/useQuestions"
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext"
import Button from "@/app/components/layout/button"
import { FaCheckCircle } from "react-icons/fa";
import useClipboard from "../../lib/hooks/useClipboard"

export default function CardQuestion ({ questionString, id, update }: {
    questionString: string
    id: string
    update?: boolean
}) {
    const [status, setStatus] = useState<"read" | "edit">("read")
    const [isSaved, setIsSaved] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>(questionString)
    const { user } = useContext(AuthContext)
    const { separateQuestion, saveQuestion, updateQuestion } = useQuestions()
    const copyToClipboard = useClipboard()
    const questionObject = separateQuestion(question)

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setQuestion(target.value)
    }

    return (
        <div key={id} className="p-3 flex flex-col items-start gap-2 border border-orange rounded-lg shadow-md">
            {status === "read" && questionObject && (
                <>
                    {isSaved && <div className="text-green-500 m-[-12px]"><FaCheckCircle /></div>}
                    <p>Pergunta: {questionObject.body}</p>
                    <p>a&#41; {questionObject.alternativeA}</p>
                    <p>b&#41; {questionObject.alternativeB}</p>
                    <p>c&#41; {questionObject.alternativeC}</p>
                    <p>d&#41; {questionObject.alternativeD}</p>
                    <p>Alternativa correta: {questionObject.correctAlternative}</p>
                </>
            )}
            {status === "edit" && (
                <>
                   <textarea onChange={handleChange} className="w-full h-40">{`${question}`}</textarea> 
                </>
            )}

            {status === "read" && (
                <ActionQuestion>
                    {!isSaved && user?.plan !== "free" && (
                        <>
                            <Button text="Editar" handleClick={() => {
                                setStatus("edit")
                            }} />
                            {!update && (
                                <Button text="Salvar" handleClick={() => {
                                    saveQuestion(user!, question, setIsSaved)
                                    setStatus("read")
                                }}/>
                            )}
                        </>
                    )}
                    {isSaved && user?.plan !== "free" && (
                        <>
                            <Button text="Editar" handleClick={() => {
                                setStatus("edit")
                            }} />
                            <Button text="Salvo" />
                        </>
                    )}
                    {user?.plan === "premium" || user?.plan === "pro" && (
                        <>                        
                            <Button text="Copiar" handleClick={async () => copyToClipboard.then((copyFunction) => {
                                copyFunction(question)
                            })} />
                            {update && (
                                <Button text="Selecionar" handleClick={() => undefined} />
                            )}
                        </>
                    )}
                </ActionQuestion>
            )}

            {status === "edit" && (
                <ActionQuestion>
                    <Button text="Voltar" handleClick={() => setStatus("read")} />
                    {!update && (
                        <Button text="Salvar" handleClick={() => {
                            saveQuestion(user!, question, setIsSaved)
                            setStatus("read")
                        }}/>
                    )}
                    {update && (
                        <Button text="Salvar" handleClick={() => {
                            updateQuestion(user!, question, id).then(r => {
                                if (r === 200) {
                                    setStatus("read")
                                }
                            })
                        }}/>
                    )}
                </ActionQuestion>
            )}
        </div>
    )
}