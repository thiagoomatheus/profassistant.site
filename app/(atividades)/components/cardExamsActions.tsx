"use client"
import Button from "@/app/components/layout/button";
import { deleteExam } from "../lib/actions";
import toast from "react-hot-toast";
export default function CardExamsActions({examId}: {examId: string}) {
    async function handleDelete() {
        const toastId = toast.loading(`Excluindo...`)
        const result = await deleteExam(examId)
        if (result !== "success") toast.error(`Erro ao excluir. Tente novamente mais tarde! Erro ${result.error}`, { id: toastId })
        toast.success("Excluído com sucesso!", { id: toastId })
    }
    return (
        <div className="flex flex-row self-start gap-5 justify-start">
            <Button text="Excluir" type="submit" key={`delete_${examId}`} aditionalCSS="font-bold p-2" handleClick={handleDelete} />
            <Button text="Abrir" key={`open_${examId}`} href={`/minhas-atividades/${examId}`} />
        </div>
    )
}