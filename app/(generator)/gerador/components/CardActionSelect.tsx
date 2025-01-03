"use client"

import Button from "@/app/components/layout/button"
import { useCardDataContext } from "../../lib/contexts/CardDataContextProvider"

export default function CardActionSelect( { handle, id }: { handle: (data: string, id: string) => void, id: string } ) {

    const { state } = useCardDataContext()

    return (
        <>
            <Button text="Selecionar" handleClick={() => handle(state.data!, id)} />
        </>
    )
}