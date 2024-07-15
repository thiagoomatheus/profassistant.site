import ModalRefactor from "@/app/components/layout/modalRefactor"
import TitleWithButton from "@/app/components/layout/titleWithButton"
import Generator from "./components/generator"
import Response from "./components/response"
import { Suspense } from "react"
import LoaderResponse from "./components/loaderResponse"

export default function Page({searchParams}: {
    searchParams: { [key: string]: string | undefined }
}) {
    const modalOpen = searchParams.modal === "true"
    const gerar = searchParams.gerar
    return (
        <>
            <TitleWithButton title="Teste" href={`?${new URLSearchParams({
                modal: "true"
            })}`} btnText="Instruções" />
            {modalOpen && (
                <ModalRefactor>
                    <h3>Bem vindo ao gerador!</h3>
                    <p>Siga as instruções abaixo para gerar uma questão, um texto, uma frase ou uma expressão matemática de forma fácil, simples e rápida:</p>
                    <ol className="flex flex-col list-decimal list-inside gap-2">
                        <li>Preencha as informações de seus alunos</li>
                        <li>Preencha as informações do que você deseja gerar</li>
                        <li>Clique no botão &quot;Gerar questão&quot;</li>
                        <li>Aguarde alguns segundos e o resultado aparecerá na lateral</li>
                    </ol>
                    <p>Obs: No campo &quot;Quantidade de questões&quot; tenha em mente que quanto mais questões maior será o tempo gerá-las.</p>
                </ModalRefactor>
            )}
            <section className="flex flex-row flex-wrap justify-around gap-5 md:gap-10">
                <Generator gerar={gerar} />
                <Suspense fallback={<LoaderResponse />}>
                    <Response searchParams={searchParams} />
                </Suspense>
            </section>
        </>
    )
}