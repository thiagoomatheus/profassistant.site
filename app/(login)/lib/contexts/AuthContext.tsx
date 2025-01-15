"use client"
import { UserDBSimple } from "@/app/lib/types/types";
import { createContext, useState, useEffect } from "react";
import { getUser } from "../actions";
export const AuthContext = createContext<{
    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    user: UserDBSimple | undefined,
    setUser: React.Dispatch<React.SetStateAction<UserDBSimple | undefined>>
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
    const [user, setUser] = useState<UserDBSimple | undefined>(undefined)
    useEffect(() => {
        getUser().then(user => {
            if (user) {
                setIsLogged(true)
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