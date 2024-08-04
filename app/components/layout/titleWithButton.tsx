"use client"
import Button from "@/app/components/layout/button"
export default function TitleWithButton( { title, href, btnText }: {
    title: string
    href?: string
    btnText?: string
}) {
    return (
        <div className="flex justify-between items-center">
            <h1>{title}</h1>
            <Button text={btnText ? btnText : "Instruções"} href={href} aditionalCSS="w-24 lg:w-32" />
        </div>
    )
}