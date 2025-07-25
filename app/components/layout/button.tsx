"use client"
import Link from "next/link"
export default function Button ({ text, href, handleClick, aditionalCSS, type, ...rest }: {
    text: string,
    href?: string,
    handleClick?: () => void
    aditionalCSS?: string
    type?: "button" | "submit" | "reset"
} & React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>) {
    return (
        <>
            {href && (
                <Link onClick={handleClick} href={href} className={`p-2 md:py-2 md:px-4 xl:px-5 text-xs md:text-sm lg:text-lg text-white bg-blue-2 flex flex-col justify-center items-center rounded-xl shadow-md hover:bg-orange-2 hover:text-white duration-300 cursor-pointer ${aditionalCSS}`} {...rest} >
                    {text}
                </Link>
            )}
            {!href && (
                <button type={type ? type : "button"} onClick={handleClick} className={`p-2 md:py-2 md:px-4 xl:px-5 text-xs md:text-sm lg:text-lg text-white bg-blue-2 flex flex-col justify-center items-center rounded-xl shadow-md hover:bg-orange-2 hover:text-white duration-300 cursor-pointer ${aditionalCSS}`} {...rest} >
                    {text}
                </button>
            )}
        </>
    )
}