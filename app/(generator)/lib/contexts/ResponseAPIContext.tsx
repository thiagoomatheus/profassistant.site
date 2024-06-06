"use client"

import { useState } from "react"
import { createContext } from "react";

export const ResponseAPIContext = createContext<{
    response: string | undefined
    setResponse: React.Dispatch<React.SetStateAction<string | undefined>>
    subject: string | undefined
    setSubject: React.Dispatch<React.SetStateAction<string | undefined>>
    generated?: "Texto" | "Questão" | "Frase" | "Expressão matemática"
    setGenerated: React.Dispatch<React.SetStateAction<"Texto" | "Questão" | "Frase" | "Expressão matemática" | undefined>>
}>({
    response: undefined,
    setResponse: () => {},
    subject: undefined,
    setSubject: () => {},
    setGenerated: () => {}
})

export default function ResponseAPIProvider ({ children }: {
    children: React.ReactNode
}) {

    const [response, setResponse] = useState<string | undefined>()
    const [subject, setSubject] = useState<string | undefined>()
    const [generated, setGenerated] = useState<"Texto" | "Questão" | "Frase" | "Expressão matemática" | undefined>()

    return (
        <ResponseAPIContext.Provider value={{
            response,
            setResponse,
            subject,
            setSubject,
            generated,
            setGenerated
        }}>
            {children}
        </ResponseAPIContext.Provider>
    )
}