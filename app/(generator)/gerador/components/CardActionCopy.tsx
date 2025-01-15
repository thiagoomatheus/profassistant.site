"use client"

import Button from "@/app/components/layout/button"
import { useCardDataContext } from "../../lib/contexts/CardDataContextProvider"
import useGenerator from "../../lib/hooks/useGenerator"

export default function CardActionCopy() {

    const { state } = useCardDataContext()

    const { handleCopyToClipboard } = useGenerator()

    return (
        <>
            {state.data && <Button text="Copiar" handleClick={() => handleCopyToClipboard(state.data!)} />}
        </>
    )
}