import { getUser } from "@/app/(login)/lib/actions";
import UsageChartSection from "../../components/UsageChartSection";

export default async function Page() {

    const user = await getUser()

    if (!user) {
        return (
            <div className="flex flex-col gap-3">
                <p>Para acessar essa parte do sistema, primeiro faca login.</p>
            </div>
        )
    }

    return (
        <>
            <h2>Meu uso</h2>
            <section className="w-full flex justify-start 2xl:justify-center flex-col lg:flex-row gap-5 flex-wrap">
                <UsageChartSection usage={user?.generateds} limit={user?.limit_generateds} title="Banco de textos e questões" />
                <UsageChartSection usage={user?.exams} limit={user?.limit_exams} title="Banco de provas e atividades" />
                {user.plan === "premium" && <UsageChartSection usage={user?.ia} limit={user?.limit_ia} title="Uso de IA" className="lg:min-w-[270px]" />}
            </section>
        </>
        
    )
}