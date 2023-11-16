"use client"

import { useContext } from "react"
import Generator from "./components/generator";
import { AuthContext } from "../lib/contexts/AuthContext";

export default function Page () {

    const { auth } = useContext(AuthContext)

    return (
        <>
            <h1 className='text-2xl font-bold'>Bem vindo ao gerador de questões</h1>
           {auth && (
                <div>
                    <Generator />
                </div>
           )}
           {!auth && (
                <div>
                    Você não está autenticado! Faça login.
                </div>
           )}
        </>
    )
}