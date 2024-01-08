"use client"

import { useContext } from "react"
import MyQuestions from "../components/layout/myquestions"
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext"

export default function Page() {
    const { user } = useContext(AuthContext)
    return (
        <section className="flex flex-col gap-5">
            <h1>Minhas Questões</h1>
            <MyQuestions user={user!} />
        </section>
    )
}