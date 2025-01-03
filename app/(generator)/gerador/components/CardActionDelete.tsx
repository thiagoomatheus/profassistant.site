"use client"

import Button from "@/app/components/layout/button"
import useGenerator from "../../lib/hooks/useGenerator"

export default function CardActionDelete( { id }: { id: string } ) {

    const { handleDelete } = useGenerator()

    return (
        <>
            <Button text="Excluir" handleClick={() => handleDelete(id)} />
        </>
    )
}