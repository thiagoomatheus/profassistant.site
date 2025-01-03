"use client"

import { FaCheckCircle } from "react-icons/fa";
import { useCardDataContext } from "../../lib/contexts/CardDataContextProvider"
import { useEffect } from "react";

export default function CardDataContent({ type, data }: { type: "question" | "text" | "phrase" | "math_expression", data: string }) {

    const { state, dispatch } = useCardDataContext()

    useEffect(() => {
        dispatch({ type: "setData", data })
    }, [data, dispatch])

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        return dispatch({ type: "setData", data: target.value })
    }

    return (
        <>
            {state.isSave && <div className="text-green-500 m-[-12px]"><FaCheckCircle /></div>}
            {!state.isEdit && state.data && (
                <>
                    {type === "question" && (
                        <>
                            {state.data.split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </>
                    )}
                    {type === "text" && (
                        <>
                            <p className="font-bold">{state.data.split("Texto:")[0]}</p>
                            {state.data.split("Texto:")[1].split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </>
                    )}
                    {type === "phrase" && (
                        <>
                            {state.data.split("Frase:")[1].split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </>
                    )}
                    {type === "math_expression" && (
                        <div className="grid grid-cols-2 grid-rows-2 gap-y-10 w-full">
                            {state.data.replaceAll("**","").split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </div>
                    )}
                </>
            )}
            {state.isEdit && state.data && <textarea onChange={handleChange} value={state.data} className={`w-full ${type === "text" ? "min-h-[350px]" : "h-48"}`}></textarea>}
        </>
    )
}