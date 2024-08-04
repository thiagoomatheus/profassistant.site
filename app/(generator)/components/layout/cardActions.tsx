"use client"
import Button from "@/app/components/layout/button"
export default function CardActions ({ actions, state }: {
    actions: {
        handleSelect?: () => void
        handleSave?: () => void
        handleUpdate?: () => void
        handeDelete?: () => void
        handleCopy?: () => void
    }
    state: {
        editStatus: boolean
        setEditStatus: React.Dispatch<React.SetStateAction<boolean>>
    }
}) {
    const { handleSelect, handleSave, handleUpdate, handeDelete, handleCopy } = actions
    const { editStatus, setEditStatus } = state
    return (
        <div className="flex flex-row gap-5">
            {handleSelect && (
                <Button text="Selecionar" handleClick={handleSelect} />
            )}
            {!editStatus && !handleSelect && (
                <>
                    {handleSave && (
                        <>
                            <Button text="Salvar" handleClick={handleSave} />
                            <Button text="Editar" handleClick={() => setEditStatus(true)} />
                        </>
                    )}
                    {handleUpdate && (
                        <Button text="Atualizar" handleClick={() => setEditStatus(true)} />
                    )}
                    {handeDelete && (
                        <Button text="Excluir" handleClick={handeDelete} />
                    )}
                    {handleCopy && (
                        <Button text="Copiar" handleClick={handleCopy} />
                    )}
                </>
            )}
            {editStatus && (
                <>
                    <Button text="Cancelar" handleClick={() => setEditStatus(false)} />
                    {handleSave && <Button text="Salvar" handleClick={handleSave} />}
                    {handleUpdate && <Button text="Atualizar" handleClick={handleUpdate} />}
                </>
            )}
        </div>
    )
}