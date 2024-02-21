"use client"

import useQuestions from "../../lib/hooks/useQuestions";
import { QuestionDB } from "@/app/lib/types/types";
import CardContainer from "./cardContainer";
import { useContext, useEffect, useState } from "react";
import CardQuestion from "./cardQuestion";
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";
import CardLoading from "@/app/components/layout/cardLoading";

export default function MyQuestions( { handleSelect }: {
    handleSelect?: (question: string, id: string) => void
}) {

    const { user } = useContext(AuthContext)
    const { getQuestions } = useQuestions()
    const [questions, setQuestions] = useState<QuestionDB[] | undefined>()

    useEffect(() => {
        getQuestions(user!)
        .then(result => {            
            return setQuestions(result)
        })
    },[])

    function handleDeleteQuestion(id:string) {
        setQuestions(questions?.filter(question => question.id !== id))
    }
    
    return (
        <>
            {questions && (
                <CardContainer>
                    <>
                    {questions.map(q => (
                        <CardQuestion questionString={q.question} id={q.id} update key={q.id} handleSelect={handleSelect} handleDeleteQuestion={handleDeleteQuestion} />
                    ))}
                </>
                </CardContainer>
            )}
            {questions === undefined && (
                <CardLoading />
            )}
            {questions !== undefined && questions.length === 0 && (
                <p>Não foi possível encontrarmos suas questões salvas. Se você já salvou uma questão e ela não aparece aqui, por favor, recarregue a página. Mas, se você não salvou um questão podrá fazer isso por meio do gerador.</p>
            )}
        </>
    )
}