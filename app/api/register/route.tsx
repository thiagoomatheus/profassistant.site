import { createClient } from "@/app/lib/supabase/server";
import { User } from "@/app/lib/types/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

    const { email, password, plan, name }: User = await req.json()

    if (!email && !password) {
        return NextResponse.json({}, {status: 401})
    }

    const supabase = createClient()

    const result = await supabase.auth.signUp({
        email: email,
        password: password
    })

    if (result.error) {
        return NextResponse.json({}, {status: 401})
    }

    const { error } = await supabase
    .from('profile')
    .insert([
        {
            id: result.data.user?.id,
            name: name, 
            plan: plan,
            theme: "light"
        }
    ])
            
    if (error) {
        console.log(error)
        return NextResponse.json({}, {status: 401})
    }

    const cookieStore = cookies()

    cookieStore.set("theme", "light", {
        maxAge: 60 * 60 * 24 * 30
    })
    
    return NextResponse.json({}, {status: 200})
}