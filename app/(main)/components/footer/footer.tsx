import Link from "next/link"
import Logo from "../header/logo"
export default function Footer () {
    return (
        <footer className="w-full flex flex-col justify-center items-center gap-3 bg-gray-400 dark:bg-black p-5 text-white">
            <section className="w-full flex flex-row gap-7 lg:gap-20 justify-center items-center">
                <Logo />
                <ul>
                    <li><Link className="text-xs font-normal lg:text-base border-b" href={"/#produto"}>Produto</Link></li>
                    <li><Link className="text-xs font-normal lg:text-base border-b" href={"/#planos"}>Planos</Link></li>
                    <li><Link className="text-xs font-normal lg:text-base border-b" href={"/#sobre"}>Sobre</Link></li>
                </ul>
                <ul>
                    <li><Link className="text-xs font-normal lg:text-base border-b" href={"/faq"}>Perguntas Frequentes</Link></li>
                    <li><Link className="text-xs font-normal lg:text-base border-b" href={"/contato"}>Contato</Link></li>
                    <li><Link className="text-xs font-normal lg:text-base border-b" href={"/politica-de-privacidade"}>Política de privacidade</Link></li>
                </ul>
            </section>
            <span className="font-bold text-xs lg:text-base">ProfTools 2024 &copy; | Produzido por <Link href={"https://github.com/thiagoomatheus"} target="_blank" className="underline text-xs lg:text-base">thiagoomatheus</Link></span>
        </footer>
    )
}