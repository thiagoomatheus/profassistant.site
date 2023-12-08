'use client';

import Form from "@/app/(generator)/components/form/form";
import Question from "@/app/(generator)/components/question";
import { useState } from "react"

export default function Generator () {
    
    const [status, setStatus] = useState<"awaitingResponse" | "finish" | undefined>()

    return (
        <section className="flex flex-row flex-wrap justify-around gap-5 md:gap-10">
            <div className="w-full lg:h-[700px] xl:h-[770px] sm:w-[55%] lg:w-[46%] flex flex-col gap-5 p-2 rounded-xl border-2 border-blue-2">
                <h3 className="text-orange-2">Preencha o formulário</h3>
                <Form setStatus={setStatus} />
            </div>
            <div className="w-full lg:h-[700px] xl:h-[770px] sm:w-[55%] lg:w-[46%] flex flex-col gap-5 p-2 rounded-xl border-2 border-orange-2 overflow-auto">
                <h3>Suas questões aqui</h3>
                {!status && (
                    <p>Preencha o formulário para gerar as questões. Estamos te aguardando...</p>
                )}
                {status === 'finish' && (
                    <Question />
                )}
                {status === 'awaitingResponse' && (
                    <div>
                        Carregando. Aguarde!
                    </div>
                )}
            </div>
        </section>
    )
}