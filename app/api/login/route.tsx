import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/lib/types/types";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: NextRequest) {

    const { email, password }: User = await req.json()

    const supabase = createClient()
      
    const result = await supabase.auth.signInWithPassword({email, password})

    if (result.error) {
        return NextResponse.json({}, {status: 401})
    }
    
    return NextResponse.json({}, {status: 200})
}