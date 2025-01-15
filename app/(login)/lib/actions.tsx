"use server"
import { createClient } from "@/app/lib/supabase/server"
import { User, UserDBComplete } from "@/app/lib/types/types"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
export async function getUser() {
    const supabase = createClient()
    const session = (await supabase.auth.getSession()).data.session
    if (!session) return
    const data: UserDBComplete = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?id=eq.${session.user.id}`, {
        headers: {
            "apikey": process.env.SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
        },
        next: {tags: ["user"], revalidate: 1}
        }).then(result=> result.json())
        .then(response => {
            const theme = cookies().get("theme")?.value
            if (!theme || theme !== response[0].theme) cookies().set("theme", response[0].theme)
            return response[0]
        })   
    return data
}
export async function registerUser(user: User) {
    const supabase = createClient()
    const { data: dataSignUp, error: errorSignUp } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        phone: user.phone
    })
    if (errorSignUp) return {error: errorSignUp.message}
    const { error: errorProfile } = await supabase
    .from('profile')
    .insert([
        {
            id: dataSignUp.user?.id,
            name: user.name, 
            plan: user.plan,
            phone: user.phone,
            theme: "light",
        }
    ])
    
    console.log(`Política de Privacidade: Declaro que aceito o uso de cookies especificados na Política de Privacidade, bem como os outros termos especificados nela | UserId: ${dataSignUp.user?.id} | Email: ${user.email} | Data: ${dataSignUp.user?.created_at}`);
    
    if (errorProfile) return {error: errorProfile.message}
    const cookieStore = cookies()
    cookieStore.set("theme", "light", {maxAge: 60 * 60 * 24 * 30})
    return "success"
}
export async function loginUser(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()
    const result = await supabase.auth.signInWithPassword({email, password})
    if (result.error) return {error: result.error.message}
    return "success"
}
export async function logoutUser() {
    const supabase = createClient()
    const result = await supabase.auth.signOut()
    if (result.error) return {error: result.error.message}
    cookies().delete("my-access-token")
    cookies().delete("my-refresh-token")
    revalidateTag("user")
    return "success"
}