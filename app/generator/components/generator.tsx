'use client';

import Form from "@/app/generator/components/form/form";
import Question from "@/app/generator/components/question";
import { useState } from "react"

export default function Generator () {
    
    const [status, setStatus] = useState<"awaitingResponse" | "finish" | undefined>()

    return (
        <section className="p-5 flex flex-col gap-5 m-auto w-[600px]">
            <Form setStatus={setStatus} />
            {status === 'finish' && (
                <Question />
            )}
            {status === 'awaitingResponse' && (
            <div>
                Carregando. Aguarde!
            </div>
            )}
        </section>
    )
}