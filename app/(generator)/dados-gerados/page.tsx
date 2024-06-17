import { Suspense } from "react"
import MyGenerateds from "../components/layout/myGenerateds"
import CardLoading from "@/app/components/layout/cardLoading"
import { getUser } from "@/app/(login)/lib/actions"
import { getGenerated } from "../lib/actions"

export default async function Page() {
    
    const userData = await getUser()

    const generatesData = await getGenerated()

    return (
        <>
            <h1>Dados Gerados</h1>
            <Suspense fallback={<CardLoading />}>
                <MyGenerateds data={{
                    user: userData,
                    generates: generatesData
                }} />
            </Suspense>
        </>
    )
}