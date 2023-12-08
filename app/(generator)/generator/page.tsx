"use client"

import { useContext } from "react"
import Generator from "../components/generator";
import { AuthContext } from "../../(login)/lib/contexts/AuthContext";

export default function Page () {

    const { isLogged, user } = useContext(AuthContext)
    
    return (
        <section className="flex flex-col gap-2 lg:gap-4">
            <h1>Gerador de questões</h1>
            {!user && !isLogged && (
                <>
                    <p className="md:text-sm lg:text-lg">Bem vindo ao gerador de questão! Siga as instruções abaixo para gerar suas questões de forma fácil, simples e rápida:</p>
                    <ol className="list-decimal list-inside">
                        <li>Preencha as informações de seus alunos</li>
                        <li>Preencha as informações da(s) questão(ões) que você deseja gerar</li>
                        <li>Clique no botão &quot;Gerar questão&quot;</li>
                        <li>Aguarde alguns segundos e sua(s) questão(ões) aparecerão na lateral</li>
                    </ol>
                    <p className="md:text-sm lg:text-lg">Obs: No campo &quot;Quantidade de questões&quot; tenha em mente que quanto mais questões maior será o tempo gerá-las.</p>
                    <Generator />
                </>
                
           )}
           {user && isLogged && (
                <>
                    <p>Você não está autenticado! Faça login.</p>
                </>
           )}
        </section>
    )
}