"use client"

import ContainerWithBorder from "@/app/components/layout/containerWithBorder"
import { useGeneratorContext } from "../../lib/contexts/generatorContextProvider"
import LoaderResponse from "./loaderResponse"
import CardData from "./CardData"
import CardActionEdit from "./CardActionEdit"
import CardActionSave from "./CardActionSave"
import CardActionCopy from "./CardActionCopy"
import CardActionReview from "./CardActionReview"
import { UserDBComplete } from "@/app/lib/types/types"
export default function Response ( { user }: { user: UserDBComplete}) {

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
              <CardData data={data} key={i} id={`${i}`} type={state.type!}>
                <CardActionEdit originalData={data} />
                <CardActionSave />  
                <CardActionCopy />
                {user.plan === "premium" && state.type === "question" && <CardActionReview />}
              </CardData>
            ))}
        </div>
      )}
    </ContainerWithBorder>
  )
}