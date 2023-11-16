import Link from "next/link";

export default function Logo () {
    return (
        <Link href={"/"} className="w-24 h-15 font-bold text-white text-3xl border-b-8">
            Question! Generator
        </Link>
    )
}