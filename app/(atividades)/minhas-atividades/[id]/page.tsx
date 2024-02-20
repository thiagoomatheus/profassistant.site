"use client"

import { useEffect, useState } from "react"
import MyExam from "../../components/myExam"
import useExams from "../../lib/hooks/useExams"
import { Exam } from "@/app/lib/types/types"

export default function Page( { params }: {
    params: {
        id: string
    }
}) {

    const { getExam } = useExams()
    const [exam, setExam] = useState<Exam>()

    useEffect(() => {
        getExam(params.id)
        .then(result => {
            return setExam(result)
        })
    },[])

    return (
        <>
            <h1>Atividade {params.id.substring(0,6)}...</h1>
            <MyExam data={exam} />
        </>
    )
}