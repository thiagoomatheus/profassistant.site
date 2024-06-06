import Modal from "@/app/components/layout/modal";
import MyExam from "../../components/myExam";
import TitleWithButton from "@/app/components/layout/titleWithButton";

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

export default function Page( { searchParams }: SearchParamProps ) {

    const show = searchParams?.show;

    return (
        <>
            <TitleWithButton title="Minhas Atividades" href="/minhas-atividades/nova-atividade?show=true" />
            {show && (
                <Modal key={"instructions"}>
                    <h3>Criar atividade</h3>
                    <p>Nessa seção você pode modelar suas provas e atividades de uma forma simples e fácil com a possibilidade de salvar ou imprimir. Siga as instruções a baixo:</p>
                    <ol className="flex flex-col list-decimal list-inside gap-2">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ol>
                    <p>Obs: Observação adicional</p>
                </Modal>
            )}
            <MyExam key={"exam"} />
        </>
    )
}