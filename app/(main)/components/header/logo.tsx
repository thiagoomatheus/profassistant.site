import logo from "@/public/images/logo.png"
import logoDark from "@/public/images/logo-dark.png"
import Image from "next/image";
import Link from "next/link";
import useTheme from "@/app/lib/theme/useTheme"
export default function Logo () {
    const { verifyTheme } = useTheme()
    const theme = verifyTheme()
    return (
        <Link className="flex flex-col justify-center items-center" href={"/"}>
            <Image 
                src={theme === "dark" ? logoDark : logo}
                alt="Question Generator" 
                className="w-9 sm:w-14 lg:w-18"
            />
            <p className={`text-[10px] leading-3 lg:text-sm font-bold text-blue-2 dark:text-white hover:text-blue-2 dark:hover:text-white`}>Prof</p>
            <p className={`text-[10px] leading-3 lg:text-sm font-bold text-blue-2 dark:text-white hover:text-blue-2 dark:hover:text-white`}>Assistant</p>
        </Link>
    )
}