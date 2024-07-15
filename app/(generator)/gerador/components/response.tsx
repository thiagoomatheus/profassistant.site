import ContainerWithBorder from "@/app/components/layout/containerWithBorder";
import { generateData } from "../../lib/actions";
import CardResponse from "./cardResponse";
import { getUser } from "@/app/(login)/lib/actions";

function getPrompt(data: {
    [key: string]: string | undefined;
}) {
  let prompt = ""
  switch (data.gerar) {
    case "question":
      prompt = `Sou professor do ${data.ano} e preciso gerar apenas ${data.quantidade} questões para uma atividade de ${data.materia} sobre ${data.assunto}. Os alunos possuem ${data.idade} anos. ${data.alternativa === "Sem alternativas" ? "Gere questões sem alternativas, ou seja, questões discursivas." : `Gere questões com ${data.alternativa} alternativas, sendo a), b), c) e d) e e), conforme a quantidade de questões. Apenas uma alternativa deve estar correta.`} Indique resposta correta com Resposta:. As questões devem ter dificuldade ${data.dificuldade}. Retorne com -- antes da questão. ${data.texto_apoio ? `O seguinte texto deve ser usado para a geração das questões: Título: ${data.texto_titulo}, Texto: ${data.texto_apoio}.` : ""}`
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
  let treatedResponse: string = ""
  switch (gerar) {
    case "text":
      treatedResponse = response.replace(/[*]{2,}/g, '')
      break
    default:
      treatedResponse = response.replace(/\\n/g, "  ").replace(/[\\"']/g, "").replace(/\s{2,}/g, ' ').replace(/[\s]+\)/, ")")
      break;
  }
  return treatedResponse
}

async function handleSubmit(searchParams: { [key: string]: string | undefined }) {
  const prompt = getPrompt(searchParams)
  const { data, error } = await generateData(prompt)
  if (error) {
      return {
        error: "Não foi possível gerar as informações. Tente novamente."
      }
  }
  const r = treatResponse(data, searchParams.gerar!)
  if (searchParams.gerar === "question") {
    const result: string[] = r!.split("--")
    const data: string[] = result.filter(item => item.trim().length > 0)
    return {
      data
    }
  } else {
    return {
      data: [r]
    }
  }
}

export default async function Response ({searchParams}: {
    searchParams: { [key: string]: string | undefined }
}) {
  const user = await getUser()
  if (!searchParams.ano) {
    return (
      <ContainerWithBorder borderColor="orange-2">
        <h3>Resultado aqui</h3>
        <p>Preencha o formulário para gerar as questões. Estamos te aguardando...</p>
      </ContainerWithBorder>
    )
  }
  const {data, error} = await handleSubmit(searchParams)
  return (
    <ContainerWithBorder borderColor="orange-2">
      <h3>Resultado aqui</h3>
      {error && <p>{error}</p>}
      {data && (
        <div className="flex flex-col gap-5 justify-center w-full">
            {data.map((data: any, i:number) => (
              <CardResponse key={i} type={searchParams.gerar} id={`${i}`} data={data} actions={{
                copy: true,
                save: user?.plan === "free" ? false : true
              }} />
            ))}
        </div>
      )}
    </ContainerWithBorder>
  )
}