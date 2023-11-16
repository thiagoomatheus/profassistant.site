"use client"

import Link from "next/link"

export default function Button ({ text, href, handleClick }: {
    text: string,
    href: string,
    handleClick?: () => void
}) {
    return (
        <Link onClick={() => handleClick} href={href} className="p-2 w-28 bg-white flex flex-col justify-center items-center rounded-xl shadow-slate-400 shadow-sm">
            {text}
        </Link>
    )
}