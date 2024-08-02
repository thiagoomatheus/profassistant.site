import ContainerWithBorder from "@/app/components/layout/containerWithBorder"
import FormGenerator from "./formGenerator"
export default function Generator({gerar}: {gerar: "question" | "text" | "math_expression" | "phrase"}) {
    return (
        <ContainerWithBorder borderColor="blue-2">
            <h3 className="text-orange-2">Preencha o formulário</h3>
            <FormGenerator gerar={gerar} />
        </ContainerWithBorder>
    )
}