"use server"

import { cookies } from "next/headers";

export async function verifyShowPopUpCookies() {
    const cookieStore = cookies().get("showPopUp")?.value || "true"

    const showPopUp = cookieStore === "true" ? true : false

    if (!showPopUp) return false
    return true
}

export async function setFalseShowPopUpCookies() {
    cookies().set("showPopUp", "false", {maxAge: 60 * 60 * 24 * 90})
}