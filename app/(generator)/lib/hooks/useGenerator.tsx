"use client"
import { useContext } from "react"
import useClipboard from "./useClipboard"
import { GeneratedDB } from "@/app/lib/types/types"
import { deleteGenerated, getGenerated, postGenerated, updateGenerated } from "../actions"
import toast from "react-hot-toast"
import { ResponseContext } from "../../gerador/components/responseContextProvider"
export default function useGenerator () {
  const { subject, type } = useContext(ResponseContext)
  const copyToClipboard = useClipboard()
  async function handleSave(response: string) {
    postGenerated(response, type.gerar as "question" | "text" | "quote" | "math_expression", type.gerar === "math_expression" ? null : subject.subject)
    .then(status => {
      status === 201 ? toast.success("Salvo com sucesso!") : toast.error("Erro ao salvar. Tente novamente mais tarde!")
    })
  }
  async function getGenerateds(filter?: string) {
    let data: GeneratedDB[] = []
    await getGenerated(filter)
    .then(generateds => {
      data = generateds
    })
    return data
  }
  async function handleUpdate(data: string, id: string) {
    await updateGenerated(data, id)
    .then(status => {
      status === 204 ? toast.success("Atualizado com sucesso!") : toast.error("Erro ao atualizar. Tente novamente mais tarde!")
    })
  }
  async function handleDelete(id:string) {
    await deleteGenerated(id)
    .then(status => {
      status === 204 ? toast.success("Excluído com sucesso!") : toast.error("Erro ao excluir. Tente novamente mais tarde!")
    })
  }
  async function handleCopyToClipboard(data: string | {
    title: string;
    text: string;
  }) {
    return copyToClipboard(typeof data === "string" ? data : `${data.title}\n${data.text}`)
  }
  
  return {
    handleCopyToClipboard,
    handleSave,
    getGenerateds,
    handleUpdate,
    handleDelete
  }
}