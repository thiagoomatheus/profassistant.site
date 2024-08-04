import { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "ProfAssistant",
        short_name: "ProfAssistant",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#fff",
        lang: "pt-BR",
        description: "Um assitente para ajudar os professores a criar e gerenciar questões, textos e suas atividades. Você poderá desfrutar de uma IA para gerar conteúdo simples e específico."
    }
}