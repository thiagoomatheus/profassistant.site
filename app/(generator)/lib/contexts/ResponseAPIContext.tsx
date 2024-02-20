"use client"

import { useState } from "react"
import { createContext } from "react";

export const ResponseAPIContext = createContext<{
    response: string | undefined,
    setResponse: React.Dispatch<React.SetStateAction<string | undefined>>,
    subject: string | undefined,
    setSubject: React.Dispatch<React.SetStateAction<string | undefined>>
}>({
    response: undefined,
    setResponse: () => {},
    subject: undefined,
    setSubject: () => {}
})

export default function ResponseAPIProvider ({ children }: {
    children: React.ReactNode
}) {

    const [messages, setMessages] = useState<string | undefined>(undefined)
    const [subject, setSubject] = useState<string | undefined>(undefined)

    return (
        <ResponseAPIContext.Provider value={{
            response: messages,
            setResponse: setMessages,
            subject: subject,
            setSubject: setSubject
        }}>
            {children}
        </ResponseAPIContext.Provider>
    )
}