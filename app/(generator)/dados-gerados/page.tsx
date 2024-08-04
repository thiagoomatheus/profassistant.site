import MyGenerateds from "../components/layout/myGenerateds"
import { getUser } from "@/app/(login)/lib/actions"
import { getGenerated } from "../lib/actions"
export default async function Page() {
    const userData = await getUser()
    const generatesData = await getGenerated()
    return (
        <>
            <h1>Dados Gerados</h1>
            <MyGenerateds data={{
                user: userData,
                generates: generatesData
            }} />
        </>
    )
}