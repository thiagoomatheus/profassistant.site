"use client"
import { FaUser } from "react-icons/fa6"
import { useContext, useState, useRef } from "react"
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext"
import Link from "next/link"
import Button from "../../../components/layout/button"
import useAuth from "@/app/(login)/lib/hooks/useLogin"
export default function UserMenu () {
    const { user } = useContext(AuthContext)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const { handleLogout } = useAuth()
    const menuRef = useRef<HTMLDivElement>(null)
    const closeOpenMenus = (e:any)=>{
        if(showMenu && !menuRef.current?.contains(e.target)) setShowMenu(false)
    }
    document.addEventListener('click', closeOpenMenus)
    return (
        <nav className="z-40" ref={menuRef}>
            <div className="bg-blue-2 dark:bg-orange-2 dark:hover:bg-blue-2 hover:bg-orange-2 hover:text-blue-2 dark:hover:text-orange-2 p-2 text-lg xl:p-3 lg:text-2xl text-white rounded-md shadow-md cursor-pointer  duration-200" onClick={() => setShowMenu(!showMenu)}><FaUser /></div>
            {showMenu && (
                <ul className={`p-2 lg:p-3 max-w-[150px] lg:max-w-[200px] bg-orange-2 text-white ${showMenu ? 'flex md:flex' : 'hidden md:flex'} flex-col absolute mt-1 md:mt-3 right-3 md:right-5 lg:right-10 xl:right-14 gap-2 md:gap-5 rounded-lg shadow-lg`}>
                    <li className="border-b pb-2">
                        Olá {user?.name}
                    </li>
                    <li><p className="inline bg-gradient-to-r from-blue-2 to-blue font-bold p-1 rounded">{user?.plan.toUpperCase()}</p></li>
                    <li onClick={() => setShowMenu(!showMenu)}>
                        <Link href={"/minha-conta/meu-perfil"} className="hover:border-b hover:text-white hover:border-white">
                            Minha Conta
                        </Link>
                    </li>
                    <li>
                        <Button text="Sair" handleClick={handleLogout} aditionalCSS="font-bold hover:bg-orange" />
                    </li>
                </ul>
            )}
        </nav>
    )
}