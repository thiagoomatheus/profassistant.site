"use client"

import Button from "@/app/components/layout/button"
import { useCardDataContext } from "../../lib/contexts/CardDataContextProvider"

export default function CardActionEdit( { originalData }: { originalData: string } ) {

    const { state, dispatch } = useCardDataContext()

    return (
        <>
            {!state.isEdit && !state.isSave && <Button text="Editar" handleClick={() => dispatch({ type: "setEdit" })}  />}
            {state.isEdit && <Button text="Cancelar" handleClick={() => dispatch({ type: "setCancel", data: originalData })}  />}
        </>
    )
}