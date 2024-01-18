import { createSupabaseServerClient } from "@/app/lib/supabase/supabase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {

    const supabase = await createSupabaseServerClient()

    await supabase.auth.signOut()

    cookies().delete("my-access-token")
    cookies().delete("my-refresh-token")

    return NextResponse.json({}, { status: 200})
}