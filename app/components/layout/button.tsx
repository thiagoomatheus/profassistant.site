"use client"

import Link from "next/link"

export default function Button ({ text, href, handleClick, aditionalCSS }: {
    text: string,
    href?: string,
    handleClick?: () => void
    aditionalCSS?: string
}) {
    return (
        <>
            {href && (
                    <Link onClick={() => handleClick} href={href} className={`p-2 text-white w-28 md:w-32 lg:w-40 xl:w-48 bg-blue-2 flex flex-col justify-center items-center rounded-xl shadow-[#ffffff67] md:shadow-[#0000003f] shadow-md`}>
                        {text}
                    </Link>
            )}
            {!href && (
                <button onClick={() => handleClick} className={`p-2 text-white w-28 md:w-32 lg:w-40 xl:w-48 bg-blue-2 flex flex-col justify-center items-center rounded-xl shadow-[#ffffff67] md:shadow-[#0000003f] shadow-md`}>
                    {text}
                </button>
            )}
        </>
    )
}