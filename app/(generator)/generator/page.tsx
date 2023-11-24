"use client"

import { useContext, useEffect, useState } from "react"
import Generator from "../components/generator";
import { AuthContext } from "../../(login)/lib/contexts/AuthContext";

export default function Page () {

    const { auth } = useContext(AuthContext)

    const [isLogged, setIsLogged] = useState<boolean>(false)

    useEffect(() => {
        fetch("/api/login", {cache: "force-cache"})
        .then(r => {
            if (r.status === 200) {
                return setIsLogged(true)
            }
            return setIsLogged(false)
        })
    },[])

    return (
        <>
            <h1 className='text-2xl font-bold'>Bem vindo ao gerador de questões</h1>
           {auth && isLogged && (
                <div>
                    <Generator />
                </div>
           )}
           {!auth && !isLogged && (
                <div>
                    Você não está autenticado! Faça login.
                </div>
           )}
        </>
    )
}