import Button from "@/app/components/layout/button"
import { ExamQuestionDB } from "@/app/lib/types/types"
export default function QuestionPreview({ question, id, handleRemoveQuestion }: {
    question: ExamQuestionDB
    id: number
    handleRemoveQuestion: (id: number) => void
}) {
    return (
        <div className={`flex flex-col gap-5 duration-200 p-2 rounded-xl hover:bg-red-400 dark:hover:bg-red-700 relative questionPreview ${question.uppercase ? "uppercase" : ""}`}>
            <span className="hidden"><Button text="Remover" handleClick={() => {
                handleRemoveQuestion(id)
            }} /></span>
            {question.layout === "support" && (
                <div className="flex flex-col gap-3" key={`supportQuestion${question.position}`}>
                    {question.support!.split("Texto:")[0] && (
                        <p className="font-bold">{question.support!.split("Texto:")[0]}</p>
                    )}
                    {question.support!.split("Texto:")[1].split("\n").map((paragraph: string, i: number) => <p className="indent-5 md:indent-10 print:indent-10" key={i}>{paragraph}</p>)}
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
                    {question.number_of_lines > 0 && new Array(question.number_of_lines).fill(null).map((_, i) => {
                        return <div key={`line${i}`} className={`h-3 ${question.show_lines ? "border-b print:border-b border-black dark:border-white print:border-black dark:print:border-black" : ""}`} />
                    })}
                </>
            )}
            {question.layout === "math_expressions" && (
                <>
                    <p className={`${question.uppercase ? "uppercase" : ""}`} >{`${question.position})`} Resolva as expressões matemáticas a seguir:</p>
                    <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full">
                        {question.question!.replaceAll("--","").split("\n").map((paragraph: string, i: number) => (
                            <div key={i}>
                                <p>{paragraph} =</p>
                                {question.number_of_lines > 0 && new Array(question.number_of_lines).fill(null).map((_, i) => {
                                    return <div key={`line${i}`} className={`h-8 ${question.show_lines ? "border-b print:border-b border-black dark:border-white print:border-black dark:print:border-black" : ""}`} />
                                })}
                            </div>
                        ))}
                    </div>
                </>
            )}
            
        </div>
    )
}