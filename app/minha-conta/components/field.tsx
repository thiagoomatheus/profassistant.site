"use client"

import Button from "@/app/components/layout/button"
import Modal from "@/app/components/layout/modal"
import { useState } from "react"
import useAccount from "../lib/useAccount"
import { createClient } from "@/app/lib/supabase/client"
import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification"

export default function Field( { field, data, column }: {
    field: string
    data?: string
    column: string
} ) {

    const [value, setValue] = useState<string | undefined>(data)

    const [modal, setModal] = useState<boolean>(false)

    const { updateProfile } = useAccount(createClient())
    const { generateNotification } = useNotification()

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setValue(target.value)
    }

    return (
        <div className="flex flex-col md:flex-row md:justify-start items-center gap-3">
            {modal && data && (
                <Modal key="update" close={() => {
                    setModal(false)
                    setValue(data)
                }}>
                    <>
                        <h3>Alterar {field.toLowerCase()}</h3>
                        <p>{field} atual: {data}</p>
                        <p>Alterar para:</p>
                        <input id="newValue" type="text" onChange={handleChange} />
                        <Button text="Salvar" handleClick={() => {
                            updateProfile(column, value!)
                            .then(result => {
                                if (result === "ok") {
                                    generateNotification(NotificationTypes.UpdateProfileSuccess, "success")
                                    return setModal(false)
                                }
                                return generateNotification(NotificationTypes.UpdateProfileFailed, "error")
                            })
                        }} />
                    </>
                </Modal>
            )}
            {modal && !value && (
                <Modal key="add" close={() => setModal(false)} >
                    <>
                        <h3>Adicionar {field.toLowerCase()}</h3>
                        <input id="newValue" type="text" onChange={handleChange} />
                        <Button text="Salvar" handleClick={() => {
                            updateProfile(column, value!)
                            .then(result => {
                                if (result === "ok") {
                                    generateNotification(NotificationTypes.UpdateProfileSuccess, "success")
                                    return setModal(false)
                                }
                                return generateNotification(NotificationTypes.UpdateProfileFailed, "error")
                            })
                        }} />
                    </>
                </Modal>
            )}
            {value && (
                <>
                    <p>{field}: <span id="name">{value}</span></p>
                    <Button text="Alterar" handleClick={() => {
                        setModal(true)
                    }}></Button>    
                </>
            )}
        </div>
    )
}