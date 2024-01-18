"use client"

import { getUser } from "@/app/lib/supabase/actions";
import { UserDBSupabase } from "@/app/lib/types/types";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext<{
    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    user: UserDBSupabase | undefined,
    setUser: React.Dispatch<React.SetStateAction<UserDBSupabase | undefined>>
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
    const [user, setUser] = useState<UserDBSupabase | undefined>(undefined)

    useEffect(() => {
        fetch("/api/login")
        .then(async r => {
            if (r.status !== 200) {
                setIsLogged(false)
                setUser(undefined)
                return
            }
            if (isLogged !== true) {
                setIsLogged(true)
                const user = await r.json()
                .then((result: UserDBSupabase) => {
                    return result
                }
                )
                setUser(user)
            }
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