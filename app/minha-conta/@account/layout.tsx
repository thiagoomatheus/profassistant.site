import Link from "next/link"
import { RiFolderUserFill } from "react-icons/ri";
import { FaAward } from "react-icons/fa";
export default function MinhaContaLayout({children}: {children: React.ReactNode}) {
  return (
    <section className="flex flex-col gap-5">
      <h1>Minha Conta</h1>
      <div className="flex flex-col md:flex-row gap-10">
          <nav className="flex flex-row md:flex-col md:min-w-fit gap-5 justify-start border-2 border-blue-2 rounded-xl p-5 md:p-10 text-blue-2">
            <Link className="flex gap-3 items-center pr-3 border-r md:border-r-0 md:border-b-2 border-orange-2 hover:border-blue-2 duration-200" href="/minha-conta/meu-perfil">
              <span><RiFolderUserFill /></span>Meu Perfil
            </Link>
            <Link className="flex gap-3 items-center pr-2 border-r md:border-r-0 md:border-b-2 border-orange-2 hover:border-blue-2 duration-200" href="/minha-conta/meu-plano">
              <span><FaAward /></span>Meu Plano
            </Link>
          </nav>
          <section className="border-2 border-orange-2 rounded-xl p-5 md:p-10 w-full flex flex-col gap-5">
            {children}
          </section>
      </div>
    </section>
  )
}