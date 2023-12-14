import { auth, db } from "@/app/lib/firebase/firebase";
import { User } from "@/app/lib/types/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { doc, getDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {

    const credencialUser: User = await req.json()

    let statusCode: number = 0
    let userLogged: any = undefined

    await signInWithEmailAndPassword(auth, credencialUser.email, credencialUser.password)
    .then(result => {
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
    .catch(() => statusCode = 401);

    if (statusCode === 401) {
        return NextResponse.json({}, { status: 401})
    }
    
    const uid = auth.currentUser!.uid 
    await getDoc(doc(db, "users", uid))
    .then(response => {
        userLogged = response.data()
    })
    .catch(error => {
        console.log(error);
    })
    
    return NextResponse.json(userLogged, {status: statusCode})
}

export async function GET(req: NextRequest) {
    
    let statusCode = 0
    let userLogged:any = auth.currentUser

    const session = cookies().get("session")?.value || ""

    if (!userLogged || !session || userLogged?.uid !== session) {
        return NextResponse.json({}, { status: 401 })
    }
    await getDoc(doc(db, "users", session))
    .then(response => {
        userLogged = response.data()
        statusCode = 200
    })
    .catch(error => {
        statusCode = 401
    })

    return NextResponse.json({ user: userLogged }, { status: statusCode })
}