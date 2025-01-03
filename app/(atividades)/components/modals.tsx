"use client"
import Label from "@/app/(generator)/gerador/components/label"
import MyGenerateds from "@/app/(generator)/components/layout/myGenerateds"
import { getGenerated } from "@/app/(generator)/lib/actions"
import CardLoading from "@/app/components/layout/cardLoading"
import Modal from "@/app/components/layout/modal"
import { ExamQuestionDB, GeneratedDB } from "@/app/lib/types/types"
import { FormEvent, Suspense, useEffect, useState } from "react"
export default function Modals( { type, close, state}: {
    type: "selectSupport" | "selectMathExpressions" | "selectQuestion" | "insertSupport" | "insertMathExpressions"| "insertQuestion",
    close: () => void
    state: {
        questionsExam: ExamQuestionDB
        setQuestionsExam: React.Dispatch<React.SetStateAction<ExamQuestionDB>>
    }
} ) {
    const [data, setData] = useState<GeneratedDB[]>()
    useEffect(() => {
        switch (type) {
            case "selectSupport":
                getGenerated("or=(type.eq.text,type.eq.phrase)")
                .then(data => {
                    setData(data)
                })
                break;
            case "selectMathExpressions":
                getGenerated("type=eq.math_expression")
                .then(data => {
                    setData(data)
                })
                break;
            case "selectQuestion":
                getGenerated("type=eq.question")
                .then(data => {
                    setData(data)
                })
                break;
            default:
                console.log("teste");
                break;
        }
    }, [type])
    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        state.setQuestionsExam({
            ...state.questionsExam,
            [target.name]: target.value
        })
    }
    function handleSelectQuestionAndMathExpression(data:string, id: string) {
        state.setQuestionsExam({
            ...state.questionsExam,
            question_id: id,
            question: data
        })
        close()
    }
    function handleSelectSupport(data:string, id: string) {
        state.setQuestionsExam({
            ...state.questionsExam,
            support_id: id,
            support: data
        })
        close()
    }
    return (
        <>
            {type === "insertSupport" && (
                <Modal key={type} close={close}>
                    <h3>Insira um apoio para a questão</h3>
                    <p>Inisira um texto ou uma frase onde servirá de base para a questão.</p>
                    <p>Atenção! Siga o padrão a seguir:</p>
                    <p className="font-bold">Para textos:</p>
                    <p>Título: Seu título</p>
                    <p>Texto: Digite ou cole seu texto aqui...</p>
                    <p className="font-bold">Para frase:</p>
                    <p>Frase: Digite ou cole sua frase aqui...</p>
                    <form className="flex flex-col gap-3 md:gap-5" onSubmit={(e: FormEvent) => {
                        e.preventDefault()
                        close()
                    }}>
                        <Label label="Apoio">
                            <textarea placeholder="Siga o padrão para funcionar corretamente" className="font-normal overflow-auto h-[180px] max-h-[300px] text-xs" name="support" onChange={handleChange}></textarea>
                        </Label>
                        <input type="submit" value={"Fechar"} />
                    </form>
                </Modal>
            )}
             {type === "insertQuestion" && (
                <Modal key={type} close={close}>
                    <h3>Insira uma questão</h3>
                    <form className="flex flex-col gap-3 md:gap-5" onSubmit={(e: FormEvent) => {
                        e.preventDefault()
                        close()
                    }}>
                        <Label label="Questão">
                            <textarea placeholder={`Ex.: Qual o melhor amigo do professor? a) Um café b) Um café c) Um caderno d) O ${process.env.NEXT_PUBLIC_PROJECT_NAME}`} className="font-normal overflow-auto h-[180px] max-h-[300px] text-xs" name="question" onChange={handleChange}></textarea>
                        </Label>
                        <input type="submit" value={"Fechar"} />
                    </form>
                </Modal>
            )}
            {type === "insertMathExpressions" && (
                <Modal key={type} close={close}>
                    <h3>Insira as expressões matemáticas</h3>
                    <p>Você poderá adicionar uma expressão matemática ou um conjunto.</p>
                    <p>Atenção: Se for adicionar mais de uma expressão, coloque em linhas diferentes.--</p>
                    <form className="flex flex-col gap-3 md:gap-5" onSubmit={(e: FormEvent) => {
                        e.preventDefault()
                        close()
                    }}>
                        <Label label="Expressões matemáticas">
                            <textarea 
                            placeholder=
{`Ex.: 
1+1
2+2`} 
                            className="font-normal overflow-auto h-[180px] max-h-[300px] text-xs" name="question" onChange={handleChange}></textarea>
                        </Label>
                        <input type="submit" value={"Fechar"} />
                    </form>
                </Modal>
            )}
            {type === "selectQuestion" && (
                <Modal key={type} close={close} customWidth="w-11/12 md:w-4/5 md:min-h-[350px]">
                    <h3>Selecione uma questão</h3>
                    <Suspense fallback={<CardLoading />}>
                        <MyGenerateds data={{ generates: data }} handleSelect={handleSelectQuestionAndMathExpression} />
                    </Suspense>
                </Modal>
            )}
            {type === "selectSupport" && (
                <Modal key={type} close={close} customWidth="w-11/12 md:w-4/5 md:min-h-[350px]">
                    <h3>Selecione um texto ou frase</h3>
                    <Suspense fallback={<CardLoading />}>
                        <MyGenerateds data={{ generates: data }} handleSelect={handleSelectSupport} />
                    </Suspense>
                </Modal>
            )}
            {type === "selectMathExpressions" && (
                <Modal key={type} close={close} customWidth="w-11/12 md:w-4/5 md:min-h-[350px]">
                    <h3>Selecione um conjunto de expressões matemática</h3>
                    <Suspense fallback={<CardLoading />}>
                        <MyGenerateds data={{ generates: data }} handleSelect={handleSelectQuestionAndMathExpression} />
                    </Suspense>
                </Modal>
            )}
        </>
    )
}