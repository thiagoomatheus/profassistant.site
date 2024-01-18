import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/app/lib/supabase/supabase";
import { User } from "@/app/lib/types/types";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {

    const { email, password }: User = await req.json()

    const supabase = await createSupabaseServerClient()
      
    const result = await supabase.auth.signInWithPassword({email, password})

    if (!result.data.session) {
        return NextResponse.json({}, {status: 401})
    }

    let { data: profile, error } = await supabase
    .from('profile')
    .select('*')
    .eq("id", result.data.user?.id)
        
    if (error || !profile) {
        console.log(error)
        return NextResponse.json({}, {status: 401})
    }

    const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
    const access_token = {
        name: "my-access-token",
        value: result.data.session.access_token,
        maxAge: maxAge,
        secure: true,
    }
    const refresh_token = {
        name: "my-refresh-token",
        value: result.data.session.refresh_token,
        maxAge: maxAge,
        secure: true,
    }
    cookies().set(access_token)
    cookies().set(refresh_token)
    
    return NextResponse.json(profile[0], {status: 200})
}

export async function GET(req: NextRequest) {

    const accessToken = cookies().get("my-access-token")?.value || ""
    const refreshToken = cookies().get("my-refresh-token")?.value || ""

    if (!accessToken || !refreshToken) {
        return NextResponse.json({}, { status: 401})
    }

    const supabase = await createSupabaseServerClient()

    const session = await supabase.auth.setSession({
        refresh_token: refreshToken,
        access_token: accessToken
    })

    if (session.error || !session.data.user) {
        console.log(session.error)
        return NextResponse.json({}, { status: 401})
    }

    const user = await supabase
    .from('profile')
    .select('*')
    .eq("id", session.data.user.id)

    if (user.error || !user.data) {
        console.log(user.error)
        return NextResponse.json({}, { status: 401 })
    }
    
    return NextResponse.json(user.data[0], { status: 200 })
}