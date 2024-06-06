"use client"

import { useState } from "react"
import Generator from "../components/layout/generator";
import Questions from "../components/layout/questions";
import Modal from "../../components/layout/modal";
import TitleWithButton from "../../components/layout/titleWithButton";

export default function Page () {

    const [status, setStatus] = useState<"awaitingResponse" | "finish" | undefined>()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    
    return (
        <>
            <TitleWithButton title="Gerador" state={modalOpen} handleClick={setModalOpen} />
            {modalOpen && (
                <Modal close={() => setModalOpen(!modalOpen)}>
                    <h3>Bem vindo ao gerador!</h3>
                    <p>Siga as instruções abaixo para gerar uma questão, um texto, uma frase ou uma expressão matemática de forma fácil, simples e rápida:</p>
                    <ol className="flex flex-col list-decimal list-inside gap-2">
                        <li>Preencha as informações de seus alunos</li>
                        <li>Preencha as informações do que você deseja gerar</li>
                        <li>Clique no botão &quot;Gerar questão&quot;</li>
                        <li>Aguarde alguns segundos e o resultado aparecerá na lateral</li>
                    </ol>
                    <p>Obs: No campo &quot;Quantidade de questões&quot; tenha em mente que quanto mais questões maior será o tempo gerá-las.</p>
                </Modal>
            )}
            <section className="flex flex-row flex-wrap justify-around gap-5 md:gap-10">
                <Generator handleStatus={setStatus} />
                <Questions status={status} />
            </section>

        </>
    )
}