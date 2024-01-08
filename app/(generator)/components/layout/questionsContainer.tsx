import { QuestionDB } from "@/app/lib/types/types";
import CardQuestion from "./cardQuestion";

export default function QuestionsContainer( { questions }: {
    questions: QuestionDB[]
}) {
    return (
        <div className="grid md:grid-cols-2 gap-5">
            {questions.map(q => (
                <CardQuestion questionString={q.question} id={q.id} />
            ))}
        </div>
    )
}