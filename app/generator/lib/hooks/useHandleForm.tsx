"use client"

import { useState } from "react";

export default function useHandleForm () {

    const [info, setInfo] = useState({
        ano: "",
        assunto: "",
        idade: "",
        materia: "",
        quantidade: ""
    })

    function handleChange(e:React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setInfo({
            ...info,
            [target.name]: target.value
        })
    }

    return {
        info,
        handleChange
    }
}