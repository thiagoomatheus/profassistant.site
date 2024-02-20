import { Exam } from "@/app/lib/types/types"
import QuestionPreview from "./questionPreview"

export default function Preview( { exam, handleRemoveQuestion }: {
    exam: Exam
    handleRemoveQuestion: (id: number) => void
}) {

    const questions = exam.questions.sort((a,b) => {
        if (a.position === b.position) {
            return a.question!.localeCompare(b.question!);
        } else {
            return a.position! - b.position!;
        }
    })

    return (
        <div id="print" className="flex flex-col gap-10 p-3 md:p-7 border-2">
            {exam.school_name && (
                <header className="flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-center">{exam.school_name}</h1>
                    {exam.title && (
                        <p>{exam.title} - {exam.subject}</p>
                    )}
                    {exam.teacher && (
                        <p className="self-start"><span className="font-bold">Professora:</span> {exam.teacher}</p>
                    )}
                    {exam.grade && (
                        <div className="grid grid-cols-[80px_0.80fr_40px_0.15fr] md:grid-cols-[110px_0.80fr_50px_0.15fr] lg:grid-cols-[130px_0.80fr_60px_0.15fr] w-full gap-1">
                            <p className="font-bold">Nome do Aluno:</p>
                            <div className="border-b border-black"></div>
                            <p>{exam.grade}:</p>
                            <div className="border-b border-black"></div>
                        </div>
                    )}
                    {exam.obs && (
                        <p>{exam.obs}</p>
                    )}
                </header>
            )}
            {exam.questions.length !== 0 && (
                <div className="flex flex-col gap-5">
                    {questions.map((question,i) => {
                        return <QuestionPreview key={i} question={question} id={i} handleRemoveQuestion={handleRemoveQuestion} />
                    })}
                </div>
            )}
        </div>
    )
}