"use client"

import { useState } from "react"
import { Message } from "ai";
import { createContext } from "react";

export const ResponseAPIContext = createContext<{
    response: Message | undefined,
    setResponse: React.Dispatch<React.SetStateAction<Message | undefined>>
}>({
    response: undefined,
    setResponse: () => {}
})

export default function ResponseAPIProvider ({ children }: {
    children: React.ReactNode
}) {

    const [messages, setMessages] = useState<Message | undefined>(undefined)

    return (
        <ResponseAPIContext.Provider value={{
            response: messages,
            setResponse: setMessages
        }}>
            {children}
        </ResponseAPIContext.Provider>
    )
}