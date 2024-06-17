import Select from "./select";
import Fieldset from "./fieldset";
import Label from "./label";
import { anoOptions, materiaOptions } from "./options";
import useGenerator from "../../lib/hooks/useGenerator";
import Button from "@/app/components/layout/button";

export default function Form({ setStatus }: {
  setStatus: React.Dispatch<React.SetStateAction<"awaitingResponse" | "finish" | undefined>>
}) {

  const { info, handleChange, handleSubmit } = useGenerator()

  return (
    <form className='flex flex-col gap-3' onSubmit={async (e) => {
      e.preventDefault()
      setStatus("awaitingResponse")
      await handleSubmit()
      .then(() => {
        return setStatus("finish")
      })
    }}>
      <Fieldset key={"info"} legend="Sobre os alunos" borderColor="blue-2">
        <Label key={"ano"} label="Selecione sua série:">
          <Select key={"ano-input"} name="ano" handleChange={handleChange} options={anoOptions} />
        </Label>
        <Label key={"idade"} label="Idade Média dos alunos:">
          <input key={"idade-input"} onChange={handleChange} type="number" name="idade" min={0} max={22} placeholder="Idade" required />
        </Label>
      </Fieldset>
      <Fieldset key={"gerar"} legend="Gerar" borderColor="blue-2">
        <Label label="O que deseja gerar?">
          <Select key={"gerar-input"} name="gerar" handleChange={handleChange} options={[{
            options: ["Texto", "Questão", "Frase", "Expressão matemática"]
          }]} />
        </Label>
        {info.gerar === "Texto" && (
          <>
            <Label key={"materia"} label="Selecione a matéria:">
              <Select key={"materia"} name="materia" handleChange={handleChange} options={materiaOptions} />
            </Label>
            <Label key={"tipo_texto"} label="Tipo de texto/Genero textual:">
              <input key={"tipo_texto-input"} type="text" name="tipo_texto" onChange={handleChange} required placeholder="Ex.: Texto informativo, poesia, etc" />
            </Label>
            <Label key={"caracteres"} label="Quantidade de caracteres:">
              <input key={"caracteres-input"} type="number" name="caracteres" onChange={handleChange} step={50} min={50} max={1500} required placeholder="Ex.: 500" />
            </Label>
            <Label key={"assunto_texto"} label="Assunto:">
              <textarea key={"assunto_texto-input"} onChange={handleChange} className="font-normal max-h-24 md:max-h-32 xl:max-h-40" name="assunto" required />
            </Label>
          </>
        )}
        {info.gerar === "Questão" && (
          <>
            <Label key={"materia"} label="Selecione a matéria:">
              <Select key={"materia"} name="materia" handleChange={handleChange} options={materiaOptions} />
            </Label>
            <Label key={"quantidade_questao"} label="Quantidade de questões:">
              <input key={"quantidade_questao-input"} type="number" name="quantidade" onChange={handleChange} min={1} max={3} required />
            </Label>
            <Label key={"assunto_questao"} label="Assunto:">
              <textarea key="assunto_questao-input" onChange={handleChange} className="font-normal max-h-24 md:max-h-32 xl:max-h-40" name="assunto" required />
            </Label>
            <Label key={"alternativa"} label="Quantidade de alternativas:">
              <input key="alternativa-input" type="number" name="alternativa" onChange={handleChange} min={0} max={5} required placeholder="Selecione 0 para sem alternativas" />
            </Label>
            <Label key="dificuldade" label="Dificuldade:">
              <Select key={"dificuldade-input"} name="dificuldade" handleChange={handleChange} options={[{
                options: ["Simples", "Intermediário", "Avançado"]
              }]} />
            </Label>
            <Label key="texto_apoio" label="Texto de apoio:">
              <div className="flex gap-3 flex-row">
                <Button key="adicionar_texto" text="Selecionar" handleClick={() => {}} />
                <Button key="incluir_texto" text="Incluir" handleClick={() => {}} />
              </div>
            </Label>
          </>
        )}
        {info.gerar === "Frase" && (
          <>
            <Label key={"materia"} label="Selecione a matéria:">
              <Select key={"materia"} name="materia" handleChange={handleChange} options={materiaOptions} />
            </Label>
            <Label key={"citacao"} label="Citação?">
              <Select key="citacao-input" name="citacao" handleChange={handleChange} options={[{
                options: ["Sim", "Não"]
              }]} />
            </Label>
            <Label key="conter" label="Conter palavra ou letra:">
              <input key="conter-input" type="text" name="conter" onChange={handleChange} placeholder="Ex.: Amor"/>
            </Label>
          </>
        )}
        {info.gerar === "Expressão matemática" && (
          <>
            <Label key={"quantidade_expressao"} label="Quantidade de expressões matemáticas:">
              <input key={"quantidade_expressao-input"} type="number" name="quantidade" onChange={handleChange} min={1} max={4} required />
            </Label>
            <Label key="operacao" label="Operação:">
              <Select key="operacao-input" name="operacao" handleChange={handleChange} options={[{
                options: ["Adição", "Subtração", "Multiplicação", "Divisão", "Fração", "Equação 1 grau", "Equação 2 grau", "Conjunto numérico"]
              }]} />
            </Label>
            <Label key="obs" label="Observação:">
              <input key="obs-input" type="text" name="obs" onChange={handleChange} placeholder="Ex.: Números entre 1 e 100 "/>
            </Label>
          </>
        )}
      </Fieldset>
      <input type="submit" value="Gerar" />
    </form>
  )
}