import { getUser } from "@/app/(login)/lib/actions"
import Link from "next/link"
export default async function GeneratorLayout({children}: {children: React.ReactNode}) {
    const user = await getUser()
    if (user?.plan === "gratis") {
        return (
            <div className="flex flex-col gap-5 justify-center items-center">
                <h1>Acesso negado!</h1>
                <p>Seu plano não permite a utilização do gerador.</p>
                <p>Clique no botão abaixo para ir para a página de planos.</p>
                <Link className="bg-blue-2 dark:bg-orange-2 p-3 rounded-lg text-white dark:hover:text-blue-2 inline-block" href={"/minha-conta/meu-plano"}>Alterar Plano</Link>
            </div>
        )
    }
    return <>{children}</>
}