import useQuestions from "../lib/hooks/useQuestions";

export default function Question() {

    const { treatResponseAPI } = useQuestions()

    const questions = treatResponseAPI()
    
    return (
        <div className="flex flex-col gap-5 justify-center items-center w-full">   
            {questions?.length && (
                <>
                    {questions.map((question, i) => (
                        <div key={i} className="p-3 flex flex-col gap-2 border-b-2 border-gray-600">
                            <p>Pergunta: {question.body}</p>
                            <p>a&#41; {question.alternativeA}</p>
                            <p>b&#41; {question.alternativeB}</p>
                            <p>c&#41; {question.alternativeC}</p>
                            <p>d&#41; {question.alternativeD}</p>
                            <p>Alternativa correta: {question.correctAlternative}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}