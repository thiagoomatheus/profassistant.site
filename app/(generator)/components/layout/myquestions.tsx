import useQuestions from "../../lib/hooks/useQuestions";
import { QuestionDB, UserDB } from "@/app/lib/types/types";
import QuestionsContainer from "./questionsContainer";

export default async function MyQuestions( { user }: {
    user: UserDB
}) {

    const { getQuestions } = useQuestions()
    const questions: QuestionDB[] | undefined = await getQuestions(user!)
    
    return (
        <>
            <QuestionsContainer questions={questions!} />
        </>
    )
}