import { useChat } from "ai/react";
import { useContext } from "react";
import Select from "./select";
import Fieldset from "./fieldset";
import Label from "./label";
import useHandleForm from "@/app/generator/lib/hooks/useHandleForm";
import { MessageContext } from "@/app/lib/contexts/MessageContext";


export default function Form({ setStatus }: {
  setStatus: React.Dispatch<React.SetStateAction<"awaitingResponse" | "finish" | undefined>>
}) {

    const { setMessages } = useContext(MessageContext)
    const { setInput, append } = useChat({onFinish(response) {
      setStatus("finish")
      setMessages(response)
    }})
    const { info, handleChange } = useHandleForm()

    const anoOptions = [
      {
        optionGroup: 'Ensino Fundamental',
        options: ["1° ano do ensino fundamental", "2° ano do ensino fundamental", "3° ano do ensino fundamental", "4° ano do ensino fundamental", "5° ano do ensino fundamental", "6° ano do ensino fundamental", "7° ano do ensino fundamental", "8° ano do ensino fundamental", "9° ano do ensino fundamental"]
      },
      {
        optionGroup: "Ensino Médio",
        options: ["1° ano do ensino Médio", "2° ano do ensino Médio", "3° ano do ensino Médio"]
      }
    ]

    const materiaOptions = [
      {
        options:["Artes", "Biologia", "Ciências", "Educação Física", "Filosofia", "Física", "Física", "História", "Inglês", "Matemática", "Português", "Química", "Sociologia"]
      }
    ]

    const quantidadeOptions = [
      {
        options:[1, 2, 3, 4, 5]
      }
    ]

    return (
        <form className='w-full flex flex-col gap-3' onSubmit={(e) => {
            e.preventDefault()
            const prompt = `Sou professor do ${info.ano} e preciso gerar ${info.quantidade} questões para uma prova de ${info.materia} sobre ${info.assunto}. Gere questões com 4 alternativas, sendo a), b), c) e d), e sendo apenas uma a correta. Indique a correta com Resposta:. Os alunos prossuem ${info.idade} anos. As palavras devem fáceis. Retorne com -- antes da questão.`
            setInput(prompt)
            append({
              content: prompt,
              role: "user",
              createdAt: /* @__PURE__ */ new Date()
            })
            setInput("")
            setStatus("awaitingResponse")
          }}>
            <Fieldset legend="Sobre os alunos">
              <Label label="Selecione sua série:">
                <Select name="ano" handleChange={handleChange} options={anoOptions} />
              </Label>
              <Label label="Idade Média dos alunos:">
                <input onChange={handleChange} className='border border-black' type="number" name="idade" min={0} max={22} placeholder="Idade" required />
              </Label>
            </Fieldset>
            <Fieldset legend="Sobre a prova">
              <Label label="Selecione a matéria:">
                <Select name="materia" handleChange={handleChange} options={materiaOptions} />
              </Label>
              <Label label="Quantidade de questões:">
                <Select name="quantidade" handleChange={handleChange} options={quantidadeOptions} />
              </Label>
              <Label label="Assunto:">
                <input onChange={handleChange} className='border border-black' type="text" name="assunto" placeholder="Assunto principal da prova" required />
              </Label>
            </Fieldset>
            <input type="submit" value="Gerar questão" />
          </form>
    )
}