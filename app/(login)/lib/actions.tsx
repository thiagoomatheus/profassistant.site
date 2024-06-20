"use server"
import { createClient } from "@/app/lib/supabase/server"
import { User, UserDBSimple, UserSession } from "@/app/lib/types/types"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
export async function getUser() {
    const cookieStore = cookies().get("sb-tzohqwteaoakaifwffnm-auth-token")?.value
    if (!cookieStore) {
        return
    }
    const auth: UserSession = JSON.parse(cookieStore!)
    const data: UserDBSimple = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?select=id,name,plan,theme&id=eq.${auth.user.id}`, {
        headers: {
            "apikey": process.env.SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.access_token}`,
        },
        cache: "force-cache",
        next: {
            tags: ["user"]
        }
        }).then(result=> {
            return result.json()
        })
        .then(response => {
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
    const createClientInAsaas = await fetch("https://sandbox.asaas.com/api/v3/customers", {
        method: "POST",
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwODIyMDk6OiRhYWNoXzliOGE2MDdlLTcwMTEtNGVjZi04ZGY2LTQyNzhmYjdhZjk2OQ=='
        },
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            mobilePhone: user.phone,
            cpfCnpj: user.cpf
        })
    })
    if (createClientInAsaas.status !== 200) {
        console.log((await createClientInAsaas.json()).errors);
        return {
            error: "Erro ao registrar usuário"
        }
    }
    const customer_id = (await createClientInAsaas.json()).id
    const { error: errorProfile } = await supabase
    .from('profile')
    .insert([
        {
            id: dataSignUp.user?.id,
            name: user.name, 
            plan: user.plan,
            phone: user.phone,
            cpf: user.cpf,
            theme: "light",
            id_customer_asaas: customer_id
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
    if (result.error) {
        return {
            error: "Erro ao registrar usuário"
        }
    }
    return "success"
}
export async function logoutUser() {
    const supabase = createClient()
    const result = await supabase.auth.signOut()
    if (result.error) {
        return {
            error: "Erro ao sair da conta"
        }
    }
    cookies().delete("my-access-token")
    cookies().delete("my-refresh-token")
    revalidateTag("user")
    return "success"
}