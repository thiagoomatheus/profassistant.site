"use client"

import { User } from "@/app/lib/types/types";
import { useContext } from "react"
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";
import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";

export default function useAuth() {

    const { setIsLogged, setUser } = useContext(AuthContext)
    const { generateNotification } = useNotification()

    function handleLogin(user: User) {
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        .then(async response => {
            if (response.status === 200) {
                setIsLogged(true)
                const user = await response.json().then(r => {
                    return r
                })
                setUser(user)
                generateNotification(NotificationTypes.LoginSuccess, undefined, "success")
                return
            }
            return generateNotification(undefined, NotificationTypes.LoginFailed, 'error', false)
        })
    }

    // function handleLoginGoogle() {
    //     fetch('/api/login')
    //     .then(response => {
    //         if (response.status === 200) {
    //             setIsLogged(true)
    //             generateNotification(NotificationTypes.LoginSuccess, undefined, "success")
    //             return
    //         }
    //         return generateNotification(undefined, NotificationTypes.LoginFailed, 'error')
    //     })
    // }

    function handleRegister(user: User) {

        const regexEmail: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

        const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

        if (!user?.email || !regexEmail.test(user?.email)) { // Validando email
            return generateNotification(undefined, NotificationTypes.EmailInvalid, "error", false)
        } else if (!user.password || !regexPassword.test(user.password)) {
            return generateNotification(undefined, NotificationTypes.PasswordInvalid, "error", false)
        }

        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.status === 200) {
                setIsLogged(true)
                generateNotification(NotificationTypes.RegiterSuccess, undefined, "success")
                return
            }
            return generateNotification(undefined, NotificationTypes.RegisterFailed, "error", false)
        })
    }

    function handleLogout () {
        fetch("/api/logout", {
            method: "POST"
        })
        .then(response => {   
            if (response.status === 200) {
                setIsLogged(false)
                setUser(undefined)
                generateNotification(NotificationTypes.LogoutSuccess, undefined, "success")
                return
            }
        })
    }

    return {
        handleLogin,
        // handleLoginGoogle,
        handleRegister,
        handleLogout
    }
}