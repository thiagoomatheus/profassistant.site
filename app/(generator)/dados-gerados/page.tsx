import { Suspense } from "react"
import MyGenerateds from "../components/layout/myGenerateds"
import CardLoading from "@/app/components/layout/cardLoading"

export default function Page() {
    return (
        <>
            <h1>Dados Gerados</h1>
            <Suspense fallback={<CardLoading />}>
                <MyGenerateds />
            </Suspense>
        </>
    )
}