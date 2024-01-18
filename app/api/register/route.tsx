import { User } from "@/app/lib/types/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/app/lib/supabase/supabase";

export async function POST(req:NextRequest) {

    const { email, password, plan, name }: User = await req.json()

    if (!email && !password) {
        return NextResponse.json({}, {status: 401})
    }

    const supabase = await createSupabaseServerClient()

    const result = await supabase.auth.signUp({
        email: email,
        password: password
    })

    if (!result.data.session) {
        return NextResponse.json({}, {status: 401})
    }

    const { data: profile, error } = await supabase
    .from('profile')
    .insert([
      {
        id: result.data.user?.id,
        name: name, 
        plan: plan
    },
    ])
    .select()
            
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