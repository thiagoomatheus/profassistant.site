"use server"

import { createClient } from "@/app/lib/supabase/server"

export const postMessageForContact = async (data:FormData) => {

    const supabase = createClient()

    const session = (await supabase.auth.getSession()).data.session
    
    const result = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/contact`, {
        method: "POST",
        headers: {
          "apikey": process.env.SUPABASE_ANON_KEY!,
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          subject: data.get("subject"),
          message: data.get("message")
        })
      })

      if (result.status !== 201) {
        return "error"
      }
      return "success"

}