"use client"

import { MdMenu, MdClose } from "react-icons/md";
import Link from "next/link";
import Login from "./login";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Menu() {
    
    const [showMenu, setShowMenu] = useState<boolean>(false)

    return (
        <nav className="flex flex-col md:flex-row items-center justify-center">
            {!showMenu && (
                <li className={`${!showMenu ? 'block' : 'hidden'} text-3xl cursor-pointer md:hidden`} onClick={() => {
                    setShowMenu(!showMenu)
                }}><MdMenu /></li>
            )}
            <ul className={`list-none text-sm md:text-base xl:text-xl text-white md:text-blue-2 ${showMenu ? 'flex md:flex' : 'hidden md:flex'} flex-col md:flex-row fixed md:static top-0 right-0 bg-gradient-to-b from-orange-2 to-orange md:bg-gradient-to-r md:from-white md:to-white gap-2 md:gap-5 xl:gap-8 text-center md:items-center pt-20 md:p-0 font-bold w-44 h-full md:h-fit md:w-full rounded-s-lg md:rounded-none`}>
                {showMenu && (
                    <li className={`${showMenu ? 'block' : 'hidden'} fixed top-11 right-3 text-3xl cursor-pointer text-white md:hidden`} onClick={() => {
                        setShowMenu(!showMenu)
                    }}><MdClose /></li>
                )}
                <li /*className={`${pathname === "/" ? "border-r-4 md:border-r-0 md:text-orange" : ""}`}*/ onClick={() => {
                        setShowMenu(!showMenu)
                    }}>
                    <Link href={"/"}>
                        Home
                    </Link>
                </li>
                <li /*className={`${pathname === "/#product" ? "border-r-4 md:border-r-0 md:text-orange" : ""}`}*/ onClick={() => {
                        setShowMenu(!showMenu)
                    }}>
                    <Link href={"/#product"}>
                        Produto
                    </Link>
                </li>
                <li /*className={`${pathname === "/price" ? "border-r-4 md:border-r-0 md:text-orange" : ""}`}*/ onClick={() => {
                        setShowMenu(!showMenu)
                    }}>
                    <Link href={"/#price"}>
                        Planos
                    </Link>
                </li>
                <li /*className={`${pathname === "/about" ? "border-r-4 md:border-r-0 md:text-orange" : ""}`}*/ onClick={() => {
                        setShowMenu(!showMenu)
                    }}>
                    <Link href={"/#about"}>
                        Sobre nós
                    </Link>
                </li>
                <Login />
            </ul>
        </nav>
    )
}