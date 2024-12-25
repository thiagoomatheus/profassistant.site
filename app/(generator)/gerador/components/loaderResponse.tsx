import ContainerWithBorder from "@/app/components/layout/containerWithBorder";

export default function LoaderResponse() {
    return (
        <ContainerWithBorder borderColor="orange-2">
            <h3>Resultado aqui</h3>
            <div className="p-5 bg-slate-200 dark:bg-gray-700 rounded-lg shadow-md w-full h-40 animate-pulse"></div>  
        </ContainerWithBorder>
    )
}