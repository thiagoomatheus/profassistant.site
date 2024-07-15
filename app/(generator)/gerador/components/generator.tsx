import ContainerWithBorder from "@/app/components/layout/containerWithBorder"
import Fieldset from "../../components/form/fieldset"
import Label from "../../components/form/label"
import { anoOptions, materiaOptions } from "../../components/form/options"
import Select from "./select"
import Link from "next/link"
import { redirect } from "next/navigation"
import InsertAndSelectSupport from "./insertAndSelectSupport"
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
export default function Generator({gerar}: {
    gerar: string | undefined
}) {
    const formAction = async (formData: FormData) => {
        "use server"
        let data: dataForm = {
            ano: "",
            idade: ""
        }
        formData.forEach((value, key) => {
            if (key.includes("ACTION")) {
                return
            }
            data[key as keyof dataForm] = value.toString()
        })
        data.gerar = gerar
        redirect(`?${new URLSearchParams(data)}`)
    }
    return (
        <ContainerWithBorder borderColor="blue-2">
            <h3 className="text-orange-2">Preencha o formulário</h3>
            <form action={formAction} className='flex flex-col gap-3'>
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
        </ContainerWithBorder>
    )
}