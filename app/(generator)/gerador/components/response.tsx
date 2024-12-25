"use client"
import ContainerWithBorder from "@/app/components/layout/containerWithBorder"
import CardResponse from "./cardResponse"
import { useGeneratorContext } from "../../lib/contexts/generatorContextProvider"
import LoaderResponse from "./loaderResponse"
export default function Response () {

  const { state } = useGeneratorContext()

  if (!state.data && !state.loading) {
    return (
      <ContainerWithBorder borderColor="orange-2">
        <h3>Resultado aqui</h3>
        <p>Preencha o formulário para gerar as questões. Estamos te aguardando...</p>
      </ContainerWithBorder>
    )
  }
  if (!state.data && state.loading) {
    return <LoaderResponse />
  }
  return (
    <ContainerWithBorder borderColor="orange-2">
      <h3>Resultado aqui</h3>
      {state.data && (
        <div className="flex flex-col gap-5 justify-center w-full">
            {state.data.map((data: any, i:number) => (
              <CardResponse key={i} type={state.type!} id={`${i}`} data={data} actions={{copy: true,save: true}} />
            ))}
        </div>
      )}
    </ContainerWithBorder>
  )
}