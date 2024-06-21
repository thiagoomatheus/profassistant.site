"use client"

import Button from "@/app/components/layout/button"
import Modal from "@/app/components/layout/modal"
import { useState } from "react"
import { setTheme } from "@/app/lib/theme/action"
import { updateProfile } from "../lib/actions"
import toast from "react-hot-toast"

export default function Field( { field, data, column }: {
    field: string
    data?: string
    column: string
} ) {

    const [value, setValue] = useState<string | undefined>(data)

    const [modal, setModal] = useState<boolean>(false)

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setValue(target.value)
    }

    return (
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-3">
            {modal && data && (
                <Modal key="update" close={() => {
                    setModal(false)
                    setValue(data)
                }}>
                    <>
                        <h3>Alterar {field.toLowerCase()}</h3>
                        <p>{field} atual: {data}</p>
                        <p>Alterar para:</p>
                        {column !== "theme" && (
                            <>
                                <input id="newValue" type="text" onChange={handleChange} />
                                <Button text="Salvar" handleClick={() => {
                                    updateProfile(column, value!)
                                    .then(result => {
                                        if (result === "ok") {
                                            toast.success("Perfil atualizado com sucesso!")
                                            return setModal(false)
                                        }
                                        return toast.error("Falha ao atualizar perfil. Tente mais tarde!")
                                    })
                                }} />
                            </>
                        )}
                        {column === "theme" && (
                            <>
                                <select id="newValue" onChange={handleChange} defaultValue={value}>
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                                <Button text="Salvar" handleClick={() => {
                                    setTheme(value!)
                                    .then(result => {
                                        if (result === "ok") {
                                            const html = document.querySelector("html")
                                            if (value === "dark") {
                                                html!.classList.add("dark")
                                            }
                                            if (value === "light") {
                                                html!.classList.remove("dark")
                                            }
                                            toast.success("Perfil atualizado com sucesso!")
                                            return setModal(false)
                                        }
                                        return toast.error("Falha ao atualizar perfil. Tente mais tarde!")
                                    })
                                }} />
                            </>
                        )}
                        
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
                                    toast.success("Perfil atualizado com sucesso!")
                                    return setModal(false)
                                }
                                return toast.error("Falha ao atualizar perfil. Tente mais tarde!")
                            })
                        }} />
                    </>
                </Modal>
            )}
            {value && (
                <>
                    <p>{field}: <span id="name">{value}</span></p>
                    {column !== "user_email" && (
                        <Button text="Alterar" handleClick={() => {
                            setModal(true)
                        }}></Button>
                    )}
                </>
            )}
            {!value && (
                <>
                    <p>{field}: <span id="name">Você ainda não adicionou nenhum {field.toLowerCase()}</span></p>
                    {column !== "user_email" && (
                        <Button text="Adicionar" handleClick={() => {
                            setModal(true)
                        }}></Button>
                    )}
                </>
            )}
        </div>
    )
}