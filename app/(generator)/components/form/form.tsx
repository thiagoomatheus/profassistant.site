import { useContext } from "react";
import Select from "./select";
import Fieldset from "./fieldset";
import Label from "./label";
import { ResponseAPIContext } from "@/app/(generator)/lib/contexts/ResponseAPIContext";
import { anoOptions, materiaOptions, quantidadeOptions } from "./options";
import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";
import useGenerator from "../../lib/hooks/useGenerator";
import { model } from "@/app/lib/gemini/client";

export default function Form({ setStatus }: {
  setStatus: React.Dispatch<React.SetStateAction<"awaitingResponse" | "finish" | undefined>>
}) {
  const { generateNotification } = useNotification()
  const { setResponse, setSubject } = useContext(ResponseAPIContext)
  const { info, handleChange } = useGenerator()

  return (
    <form className='flex flex-col gap-3' onSubmit={async (e) => {
      e.preventDefault()

      const prompt: string = `Sou professor do ${info.ano} e preciso gerar ${info.quantidade} questões para uma prova de ${info.materia} sobre ${info.assunto}. Gere questões com 4 alternativas, sendo a), b), c) e d) e sendo apenas uma a correta. Indique a correta com Resposta:. Os alunos possuem ${info.idade} anos. Retorne com -- antes da questão.`

      setStatus("awaitingResponse")

      const result = await model.generateContent(prompt)
      const response = result.response;

      if (!response) {
        return generateNotification(NotificationTypes.GeneratorError, "error")
      }

      setSubject(info.materia)
      setResponse(response.text())
      setStatus("finish")
      return generateNotification(NotificationTypes.GeneratorSuccess, "success")
    }}>
      <Fieldset legend="Sobre os alunos" borderColor="blue-2">
        <Label label="Selecione sua série:">
          <Select key={"ano"} name="ano" handleChange={handleChange} options={anoOptions} />
        </Label>
        <Label label="Idade Média dos alunos:">
          <input onChange={handleChange} type="number" name="idade" min={0} max={22} placeholder="Idade" required />
        </Label>
      </Fieldset>
      <Fieldset legend="Sobre a prova" borderColor="blue-2">
        <Label label="Selecione a matéria:">
          <Select key={"materia"} name="materia" handleChange={handleChange} options={materiaOptions} />
        </Label>
        <Label label="Quantidade de questões:">
          <Select key={"quantidade"} name="quantidade" handleChange={handleChange} options={quantidadeOptions} />
        </Label>
        <Label label="Assunto:">
          <textarea onChange={handleChange} className="font-normal max-h-24 md:max-h-32 xl:max-h-40" name="assunto" required />
        </Label>
      </Fieldset>
      <input type="submit" value="Gerar questão" />
    </form>
  )
}