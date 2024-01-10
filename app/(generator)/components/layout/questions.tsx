import useQuestions from "../../lib/hooks/useQuestions";
import CardQuestion from "./cardQuestion";

export default function Questions ({ status }: {
    status: "awaitingResponse" | "finish" | undefined
}) {
    const { treatResponseForText } = useQuestions()
    const questionsText = treatResponseForText()
    
    return (
        <div className="w-full lg:max-h-[750px] xl:max-h-[850px] sm:w-[55%] lg:w-[46%] flex flex-col gap-5 p-2 rounded-xl border-2 border-orange-2 overflow-auto">
            <h3>Suas questões aqui</h3>
            {!status && (
                <p>Preencha o formulário para gerar as questões. Estamos te aguardando...</p>
            )}
            {status === 'finish' && (
                <div className="flex flex-col gap-5 justify-center w-full">
                    {questionsText!.map((question, i) => (
                        <CardQuestion key={i} questionString={question} id={`${i}`} />
                    ))}
                </div>
            )}
            {status === 'awaitingResponse' && (
                <p>
                    Carregando. Aguarde!
                </p>
            )}
        </div>
    )
}