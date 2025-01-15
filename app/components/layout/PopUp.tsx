"use client"

import { setFalseShowPopUpCookies, verifyShowPopUpCookies } from "@/app/(main)/lib/action";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function PopUp() {

    useEffect(() => {
        verifyShowPopUpCookies()
        .then((res) => {

            if (!res) return

            return toast.custom((t) => (
                <div
                    className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-xs md:text-sm font-medium text-gray-900">
                                    Ao navegar neste site, você concorda com os cookies que usamos e com os termos de nossa <Link className="text-xs md:text-sm underline underline-offset-4" href="/politica-de-privacidade" >Política de Privacidade</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={async () => {
                                await setFalseShowPopUpCookies()
                                toast.dismiss(t.id)
                            }}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-orange-2 hover:text-orange-2/70 focus:outline-none focus:ring-2 focus:ring-orange-2"
                        >
                            Entendi
                        </button>
                    </div>
                </div>
            ), {
                id: "lgpd",
                duration: 1000000000,
            })
        })
    }, [])

    return (
        <></>
    )
}