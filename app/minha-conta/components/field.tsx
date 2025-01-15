"use client"
import Button from "@/app/components/layout/button"
import Modal from "@/app/components/layout/modal"
import { useState } from "react"
import useProfile from "../@account/lib/useProfile"
export default function Field( { field, data, column }: {
    field: string
    data?: string
    column: string
} ) {
    
    const [value, setValue] = useState<string | undefined>(data)
    const [modal, setModal] = useState<boolean>(false)
    const { handleChange, handleSave, handleSaveTheme } = useProfile(setValue, () => {
        setModal(false)
    })
    return (
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-3">
            {modal && data && (
                <Modal key="update" close={() => {
                    setModal(false)
                    setValue(data)
                }}>
                    <h3>Alterar {field.toLowerCase()}</h3>
                    <p>{field} atual: {data}</p>
                    <p>Alterar para:</p>
                    {column !== "theme" && (
                        <>
                            <input id="newValue" type="text" onChange={handleChange} />
                            <Button text="Salvar" handleClick={async () => await handleSave(column, data)} />
                        </>
                    )}
                    {column === "theme" && (
                        <>
                            <select name="theme" id="newValue" onChange={handleChange} defaultValue={value}>
                                <option {...value === "light" ? {disabled: true} : ""} value="light">Light</option>
                                <option {...value === "dark" ? {disabled: true} : ""} value="dark">Dark</option>
                            </select>
                            <Button text="Salvar" handleClick={async () => await handleSaveTheme(data)} />
                        </>
                    )}
                </Modal>
            )}
            {modal && !value && (
                <Modal close={() => {
                    setModal(false)
                    setValue(data)
                }} >
                    <h3>Adicionar {field}</h3>
                    <input id="newValue" type="text" onChange={handleChange} />
                    <Button text="Salvar" handleClick={async () => await handleSave(column)} />
                </Modal>
            )}
            {value && (
                <>
                    <p>{field}: <span id="name">{value}</span></p>
                    {column !== "user_email" && <Button text="Alterar" handleClick={() => {setModal(true)}}/>}
                </>
            )}
            {!value && (
                <>
                    <p>{field}: <span id="name">Você ainda não adicionou nenhum {field.toLowerCase()}</span></p>
                    {column !== "user_email" && <Button text="Adicionar" handleClick={() => {setModal(true)}} />}
                </>
            )}
        </div>
    )
}