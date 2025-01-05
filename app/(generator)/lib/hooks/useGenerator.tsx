"use client"

import useClipboard from "./useClipboard"
import { GeneratedDB } from "@/app/lib/types/types"
import { deleteGenerated, getGenerated, postGenerated, reviewData, updateGenerated } from "../actions"
import toast from "react-hot-toast"
import { useGeneratorContext } from "../contexts/generatorContextProvider"

export default function useGenerator () {

  const { state } = useGeneratorContext()

  const { type, subject } = state

  const copyToClipboard = useClipboard()

  async function handleSave(response: string) {

    postGenerated(response, type as "question" | "text" | "phrase" | "math_expression", type === "math_expression" ? null : subject)
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

  function handleCopyToClipboard(data: string) {

    return copyToClipboard(data.replace("Texto:", ""))

  }

  async function handleReview(data:string, toastId: string) {

    const prompt = `Tenho um banco de questões e preciso veriifcar a exatidão de uma questão, tanto seu corpo (a pergunta), quantos as alternativas e a resposta. Faça uma avaliação e me retorne com a correção das inconsistências. Me retorne a questão no mesmo formato abaixo. Sem comentários ou qualuer outro texto, apenas a questão corrigida. Caso não haja correções me retorne a questão da mesma forma que está abaixo.

${data}`

  const result = await reviewData(prompt)

  if (result.error) {
    return toast.error(result.error, { id: toastId })
  }
  
  const response = result.data

  toast.success("Avaliado com sucesso!", { id: toastId })

  return response as string
  
  }
  
  return {
    handleCopyToClipboard,
    handleSave,
    getGenerateds,
    handleUpdate,
    handleDelete,
    handleReview
  }
}