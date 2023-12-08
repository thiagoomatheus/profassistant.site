import { useState } from "react"

export default function useTheme() {

    const [darkTheme, setDarkTheme ] = useState<boolean>(false)

    function verifyTheme() {
        if (localStorage.getItem("theme") === "dark") {
            setDarkTheme(true)
            localStorage.setItem("theme", "dark")
            const html = document.querySelector("html")
            html!.classList.toggle("dark")
            return
        }
    }

    function handleDarkTheme(isDark: boolean) {
        if (isDark === true) {
            localStorage.setItem("theme", "light")
            const html = document.querySelector("html")
            html!.classList.toggle("dark")
            return
        }
        localStorage.setItem("theme", "dark")
        const html = document.querySelector("html")
        html!.classList.toggle("dark")
    }

    return {
        darkTheme,
        setDarkTheme,
        handleDarkTheme,
        verifyTheme
    }
}