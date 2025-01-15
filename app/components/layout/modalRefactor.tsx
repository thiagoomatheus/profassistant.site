import Link from "next/link";
import { MdClose } from "react-icons/md";
export default function ModalRefactor ({ children, close, customWidth }: {
    children: React.ReactNode
    close?: string
    customWidth?: string
}) {
    return (
        <div className={`font-normal fixed top-0 left-0 bg-gray-400 dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-40 w-screen h-screen flex justify-center items-center z-50`}>
            <div className={`bg-white dark:bg-gray-900 ${customWidth ? customWidth : "w-4/5 md:w-2/3 lg:w-1/2"} p-4 rounded-lg flex flex-col gap-3 overflow-y-auto max-h-[98%]`}>
                <Link href={close ? close : `?${new URLSearchParams()}`} className="dark:text-white text-black text-xl lg:text-3xl self-end cursor-pointer">
                    <MdClose />
                </Link>
                {children}
            </div>
        </div>
    )
}