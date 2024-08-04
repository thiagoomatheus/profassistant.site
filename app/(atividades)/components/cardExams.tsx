import Button from "@/app/components/layout/button";
import { ExamSimpleDB } from "@/app/lib/types/types";
import { deleteExam } from "../lib/actions";
export default function CardExams({exam}: {exam: ExamSimpleDB}) {
    const handleDelete = deleteExam.bind(null, exam.id)
    return (
        <div key={exam.id} className="p-5 flex flex-col items-center gap-8 border border-orange rounded-lg shadow-md">
            <h3>{exam.school_name}</h3>
            <p>{exam.title} - {exam.subject}</p>
            <div className="flex flex-row self-start gap-5 justify-start">
                <form action={handleDelete}>
                    <Button text="Excluir" type="submit" key={`delete_${exam.id}`} aditionalCSS="font-bold p-2" />
                </form>
                <Button text="Abrir" key={`open_${exam.id}`} href={`/minhas-atividades/${exam.id}`} />
            </div>
        </div>
    )
}