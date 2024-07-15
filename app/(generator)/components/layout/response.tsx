import ContainerWithBorder from "@/app/components/layout/containerWithBorder";
import { useContext } from "react";
import { ResponseAPIContext } from "../../lib/contexts/ResponseAPIContext";
import useGenerator from "../../lib/hooks/useGenerator";
import CardResponse from "./cardResponse";

export default function Response ({ status }: {
    status: "awaitingResponse" | "finish" | undefined
}) {

    const { generated } = useContext(ResponseAPIContext)
    const { returnResponse, separateResponse } = useGenerator()

    let response: string[] = []

    if (generated === "Questão") {
        response = separateResponse()
    } else {
        response = returnResponse()
    } 
    
    return (
        <ContainerWithBorder borderColor="orange-2">
            <h3>Resultado aqui</h3>
            {!status && (
                <p>Preencha o formulário para gerar as questões. Estamos te aguardando...</p>
            )}
            {status === 'awaitingResponse' && (
                <div className="p-5 bg-slate-200 dark:bg-gray-800 rounded-lg shadow-md w-full h-60 animate-pulse"></div>
            )}
            {status === 'finish' && (
                <div className="flex flex-col gap-5 justify-center w-full">
                    {response.map((data: any, i:number) => (
                        <CardResponse key={i} type={generated} id={`${i}`} data={data} actions={{
                            copy: true,
                            save: true
                        }} />
                    ))}
                </div>
            )}
        </ContainerWithBorder>
    )
}