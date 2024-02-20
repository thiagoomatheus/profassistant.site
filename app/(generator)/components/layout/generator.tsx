'use client';

import Form from "@/app/(generator)/components/form/form";
import ContainerWithBorder from "@/app/components/layout/containerWithBorder";

export default function Generator ({ handleStatus }: {
    handleStatus: React.Dispatch<React.SetStateAction<"awaitingResponse" | "finish" | undefined>>
}) {

    return (
        <ContainerWithBorder borderColor="blue-2">
            <h3 className="text-orange-2">Preencha o formulário</h3>
            <Form setStatus={handleStatus} />
        </ContainerWithBorder>
    )
}