import { NextRequest, NextResponse } from "next/server";
import { User, UserDBSimple, UserSession } from "@/app/lib/types/types";
import { cookies } from "next/headers";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(req: NextRequest) {

    const { email, password }: User = await req.json()

    const supabase = createClient()
      
    const result = await supabase.auth.signInWithPassword({email, password})

    if (!result.data.session) {
        return NextResponse.json({}, {status: 401})
    }

    let data: UserDBSimple = {
        id: "",
        name: "",
        plan: "free"
    }

    await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?select=id,name,plan&id=eq.${result.data.user.id}`, {
    headers: {
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${result.data.session.access_token}`,
    }
    }).then(result=> {
        return result.json()
    })
    .then(response => {
        data = response[0]
    })
    .catch(error => {
        console.log(error);
        return NextResponse.json({}, { status: 401 })
    })
    
    return NextResponse.json(data, {status: 200})
}

export async function GET() {

    function getCookies() {
        const cookieStore = cookies().get("sb-tzohqwteaoakaifwffnm-auth-token")?.value
        const auth: UserSession = JSON.parse(cookieStore!)
        return auth
    }

    const auth = getCookies()    
    
    if (!auth.access_token || !auth.refresh_token) {
        return NextResponse.json({}, { status: 401})
    }

    let data: UserDBSimple = {
        id: "",
        name: "",
        plan: "free"
    }

    const supabase = createClient()
    
    const session = await supabase.auth.refreshSession({refresh_token: auth.refresh_token})
    
    await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?select=id,name,plan&id=eq.${session.data.user?.id}`, {
    headers: {
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.data.session?.access_token}`,
    }
    }).then(result=> {
        return result.json()
    })
    .then(response => {
        data = response[0]
    })
    .catch(error => {
        console.log(error);
        return NextResponse.json({}, { status: 401 })
    })
    
    return NextResponse.json(data, { status: 200 })
}