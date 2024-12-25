"use client"

import Button from "@/app/components/layout/button";
import { useState } from "react";
import Modals from "./modals";

export default function MenuAdd() {

    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [modal, setModal] = useState<"text" | "question" | "phrase" | "math_expression">()

    return (
        <nav className="flex flex-col w-52">
            {modal && <Modals type={modal} close={() => setModal(undefined)} />}
            <Button text="Adicionar" aditionalCSS="w-full" handleClick={() => setShowMenu(!showMenu)} />
            <ul className={`${showMenu ? 'flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 p-2 shadow-sm' : 'hidden'} gap-2 md:gap-5 text-white absolute w-52 rounded-xl`}>
                <Button text="Cancelar" aditionalCSS="w-full" handleClick={() => setShowMenu(!showMenu)} />
                <Button text="Texto" aditionalCSS={`w-full`} handleClick={() => {
                    setShowMenu(!showMenu)
                    setModal("text")
                }} />
                <Button text="Questões" aditionalCSS={`w-full`} handleClick={() => {
                    setShowMenu(!showMenu)
                    setModal("question")
                }} />
                <Button text="Frases" aditionalCSS={`w-full`} handleClick={() => {
                    setShowMenu(!showMenu)
                    setModal("phrase")
                }} />
                <Button text="Expressões Matemáticas" aditionalCSS={`w-full`} handleClick={() => {
                    setShowMenu(!showMenu)
                    setModal("math_expression")
                }} />
            </ul>
        </nav>
    )
}