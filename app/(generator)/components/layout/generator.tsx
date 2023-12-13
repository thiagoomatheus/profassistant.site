'use client';

import Form from "@/app/(generator)/components/form/form";

export default function Generator ({ handleStatus }: {
    handleStatus: React.Dispatch<React.SetStateAction<"awaitingResponse" | "finish" | undefined>>
}) {

    return (
        <div className="w-full lg:h-[700px] xl:h-[770px] sm:w-[55%] lg:w-[46%] flex flex-col gap-5 p-2 rounded-xl border-2 border-blue-2">
            <h3 className="text-orange-2">Preencha o formulário</h3>
            <Form setStatus={handleStatus} />
        </div>
    )
}