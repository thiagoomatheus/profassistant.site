"use client"

import Button from "@/app/components/layout/button"
import { useCardDataContext } from "../../lib/contexts/CardDataContextProvider"
import useGenerator from "../../lib/hooks/useGenerator"

export default function CardActionSave( { id }: { id?: string } ) {

    const { state, dispatch } = useCardDataContext()

    const { handleSave, handleUpdate } = useGenerator()

    return (
        <>
            {!state.isSave && !id && <Button text="Salvar" handleClick={async () => {
                await handleSave(state.data!)
                dispatch({ type: "setSave" })
            }}  />}
            {state.isEdit && !state.isSave && id && <Button text="Atualizar" handleClick={async () => {
                await handleUpdate(state.data!, id)
                dispatch({ type: "setSave" })
            }}  />}
        </>
    )
}