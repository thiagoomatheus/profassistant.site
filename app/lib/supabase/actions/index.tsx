"use server"

import { User } from "../../types/types";
import { createSupabaseServerClient } from "../supabase";


export async function getUser() {

    const supabase = await createSupabaseServerClient()

    const result = (await supabase.auth.getSession()).data.session?.user

    if (!result) {
        return
    }

    const { data: profile, error} = await supabase
    .from('profile')
    .select('*')
    .eq("id", result.id)

    if (error || !profile) {
        console.log(error)
        return
    }

    return profile[0]

}

export async function signUpNewUser(user: User) {

    const supabase = await createSupabaseServerClient()

    const result = await supabase.auth.signUp({
        email: user.email,
        password: user.password
    })

    const { data, error } = await supabase
    .from('profile')
    .insert([
      {
        id: result.data.user?.id,
        name: user.name, 
        plan: user.plan
    },
    ])
    .select()
            
    if (error) {
        return console.log(error);
    }
    
    return data![0]   
}

export async function signInWithEmail(email: string, password: string) {

    const supabase = await createSupabaseServerClient()
      
    const result = await supabase.auth.signInWithPassword({email, password})

    let { data: profile, error } = await supabase
    .from('profile')
    .select('*')
    .eq("id", result.data.user?.id)
        
    if (error || !profile) {
        console.log(error)
        return
    }

    return profile[0]

}

export async function signOut() {

    const supabase = await createSupabaseServerClient()

    await supabase.auth.signOut()

}