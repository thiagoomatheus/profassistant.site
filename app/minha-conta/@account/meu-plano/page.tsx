import Button from "@/app/components/layout/button"
import { getBillings, subscribePlan } from "../../lib/actions"
import ModalRefactor from "@/app/components/layout/modalRefactor"
import { UserDBComplete } from "@/app/lib/types/types"
import { getUser } from "@/app/(login)/lib/actions"
import { plans } from "@/app/(plans)/plans"
import CardPrice from "@/app/components/layout/cardPrice"
function ModalSelectPlan({profile}: {profile: UserDBComplete}) {
    const subscribePlanWithProfile = subscribePlan.bind(null, profile)
    return (
        <ModalRefactor>
            <h3 className="self-center">Escolher plano</h3>
            <form className="flex flex-col justify-center items-center gap-3" action={subscribePlanWithProfile}>
                <div className="flex justify-center flex-col xl:grid xl:grid-cols-2 gap-5">
                    {plans.map(plan => (
                        <label className="rounded-xl bg-none" key={`card_${plan.id}`}>
                            <CardPrice plan={plan} title={plan.name} price={plan.price}>
                                <input className="w-3 h-3 appearance-none" type="radio" name="plan" value={plan.value} {...profile.plan === plan.value ? {defaultChecked: true, disabled: true} : ""} />
                            </CardPrice>
                        </label>
                        )
                    )}
                </div>
                <p className="text-xs lg:text-sm">ATENÇÃO: Não processamos o pagamento em nosso sistema. Assim, ao clicar no botão abaixo você será redirecionado para o ambiente do provedor de pagamento para que possa finalizar sua transação.</p>
                <Button type="submit" text="Ir para o pagamento" />
            </form>
        </ModalRefactor>
    )
}
export default async function Page({searchParams}: {
    searchParams: { [key: string]: string | undefined }
}) {
    const modalOpen: boolean = searchParams.modal === "true"
    const profile = await getUser()
    if (!profile) return <p>Algum erro aconteceu. Se conecte e tente novamente!</p>
    if (profile.plan === "free" || !profile.subscription_id) {
        return (
            <>
                <h2>Meu plano</h2>
                <p>Plano atual: {profile.plan.toUpperCase()}</p>
                {modalOpen && (<ModalSelectPlan profile={profile} /> )}
                <Button text="Escolher plano" href={`?${new URLSearchParams({modal: "true"})}`} />
            </>
        )
    }
    const billings = await getBillings(profile.subscription_id)
    return (
        <>
            <h2>Meu plano</h2>
            <p>Plano atual: {profile.plan}</p>
            {modalOpen && (<ModalSelectPlan profile={profile} />)}
            {billings && (
                <>
                    {billings.map((billing, i) => (
                        <div key={i}>
                            <p key={"billing_id"}>Id do pagamento: {billing.id}</p>
                            <p key={"billing_plan"}>Plano: {billing.description}</p>
                            <p key={"billing_value"}>Valor pago: {billing.value}</p>
                            <p key={"billing_confirmedDate"}>Data do pagamento: {billing.confirmedDate}</p>
                            <p key={"billing_billingType"}>Forma de pagamento: {billing.billingType}</p>
                            <p key={"billing_creditCardNumber"}>Cartão utilizado: {billing.creditCardNumber}</p>
                            <p key={"billing_creditCardBrand"}>Bandeira: {billing.creditCardBrand}</p>
                            <p key={"billing_invoiceUrl"}>Link do comprovante: {billing.invoiceUrl}</p>
                        </div>
                    ))}
                </>
            )}
            <Button text="Alterar plano" href={`?${new URLSearchParams({modal: "true"})}`} />
        </>
    )
}