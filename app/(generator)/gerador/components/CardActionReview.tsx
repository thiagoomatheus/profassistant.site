"use client"

import Button from "@/app/components/layout/button";
import { useCardDataContext } from "../../lib/contexts/CardDataContextProvider";
import { useState } from "react";
import Modal from "@/app/components/layout/modal";
import CardData from "./CardData";
import toast from "react-hot-toast";
import useGenerator from "../../lib/hooks/useGenerator";

export default function CardActionReview( { type, id }: { type: "question" | "text" | "phrase" | "math_expression", id?: string} ) {

    const { state, dispatch } = useCardDataContext()

    const [ open, setOpen ] = useState<boolean>(false)
    const [ dataReviewd, setDataReviewd ] = useState<string>("")

    const { handleReview, handleUpdate } = useGenerator()
    return (
        <>
            {open && (
                <Modal close={() => setOpen(false)}>
                    <h2>Revise as informações</h2>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:flex-row">
                        <div>
                            <h3>Atual</h3>
                            <CardData data={state.data!} id={id ?? ""} type={type}>
                                <></>
                            </CardData>
                        </div>
                        {dataReviewd && (
                            <div>
                                <h3>Revisado</h3>
                                <CardData data={dataReviewd} id={id ?? ""} type={type}  >
                                    <></>
                                </CardData>
                            </div>
                        )}
                        {!dataReviewd && (
                            <div className="p-5 bg-slate-200 dark:bg-gray-700 rounded-lg shadow-md w-full animate-pulse">
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3 justify-end">
                        <Button text="Manter alterações" handleClick={async () => {
                            if (id) {
                                await handleUpdate(dataReviewd, id)
                            }
                            dispatch({ type: "setData", data: dataReviewd })
                            toast.success("Verificado com sucesso!")
                            return setOpen(false)
                        }} />
                        <Button text="Descartar alterações" handleClick={() => setOpen(false)} />
                    </div>
                </Modal>
            )}
            <Button text="Revisar" handleClick={async () => {
                const toastId = toast.loading(`Revisando...`)
                setOpen(true)
                const result = await handleReview(state.data!, toastId)
                setDataReviewd(result)
            }} />
        </>
    )
}