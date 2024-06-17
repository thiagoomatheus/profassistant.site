import { createClient } from "@/app/lib/supabase/server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const supabase = createClient()

    await supabase.auth.signOut()

    cookies().delete("my-access-token")
    cookies().delete("my-refresh-token")
    revalidateTag("user")
    
    return NextResponse.json({}, { status: 200 })
}