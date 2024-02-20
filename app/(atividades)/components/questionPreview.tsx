import useQuestions from "@/app/(generator)/lib/hooks/useQuestions";
import Button from "@/app/components/layout/button";
import { ExamQuestionDB } from "@/app/lib/types/types";

export default function QuestionPreview({ question, id, handleRemoveQuestion }: {
    question: ExamQuestionDB
    id: number
    handleRemoveQuestion: (id: number) => void
}) {

    const {separateQuestion} = useQuestions()

    const questionObject = separateQuestion(question.question ? question.question : question.question_id!)
    
    return (
        <div className="flex flex-col gap-5 duration-200 p-2 rounded-xl hover:bg-red-200 relative questionPreview">
            <span className="hidden"><Button text="Remover" handleClick={() => {
                handleRemoveQuestion(id)
            }} /></span>
            {question.layout === "text" && (
                <div className="flex flex-col gap-3" key={`textQuestion${question.position}`}>
                    <h3 className="text-center">{question.title_text}</h3>
                    {question.text?.split("//").map(paragraph => {
                        return <p className="indent-5 text-justify">{paragraph}</p>
                    })}
                </div>
            )}
            {question.layout === "image" && question.image && (
                <div key={`imageQuestion${question.position}`}>
                    <img src={question.image} alt={`Imagem da questão ${question.position}`} />
                </div>
            )}
            {question.alternative === "yes" && questionObject && (
                <div className="flex flex-col gap-3 max-h-fit" key={`question${question.position}`}>
                    <p>{question.position}&#41; {questionObject.body}</p>
                    <p>a&#41; {questionObject.alternativeA}</p>
                    <p>b&#41; {questionObject.alternativeB}</p>
                    <p>c&#41; {questionObject.alternativeC}</p>
                    <p>d&#41; {questionObject.alternativeD}</p>
                </div>
            )}
            {question.alternative !== "yes" && (
                <div className="h-52" key={`question${question.position}`}>
                    <p>{question.position}&#41; {question.question}</p>
                </div>
            )}
        </div>
    )
}