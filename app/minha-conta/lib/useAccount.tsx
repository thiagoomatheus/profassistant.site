
import { UserDBComplete } from "@/app/lib/types/types"
import { SupabaseClient } from "@supabase/supabase-js"

export default function useAccount( supabase: SupabaseClient<any, "public", any> ) {

    async function getProfile() {

        let data: UserDBComplete = {
            id: "",
            name: "",
            plan: "free",
            created_at: "",
            school_name: "",
            theme: "",
            email: ""
        }

        const session = await supabase.auth.getSession()
        
        await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?id=eq.${session.data.session?.user.id}`, {
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
        })
        return data
    }

    async function updateProfile(column: string, newData: string) {

        const data = `{"${column}": "${newData}"}`

        const session = await supabase.auth.getSession()

        await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?id=eq.${session.data.session?.user.id}`, {
            method: "PATCH",
            headers: {
                "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.data.session?.access_token}`,
            },
            body: (data)
        })
        .catch(error => {
            console.log(error)
            return "erro"
        })
        return "ok"
    }

    return {
        getProfile,
        updateProfile
    }
}