import { auth, provider } from "@/app/lib/firebase";
import { User } from "@/app/lib/types/types";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {

    const credencialUser: User = await req.json()

    let statusCode: number = 0

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
            statusCode = error.code
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
            statusCode = error.code
        });
    }
    
    return NextResponse.json({}, {status: statusCode})

}