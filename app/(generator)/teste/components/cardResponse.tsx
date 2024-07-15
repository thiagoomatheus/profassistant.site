"use client"

import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import CardActions from "../../components/layout/cardActions"
import useGenerator from "../../lib/hooks/useGenerator"

export default function CardResponse ({ type, id, data, actions }: {
    type: string | undefined
    id: string
    data: string
    actions?: {
        save?: boolean,
        update?: boolean,
        delete?: boolean,
        copy?: boolean,
        select?: (data: string, id: string) => void
    }
}) {
    const { handleCopyToClipboard, handleSave, handleUpdate, handleDelete } = useGenerator()
    const [response, setResponse] = useState<string>(data)
    const [editStatus, setEditStatus] = useState<boolean>(false)
    const [isSaved, setIsSaved] = useState<boolean>(false)

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        return setResponse(target.value)
    }

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
                    await handleSave(response)
                    .then(() => {
                        setIsSaved(true)
                        setEditStatus(false)
                    })
                }
            }
        } if (actions.update) {
            handleActions.handleUpdate = async () => {
                await handleUpdate(response, id)
                .then(() => {
                    setIsSaved(true)
                    setEditStatus(false)
                })
            }
        } if (actions.delete) {
            handleActions.handeDelete = async () => {
                await handleDelete(id)
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

    return (
        <div key={id} className="p-3 flex flex-col items-start gap-2 border border-orange rounded-lg shadow-md h-fit max-h-80 overflow-auto">
            {isSaved && <div className="text-green-500 m-[-12px]"><FaCheckCircle /></div>}
            {!editStatus && (
                <>
                    {type === "question" && (
                        <>
                            {response.split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </>
                    )}
                    {type === "text" && (
                        <>
                            <p className="font-bold">{response.split("Texto:")[0]}</p>
                            {response.split("Texto:")[1].split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </>
                    )}
                    {type === "phrase" && (
                        <>
                            {response.split("Frase:")[1].split("\n").map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
                        </>
                    )}
                    {type === "math_expression" && (
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
            <div className="flex flex-row gap-5">
                <CardActions actions={handleActions} state={{ editStatus, setEditStatus }} />
            </div>
        </div>
    )
}