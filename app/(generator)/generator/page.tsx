"use client"

import { useContext, useState } from "react"
import Generator from "../components/layout/generator";
import { AuthContext } from "../../(login)/lib/contexts/AuthContext";
import Questions from "../components/layout/questions";
import Modal from "../components/layout/modal";
import Button from "@/app/components/layout/button";

export default function Page () {

    const { isLogged, user } = useContext(AuthContext)
    const [status, setStatus] = useState<"awaitingResponse" | "finish" | undefined>()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    
    return (
        <section className="flex flex-col gap-2 lg:gap-6">
            <div className="flex justify-between items-center">
                <h1>Gerador de questões</h1>
                {user && isLogged && (
                    <Button text="Instruções" handleClick={() => {
                        setModalOpen(!modalOpen)
                    }} aditionalCSS="w-24 lg:w-32" />
                )}
            </div>
            {user && isLogged && (
                <>
                    {modalOpen && (
                        <Modal close={() => setModalOpen(!modalOpen)} />
                    )}
                    <section className="flex flex-row flex-wrap justify-around gap-5 md:gap-10">
                        <Generator handleStatus={setStatus} />
                        <Questions status={status} />
                    </section>
                </>
                
           )}
           {!user && !isLogged && <p>Você não está autenticado! Faça login.</p> }
        </section>
    )
}