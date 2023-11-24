import { auth, provider } from "@/app/lib/firebase";
import { User } from "@/app/lib/types/types";
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {

    const credencialUser: User = await req.json()

    let statusCode: number = 0
    let messageReturn: string = ""

    if (!credencialUser) {
        await signInWithPopup(auth, provider)
        .then((result) => {
            // Signed in
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const options = {
                name: "session",
                value: result.user.uid,
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
              };
            cookies().set(options)
            statusCode = 200
        }).catch((error) => {
            statusCode = 401
            messageReturn = error.message
        });
    }

    if (credencialUser.email && credencialUser.password) {
        await signInWithEmailAndPassword(auth, credencialUser.email, credencialUser.password)
        .then((result) => {
            // Signed in
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const options = {
                name: "session",
                value: result.user.uid,
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
            };
            cookies().set(options)
            statusCode = 200
        })
        .catch((error) => {
            statusCode = 401
            messageReturn = error.message
        });
    }
    
    return NextResponse.json((messageReturn ? messageReturn : {}), {status: statusCode})
}

export async function GET(req: NextRequest) {
    
    let isLogged: boolean = false
    let statusCode = 0

    const session = cookies().get("session")?.value || ""

    await onAuthStateChanged(auth, (user) => {
        if (user && session) {
            isLogged = true
            statusCode = 200
        } else {
            console.log(user);
            statusCode = 401
        }
      });

      return NextResponse.json({ isLogged: isLogged }, { status: statusCode })
}