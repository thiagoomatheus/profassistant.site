"use client"

import { FaSun } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";


export default function ToggleTheme () {
    
    return (
        <div onClick={() => {}} className="w-4/5 p-2 mx-auto border flex flex-row justify-between items-center gap-2 cursor-pointer">
            <span>
                <MdDarkMode />
            </span>
            <span>
                <FaSun />
            </span>
        </div>
    )
}