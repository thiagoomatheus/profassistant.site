import ModalRefactor from "@/app/components/layout/modalRefactor"
import TitleWithButton from "@/app/components/layout/titleWithButton"
import Generator from "./components/generator"
import Response from "./components/response"
import { Suspense } from "react"
import LoaderResponse from "./components/loaderResponse"
import { GeneratorContextProvider } from "../lib/contexts/generatorContextProvider"
import { getUser } from "@/app/(login)/lib/actions"
export default async function Page({searchParams}: {
    searchParams: { [key: string]: string | undefined }
}) {
    const user = await getUser()
    const instructions = searchParams.instructions === "true"
    return (
        <>
            <TitleWithButton title="Gerador" href={`?${new URLSearchParams({instructions: "true"})}`} btnText="Instruções" />
            {instructions && (
                <ModalRefactor>
                    <h3>Bem vindo ao gerador!</h3>
                    <p>Siga as instruções abaixo para gerar uma questão, um texto, uma frase ou uma expressão matemática de forma fácil, simples e rápida:</p>
                    <ol className="flex flex-col list-decimal list-inside gap-2">
                        <li>Preencha as informações de seus alunos</li>
                        <li>Preencha as informações do que você deseja gerar</li>
                        <li>Clique no botão &quot;Gerar questão&quot;</li>
                        <li>Aguarde alguns segundos e o resultado aparecerá na lateral</li>
                    </ol>
                    <p>Obs: Usamos de IAs renomadas para gerar as informações, no entanto, elas ainda podem apresentar dados inconsistestes em alguns momento. Por isso, lembre-se de conferir as questões e suas respostas antes de utilizá-las.</p>
                </ModalRefactor>
            )}
            <section className="flex flex-row flex-wrap justify-around gap-5 md:gap-10">
                <GeneratorContextProvider>
                    <Generator />
                    <Suspense fallback={<LoaderResponse />}>
                        <Response user={user!} />
                    </Suspense>
                </GeneratorContextProvider>
            </section>
        </>
    )
}