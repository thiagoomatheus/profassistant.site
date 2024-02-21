import Button from "@/app/components/layout/button";
import { ExamSimpleDB } from "@/app/lib/types/types";
import useExams from "../lib/hooks/useExams";
import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";

export default function CardExams( { exam, handleDeleteExam }: {
    exam: ExamSimpleDB
    handleDeleteExam: (id: string) => void
}) {

    const { deleteExam } = useExams()
    const { generateNotification } = useNotification()
   
    return (
        <div key={exam.id} className="p-5 flex flex-col items-center gap-8 border border-orange rounded-lg shadow-md">
            <h3>{exam.school_name}</h3>
            <p>{exam.title} - {exam.subject}</p>
            <div className="flex flex-row self-start gap-5 justify-start">
                <Button text="Abrir" key={exam.id} href={`/minhas-atividades/${exam.id}`} />
                <Button text="Excluir" key={exam.id} handleClick={() => {
                    deleteExam(exam.id)
                    .then(response => {
                        if (response === "ok") {
                            generateNotification(NotificationTypes.ExamDeleteSuccess, "success")
                            return handleDeleteExam(exam.id)
                        }
                        return generateNotification(NotificationTypes.ExamDeleteFailed, "error")
                    })
                }} aditionalCSS="font-bold p-2" />
            </div>
        </div>
    )
}