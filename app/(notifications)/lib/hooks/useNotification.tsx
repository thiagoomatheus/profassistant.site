"use client"

import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationProvider";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/(login)/lib/contexts/AuthContext";

export enum NotificationTypes {
    LoginSuccess = "Login realizado com sucesso",
    LoginFailed = "Falha no login, verifique os dados e tente novamente",
    EmailInvalid = 'Insira um email válido',
    PasswordInvalid = 'Insira uma senha válida',
    RegiterSuccess = "Conta criada com sucesso! Você já está logado",
    RegisterFailed = "Erro ao criar a conta. Verifique os dados e tente novamente",
    LogoutSuccess = "Você saiu da sua conta",
    GeneratorSuccess = "Finalizado! Veja suas questões",
    GeneratorLoading = "Carregando! Aguarde alguns instantes...",
    GeneratorError = "Erro ao gerar questão. Tente novamente.",
    SelectQuestionEmpty = "Selecione alguma questão para salvar",
}

export default function useNotification() {

    const setNotification = useContext(NotificationContext)
    const { isLogged } = useContext(AuthContext)
    const router = useRouter()

    const generateNotification = (messageSuccess?: NotificationTypes, messageError?: NotificationTypes, type?: "success" | "error", redirect?: boolean) => {
        switch (type) {
            case "success":
                setNotification({
                    message: messageSuccess!,
                    type: type
                })
                if (redirect === false) {
                    const timer = setTimeout(() => {
                        setNotification(undefined)
                    }, 3000)
            
                    return () => clearTimeout(timer)
                }
                !isLogged ? router.push("/generator") : router.push("/")
                break;
            case "error":
                setNotification({
                    message: messageError!,
                    type: type
                })
                if (redirect === false) {

                    const timer = setTimeout(() => {
                        setNotification(undefined)
                    }, 3000)
            
                    return () => clearTimeout(timer)
                }
                !isLogged ? router.push("/generator") : router.push("/")
                break
        };

        const timer = setTimeout(() => {
            setNotification(undefined)
        }, 3000)

        return () => clearTimeout(timer)
    }
    
    return {
        generateNotification
    }
}