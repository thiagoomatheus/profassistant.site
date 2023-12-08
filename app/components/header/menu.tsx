"use client"


import Link from "next/link";
import Login from "./login";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";
import UserMenu from "./userMenu";

export default function Menu() {

    const { user, isLogged } = useContext(AuthContext)
    const pathname = usePathname()

    return (
        <nav className="w-full flex flex-row items-center justify-between">
            {!isLogged && !user && (
                <>
                    <ul className="flex flex-row flex-wrap gap-2 md:gap-5 text-blue-2">
                        <li>
                            <Link href={"/#product"}>
                                Produto
                            </Link>
                        </li>
                        <li>
                            <Link href={"/#price"}>
                                Planos
                            </Link>
                        </li>
                        <li>
                            <Link href={"/#about"}>
                                Sobre nós
                            </Link>
                        </li>
                    </ul>
                    <Login />
                </>
            )}
            {isLogged && user && (
                <>
                    <ul className="flex flex-row flex-wrap gap-2 md:gap-5 text-blue-2">
                        <li className={pathname === "/generator" ? "text-orange font-bold" : ""}>
                            <Link href={"/generator"}>
                                Gerador
                            </Link>
                        </li>
                        <li className={pathname === "/minhas-questoes" ? "text-orange font-bold" : ""}>
                            <Link href={"/minhas-questoes"}>
                                Questões
                            </Link>
                        </li>
                        <li className={pathname === "/minha-prova" ? "text-orange font-bold" : ""}>
                            <Link href={"/minha-prova"}>
                                Prova
                            </Link>
                        </li>
                    </ul>
                    <UserMenu />
                </>
            )}
        </nav>
    )
}