import { Suspense } from "react"
import TitleWithButton from "../../components/layout/titleWithButton"
import MyExams from "../components/myExams"

export default function Page() {

    return (
        <>
            <TitleWithButton title="Minhas Atividades" btnText="Criar" href="/minhas-atividades/nova-atividade" />
            <Suspense fallback={
            <div className="flex w-full md:justify-around flex-col md:flex-row gap-5">
                <div className="p-5 bg-slate-200 rounded-lg shadow-md w-full md:w-2/5 h-40 animate-pulse"></div>
                <div className="p-5 bg-slate-200 rounded-lg shadow-md w-full md:w-2/5 h-40 animate-pulse"></div>
            </div>}>
                <MyExams key={"myExams"} />
            </Suspense>
        </>
    )
}