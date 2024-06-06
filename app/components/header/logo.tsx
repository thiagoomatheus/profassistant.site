import LogoLight from "@/public/images/Logo.png"
import LogoDark from "@/public/images/Logo-dark.png"
import Image from "next/image";
import Link from "next/link";
import useTheme from "@/app/lib/theme/useTheme";

export default function Logo () {
    const { verifyTheme } = useTheme()
    const theme = verifyTheme()
    
    return (
        <Link href={"/"}>
            <Image 
                src={theme === "dark" ? LogoDark : LogoLight}
                alt="Question Generator" 
                className="w-16 sm:w-20 lg:w-24 xl:w-28"
            />
        </Link>
    )
}