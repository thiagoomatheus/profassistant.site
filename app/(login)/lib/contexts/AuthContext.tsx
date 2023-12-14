"use client"

import { UserDB } from "@/app/lib/types/types";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext<{
    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    user: UserDB | undefined,
    setUser: React.Dispatch<React.SetStateAction<UserDB | undefined>>
}>({
    isLogged: false,
    setIsLogged: () => {},
    user: undefined,
    setUser: () => {}
})

export default function AuthContextProvider ({ children }: {
    children: React.ReactNode
}) {
    
    const [isLogged, setIsLogged] = useState<boolean>(false)
    const [user, setUser] = useState<UserDB | undefined>(undefined)

    useEffect(() => {
        fetch("/api/login")
        .then(async (r) => {
            if (r.status !== 200) {
                setIsLogged(false)
                setUser(undefined)
                return
            }
            if (isLogged !== true) {
                setIsLogged(true)
            }
            const response: {
                user: UserDB
            } = await r.json()
            setUser(response.user)
            return
        })
    },[])
    
    return (
        <AuthContext.Provider value={{
            isLogged: isLogged,
            setIsLogged: setIsLogged,
            user: user, 
            setUser: setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}