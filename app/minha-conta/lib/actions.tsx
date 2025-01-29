"use server"
import { plans } from "@/app/(plans)/plans"
import { createClient } from "@/app/lib/supabase/server"
import { UserDBComplete } from "@/app/lib/types/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
export async function updateProfile(column: string, newData: string) {
    const supabase = createClient()
    const data = `{"${column}": "${newData}"}`
    const session = await supabase.auth.getSession()
    const result = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?id=eq.${session.data.session?.user.id}`, {
        method: "PATCH",
        headers: {
            "apikey": process.env.SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.data.session?.access_token}`,
        },
        body: (data)
    })
    if (result.status !== 204) return {error: (await result.json()).error.messsage}
    revalidateTag("user")
    return "success"
}
async function removeCustomer(customer: string) {
    const result = await fetch(`${process.env.ASAAS_URL!}/customers/${customer}`, {
        method: "DELETE",
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": process.env.ASAAS_API_KEY!
        }
    })
    return result.status
}
async function removeSubscription(subscription_id: string) {
    const result = await fetch(`${process.env.ASAAS_URL!}/subscriptions/${subscription_id}`, {
        method: "DELETE",
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": process.env.ASAAS_API_KEY!
        }
    })
    return result.status
}
async function removePaymentLink(payment_link: string) {
    const result = await fetch(`${process.env.ASAAS_URL!}/paymentLinks/${payment_link}`, {
        method: "DELETE",
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": process.env.ASAAS_API_KEY!
        }
    })
    return result.status
}
async function updateInDatabase(user_id: string, access_token: string, data: { [key: string]: string | null }) {
    const result = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?id=eq.${user_id}`, {
        method: "PATCH",
        headers: {
            "apikey": process.env.SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify(data)
    })
    return result.status
}
export async function subscribePlan(profile: UserDBComplete, formData: FormData) {
    const supabase = createClient()
    const session = await supabase.auth.getSession()
    const selectedPlan = formData.get("plan") as "gratis" | "basico" | "pro" | "premium"
    if (profile.subscription_id && profile.payment_link && profile.id_customer_asaas) {
        const removedCustomer = await removeCustomer(profile.id_customer_asaas)
        if (removedCustomer !== 200) return { error: "Erro ao cancelar assinatura"}
        const removedSubscription = await removeSubscription(profile.subscription_id)
        if (removedSubscription !== 200) return { error: "Erro ao cancelar assinatura"}
        const removedPaymentLink = await removePaymentLink(profile.payment_link)
        if (removedPaymentLink !== 200) return { error: "Erro ao cancelar assinatura"}
        const result = await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?id=eq.${profile.id}`, {
            method: "PUT",
            headers: {
                "apikey": process.env.SUPABASE_ANON_KEY!,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.data.session?.access_token}`,
            },
            body: JSON.stringify({
                ...profile,
                plan: "gratis",
                subscription_id: null,
                payment_link: null,
                limit_generateds: 10,
                limit_exams: 5,
                limit_ia: 0
            })
        })
        if (result.status !== 204) return { error: "Impossível se comunicar com banco de dados neste momento" }
    }
    if (selectedPlan === "gratis") {
        revalidateTag("user")
        return { success: "Plano atualizado com sucesso" }
    }
    const resultCreatePaymentLink = await fetch(`${process.env.ASAAS_URL!}/paymentLinks`, {
        method: "POST",
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": process.env.ASAAS_API_KEY!
        },
        body: JSON.stringify({
            billingType: 'CREDIT_CARD',
            chargeType: 'RECURRENT',
            name: `Plano ${selectedPlan}`,
            description: `Plano ${selectedPlan} - user_id:${profile.id}`,
            value: plans.filter(plan => plan.value === selectedPlan)[0].price,
            subscriptionCycle: 'MONTHLY',
            notificationEnabled: false
          })
    })
    const data = await resultCreatePaymentLink.json()
    console.log(data)
    if (resultCreatePaymentLink.status !== 200) return {error: data.errors[0].description}
    const resultPostPaymentLink = await updateInDatabase(profile.id, session.data.session?.access_token!, { payment_link: data.id })
    if (resultPostPaymentLink !== 204) return {error: "Impossível se comunicar com banco de dados neste momento"}
    redirect(data.url)
}
export async function getBillings(subscription_id: string) {
    const result = await fetch(`${process.env.ASAAS_URL!}/subscriptions/${subscription_id}/payments?status=CONFIRMED`, {
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": process.env.ASAAS_API_KEY!
        }
    })
    const response = await result.json()
    const data: {
        id: string
        value: number
        description: string
        billingType: string
        confirmedDate: string
        creditCardNumber: string
        creditCardBrand: string
        invoiceUrl: string
    }[] = []
    const totalPaymentsInList = response.totalCount
    for (let i = totalPaymentsInList-1; i >= totalPaymentsInList-3 || i < 0; i--) {
        if (i >= 0) 
            data.push({
                id: response.data[i].id,
                value: response.data[i].value,
                description: response.data[i].description,
                billingType: response.data[i].billingType,
                confirmedDate: response.data[i].confirmedDate,
                creditCardNumber: response.data[i].creditCard.creditCardNumber,
                creditCardBrand: response.data[i].creditCard.creditCardBrand,
                invoiceUrl: response.data[i].invoiceUrl
            })
    }
    return data
}