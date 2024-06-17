"use client"

import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import useGenerator from "../../lib/hooks/useGenerator"
import CardActions from "./cardActions"

export default function CardResponse ({ type, id, data, actions }: {
    type: "Texto" | "Questão" | "Frase" | "Expressão matemática" | undefined
    id: string
    data: string 
    actions?: {
        save?: boolean,
        update?: boolean,
        delete?: true,
        copy?: boolean,
        select?: (data: string, id: string) => void
    }
}) {
    const [editStatus, setEditStatus] = useState<boolean>(false)
    const [isSaved, setIsSaved] = useState<boolean>(false)

    const [response, setResponse] = useState<string>(data)

    const { handleCopyToClipboard, handleSave, handleUpdate, handleDelete } = useGenerator()

    let handleActions: {
        handleSelect?: () => void
        handleSave?: () => void
        handleUpdate?: () => void
        handeDelete?: () => void
        handleCopy?: () => void
    } = {}

    if (actions) {
        if (actions.save) {
            if (!isSaved) {
                handleActions.handleSave = async () => {
                    handleSave(response)
                    .then(() => {
                        setIsSaved(true)
                        setEditStatus(false)
                    })
                }
            }
        } if (actions.update) {
            handleActions.handleUpdate = () => {
                handleUpdate(response, id)
                .then(() => {
                    setIsSaved(true)
                    setEditStatus(false)
                })
            }
        } if (actions.delete) {
            handleActions.handeDelete = () => {
                handleDelete(id)
                .then(() => {
                    
                    setEditStatus(false)
                })
            }
        } if (actions.copy) {
            handleActions.handleCopy = () => {
                handleCopyToClipboard(response.replace("Texto:", ""))
            }
        } if (actions.select) {
            handleActions.handleSelect = () => {
                actions.select!(response, id)
            }
        }
    }

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        return setResponse(target.value)
    }

    return (
        
        <div key={id} className="p-3 flex flex-col items-start gap-2 border border-orange rounded-lg shadow-md h-fit max-h-80 overflow-auto">
            {isSaved && <div className="text-green-500 m-[-12px]"><FaCheckCircle /></div>}
            {type === "Questão" && (
                <>
                    {!editStatus && (
                        <>
                            {response.split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </>
                    )}
                </>
            )}
            {type === "Texto" && (
                <>
                    {!editStatus && (
                        <>
                            <p className="font-bold">{response.split("Texto:")[0]}</p>
                            {response.split("Texto:")[1].split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </>
                    )}
                </>
            )}
            {type === "Frase" && (
                <>
                    {!editStatus && (
                        <>
                            {response.split("Frase:")[1].split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </>
                    )}
                </>
            )}
            {type === "Expressão matemática" && (
                <>
                    {!editStatus && (
                        <div className="grid grid-cols-2 grid-rows-2 gap-y-10 w-full">
                            {response.replaceAll("--","").split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </div>
                    )}
                </>
            )}
            {editStatus && (
                <>
                    <textarea key={`edit-${id}`} onChange={handleChange} value={response} className={`w-full ${type === "Texto" ? "min-h-[350px]" : "h-48"}`}></textarea> 
                </>
            )}
            <CardActions actions={handleActions} state={{ editStatus, setEditStatus }} />
        </div>
    )
}