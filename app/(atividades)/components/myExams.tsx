"use client"

import CardContainer from "@/app/(generator)/components/layout/cardContainer";
import { ExamSimpleDB } from "@/app/lib/types/types";
import { useContext, useEffect, useState } from "react";
import useExams from "../lib/hooks/useExams";
import CardExams from "./cardExams";
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";
import CardLoading from "@/app/components/layout/cardLoading";

export default function MyExams() {

    const { user } = useContext(AuthContext)
    const { getExams } = useExams()
    const [exams, setExams] = useState<ExamSimpleDB[] | undefined>()

    useEffect(() => {
        getExams(user!)
        .then(result => {
            return setExams(result)
        })
    },[])

    return (
        <>
            {exams && (
                <CardContainer>
                    <>
                        {exams.map(exam => (
                            <CardExams key={exam.id} exam={exam} />
                        ))}
                    </>
                </CardContainer>
            )}
            {exams === undefined && (
                <CardLoading />
            )}
            {exams !== undefined && exams.length === 0 && (
                <p>Não foi possível encontrarmos suas atividades preparadas. Se você já criou uma atividade e ela não aparece aqui, por favor, recarregue a página. Mas, se você não criou uma atividade, crie uma agora.</p>
            )}
        </>
    )
}