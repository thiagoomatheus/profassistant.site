"use client"

import { useContext, useState } from "react"
import { User } from "@/app/lib/types/types";
import { signInWithEmail, signUpNewUser } from "@/app/lib/supabase/actions";
import { AuthContext } from "../lib/contexts/AuthContext";
import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";

export default function Form ({btnText, register}: {
    btnText: string,
    register?: boolean
}) {

    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
        plan: "free"
    })

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const { generateNotification } = useNotification()
    const { setIsLogged, setUser: setUserContext } = useContext(AuthContext)

    return (
        <>
            <form className="max-w-md flex flex-col gap-5" onSubmit={async (e: React.FormEvent) => {
                e.preventDefault()
                if (register) {
                    const regexEmail: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

                    const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
            
                    if (!user?.email || !regexEmail.test(user?.email)) { // Validando email
                        return generateNotification(undefined, NotificationTypes.EmailInvalid, "error", false)
                    } else if (!user.password || !regexPassword.test(user.password)) {
                        return generateNotification(undefined, NotificationTypes.PasswordInvalid, "error", false)
                    }
                    
                    return signUpNewUser(user)
                    .then((data) => {
                        setUserContext(data)
                        setIsLogged(true)
                        generateNotification(NotificationTypes.RegiterSuccess, undefined, "success")
                    })
                    .catch(error => {
                        console.log(error)
                        generateNotification(undefined, NotificationTypes.RegisterFailed, 'error', false)
                    })
                }

                return signInWithEmail(user.email, user.password)
                .then((data) => {
                    setUserContext(data)
                    setIsLogged(true)
                    generateNotification(NotificationTypes.LoginSuccess, undefined, "success")
                })
                .catch(error => {
                    console.log(error)
                    generateNotification(undefined, NotificationTypes.LoginFailed, 'error', false)
                })
            }}>
                {register && (
                    <label>Seu nome:
                        <input name="name" type="text" placeholder="Insira seu nome" onChange={handleChange} />
                    </label>
                )}
                <label>Seu email:
                    <input name="email" type="email" placeholder="Insira seu email" onChange={handleChange} />
                </label>
                <label>Sua senha:
                    <input name="password" type="password" placeholder="Insira sua senha" onChange={handleChange} />
                </label>
                <p className="text-sm">Lembre-se: Sua senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial ($*&@#), um número e 8 caracteres.</p>
                <input type="submit" value={btnText} />
            </form>
        </>
    )
}