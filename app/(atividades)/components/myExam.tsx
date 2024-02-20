"use client"

import Accordion from "@/app/components/layout/accordion"
import Header from "./exam/header"
import Body from "./exam/body"
import Preview from "./preview"
import Button from "@/app/components/layout/button"
import { useEffect, useState } from "react"
import useExams from "../lib/hooks/useExams"
import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification"
import { Exam, ExamQuestionDB } from "@/app/lib/types/types"

export const initialQuestionsExam = {
    title_text: null,
    text: null,
    image: null,
    question: null,
    question_id: null,
    exam_id: null,
    position: undefined,
    alternative: undefined,
    layout: undefined
}

export const initialExam = {
    title: "",
    teacher: "",
    school_name: "",
    subject: "",
    obs: "",
    grade: "",
    questions: []
}

export default function MyExam( { data }: {
    data?: Exam
} ) {

    const [questionsExam, setQuestionExams] = useState<ExamQuestionDB>(initialQuestionsExam)
    const [exam, setExam] = useState<Exam>(data ? data : initialExam)

    useEffect(() => {
        if (data) {
            setExam(data)
        }
    },[data])

    const { addExam, printExam, updateExam } = useExams()
    const { generateNotification } = useNotification()

    function handleChangeHeader(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setExam({
            ...exam,
            [target.name]: target.value
        })
    }

    function handleAddQuestion() {
        const el = document.querySelectorAll<HTMLInputElement>("#radio");
        setExam({
            ...exam,
            questions: [
                ...exam.questions,
                questionsExam
            ]
        })
        el.forEach(radioBtn => {
            radioBtn.checked = false
        })
        setQuestionExams(initialQuestionsExam)
    }

    function handleRemoveQuestion(id:number) {
        setExam({
            ...exam,
            questions: exam.questions.filter((_, i: number) => i !== id)
        })
    }

    return (
        <section className="flex flex-col justify-center items-center gap-5">
            <Accordion text="Cabeçalho" color="blue">
                <Header handleChange={handleChangeHeader} value={exam ? exam : undefined} />
            </Accordion>
            <Accordion text="Conteúdo" color="orange-2">
                <Body state={questionsExam} setState={setQuestionExams} handleAddQuestion={handleAddQuestion} />
            </Accordion>
            {exam.school_name && (
                <Accordion text="Preview">
                    <Preview exam={exam} handleRemoveQuestion={handleRemoveQuestion} />
                </Accordion>
            )}
            {exam.questions.length !== 0 && (
                <div className="flex flex-row gap-3">
                    {!data && (
                        <Button text="Salvar" handleClick={() => {
                            addExam(exam)
                            .then(response => {
                                if (response !== "ok") {
                                    return generateNotification(undefined, NotificationTypes.ExamSavedFailed, "error")
                                }
                                return generateNotification(NotificationTypes.ExamSavedSuccess, undefined, "success")
                            })
                            return
                        }} />
                    )}
                    {data && (
                        <Button text="Atualizar" handleClick={() => {
                            if (data === exam) {
                                return generateNotification(undefined, NotificationTypes.ExamNoUpdate, "error", false)
                            }
                            updateExam(data, exam)
                            .then(response => {
                                if (response !== "ok") {
                                    return generateNotification(undefined, NotificationTypes.ExamUpdateFailed, "error", false)
                                }
                                return generateNotification(NotificationTypes.ExamUpdateSuccess, undefined, "success", false)
                            })
                        }} />
                    )}
                    <Button text="Imprimir" handleClick={() => {
                        printExam()
                    }} />
                </div>
            )}
        </section>
    )
}