"use client"

import Button from "@/app/components/layout/button";
import SectionWithBorder from "@/app/components/layout/sectionWithBorder";
import { ExamQuestionDB } from "@/app/lib/types/types";
import { useState } from "react";
import FormBody from "./formBody";
import LabelBody from "./labelBody";
import Modals from "../modals";
import FieldActions from "./fieldActions";

export default function Body( { setQuestionsExam, questionsExam, handleAddQuestion }: {
    setQuestionsExam: React.Dispatch<React.SetStateAction<ExamQuestionDB>>
    questionsExam: ExamQuestionDB
    handleAddQuestion: () => void
}) {
    const [modal, setModal] = useState<"selectSupport" | "selectMathExpressions" | "selectQuestion" | "insertSupport" | "insertMathExpressions"| "insertQuestion" | "close">("close")

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setQuestionsExam({
            ...questionsExam,
            [target.name]: target.value
        })
    }
    
    return (
        <>
            {modal !== "close" && (
                <Modals type={modal} close={() => setModal("close")} state={{ questionsExam, setQuestionsExam }} />
            )}
            <div className="flex flex-col md:flex-row gap-2 md-gap:5">
                <SectionWithBorder key="layoutForm" borderColor="border-orange">
                    <p className="text-xs md:text-sm font-bold text-blue">Layout da questão:</p>
                    <FormBody>
                        <LabelBody>
                            Simples
                            <input id="radio" className="h-14 w-20 bg-[url('../public/images/question_simple.jpg')]" type="radio" name="layout" value={"simple"} onChange={handleChange} />
                        </LabelBody>
                        <LabelBody>
                            Com apoio
                            <input id="radio" className="h-14 w-20 bg-[url('../public/images/question_with_text.jpg')]" type="radio" name="layout" value={"support"} onChange={handleChange} />
                        </LabelBody>
                        <LabelBody>
                            Expressões matemáticas
                            <input id="radio" className="h-14 w-20 bg-[url('../public/images/question_with_image.jpg')]" type="radio" name="layout" value={"math_expressions"} onChange={handleChange} />
                        </LabelBody>
                    </FormBody>
                </SectionWithBorder>
            </div>
            <div className="flex flex-col flex-wrap gap-5 justify-start">
                {questionsExam.layout !== "math_expressions" && (
                    <>
                        {questionsExam.layout && !questionsExam.question && (
                            <FieldActions key={"insert_question"} field="Questão" handles={{ handleSelect: () => setModal("selectQuestion"), handleInsert: () => setModal("insertQuestion")}} />
                        )}
                        {questionsExam.layout && questionsExam.question && (
                            <FieldActions key={"preview_question"} field="Questão" data={questionsExam.question} handles={{ 
                                handleDelete: () => 
                                    setQuestionsExam({ ...questionsExam, question: null, question_id: null }) 
                            }} />
                        )}
                        {questionsExam.layout === "support" && !questionsExam.support && (
                            <FieldActions key={"insert_support"} field="Apoio" handles={{ handleSelect: () => setModal("selectSupport"), handleInsert: () => setModal("insertSupport")}} />
                        )}
                        {questionsExam.layout === "support" && questionsExam.support && (
                            <FieldActions key={"preview_support"} field="Apoio" data={questionsExam.support} handles={{ 
                                handleDelete: () => 
                                    setQuestionsExam({ ...questionsExam, support: null, support_id: null }) 
                            }} />
                        )}
                    </>
                )}
                {questionsExam.layout === "math_expressions" && (
                    <>
                        {!questionsExam.question && (
                            <FieldActions key={"insert_question"} field="Expressões matemáticas" handles={{ handleSelect: () => setModal("selectMathExpressions"), handleInsert: () => setModal("insertMathExpressions")}} />
                        )}
                        {questionsExam.question && (
                            <FieldActions key={"preview_question"} field="Expressões matemáticas" data={questionsExam.question} handles={{ 
                                handleDelete: () => 
                                    setQuestionsExam({ ...questionsExam, question: null, question_id: null }) 
                            }} />
                        )}
                    </>
                )}
                {questionsExam.question && (
                            <div className="flex flex-row justify-start items-center gap-2" key={"insert_question"}>
                                <p className="text-xs md:text-base font-bold">Número da questão:</p>
                                <input type="number" name="position" min={1} max={20} onChange={handleChange} />
                            </div>
                        )}
                {questionsExam.position && (
                    <Button key={"add_question"} text="Adicionar Questão" aditionalCSS="w-full" handleClick={() => {
                        handleAddQuestion()
                    }} />
                )}
            </div> 
        </>
    )
}