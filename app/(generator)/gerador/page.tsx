"use client"

import { useContext, useState } from "react"
import Generator from "../components/layout/generator";
import { AuthContext } from "../../(login)/lib/contexts/AuthContext";
import Questions from "../components/layout/questions";
import Modal from "../../components/layout/modal";
import TitleWithButton from "../../components/layout/titleWithButton";

export default function Page () {

    const { isLogged, user } = useContext(AuthContext)
    const [status, setStatus] = useState<"awaitingResponse" | "finish" | undefined>()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    
    return (
        <>
            <TitleWithButton title="Minhas Questões" state={modalOpen} handleClick={setModalOpen} />
            {user && isLogged && (
                <>
                    {modalOpen && (
                        <Modal close={() => setModalOpen(!modalOpen)}>
                            <h3>Bem vindo ao gerador de questão!</h3>
                            <p>Siga as instruções abaixo para gerar suas questões de forma fácil, simples e rápida:</p>
                            <ol className="flex flex-col list-decimal list-inside gap-2">
                                <li>Preencha as informações de seus alunos</li>
                                <li>Preencha as informações da(s) questão(ões) que você deseja gerar</li>
                                <li>Clique no botão &quot;Gerar questão&quot;</li>
                                <li>Aguarde alguns segundos e sua(s) questão(ões) aparecerão na lateral</li>
                            </ol>
                            <p>Obs: No campo &quot;Quantidade de questões&quot; tenha em mente que quanto mais questões maior será o tempo gerá-las.</p>
                        </Modal>
                    )}
                    <section className="flex flex-row flex-wrap justify-around gap-5 md:gap-10">
                        <Generator handleStatus={setStatus} />
                        <Questions status={status} />
                    </section>
                </>
                
           )}
           {!user && !isLogged && <p>Você não está autenticado! Faça login.</p> }
        </>
    )
}