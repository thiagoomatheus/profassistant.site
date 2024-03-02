import Link from "next/link"

export default function MinhaContaLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
      <section className="flex flex-col gap-5">
        <h1>Minha Conta</h1>
        <div className="flex flex-col md:flex-row gap-10">
            <nav className="flex flex-row md:flex-col md:min-w-fit gap-5 justify-start border-2 border-blue-2 rounded-xl p-5 md:p-10 text-blue-2">
              <Link className="pr-3 border-r md:border-r-0 md:border-b-2 border-orange-2 hover:border-blue-2 duration-200" href="/minha-conta/meu-perfil">Meu Perfil</Link>
              <Link className="pr-2 border-r md:border-r-0 md:border-b-2 border-orange-2 hover:border-blue-2 duration-200" href="/minha-conta/meu-plano">Meu Plano</Link>
              <Link className="pr-2 border-r md:border-r-0 md:border-b-2 border-orange-2 hover:border-blue-2 duration-200" href="/minha-conta/meu-uso">Meu Uso</Link>
            </nav>
            <section className="border-2 border-orange-2 rounded-xl p-5 md:p-10 w-full">
              {children}
            </section>
        </div>
      </section>
    )
  }