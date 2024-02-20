"use client"

import Modal from "@/app/components/layout/modal";
import TitleWithButton from "@/app/components/layout/titleWithButton";
import { useState } from "react";
import MyExam from "../../components/myExam";

export default function Page() {

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    return (
        <>
            <TitleWithButton title="Minhas Atividades" state={modalOpen} handleClick={setModalOpen} />
            {modalOpen && (
                <Modal close={() => setModalOpen(!modalOpen)} key={"instructions"}>
                    <h3>Criar atividade</h3>
                    <p>Nessa seção você pode modelar suas provas e atividades de uma forma simples e fácil com a possibilidade de salvar ou imprimir. Siga as instruções a baixo:</p>
                    <ol className="flex flex-col list-decimal list-inside gap-2">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ol>
                    <p>Obs: Observação adicional</p>
                </Modal>
            )}
            <MyExam key={"exam"} />
        </>
    )
}