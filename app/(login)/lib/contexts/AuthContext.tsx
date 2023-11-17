"use client"

import { createContext, useState } from "react";

export const AuthContext = createContext<{
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
}>({
    auth: false,
    setAuth: () => {}
})

export default function AuthContextProvider ({ children }: {
    children: React.ReactNode
}) {

    const [auth, setAuth] = useState<boolean>(false)

    return (
        <AuthContext.Provider value={{
            auth: auth,
            setAuth: setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}