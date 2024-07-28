"use server"
import { createClient } from "@/app/lib/supabase/server"
import { User, UserDBComplete, UserDBSimple, UserSession } from "@/app/lib/types/types"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
export async function getUser() {
    const supabase = createClient()
    const session = (await supabase.auth.getSession()).data.session
    if (!session) {
        return
    }
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
    if (errorSignUp) {
        console.log(errorSignUp);
        return  {
            error: "Erro ao registrar usuário"
        }
    }
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
    if (errorProfile) {
        console.log(errorProfile);
        return {
            error: "Erro ao salvar usuário no banco de dados"
        }
    }
    const cookieStore = cookies()
    cookieStore.set("theme", "light", {
        maxAge: 60 * 60 * 24 * 30
    })
    return "success"
}
export async function loginUser(formData: FormData) {
    const { email, password } = {
        email: formData.get("email") as string,
        password: formData.get("password") as string
    }
    const supabase = createClient()
    const result = await supabase.auth.signInWithPassword({email, password})
    if (result.error) return {error: "Erro ao registrar usuário"}
    return "success"
}
export async function logoutUser() {
    const supabase = createClient()
    const result = await supabase.auth.signOut()
    if (result.error) return {error: "Erro ao sair da conta"}
    cookies().delete("my-access-token")
    cookies().delete("my-refresh-token")
    revalidateTag("user")
    return "success"
}