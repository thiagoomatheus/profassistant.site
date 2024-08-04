import Button from "@/app/components/layout/button"
export default function FieldActions( { field, handles, data }: {
    field: string
    handles: {
        handleSelect?: () => void
        handleInsert?: () => void
        handleDelete?: () => void
    }
    data?: string
}) {
    return (
        <div className={`flex flex-row justify-${data ? "between" : "start"} items-center gap-5`}>
            <p className="text-xs md:text-base font-bold">{field}:</p>
            {!data && (
                <>
                    <Button text="Selecionar" handleClick={handles.handleSelect} />
                    <Button text="Inserir" handleClick={handles.handleInsert} />
                </>
            )}
            {data && (
                <>
                    <p className=" font-normal text-xs xl:text-sm">{data.length >= 110 ? `${data.replaceAll("--","").substring(0,110)}...` : data.replaceAll("--","")}</p>
                    <Button text="Excluir" handleClick={handles.handleDelete} />
                </>
            )}
        </div>
    )
}