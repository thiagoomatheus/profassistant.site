"use client"
import Link from "next/link"
import Fieldset from "./fieldset"
import Label from "./label"
import { anoOptions, materiaOptions } from "./options"
import useResponse from "../../lib/hooks/useResponse"
import Select from "./select"
import InsertAndSelectSupport from "./insertAndSelectSupport"
export default function FormGenerator({gerar}: { gerar: "question" | "text" | "math_expression" | "phrase"}) {
    const { formAction } = useResponse()
    return (
        <form action={async (formData:FormData) => await formAction(formData, gerar)} className='flex flex-col gap-3'>
            <Fieldset key={"info"} legend="Sobre os alunos" borderColor="blue-2">
                <Label key={"ano"} label="Selecione sua série:">
                    <Select key={"ano-input"} name="ano" options={anoOptions} />
                </Label>
                <Label key={"idade"} label="Idade Média dos alunos:">
                    <input key={"idade-input"} type="number" name="idade" min={0} max={22} placeholder="Idade" required />
                </Label>
            </Fieldset>
            <Fieldset key={"gerar"} legend="Gerar" borderColor="blue-2">
                <Label label="O que deseja gerar?">
                    <div className="flex flex-row flex-wrap gap-3 justify-around">
                        <Link className="p-2 md:py-2 md:px-4 xl:px-5 text-xs md:text-sm lg:text-lg text-white bg-blue-2 flex flex-col justify-center items-center rounded-xl shadow-md hover:bg-orange-2 hover:text-white duration-200" href={`?${new URLSearchParams({
                            gerar: "question"
                        })}`} scroll={false}>Questão
                        </Link>
                        <Link className="p-2 md:py-2 md:px-4 xl:px-5 text-xs md:text-sm lg:text-lg text-white bg-blue-2 flex flex-col justify-center items-center rounded-xl shadow-md hover:bg-orange-2 hover:text-white duration-200" href={`?${new URLSearchParams({
                            gerar: "text"
                        })}`} scroll={false}>Texto
                        </Link>
                        <Link className="p-2 md:py-2 md:px-4 xl:px-5 text-xs md:text-sm lg:text-lg text-white bg-blue-2 flex flex-col justify-center items-center rounded-xl shadow-md hover:bg-orange-2 hover:text-white duration-200" href={`?${new URLSearchParams({
                            gerar: "phrase"
                        })}`} scroll={false}>Frase
                        </Link>
                        <Link className="p-2 md:py-2 md:px-4 xl:px-5 text-xs md:text-sm lg:text-lg text-white bg-blue-2 flex flex-col justify-center items-center rounded-xl shadow-md hover:bg-orange-2 hover:text-white duration-200" href={`?${new URLSearchParams({
                            gerar: "math_expression"
                        })}`} scroll={false}>Expressão Matemática
                        </Link>
                    </div>
                </Label>
                {gerar === "text" && (
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
                {gerar === "question" && (
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
                {gerar === "phrase" && (
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
                {gerar === "math_expression" && (
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