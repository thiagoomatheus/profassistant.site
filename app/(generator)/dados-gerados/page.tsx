import MyGenerateds from "../components/layout/myGenerateds"
import { getUser } from "@/app/(login)/lib/actions"
import { getGenerated } from "../lib/actions"
import MenuAdd from "../components/layout/menuAdd"
export default async function Page() {
    const userData = await getUser()
    const generatesData = await getGenerated()
    return (
        <>
            <header className="flex flex-col md:flex-row justify-between items-center gap-5">
                <h1>Dados Gerados</h1>
                <MenuAdd />
            </header>
            <MyGenerateds data={{
                user: userData,
                generates: generatesData
            }} />
        </>
    )
}