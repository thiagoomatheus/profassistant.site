"use client"

import useQuestions from "../../lib/hooks/useQuestions";
import { QuestionDB, UserDBSupabase } from "@/app/lib/types/types";
import QuestionsContainer from "./questionsContainer";
import { useEffect, useState } from "react";

export default async function MyQuestions( { user }: {
    user: UserDBSupabase
}) {

    const { getQuestions } = useQuestions()
    const [questions, setQuestions] = useState<QuestionDB[] | undefined>()

    useEffect(() => {
        getQuestions(user!)
        .then(result => {
            return setQuestions(result)
        })
    },[])
    
    return (
        <>
            <QuestionsContainer questions={questions ? questions : []} />
        </>
    )
}