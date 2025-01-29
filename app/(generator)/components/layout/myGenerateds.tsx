import CardContainer from "./cardContainer";
import CardLoading from "@/app/components/layout/cardLoading"
import { GeneratedDB, UserDBSimple } from "@/app/lib/types/types";
import CardData from "../../gerador/components/CardData";
import CardActionEdit from "../../gerador/components/CardActionEdit";
import CardActionSave from "../../gerador/components/CardActionSave";
import CardActionCopy from "../../gerador/components/CardActionCopy";
import { Suspense } from "react";
import CardActionDelete from "../../gerador/components/CardActionDelete";
import CardActionSelect from "../../gerador/components/CardActionSelect";
import CardActionReview from "../../gerador/components/CardActionReview";

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
                            <Suspense fallback={<CardLoading />} key={item.id}>
                                <CardData data={item.data} key={item.id} id={`${item.id}`} type={item.type}>
                                    {!handleSelect && (
                                        <>
                                            <CardActionEdit originalData={item.data} />
                                            <CardActionSave id={item.id} />
                                            <CardActionDelete id={item.id!} />
                                            <CardActionCopy />
                                            {data.user?.plan !== "gratis" && item.type === "question" && <CardActionReview id={item.id} />}
                                        </>
                                    )}
                                    {handleSelect && (
                                        <CardActionSelect handle={handleSelect} id={item.id!} />
                                    )}
                                </CardData>
                            </Suspense>
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