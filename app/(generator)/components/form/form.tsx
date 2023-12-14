import { useChat } from "ai/react";
import { useContext } from "react";
import Select from "./select";
import Fieldset from "./fieldset";
import Label from "./label";
import { ResponseAPIContext } from "@/app/(generator)/lib/contexts/ResponseAPIContext";
import { anoOptions, materiaOptions, quantidadeOptions } from "./options";
import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";
import useGenerator from "../../lib/hooks/useGenerator";

export default function Form({ setStatus }: {
  setStatus: React.Dispatch<React.SetStateAction<"awaitingResponse" | "finish" | undefined>>
}) {
    const { generateNotification } = useNotification()
    const { setResponse, setSubject } = useContext(ResponseAPIContext)
    const { setInput, append } = useChat({onFinish(response) {
      setStatus("finish")
      generateNotification(NotificationTypes.GeneratorSuccess, undefined, "success", false)
      setSubject(info.materia)
      setResponse(response)
    }, onError() {
      generateNotification(undefined,NotificationTypes.GeneratorError, "error")
    }})
    const { info, handleChange } = useGenerator()

    return (
        <form className='flex flex-col gap-3' onSubmit={(e) => {
            e.preventDefault()
            const prompt = `Sou professor do ${info.ano} e preciso gerar ${info.quantidade} questões para uma prova de ${info.materia} sobre ${info.assunto}. Gere questões com 4 alternativas, sendo a), b), c) e d) e sendo apenas uma a correta. Indique a correta com Resposta:. Os alunos prossuem ${info.idade} anos. As palavras devem fáceis. Retorne com -- antes da questão.`
            setInput(prompt)
            append({
              content: prompt,
              role: "user",
              createdAt: /* @__PURE__ */ new Date()
            })
            setInput("")
            setStatus("awaitingResponse")
            generateNotification(NotificationTypes.GeneratorLoading, undefined, "success", false)
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
                <textarea onChange={handleChange} className="font-normal" name="assunto" required />
              </Label>
            </Fieldset>
            <input type="submit" value="Gerar questão" />
          </form>
    )
}