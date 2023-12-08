import Button from "@/app/components/layout/button";
import useQuestions from "../lib/hooks/useQuestions";
import useClipboard from "../lib/hooks/useClipboard";
import { useContext } from "react";
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";

export default function Question() {

    const { transformResponseInObject, treatResponseForText, saveQuestion } = useQuestions()
    const { user } = useContext(AuthContext)
    const copyToClipboard = useClipboard()

    const questionsObject = transformResponseInObject()
    const questionsText = treatResponseForText()
    
    return (
        <div className="flex flex-col gap-5 justify-center w-full">   
            {questionsObject?.length && (
                <>
                    {questionsObject.map((question, i) => (
                        <div key={i} className="p-3 flex flex-col items-start gap-2 border border-orange rounded-lg shadow-md">
                            <p>Pergunta: {question.body}</p>
                            <p>a&#41; {question.alternativeA}</p>
                            <p>b&#41; {question.alternativeB}</p>
                            <p>c&#41; {question.alternativeC}</p>
                            <p>d&#41; {question.alternativeD}</p>
                            <p>Alternativa correta: {question.correctAlternative}</p>
                            {!user && (
                                <div className="flex flex-row gap-5">
                                    <Button text="Salvar" handleClick={() => saveQuestion("premium", questionsText[i])} />
                                    <Button text="Copiar" />
                                    <Button text="Editar" />
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
            {/* {questions.length && (
                <>
                    {questions.map((q,i) => (
                        q ? <textarea className="w-full h-40">{`${q}`}</textarea> : null
                    ))}
                </>
            )} */}
        </div>
    )
}