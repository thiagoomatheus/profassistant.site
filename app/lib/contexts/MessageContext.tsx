"use client"

import { useState } from "react"
import { Message } from "ai";
import { createContext } from "react";

export const MessageContext = createContext<{
    messages: Message | undefined,
    setMessages: React.Dispatch<React.SetStateAction<Message | undefined>>
}>({
    messages: undefined,
    setMessages: () => {}
})

export default function MessageContextProvider ({ children }: {
    children: React.ReactNode
}) {

    const [messages, setMessages] = useState<Message | undefined>(undefined)

    return (
        <MessageContext.Provider value={{
            messages: messages,
            setMessages: setMessages
        }}>
            {children}
        </MessageContext.Provider>
    )
}