import { Suspense } from "react"
import TitleWithButton from "../../components/layout/titleWithButton"
import MyExams from "../components/myExams"
import CardLoading from "@/app/components/layout/cardLoading"

export default function Page() {

    return (
        <>
            <TitleWithButton title="Minhas Atividades" btnText="Criar" href="/minhas-atividades/nova-atividade" />
            <Suspense fallback={
            <CardLoading />}>
                <MyExams key={"myExams"} />
            </Suspense>
        </>
    )
}