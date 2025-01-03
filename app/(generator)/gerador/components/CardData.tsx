import CardDataContextProvider from "../../lib/contexts/CardDataContextProvider"
import CardDataContent from "./CardDataContent"

export default function CardData({ id, type, data, children }: { children: React.ReactNode, id: string, type: "question" | "text" | "phrase" | "math_expression", data: string }) {

    return (
        <div key={id} className="p-3 flex flex-col items-start gap-2 border border-orange rounded-lg shadow-md h-fit max-h-80 overflow-auto">
            <CardDataContextProvider>
                <CardDataContent type={type} data={data} />
                <div className="flex flex-row gap-5">
                    {children}
                </div>
            </CardDataContextProvider>
            
        </div>
    )
}