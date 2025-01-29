"use client"

import Label from "@/app/(generator)/gerador/components/label"
import { Exam } from "@/app/lib/types/types"
import { useRef } from "react"
export default function Header( { handleChange, value }: {
    handleChange: (e: React.ChangeEvent, ref?: React.RefObject<HTMLInputElement>)=> void
    value?: Exam
}) {

    const uppercaseCheckboxRef = useRef<HTMLInputElement>(null)
    
    return (
        <form className="w-full flex flex-col gap-5">
            <Label label="Nome da Instituição" key="school">
                <input type="text" key="schoolInput" onChange={handleChange} value={value ? value.school_name : undefined} name="school_name" />
            </Label>
            <Label label="Título" key="title">
                <input type="text" key="titleInput" onChange={handleChange} value={value ? value.title : undefined} name="title" />
            </Label>
            <Label label="Disciplina" key="subject">
                <input type="text" key="subjectInput" onChange={handleChange} value={value ? value.subject : undefined} name="subject" />
            </Label>
            <Label label="Nome da Professora" key="teacher">
                <input type="text" key="teacherInput" onChange={handleChange} value={value ? value.teacher : undefined} name="teacher" />
            </Label>
            <Label label="Turma/Ano" key="grade">
                <input type="text" key="gradeInput" onChange={handleChange} value={value ? value.grade : undefined} name="grade" />
            </Label>
            <Label label="Observação" key="obs">
                <input type="text" key="obsInput" onChange={handleChange} value={value ? value.obs : undefined} name="obs" />
            </Label>
            <label className="flex flex-row items-center gap-5" key="uppercase">
                <p>Caixa alta?</p>
                <input className="w-fit h-fit" type="checkbox" key="uppercaseCheckbox" onChange={(e) => handleChange(e, uppercaseCheckboxRef)} defaultChecked={value ? value.uppercase : false} name="uppercase" ref={uppercaseCheckboxRef} />
            </label>
        </form>
    )
}