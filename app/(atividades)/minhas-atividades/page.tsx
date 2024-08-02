import TitleWithButton from "../../components/layout/titleWithButton"
import { getExams } from "../lib/actions"
import CardContainer from "@/app/(generator)/components/layout/cardContainer"
import CardExams from "../components/cardExams"
export default async function Page() {
    const exams = await getExams()
    return (
        <>
            <TitleWithButton title="Minhas Atividades" btnText="Criar" href="/minhas-atividades/nova-atividade" />
            {!exams.length && (
                <p>Não foi possível encontrarmos suas atividades preparadas. Se você já criou uma atividade e ela não aparece aqui, por favor, recarregue a página. Mas, se você não criou uma atividade, crie uma agora.</p>
            )}
            {exams.length > 0 && (
                <CardContainer>
                    <>
                        {exams.map(exam => (
                            <CardExams key={exam.id} exam={exam} />
                        ))}
                    </>
                </CardContainer>
            )}
        </>
    )
}