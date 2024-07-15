"use client"

import { useContext, useState } from "react";
import { ResponseAPIContext } from "../contexts/ResponseAPIContext";
import useClipboard from "./useClipboard";
import { GeneratedDB } from "@/app/lib/types/types";
import { deleteGenerated, generateData, getGenerated, postGenerated, updateGenerated } from "../actions";
import { getUser } from "@/app/(login)/lib/actions";
import toast from "react-hot-toast";

export default function useGenerator () {

  const { setResponse, setSubject, setGenerated, response, subject, generated } = useContext(ResponseAPIContext)
  const copyToClipboard = useClipboard()

  const [info, setInfo] = useState<{
    ano: string
    idade: string
    gerar?: "Texto" | "Questão" | "Frase" | "Expressão matemática"
    tipo_texto?: string
    caracteres?: string
    assunto?: string
    materia?: string
    quantidade?: string
    alternativa?: string
    dificuldade?: "Simples" | "Intermediário" | "Avançado"
    texto_apoio?: {
        titulo: string
        texto: string
    }
    citacao?: "Sim" | "Não"
    conter?: string
    operacao?: "Adição" | "Subtração" | "Multiplicação" | "Divisão" | "Fração" | "Equação 1 grau" | "Equação 2 grau" | "Conjunto numérico"
    obs?: string
  }>({
    ano: "",
    idade: "",
  })

  function handleChange(e:React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setInfo({
        ...info,
        [target.name]: target.value
    })
  }

  function getPrompt() {
    let prompt = ""
    switch (info.gerar) {
      case "Questão":
        prompt = `Sou professor do ${info.ano} e preciso gerar ${info.quantidade} questões para uma atividade de ${info.materia} sobre ${info.assunto}. Os alunos possuem ${info.idade} anos. ${info.alternativa?.includes("0") ? "Gere questões sem alternativas, ou seja, questões discursivas." : `Gere questões com ${info.alternativa} alternativas, sendo a), b), c) e d) e e), conforme a quantidade de questões. Apenas uma alternativa deve estar correta.`} Indique resposta correta com Resposta:. As questões devem ter dificuldade ${info.dificuldade}. Retorne com -- antes da questão. ${info.texto_apoio ? `O seguinte texto deve ser usado para a geração das questões: Título: ${info.texto_apoio?.titulo}, Texto: ${info.texto_apoio?.texto}.` : ""}`
        break;
      case "Texto":
        prompt = `Sou professor do ${info.ano} e preciso gerar um texto para meus alunos. O texto deve ser do tipo: ${info.tipo_texto} e deve conter ${info.caracteres} caracteres. O texto deve ser sobre o assunto: ${info.assunto}. Os alunos possuem ${info.idade} anos. Retorne com Título: "Título do texto" e Texto: "Texto".`
        break
      case "Expressão matemática":
        prompt = `Sou professor do ${info.ano} e preciso gerar ${info.quantidade} expressão(ões) matemática(s) para meus alunos. As expressões devem ser do tipo: ${info.operacao}. ${info.obs ? `Apenas uma observação: ${info.obs}.` : ""} Os alunos possuem ${info.idade} anos. Separe cada expressão com -- antes da expressão.`
        break
      case "Frase":
        prompt = `Sou professor do ${info.ano} e preciso gerar uma frase para uma atividade. ${info.citacao === "Sim" ? `A frase deve ser uma citação verídica de um autor respeitado.` : "A frase não deve ser uma citação, mas sim uma frase aleatória."} ${info.conter ? `A frase deve conter a palavra/letra a seguir: ${info.conter}.` : ""} Os alunos possuem ${info.idade} anos. Não retorne frases com sentido sexual ou discurso de ódio. Retorne com Frase: "Frase".`
        break
    }
    return prompt
  }

  function treatResponse(response: string) {
    let treatedResponse: string = ""
    switch (info.gerar) {
      case "Texto":
        treatedResponse = response.replace(/[*]{2,}/g, '')
        break
      default:
        treatedResponse = response.replace(/\\n/g, "  ").replace(/[\\"']/g, "").replace(/\s{2,}/g, ' ').replace(/[\s]+\)/, ")")
        break;
    }
    return treatedResponse
  }

  async function handleSubmit() {
    const toastSubmit = toast.loading("Carregando! Aguarde alguns instantes...")
    const prompt = getPrompt()
    const { data, error } = await generateData(prompt)
    if (error) {
      return toast.error("Erro ao gerar informações. Tente novamente.", {
        id: toastSubmit
      })
    }
    setSubject(info.materia)
    setGenerated(info.gerar)
    setResponse(treatResponse(data))
    return toast.success("Finalizado! Veja as informações geradas.", {
      id: toastSubmit
    })
  }

  function separateResponse() {
    const result: string[] = response!.split("--")
    const data: string[] = result.filter(item => item.trim().length > 0)
    return data
  }

  function returnResponse() {
    return [response!]
  }

  function postQuestionsUserBasic(response: string) {
    const questionsLocal = localStorage.getItem("savedQuestions")
    if (!questionsLocal) {
      localStorage.setItem("savedQuestions", JSON.stringify([{
        type: "Questão",
        data: response,
        subject: subject
      }]))
      return
    }
    else {
      let questions = JSON.parse(questionsLocal) 
      questions.push({
        type: "Questão",
        data: response,
        subject: subject
      })
      localStorage.setItem("savedQuestions", JSON.stringify(questions))
      return
    }
  }

  function getQuestionsUserBasic() {
    const questionsLocal: GeneratedDB[] = JSON.parse(localStorage.getItem("savedQuestions") || "")
    return questionsLocal
  }

  function updateQuestionsUserBasic(question: string, id: string) {
    const questionsLocal = getQuestionsUserBasic()
    questionsLocal!.map(q => {
      if (q.id === id) {
        q.data = question
        return
      }
      return
    })
    localStorage.setItem("savedQuestions", JSON.stringify(questionsLocal))
  }

  function deleteQuestionsUserBasic(id: string) {
    const questionsLocal = getQuestionsUserBasic()
    questionsLocal!.filter(q => q.id !== id)
    localStorage.setItem("savedQuestions", JSON.stringify(questionsLocal))
  }

  async function handleSave(response: string) {

    const user = await getUser()

    if (user?.plan === "basic") {
      postQuestionsUserBasic(response)
      return "ok"
    }

    postGenerated(response, generated === "Texto" ? "text" : generated === "Questão" ? "question" : generated === "Frase" ? "quote" : generated === "Expressão matemática" ? "math_expression" : "question", generated === "Expressão matemática" ? null : subject!)
    .then(status => {
      status === 201 ? toast.success("Salvo com sucesso!") : toast.error("Erro ao salvar. Tente novamente mais tarde!")
    })
  }

  async function getGenerateds(filter?: string) {

    const user = await getUser()

    if (user?.plan === "basic") {
      return getQuestionsUserBasic()
    }

    let data: GeneratedDB[] = []

    await getGenerated(filter)
    .then(generateds => {
      data = generateds
    })
    
    return data
  }

  async function handleUpdate(data: string, id: string) {

    const user = await getUser()

    if (user?.plan === "basic") {
      return updateQuestionsUserBasic(data, id)
    }

    await updateGenerated(data, id)
    .then(status => {
      status === 204 ? toast.success("Atualizado com sucesso!") : toast.error("Erro ao atualizar. Tente novamente mais tarde!")
    })
  }

  async function handleDelete(id:string) {

    const user = await getUser()

    if (user?.plan === "basic") {
      return deleteQuestionsUserBasic(id)
    }

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
    info,
    handleChange,
    handleSubmit,
    separateResponse,
    returnResponse,
    handleCopyToClipboard,
    handleSave,
    getGenerateds,
    handleUpdate,
    handleDelete
  }
}