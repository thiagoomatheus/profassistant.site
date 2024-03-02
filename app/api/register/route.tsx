import { createClient } from "@/app/lib/supabase/server";
import { User } from "@/app/lib/types/types";
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
    
    return NextResponse.json(profile[0], {status: 200})
}