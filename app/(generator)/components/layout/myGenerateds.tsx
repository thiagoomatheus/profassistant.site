"use client"

import { GeneratedDB } from "@/app/lib/types/types";
import CardContainer from "./cardContainer";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";
import CardLoading from "@/app/components/layout/cardLoading";
import useGenerator from "../../lib/hooks/useGenerator";
import CardResponse from "./cardResponse";

export default function MyGenerateds( { handleSelect, filter }: {
    handleSelect?: (data: string, id: string) => void
    filter?: string
}) {

    const { user } = useContext(AuthContext)
    const { getGenerateds } = useGenerator()
    const [data, setData] = useState<GeneratedDB[] | undefined>()

    useEffect(() => {
        if (user?.plan === "free") {
            return
        } else {
            getGenerateds(filter)
            .then(result => setData(result))
        }
    },[user?.plan])

    function handleDeleteQuestion(id:string) {
        setData(data?.filter(item => item.id !== id))
    }
    
    return (
        <>
            {user?.plan === "free" && (
                <p>O plano free não permite que você salve questões. Por favor, escolha um outro plano.</p>
            )}
            {data && (
                <CardContainer>
                    <>
                        {data.map(item => (
                            <CardResponse key={item.id} type={item.type === "question" ? "Questão" : item.type === "quote" ? "Frase" : item.type === "math_expression" ? "Expressão matemática" : item.type === "text" ? "Texto" : undefined} id={item.id!} data={item.data} actions={handleSelect ? {select: handleSelect} : { delete: { functionMutationState: () => handleDeleteQuestion(item.id!)}, copy: true, update: true }} />
                        ))}
                    </>
                </CardContainer>
            )}
            {data === undefined && (
                <CardLoading />
            )}
            {data !== undefined && data.length === 0 && (
                <p>Não foi possível encontrarmos suas questões salvas. Se você já salvou uma questão e ela não aparece aqui, por favor, recarregue a página. Mas, se você não salvou um questão podrá fazer isso por meio do gerador.</p>
            )}
        </>
    )
}