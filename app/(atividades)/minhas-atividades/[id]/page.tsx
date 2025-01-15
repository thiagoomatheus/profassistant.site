import MyExam from "../../components/myExam"
import { getExam } from "../../lib/actions"
export default async function Page({params}:{params: {id: string}}) {
    const exam = await getExam(params.id)
    return (
        <>
            <h1>Atividade {params.id.substring(0,8)}...</h1>
            <MyExam data={exam} />
        </>
    )
}