import { auth, db } from "@/app/lib/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    let statusCode: number = 0

    const body: {
        ref: string,
        data: {
            id: string,
            subject: string,
            question: string
        }
    } = await req.json()

    await setDoc(doc(db, body.ref), body.data)
    .then(() => 
        statusCode = 200
    )
    .catch((error) => {
        statusCode = 401
        console.log(error);
    })

    return NextResponse.json({}, { status: statusCode })
}