import { auth, db } from "@/app/lib/firebase/firebase";
import { User, UserDB } from "@/app/lib/types/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request:NextRequest) {
    const credencialUser: User = await request.json()

    let statusCode: number = 0
    let messageReturn: string = ""

    if (!credencialUser.email && !credencialUser.password) {
        statusCode = 401
        messageReturn = "Confira os dados e tente novamente"
        return NextResponse.json((messageReturn ? messageReturn : {}), {status: statusCode})
    }

    await createUserWithEmailAndPassword(auth, credencialUser.email, credencialUser.password)
    .then(async (result) => {
        // Signed in 
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const options = {
            name: "session",
            value: result.user.uid,
            maxAge: expiresIn,
            httpOnly: true,
            secure: true,
        };
        const user: UserDB = {
            name: credencialUser.name,
            email: credencialUser.email,
            plan: credencialUser.plan,
            id: result.user.uid
        }
        await setDoc(doc(db, "users", auth.currentUser!.uid), user)
        .then(() => {
            cookies().set(options)
            statusCode = 200
        })
        .catch((error) => {
            statusCode = 401
            messageReturn = error.message
        }
        )
    })
    .catch((error) => {
        statusCode = 401
        messageReturn = error.message
    })

    return NextResponse.json((messageReturn ? messageReturn : {}), {status: statusCode})
}