"use client"

import Fieldset from "./fieldset"
import Label from "./label"
import { anoOptions, materiaOptions } from "./options"
import useResponse from "../../lib/hooks/useResponse"
import Select from "./select"
import InsertAndSelectSupport from "./insertAndSelectSupport"
import { useGeneratorContext } from "../../lib/contexts/generatorContextProvider"
import Button from "@/app/components/layout/button"
import toast from "react-hot-toast"

export default function FormGenerator() {

    const { state, dispatch } = useGeneratorContext()

    const { formAction } = useResponse()

    return (
        <form onSubmit={async(e) => {
            e.preventDefault()

            const toastGenerate = toast.loading('Gerando...')

            const { error } = await formAction(new FormData(e.currentTarget))

            if (error) {
                return toast.error(`Falha ao gerar. Erro: ${error}`, {id: toastGenerate})
            }

            return toast.success("Gerado com sucesso!", {id: toastGenerate})
            
        }} className='flex flex-col gap-3'>
            <Fieldset key={"info"} legend="Sobre os alunos" borderColor="blue-2">
                <Label key={"ano"} label="Selecione sua série:">
                    <Select key={"ano-input"} name="ano" options={anoOptions} />
                </Label>
                <Label key={"idade"} label="Idade Média dos alunos:">
                    <input key={"idade-input"} type="number" name="idade" min={0} max={22} placeholder="Idade" required />
                </Label>
            </Fieldset>
            <Fieldset key={"gerar"} legend="Gerar" borderColor="blue-2">
                <label>O que deseja gerar?</label>
                <div className="flex flex-row flex-wrap gap-3 justify-around">
                    <Button text="Questão" handleClick={() => dispatch({ type: "setType", typeGenerated: "question" })} />
                    <Button text="Texto" handleClick={() => dispatch({ type: "setType", typeGenerated: "text" })} />
                    <Button text="Frase" handleClick={() => dispatch({ type: "setType", typeGenerated: "phrase" })} />
                    <Button text="Expressão Matemática" handleClick={() => dispatch({ type: "setType", typeGenerated: "math_expression" })} />
                </div>
                {state.type === "text" && (
                    <>
                        <Label key={"materia"} label="Selecione a matéria:">
                            <Select key={"materia"} name="materia" options={materiaOptions} />
                        </Label>
                        <Label key={"tipo_texto"} label="Tipo de texto/Genero textual:">
                            <input key={"tipo_texto-input"} type="text" name="tipo_texto" required placeholder="Ex.: Texto informativo, poesia, etc" />
                        </Label>
                        <Label key={"caracteres"} label="Quantidade de caracteres:">
                            <input key={"caracteres-input"} type="number" name="caracteres" step={50} min={50} max={1500} required placeholder="Ex.: 500" />
                        </Label>
                        <Label key={"assunto_texto"} label="Assunto:">
                            <textarea key={"assunto_texto-input"} className="font-normal max-h-24 md:max-h-32 xl:max-h-40" name="assunto" required />
                        </Label>
                    </>
                )}
                {state.type === "question" && (
                    <>
                        <Label key={"materia"} label="Selecione a matéria:">
                            <Select key={"materia"} name="materia" options={materiaOptions} />
                        </Label>
                        <Label key={"quantidade_questao"} label="Quantidade de questões:">
                            <Select key={"quantidade_questao"} name="quantidade" options={[{
                                options: ["1", "2", "3"]
                            }]} />
                        </Label>
                        <Label key={"assunto_questao"} label="Assunto:">
                            <textarea key="assunto_questao-input" className="font-normal max-h-24 md:max-h-32 xl:max-h-40" name="assunto" required />
                        </Label>
                        <Label key={"alternativa"} label="Quantidade de alternativas:">
                            <Select key={"alternativa-input"} name="alternativa" options={[{
                                options: ["Sem alternativas", "1", "2", "3", "4", "5"]
                            }]} />
                        </Label>
                        <Label key="dificuldade" label="Dificuldade:">
                            <Select key={"dificuldade-input"} name="dificuldade" options={[{
                                options: ["Simples", "Intermediário", "Avançado"]
                            }]} />
                        </Label>
                        <InsertAndSelectSupport />
                    </>
                )}
                {state.type === "phrase" && (
                    <>
                        <Label key={"materia"} label="Selecione a matéria:">
                            <Select key={"materia"} name="materia" options={materiaOptions} />
                        </Label>
                        <Label key={"citacao"} label="Citação?">
                            <Select key="citacao-input" name="citacao" options={[{
                                options: ["Sim", "Não"]
                            }]} />
                        </Label>
                        <Label key="conter" label="Conter palavra ou letra:">
                            <input key="conter-input" type="text" name="conter" placeholder="Ex.: Amor"/>
                        </Label>
                    </>
                )}
                {state.type === "math_expression" && (
                    <>
                        <Label key={"quantidade_expressao"} label="Quantidade de expressões matemáticas:">
                            <Select key="quantidade_expressao-input" name="quantidade" options={[{
                                options: ["1", "2", "3", "4"]
                            }]} />
                        </Label>
                        <Label key="operacao" label="Operação:">
                            <Select key="operacao-input" name="operacao" options={[{
                                options: ["Adição", "Subtração", "Multiplicação", "Divisão", "Fração", "Equação 1 grau", "Equação 2 grau", "Conjunto numérico"]
                            }]} />
                        </Label>
                        <Label key="obs" label="Observação:">
                            <input key="obs-input" type="text" name="obs" placeholder="Ex.: Números entre 1 e 100 "/>
                        </Label>
                    </>
                )}
            </Fieldset>
            <input type="submit" value="Gerar" />
        </form>
    )
}