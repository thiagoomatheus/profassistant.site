"use client"
import { createContext, useState } from "react"
export const ResponseContext = createContext<{
    response: {
        data: string[] | null
        setData: React.Dispatch<React.SetStateAction<string[] | null>>
    }
    subject: {
        subject: string | null
        setSubject: React.Dispatch<React.SetStateAction<string | null>>
    }
    type: {
        gerar: string | null
        setGerar: React.Dispatch<React.SetStateAction<string | null>>
    }
}>({
    response: {
        data: null,
    setData: () => {}
    },
    subject: {
        subject: null,
    setSubject: () => {}
    },
    type: {
        gerar: null,
        setGerar: () => {}
    }
})
export default function ResponseContextProvider({children}: {children: React.ReactNode}) {
    const [data, setData] = useState<string[] | null>(null)
    const [subject, setSubject] = useState<string | null>(null)
    const [gerar, setGerar] = useState<string | null>(null)
    return (
        <ResponseContext.Provider value={{response: {data, setData}, subject: {subject, setSubject}, type: {gerar, setGerar}}}>
            {children}
        </ResponseContext.Provider>
    )
}