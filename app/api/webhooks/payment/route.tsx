import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    const token = req.headers.get("asaas-access-token")
    if (!token) return NextResponse.json({ received: false }, { status: 200 });
    if (token !== process.env.ASAAS_ACCESS_TOKEN) return NextResponse.json({ received: false }, { status: 200 });
    const body = await req.json();
    if (!body) return NextResponse.json({ received: false }, { status: 200 });
    const { customer, description, subscription, value } = body.payment;
    const plan = value === 5.99 ? "basic" : value === 29.99 ? "pro" : "premium"
    const id = description.split(":")[1]
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
    switch (body.event) {
        case 'PAYMENT_CREATED':
            console.log("pagamento criado")
            break
        case 'PAYMENT_CONFIRMED':
            const { data } = await supabase.from("profile").select("customer_id_asaas,subscription_id,plan").eq("id", id)
            if (!data) return NextResponse.json({ received: false }, { status: 200 })
            if (data[0].customer_id_asaas !== customer) await supabase.from("profile").update({ customer_id_asaas: customer }).eq("id", id)
            if (data[0].subscription_id !== subscription) await supabase.from("profile").update({ subscription_id: subscription }).eq("id", id)
            if (data[0].plan !== plan) await supabase.from("profile").update({ plan: plan }).eq("id", id)
            break
        case "PAYMENT_OVERDUE":
            await supabase.from("profile").update({ plan: "free" }).eq("id", id)
            break
        case "PAYMENT_REFUNDED":
            await supabase.from("profile").update({ plan: "free" }).eq("id", id)
            break
        default:
            console.log(`Este evento não é aceito ${body.event}`);
    }
    return NextResponse.json({ received: true }, { status: 200 });
}