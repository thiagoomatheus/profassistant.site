"use client"
import ContainerWithBorder from "@/app/components/layout/containerWithBorder"
import CardResponse from "./cardResponse"
import { useContext } from "react"
import { ResponseContext } from "./responseContextProvider"
export default function Response () {
  const { response, type } = useContext(ResponseContext)
  if (!response.data) {
    return (
      <ContainerWithBorder borderColor="orange-2">
        <h3>Resultado aqui</h3>
        <p>Preencha o formulário para gerar as questões. Estamos te aguardando...</p>
      </ContainerWithBorder>
    )
  }
  return (
    <ContainerWithBorder borderColor="orange-2">
      <h3>Resultado aqui</h3>
      {response.data && (
        <div className="flex flex-col gap-5 justify-center w-full">
            {response.data.map((data: any, i:number) => (
              <CardResponse key={i} type={type.gerar!} id={`${i}`} data={data} actions={{copy: true,save: true}} />
            ))}
        </div>
      )}
    </ContainerWithBorder>
  )
}