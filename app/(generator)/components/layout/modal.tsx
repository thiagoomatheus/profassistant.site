import { MdClose } from "react-icons/md";

export default function Modal ({ close }: {
    close: React.MouseEventHandler<HTMLSpanElement>
}) {
    return (
        <div className="fixed top-0 left-0 bg-gray-400 bg-opacity-40 w-screen h-screen flex justify-center items-center">
            <div className="bg-white w-4/5 md:w-2/3 lg:w-1/2 p-4 rounded-lg flex flex-col gap-3">
                <span onClick={close} className="text-xl self-end cursor-pointer">
                    <MdClose />
                </span>
                <h3>Bem vindo ao gerador de questão!</h3>
                <p className="md:text-sm lg:text-lg">Siga as instruções abaixo para gerar suas questões de forma fácil, simples e rápida:</p>
                <ol className="flex flex-col list-decimal list-inside gap-2">
                    <li>Preencha as informações de seus alunos</li>
                    <li>Preencha as informações da(s) questão(ões) que você deseja gerar</li>
                    <li>Clique no botão &quot;Gerar questão&quot;</li>
                    <li>Aguarde alguns segundos e sua(s) questão(ões) aparecerão na lateral</li>
                </ol>
                <p className="md:text-sm lg:text-lg">Obs: No campo &quot;Quantidade de questões&quot; tenha em mente que quanto mais questões maior será o tempo gerá-las.</p>
            </div>
        </div>
    )
}