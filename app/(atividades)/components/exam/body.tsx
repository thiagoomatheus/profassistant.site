"use client"

import Label from "@/app/(generator)/components/form/label";
import MyQuestions from "@/app/(generator)/components/layout/myquestions";
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";
import Button from "@/app/components/layout/button";
import Modal from "@/app/components/layout/modal";
import SectionWithBorder from "@/app/components/layout/sectionWithBorder";
import { ExamQuestionDB } from "@/app/lib/types/types";
import { FormEvent, Suspense, useContext, useState } from "react";
import FormBody from "./formBody";
import LabelBody from "./labelBody";

export default function Body( { setState, state, handleAddQuestion }: {
    setState: React.Dispatch<React.SetStateAction<ExamQuestionDB>>
    state: ExamQuestionDB
    handleAddQuestion: () => void
}) {

    const { user } = useContext(AuthContext)
    const [modal, setModal] = useState<"selectText" | "selectImage" | "selectQuestion" | "insertText" | "insertImage"| "insertQuestion" | "close">()

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setState({
            ...state,
            [target.name]: target.value
        })
    }

    function handleSelect(question:string, id: string) {
        setState({
            ...state,
            question_id: id,
            question: question
        })
        setModal("close")
    }
    
    return (
        <>
            {modal === "insertText" && (
                <Modal key="insertText" close={() => {
                    setModal("close")
                }}>
                    <h3>Insira um texto</h3>
                    <form className="flex flex-col gap-3 md:gap-5" onSubmit={(e: FormEvent) => {
                        e.preventDefault()
                        setModal("close")
                    }}>
                        <Label label="Título">
                            <input type="text" name="title_text" onChange={handleChange} />
                        </Label>
                        <Label label="Texto">
                            <p className="text-sm font-normal">Atenção: Separe os parágrafos com //</p>
                            <textarea placeholder="Digite ou cole seu texto aqui" className="font-normal overflow-auto h-[180px] max-h-[300px] text-xs" name="text" onChange={handleChange}></textarea>
                        </Label>
                        <input type="submit" value={"Salvar"} />
                    </form>
                </Modal>
            )}
             {modal === "insertQuestion" && (
                <Modal key="insertQuestion" close={() => {
                    setModal("close")
                }}>
                    <h3>Insira uma questão</h3>
                    <form className="flex flex-col gap-3 md:gap-5" onSubmit={(e: FormEvent) => {
                        e.preventDefault()
                        setModal("close")
                    }}>
                        <Label label="Questão">
                            <textarea placeholder="Ex.: Qual o melhor amigo do professor? a) Um café b) Um café c) Um caderno d) O Question! Generator" className="font-normal overflow-auto h-[180px] max-h-[300px] text-xs" name="question" onChange={handleChange}></textarea>
                        </Label>
                        <input type="submit" value={"Salvar"} />
                    </form>
                </Modal>
            )}
            {modal === "selectQuestion" && (
                <Modal key="selectQuestion" close={() => {
                    setModal("close")
                }} customWidth="w-11/12 md:w-4/5 md:min-h-[350px]">
                    <h3>Selecione uma questão</h3>
                    <Suspense fallback={
                    <div className="flex w-full md:justify-around flex-col md:flex-row gap-5">
                        <div className="p-5 bg-slate-200 rounded-lg shadow-md w-full md:w-2/5 h-40 animate-pulse"></div>
                        <div className="p-5 bg-slate-200 rounded-lg shadow-md w-full md:w-2/5 h-40 animate-pulse"></div>
                    </div>}>
                        <MyQuestions handleSelect={handleSelect} />
                    </Suspense>
                </Modal>
            )}
            <div className="flex flex-col md:flex-row gap-2 md-gap:5">
                <SectionWithBorder key="layoutForm" borderColor="border-orange">
                    <p className="text-xs md:text-sm font-bold text-blue">Selecione o layout:</p>
                    <FormBody>
                        <LabelBody>
                            Simples
                            <input id="radio" className="h-14 w-20 bg-[url('../public/images/question_simple.jpg')]" type="radio" name="layout" value={"simple"} onChange={handleChange} />
                        </LabelBody>
                        <LabelBody>Com Texto
                            <input id="radio" className="h-14 w-20 bg-[url('../public/images/question_with_text.jpg')]" type="radio" name="layout" value={"text"} onChange={handleChange} />
                        </LabelBody>
                        {/* <LabelBody>
                            Com Imagem
                            <input id="radio" className="h-14 w-20 bg-[url('../public/images/question_with_image.jpg')]" type="radio" name="layout" value={"image"} onChange={handleChange} disabled />
                        </LabelBody> */}
                    </FormBody>
                </SectionWithBorder>
                <SectionWithBorder key="alternativeForm" borderColor="border-blue">
                    <p className="text-xs md:text-sm font-bold text-orange-2">Tipo de questão:</p>
                    <FormBody>
                        <LabelBody>
                            Com Alternativas
                            <input id="radio" className="h-14 w-20 bg-[url('../public/images/question_simple.jpg')]" type="radio" name="alternative" value="yes" onChange={handleChange} />
                        </LabelBody>
                        <LabelBody>Sem Alternativas
                            <input id="radio" className="h-14 w-20 bg-[url('../public/images/question_no_alternative.jpg')]" type="radio" name="alternative" value="no" onChange={handleChange} />
                        </LabelBody>
                    </FormBody>
                </SectionWithBorder>
            </div>
            {state.layout && state.alternative && (
                <div className="flex flex-row flex-wrap gap-5 justify-start">
                    {state.layout && state.alternative !== undefined && !state.question && (
                        <div className="flex flex-row justify-start items-center gap-5 border-r-2 pr-3 border-orange-2" key={"insert_question"}>
                            <p className="text-xs md:text-sm font-bold text-orange-2">Questão:</p>
                            <Button text="Selecionar" handleClick={() => {
                                setModal("selectQuestion")
                            }} />
                            <Button text="Inserir" handleClick={() => {
                                setModal("insertQuestion")
                            }} />
                        </div>
                    )}
                    {state.layout && state.alternative !== undefined && state.question && (
                        <div className="flex flex-row justify-between items-center gap-2" key={"preview_question"}>
                            <p className="text-xs md:text-sm font-bold text-orange-2">Questão:</p>
                            <p className="text-xs">{state.question.length >= 110 ? `${state.question.substring(0,110)}...` : state.question}</p>
                            <Button text="Excluir" handleClick={() => {
                                setState({
                                    ...state,
                                    question: null,
                                    question_id:null
                                })
                            }} />
                        </div>
                    )}
                    {state.layout === "text" && !state.title_text && !state.text && (
                        <div className="flex flex-row justify-start items-center gap-5 border-r-2 pr-3 border-blue" key={"insert_text"}>
                            <p className="text-xs md:text-sm font-bold text-blue">Texto:</p>
                            {/* <Button text="Selecionar" /> */}
                            <Button text="Inserir" handleClick={() => {
                                setModal("insertText")
                            }} />
                        </div>
                    )}
                    {state.layout === "text" && state.title_text && state.text && (
                        <div className="flex flex-row justify-between items-center gap-2" key={"preview_text"}>
                            <p className="text-xs md:text-sm font-bold text-blue">Texto:</p>
                            <p className="text-xs">Título: {state.title_text} / Texto: {state.text.substring(0,50)}...</p>
                            <Button text="Excluir" handleClick={() => {
                                setState({
                                    ...state,
                                    title_text: null,
                                    text: null
                                })
                            }} />
                        </div>
                    )}
                    {state.question && (
                        <div className="flex flex-row justify-start items-center gap-2" key={"insert_question"}>
                            <p className="text-xs md:text-sm font-bold text-orange-2">Número da Questão:</p>
                            <input type="number" name="position" min={1} max={20} onChange={handleChange} />
                        </div>
                    )}
                    {state.position && (
                        <Button text="Adicionar Questão" aditionalCSS="w-full" handleClick={() => {
                            handleAddQuestion()
                        }} />
                    )}
                </div>
            )}
            {/* Imagens ainda não estão disponíveis


            {state.layout === "image" && (
                <div className="flex flex-row justify-start items-center gap-2" key={"insert_image"}>
                    <p className="text-xs md:text-sm font-bold text-blue w-20">Imagem:</p>
                    <Button text="Selecionar" />
                    <Button text="Inserir" />
                </div>
            )} */}
            
        </>
        
    )
}