"use client"

import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationProvider";
import { useRouter } from "next/navigation";

export enum NotificationTypes {
    LoginSuccess = "Login realizado com sucesso",
    LoginFailed = "Falha no login, verifique os dados e tente novamente",
    EmailInvalid = 'Insira um email válido',
    PasswordInvalid = 'Insira uma senha válida',
    RegiterSuccess = "Conta criada com sucesso! Você já está logado",
    RegisterFailed = "Erro ao criar a conta. Verifique os dados e tente novamente",
    LogoutSuccess = "Você saiu da sua conta",
    GeneratorSuccess = "Finalizado! Veja as informações geradas.",
    GeneratorLoading = "Carregando! Aguarde alguns instantes...",
    GeneratorError = "Erro ao gerar informações. Tente novamente.",
    SelectSuccess = "Selecionado com sucesso!",
    SaveSuccess = "Salvo com sucesso!",
    UpdateSuccess = "Atualizado com sucesso!",
    DeleteSuccess = "Excluído com sucesso!",
    CopyToClipboardSuccess = "Copiado com sucesso",
    SelectFailed = "Erro ao selecionar. Tente novamente mais tarde!",
    SaveFailed = "Erro ao salvar. Tente novamente mais tarde!",
    UpdateFailed = "Erro ao atualizar. Tente novamente mais tarde!",
    DeleteFailed = "Erro ao excluir. Tente novamente mais tarde!",
    CopyToClipboardError = "Erro ao copiar, tente novamente mais tarde",
    ExamSavedSuccess = "Atividade salva com sucesso!",
    ExamSavedFailed = "Erro ao salvar atividade. Tente novamente mais tarde!",
    ExamUpdateSuccess = "Atividade atualizada com sucesso!",
    ExamUpdateFailed = "Erro ao atualizar atividade. Tente novamente mais tarde!",
    ExamNoUpdate = "Por favor, faça uma alteração antes de atualizar.",
    ExamDeleteSuccess = "Atividade excluida com sucesso!",
    ExamDeleteFailed = "Falha ao excluir atividade. Tente mais tarde!",
    UpdateProfileSuccess = "Perfil atualizado com sucesso!",
    UpdateProfileFailed = "Falha ao atualizar perfil. Tente mais tarde!",
    ResetPasswordEmailSuccess = "Verifique a caixa de entrada ou a caixa de spam.",
    ResetPasswordEmailFailed = "Falha ao enviar email de redefinição. Tente novamente mais tarde!",
    UpdatePasswordSuccess = "Senha atualizada com sucesso!",
    UpdatePasswordFailed = "Falha ao atualizar senha. Tente novamente mais tarde!",
}

export default function useNotification() {

    const setNotification = useContext(NotificationContext)
    const router = useRouter()

    const generateNotification = (message: NotificationTypes, type: "success" | "error", redirect?: string) => {

        setNotification({
            message: message,
            type: type
        })

        if (!redirect) {
            const timer = setTimeout(() => {
                setNotification(undefined)
            }, 3000)
            return () => clearTimeout(timer)
        }
        if (redirect.startsWith("/")) {
            router.push(redirect)
        }           

        const timer = setTimeout(() => {
            setNotification(undefined)
        }, 3000)

        return () => clearTimeout(timer)
    }
    
    return {
        generateNotification
    }
}