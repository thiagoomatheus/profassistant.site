import Button from "@/app/components/layout/button";
import { ExamSimpleDB } from "@/app/lib/types/types";

export default function CardExams( { exam }: {
    exam: ExamSimpleDB
}) {
   
    return (
        <div key={exam.id} className="p-5 flex flex-col items-center gap-8 border border-orange rounded-lg shadow-md">
            <h3>{exam.school_name}</h3>
            <p>{exam.title} - {exam.subject}</p>
            <Button aditionalCSS="self-start" text="Abrir" key={exam.id} href={`/minhas-atividades/${exam.id}`} />
        </div>
    )
}