import { auth } from "@/app/lib/firebase";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    let statusCode: number = 0

    await signOut(auth)
    .then(() => {
        // Sign-out successful.
        const options = {
            name: "session",
            value: "",
            maxAge: -1,
          };
        cookies().set(options);
        statusCode = 200
    }).catch((error) => {
    // An error happened.
        statusCode = 401
    })

    return NextResponse.json({}, { status: statusCode})
}