"use server"
import { createClient } from "@/app/lib/supabase/server"
import { UserDBComplete } from "@/app/lib/types/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
export async function updateProfile(column: string, newData: string) {
    const supabase = createClient()
    const data = `{"${column}": "${newData}"}`
    const session = await supabase.auth.getSession()
    await fetch(`https://tzohqwteaoakaifwffnm.supabase.co/rest/v1/profile?id=eq.${session.data.session?.user.id}`, {
        method: "PATCH",
        headers: {
            "apikey": process.env.SUPABASE_ANON_KEY!,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.data.session?.access_token}`,
        },
        body: (data)
    })
    .catch(error => {
        console.log(error)
        return "erro"
    })
    revalidateTag("user")
    return "ok"
}
async function removeCustomer(customer: string) {
    const result = await fetch(`https://sandbox.asaas.com/api/v3/customers/${customer}`, {
        method: "DELETE",
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwODIyMDk6OiRhYWNoXzliOGE2MDdlLTcwMTEtNGVjZi04ZGY2LTQyNzhmYjdhZjk2OQ=='
        }
    })
    return result.status
}
async function removeSubscription(subscription_id: string) {
    const result = await fetch(`https://sandbox.asaas.com/api/v3/subscriptions/${subscription_id}`, {
        method: "DELETE",
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwODIyMDk6OiRhYWNoXzliOGE2MDdlLTcwMTEtNGVjZi04ZGY2LTQyNzhmYjdhZjk2OQ=='
        }
    })
    return result.status
}
async function removePaymentLink(payment_link: string) {
    const result = await fetch(`https://sandbox.asaas.com/api/v3/paymentLinks/${payment_link}`, {
        method: "DELETE",
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwODIyMDk6OiRhYWNoXzliOGE2MDdlLTcwMTEtNGVjZi04ZGY2LTQyNzhmYjdhZjk2OQ=='
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
    const selectedPlan = formData.get("plan") as "free" | "basic" | "pro" | "premium"
    if (profile.subscription_id && profile.payment_link && profile.id_customer_asaas) {
        const removedCustomer = await removeCustomer(profile.id_customer_asaas)
        if (removedCustomer !== 200) return { error: "Erro ao cancelar assinatura"}
        const removedSubscription = await removeSubscription(profile.subscription_id)
        if (removedSubscription !== 200) return { error: "Erro ao cancelar assinatura"}
        const removedPaymentLink = await removePaymentLink(profile.payment_link)
        if (removedPaymentLink !== 200) return { error: "Erro ao cancelar assinatura"}
        const updatedSubscriptionId = await updateInDatabase(profile.id, session.data.session?.access_token!, { subscription_id: null })
        if (updatedSubscriptionId !== 204) return { error: "Impossível se comunicar com banco de dados neste momento" }
        const updatedPaymentLink = await updateInDatabase(profile.id, session.data.session?.access_token!, { payment_link: null })
        if (updatedPaymentLink !== 204) return { error: "Impossível se comunicar com banco de dados neste momento" }
        const updatedPlan = await updateInDatabase(profile.id, session.data.session?.access_token!, { plan: "free" })
        if (updatedPlan !== 204) return { error: "Impossível se comunicar com banco de dados neste momento" }
    }
    if (selectedPlan === "free") {
        revalidateTag("user")
        return { success: "Plano atualizado com sucesso" }
    }
    const resultCreatePaymentLink = await fetch(`https://sandbox.asaas.com/api/v3/paymentLinks`, {
        method: "POST",
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwODIyMDk6OiRhYWNoXzliOGE2MDdlLTcwMTEtNGVjZi04ZGY2LTQyNzhmYjdhZjk2OQ=='
        },
        body: JSON.stringify({
            billingType: 'CREDIT_CARD',
            chargeType: 'RECURRENT',
            name: `Plano ${selectedPlan}`,
            description: `Plano ${selectedPlan} - user_id:${profile.id}`,
            value: selectedPlan === "basic" ? 5.99 : selectedPlan === "pro" ? 29.99 : 49.99,
            subscriptionCycle: 'MONTHLY',
            notificationEnabled: false
          })
    })
    const data = await resultCreatePaymentLink.json()
    if (resultCreatePaymentLink.status !== 200) return {error: data.errors[0].description}
    const resultPostPaymentLink = await updateInDatabase(profile.id, session.data.session?.access_token!, { payment_link: data.id })
    if (resultPostPaymentLink !== 204) {
        return {error: "Impossível se comunicar com banco de dados neste momento"}
    }
    redirect(data.url)
}
export async function getBillings(subscription_id: string) {
    const result = await fetch(`https://sandbox.asaas.com/api/v3/subscriptions/${subscription_id}/payments?status=CONFIRMED`, {
        headers: {
            "accept": 'application/json',
            "content-type": "application/json",
            "access_token": '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwODIyMDk6OiRhYWNoXzliOGE2MDdlLTcwMTEtNGVjZi04ZGY2LTQyNzhmYjdhZjk2OQ=='
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