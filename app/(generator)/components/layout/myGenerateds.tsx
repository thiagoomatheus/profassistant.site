import CardContainer from "./cardContainer";
import CardLoading from "@/app/components/layout/cardLoading"
import { GeneratedDB, UserDBSimple } from "@/app/lib/types/types";
import CardResponse from "../../gerador/components/cardResponse";

export default function MyGenerateds( { data, handleSelect }: {
    data: {
        user?: UserDBSimple
        generates?: GeneratedDB[]
    }
    handleSelect?: (data: string, id: string) => void
    filter?: string
}) {
    return (
        <>
            {data.generates && (
                <CardContainer key={"generates"}>
                    <>
                        {data.generates.map(item => (
                            <CardResponse key={item.id} type={item.type} id={item.id!} data={item.data} actions={handleSelect ? {select: handleSelect} : { delete: true, copy: true, update: true }} />
                        ))}
                    </>
                </CardContainer>
            )}
            {data.generates === undefined && (
                <CardLoading key={"CardLoading"}/>
            )}
            {data.generates !== undefined && data.generates.length === 0 && (
                <p>Não foi possível encontrarmos suas questões salvas. Se você já salvou uma questão e ela não aparece aqui, por favor, recarregue a página. Mas, se você não salvou um questão podrá fazer isso por meio do gerador.</p>
            )}
        </>
    )
}