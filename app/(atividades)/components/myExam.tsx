"use client"
import Accordion from "@/app/components/layout/accordion"
import Header from "./exam/header"
import Body from "./exam/body"
import Preview from "./preview"
import Button from "@/app/components/layout/button"
import { useState } from "react"
import { Exam, ExamQuestionDB } from "@/app/lib/types/types"
import { addExam, updateExam } from "../lib/actions"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
export const initialQuestionsExam = {
    support: null,
    support_id: null,
    question: null,
    question_id: null,
    exam_id: null,
    position: undefined,
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
    const router = useRouter()
    const [exam, setExam] = useState<Exam>(data ? data : initialExam)
    const [questionsExam, setQuestionsExams] = useState<ExamQuestionDB>(initialQuestionsExam)
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
        setQuestionsExams(initialQuestionsExam)
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
                <Body setQuestionsExam={setQuestionsExams} questionsExam={questionsExam} handleAddQuestion={handleAddQuestion} />
            </Accordion>
            {exam.school_name && (
                <Accordion text="Preview">
                    <Preview exam={exam} handleRemoveQuestion={handleRemoveQuestion} />
                </Accordion>
            )}
            {exam.questions.length !== 0 && (
                <div className="flex flex-row gap-3">
                    {!data && (
                        <Button text="Salvar" handleClick={async () => {
                            const toastSave = toast.loading("Salvando atividade...")
                            const result = await addExam(exam)
                            if (result !== "success") return toast.error(`Erro ao salvar atividade. Erro: ${result.error}`, { id: toastSave })
                            toast.success("Atividade salva com sucesso!", { id: toastSave })
                            return router.push("/minhas-atividades")
                        }} />
                    )}
                    {data && (
                        <Button text="Atualizar" handleClick={async () => {
                            const toastUpdate = toast.loading("Atualizando atividade...")
                            if (data === exam) return toast.error("Por favor, faça uma alteração antes de atualizar.", { id: toastUpdate })
                            const result = await updateExam(data, exam)
                            if (result !== "success") return toast.error(`Erro ao atualizar atividade. Erro: ${result.error}`, { id: toastUpdate })
                            toast.success("Atividade atualizada com sucesso!", { id: toastUpdate })
                            return router.push("/minhas-atividades")
                        }} />
                    )}
                    <Button text="Imprimir" handleClick={() => {
                        window.print()
                    }} />
                </div>
            )}
        </section>
    )
}