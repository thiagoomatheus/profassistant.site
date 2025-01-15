import { generateData } from "../actions"
import { useGeneratorContext } from "../contexts/generatorContextProvider"
type dataForm = {
    ano: string
    idade: string
    gerar?: string
    tipo_texto?: string
    caracteres?: string
    assunto?: string
    materia?: string
    quantidade?: string
    alternativa?: string
    dificuldade?: string
    titulo_apoio?: string
    texto_apoio?: string
    citacao?: string
    conter?: string
    operacao?: string
    obs?: string
}
export default function useResponse() {

  const { state, dispatch } = useGeneratorContext()

  function getPrompt(formData:FormData) {

    let data: dataForm = {ano: "",idade: ""}

    formData.forEach((value, key) => {
      if (key.includes("ACTION"))return
      data[key as keyof dataForm] = value.toString()
    })

    let prompt = ""

    switch (state.type) {
      case "question":
        prompt = `Sou professor do ${data.ano} e preciso gerar apenas ${data.quantidade} questões para uma atividade de ${data.materia} sobre ${data.assunto}. Os alunos possuem ${data.idade} anos. ${data.alternativa === "Sem alternativas" ? "Gere questões sem alternativas, ou seja, questões discursivas." : `Gere questões com ${data.alternativa} alternativas, sendo a), b), c) e d) e e), conforme a quantidade de questões. Apenas uma alternativa deve estar correta.`} Indique resposta correta com Resposta:. As questões devem ter dificuldade ${data.dificuldade}. Retorne com -- antes da questão. ${data.texto_apoio ? `O seguinte texto deve ser usado para a geração das questões: Título: ${data.titulo_apoio}, Texto: ${data.texto_apoio}.` : ""}`
        break;
      case "text":
        prompt = `Sou professor do ${data.ano} e preciso gerar um texto para meus alunos. O texto deve ser do tipo: ${data.tipo_texto} e deve conter ${data.caracteres} caracteres. O texto deve ser sobre o assunto: ${data.assunto}. Os alunos possuem ${data.idade} anos. Retorne com Título: "Título do texto" e Texto: "Texto".`
        break
      case "math_expression":
        prompt = `Sou professor do ${data.ano} e preciso gerar apenas ${data.quantidade} expressão(ões) matemática(s) para meus alunos. As expressões devem ser do tipo: ${data.operacao}. ${data.obs ? `Apenas uma observação: ${data.obs}.` : ""} Os alunos possuem ${data.idade} anos. Separe cada expressão com -- antes da expressão.`
        break
      case "phrase":
        prompt = `Sou professor do ${data.ano} e preciso gerar uma frase para uma atividade. ${data.citacao === "Sim" ? `A frase deve ser uma citação verídica de um autor respeitado.` : "A frase não deve ser uma citação, mas sim uma frase aleatória."} ${data.conter ? `A frase deve conter a palavra/letra a seguir: ${data.conter}.` : ""} Os alunos possuem ${data.idade} anos. Não retorne frases com sentido sexual ou discurso de ódio. Retorne com Frase: "Frase".`
        break
    }

    return prompt

  }

  function treatResponse(response: string, gerar: string) {

    if (gerar === "text") return response.replace(/[*]{2,}/g, '')
    
    return response.replaceAll("\n", "\\n").replaceAll(/[\\n]+\\n/g, "\n").replaceAll("\\n", "\n")

  }

  async function formAction(formData: FormData) {

    dispatch({ type: "generateLoading", subject: formData.get("materia") as string })

    if (!state.type) return {
      error: "Erro ao receber parâmetros do formulário. Tente novamente mais tarde!"
    }

    const prompt = getPrompt(formData)
    
    const { data, error } = await generateData(prompt)

    if (error || !data) {
      dispatch({ type: "generateFailed" })
      return {
        error: `Não foi possível gerar as informações. Erro: ${error}`
      }
    }
    
    const r = treatResponse(data, state.type)

    if (state.type === "question") {
      dispatch({ type: "generateSuccess", data: r!.split("--").filter(item => item.trim().length > 0) })
      return {
        code: "success"
      }
    }
    
    dispatch({ type: "generateSuccess", data: [r] })

    return {
      code: "success"
    }
  }

  return {
    formAction
  }
}