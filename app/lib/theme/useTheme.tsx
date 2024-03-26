import { cookies } from "next/headers"

export default function useTheme() {

    function verifyTheme() {

        const cookieStore = cookies()

        const theme = cookieStore.get("theme")?.value

        if (theme === "dark") {
            return theme
        }
        else {
            return
        }
    }

    return {
        verifyTheme
    }
}