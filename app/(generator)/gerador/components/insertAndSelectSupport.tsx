"use client"

import ModalRefactor from "@/app/components/layout/modalRefactor";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Label from "./label";
import FieldActions from "@/app/(atividades)/components/exam/fieldActions";
import Button from "@/app/components/layout/button";
import CardLoading from "@/app/components/layout/cardLoading";
import MyGenerateds from "../../components/layout/myGenerateds";
import { getGenerated } from "../../lib/actions";
import { GeneratedDB } from "@/app/lib/types/types";
import toast from "react-hot-toast";

export function InsertModal({ setData }: {
    setData: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
    const [text, setText] = useState<{title: string, text: string}>({
        title: "",
        text: ""
    })
    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setText({
            ...text,
            [target.name]: target.value
        })
    }
    return (
        <ModalRefactor close={`?${new URLSearchParams({
            gerar: "question"
        })}`}>
            <h3>Apoio para a questão</h3>
            <p>Inisira um texto que servirá de base para a questão.</p>
            <form className="flex flex-col gap-3 md:gap-5">
                <Label key={"title_support"} label="Título">
                    <input type="text" placeholder="Insira seu título" className="font-normal p-2 text-xs" name="title" onChange={handleChange}></input>
                </Label>
                <Label key={"text_support"} label="Texto">
                    <textarea placeholder="Insira seu texto" className="font-normal overflow-auto h-[180px] max-h-[300px] text-xs" name="text" onChange={handleChange}></textarea>
                </Label>
                <Button key={"close"} text="Inserir" handleClick={() => {
                    if (!text.title) {
                        return toast.error("Insira um título")
                    } if (!text.text) {
                        return toast.error("Insira um texto")
                    } else {
                        setData(`Título:${text.title} Texto:${text.text}`)
                        return toast.success("Texto inserido com sucesso")
                    }
                }} href={`?${new URLSearchParams({
                    gerar: "question"
                })}`} />
            </form>
        </ModalRefactor>
    )
}

export function SelectModal({ select, setData }: {
    select: boolean
    setData: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
    const router = useRouter()
    const [generates, setGenerates] = useState<GeneratedDB[]>()
    useEffect(() => {
        if(!select) return
        getGenerated("type=eq.text")
        .then(data => {
            setGenerates(data)
        })
    }, [select])
    function handleSelect(data:string) {
        setData(data)
        toast.success("Texto selecionado com sucesso")
        return router.back()
    }
    return (
        <ModalRefactor close={`?${new URLSearchParams({
            gerar: "question"
        })}`}>
            <h3>Selecione um texto ou frase</h3>
            <div className="flex flex-col gap-3 md:gap-5">
            {generates && (
                <Suspense fallback={<CardLoading />}>
                    <MyGenerateds data={{generates: generates}} handleSelect={handleSelect} />
                </Suspense>
            )}
            </div>
        </ModalRefactor>
    )
}

export default function InsertAndSelectSupport() {
    const params = useSearchParams()
    const insert = params.has("insert")
    const select = params.has("select")
    const [data, setData] = useState<string>()    
    return (
        <>
            <label>Texto de apoio:</label>
            {!data && (
                <div className="flex gap-3 flex-row">
                    <Button key={"insert"} text="Inserir" href={`?${new URLSearchParams({
                        gerar: "question",
                        insert: "true"
                    })}`} />
                    <Button key={"select"} text="Selecionar" href={`?${new URLSearchParams({
                        gerar: "question",
                        select: "true"
                    })}`} />
                </div>
            )}
            {insert && (
                <InsertModal setData={setData} />
            )}
            {select && (
                <SelectModal select={select} setData={setData} />
            )}
            {data && (
                <>
                    <FieldActions field="Adicionado" data={data} handles={{ handleDelete: () => {
                        setData(undefined)
                        return toast.success("Texto removido com sucesso")
                    }}} />
                    <input readOnly name="titulo_apoio" className="hidden" type="text" value={data.split("Texto:")[0]} />
                    <input readOnly name="texto_apoio" className="hidden" type="text" value={data.split("Texto:")[1]} />
                </>
            )}
        </>
    )
}