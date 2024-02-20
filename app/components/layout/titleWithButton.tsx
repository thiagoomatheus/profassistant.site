"use client"

import Button from "@/app/components/layout/button"

export default function TitleWithButton( { title, handleClick, state, href, btnText }: {
    title: string
    handleClick?: React.Dispatch<React.SetStateAction<boolean>>
    state?: boolean
    href?: string
    btnText?: string
}) {

    return (
        <div className="flex justify-between items-center">
            <h1>{title}</h1>
            <Button text={btnText ? btnText : "Instruções"} handleClick={() => {
                if (handleClick) {
                    return handleClick(!state)
                }
            }} href={href ? href : ""} aditionalCSS="w-24 lg:w-32" />
        </div>
    )
}