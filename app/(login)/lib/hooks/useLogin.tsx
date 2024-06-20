"use client"

import { User } from "@/app/lib/types/types";
import { useContext } from "react"
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";
import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";
import { getUser, loginUser, logoutUser, registerUser } from "../actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function useAuth() {

    const { setIsLogged, setUser } = useContext(AuthContext)
    const { generateNotification } = useNotification()
    const router = useRouter()

    function isValidCPF(cpf: string) {
        cpf = cpf.replace(/[\s.-]*/igm, '')
        if (
            !cpf ||
            cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999" 
        ) {
            return false
        }
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(cpf.substring(9, 10)) ) return false
        soma = 0
        for (var i = 1; i <= 10; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(cpf.substring(10, 11) ) ) return false
        return true
    }

    function validateData(user: User) {
        const regexEmail: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
        const regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
        const regexPhone: RegExp = /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/
        if (!isValidCPF(user.cpf)) {
            return {
                error: "CPF inválido"
            }
        }
        if (!user?.email || !regexEmail.test(user?.email)) {
            return {
                error: "Email inválido"
            }
        } else if (!user.password || !regexPassword.test(user.password)) {
            return {
                error: "Senha inválida"
            }
        }
        else if (!user.phone || !regexPhone.test(user.phone)) {
            return {
                error: "Telefone inválido"
            }
        }
        return true
    }

    async function handleLogin(formData: FormData) {
        const toastLogin = toast.loading('Entrando...')
        const result = await loginUser(formData)
        if (result !== "success") {
            return toast.error(result.error, {
                id: toastLogin
            })
        }
        getUser()
        .then(user => {    
            if (user) {
                setIsLogged(true)
                setUser(user)
            }
        })
        toast.success("Login efetuado com sucesso!", {
            id: toastLogin
        })
        return router.push("/gerador")
    }

    async function handleRegister(formData: FormData) {
        const toastRegister = toast.loading('Criando conta...')
        const user: User = {
            name: formData.get("name") as string,
            cpf: formData.get("cpf") as string,
            phone: formData.get("phone") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            plan: "free"
        }
        const validate = validateData(user)
        if (validate !== true) {
            return toast.error(validate.error, {
                id: toastRegister
            })
        }
        const result = await registerUser(user)
        if (result !== "success") {
            return toast.error(result.error, {
                id: toastRegister
            })
        }
        getUser()
        .then(user => {    
            if (user) {
                setIsLogged(true)
                setUser(user)
            }
        })
        toast.success("Conta criada com sucesso!", {
            id: toastRegister
        })
        return router.push("/gerador")
    }

    async function handleLogout () {
        const toastLogout = toast.loading('Saindo...')
        const result = await logoutUser()
        if (result !== "success") {
            return toast.error(result.error, {
                id: toastLogout
            })
        }
        setIsLogged(false)
        setUser(undefined)
        toast.success("Logout efetuado com sucesso!", {
            id: toastLogout
        })
        return router.push("/")
    }

    return {
        handleLogin,
        handleRegister,
        handleLogout
    }
}