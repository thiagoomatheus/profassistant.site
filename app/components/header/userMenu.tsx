"use client"

import { FaUser } from "react-icons/fa6";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";
import Link from "next/link";
import Button from "../layout/button";
import useLogin from "@/app/(login)/lib/hooks/useLogin";

export default function UserMenu () {

    const { handleLogout } = useLogin()
    const { user } = useContext(AuthContext)
    const [showMenu, setShowMenu] = useState<boolean>(false)

    return (
        <nav>
            <div className="bg-blue-2 p-2 text-lg xl:p-3 lg:text-2xl text-white rounded-md shadow-md cursor-pointer hover:bg-orange-2 hover:text-blue-2 duration-200" onClick={() => {
                setShowMenu(!showMenu)
            }}><FaUser /></div>
            {showMenu && (
                <ul className={`p-2 lg:p-3 max-w-[150px] lg:max-w-[200px] bg-orange-2 text-white ${showMenu ? 'flex md:flex' : 'hidden md:flex'} flex-col absolute mt-1 md:mt-3 right-3 md:right-5 lg:right-10 xl:right-14 gap-2 md:gap-5 rounded-lg shadow-lg`}>
                    <li className="border-b pb-2">
                        Olá {user?.name}
                    </li>
                    <li>
                        <Link href={"/"} className="hover:border-b hover:text-white hover:border-white">
                            Minha Conta
                        </Link>
                    </li>
                    {/* <li>
                        <ToggleTheme />
                    </li> */}
                    <li>
                        <Button text="Sair" handleClick={handleLogout} aditionalCSS="w-full hover:outline outline-white" />
                    </li>
                </ul>
            )}
        </nav>
    )
}