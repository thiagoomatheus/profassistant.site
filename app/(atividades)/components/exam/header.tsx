import Label from "@/app/(generator)/components/form/label";
import { Exam } from "@/app/lib/types/types";

export default function Header( { handleChange, value }: {
    handleChange: (e: React.ChangeEvent)=> void
    value?: Exam
}) {

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
        </form>
    )
}