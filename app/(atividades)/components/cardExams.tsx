import { ExamSimpleDB } from "@/app/lib/types/types"
import CardExamsActions from "./cardExamsActions"
export default function CardExams({exam}: {exam: ExamSimpleDB}) {
    return (
        <div key={exam.id} className="p-5 flex flex-col items-center gap-8 border border-orange rounded-lg shadow-md">
            <h3>{exam.school_name}</h3>
            <p>{exam.title} - {exam.subject}</p>
            <CardExamsActions examId={exam.id} />
        </div>
    )
}