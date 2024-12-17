"use server"

import { createClient } from "@/app/lib/supabase/server";
import { GeneratedDB } from "@/app/lib/types/types";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

export async function generateData(prompt: string): Promise<{data: string, error?: undefined} | {data?: undefined, error: string}> {
  const supabase = createClient()
  const { user, access_token } = (await supabase.auth.getSession()).data.session!
  const data = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?select=limit_ia,ia&id=eq.${user.id}`, {
    headers: {
      "apikey": process.env.SUPABASE_ANON_KEY!,
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`,
    }
  }).then(async (result) => await result.json())
  if (data[0].limit_ia < data[0].ia) return {error: "Limite de IA atingido"}
  const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY!}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      contents: [{parts: [{text: prompt}]}],
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    })
  })
  const response = await result.json()
  if (response.error) return {error: response.error}
  await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?id=eq.${user.id}`, {
    method: "PATCH",
    headers: {
      "apikey": process.env.SUPABASE_ANON_KEY!,
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ia: data[0].ia + 1
    })
  })
  return {data: response.candidates[0].content.parts[0].text}
}

export async function postGenerated(response: string, type: "question" | "text" | "quote" | "math_expression", subject: string | null) {
  const supabase = createClient()
  let status: number = 0
  const accessToken = (await supabase.auth.getSession()).data.session?.access_token
  await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/generated?columns=type,data,subject`, {
    method: "POST",
    headers: {
      "apikey": process.env.SUPABASE_ANON_KEY!,
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      type: type,
      data: response,
      subject: subject
    })
  })
  .then(response => {
    status = response.status
  })
  .catch(error => {
    console.log(error);
  })
  return status
}

export async function getGenerated(filter?: string) {
  const supabase = createClient()
  let data: GeneratedDB[] = []
  const session = (await supabase.auth.getSession()).data.session
  await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/generated?select=id,type,data,subject&user_id=eq.${session?.user.id}${filter ? `&${filter}` : ""}`, {
    headers: {
      "apikey": process.env.SUPABASE_ANON_KEY!,
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.access_token}`,
    },
    next: {
      tags: ["generateds"]
    }
  }).then(result => {
    return result.json()
  })
  .then(response => {
    if (response.length) {
      response?.map((generated: GeneratedDB) => {
        data.push(generated)
      })
    }
  })
  return data
}

export async function updateGenerated(data: string, id: string) {
  const supabase = createClient()
  let status: number = 0
  const accessToken = (await supabase.auth.getSession()).data.session?.access_token
  await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/generated?id=eq.${id}`, {
  method: "PATCH",
  headers: {
    "apikey": process.env.SUPABASE_ANON_KEY!,
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
  },
  body: JSON.stringify({
    data: data
  })
  })
  .then(response => {
    status = response.status
  })
  .catch(error => {
    console.log(error)
  })
  return status
}

export async function deleteGenerated(id:string) {
  const supabase = createClient()
  let status: number = 0
  const accessToken = (await supabase.auth.getSession()).data.session?.access_token
  await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/generated?id=eq.${id}`, {
    method:"DELETE",
    headers: {
      "apikey": process.env.SUPABASE_ANON_KEY!,
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  .then(response => {
    status = response.status
  })
  .catch(error => {
    console.log(error);
  })
  revalidatePath("generateds")
  return status
}