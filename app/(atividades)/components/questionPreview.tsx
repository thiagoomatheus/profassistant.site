import Button from "@/app/components/layout/button"
import { ExamQuestionDB } from "@/app/lib/types/types"
export default function QuestionPreview({ question, id, handleRemoveQuestion }: {
    question: ExamQuestionDB
    id: number
    handleRemoveQuestion: (id: number) => void
}) {
    return (
        <div className="flex flex-col gap-5 duration-200 p-2 rounded-xl hover:bg-red-400 dark:hover:bg-red-700 relative questionPreview">
            <span className="hidden"><Button text="Remover" handleClick={() => {
                handleRemoveQuestion(id)
            }} /></span>
            {question.layout === "support" && (
                <div className="flex flex-col gap-3" key={`supportQuestion${question.position}`}>
                    {question.support!.split("Texto:")[0] && (
                        <p className="font-bold">{question.support!.split("Texto:")[0]}</p>
                    )}
                    {question.support!.split("Texto:")[1].split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                </div>
            )}
            {question.layout !== "math_expressions" && (
                <>
                    {question.question!.split("\n").map((paragraph: string, i: number) => {
                        if (paragraph.includes("Resposta")) {
                            return
                        }
                        else if (i === 0) {
                            return <p key={i}>{`${question.position}) ${paragraph}`}</p>
                        }
                        return <p key={i}>{paragraph}</p>
                    })}
                </>
            )}
            {question.layout === "math_expressions" && (
                <>
                    <p>{`${question.position})`} Resolva as expressões matemáticas a seguir:</p>
                    <div className="grid grid-cols-2 grid-rows-2 gap-y-36 w-full mb-36">
                        {question.question!.replaceAll("--","").split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph} =</p>)}
                    </div>
                </>
            )}
            
        </div>
    )
}