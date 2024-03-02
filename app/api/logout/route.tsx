import { createClient } from "@/app/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {

    const supabase = createClient()

    await supabase.auth.signOut()

    cookies().delete("my-access-token")
    cookies().delete("my-refresh-token")

    return NextResponse.json({}, { status: 200})
}