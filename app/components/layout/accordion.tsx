"use client"
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
export default function Accordion( {text, children, color}: {
    text: string,
    children: React.ReactNode,
    color?: string
} ) {
    const [open, setOpen] = useState<boolean>(true)
    return (
        <div className={`w-full flex flex-col justify-start items-start gap-3 max-w-4xl ${color ? `border-b-2 border-${color}` : ""} pb-3`}>
            <div className="w-full flex flex-row justify-between items-center cursor-pointer" onClick={() => {
                setOpen(!open)
            }}>
                <h3>{text}</h3>
                {!open ? (
                    <span className="text-black dark:text-white animate-bounce -z-10">
                        <FaAngleDown />
                    </span>
                ) : (
                    <span className="text-black dark:text-white animate-bounce -z-10">
                        <FaAngleUp />
                    </span>
                )}
            </div>
            <div className={`w-full flex flex-col gap-3 ${!open ? "max-h-0 overflow-hidden" : "max-h-[10000px]"} transition-all duration-500`}>
                {children}
            </div>
        </div>
    )
}