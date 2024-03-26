import useAccount from "../../lib/useAccount"
import { createClient } from "@/app/lib/supabase/server"
import Field from "../../components/field"
import Button from "@/app/components/layout/button"

export default async function Page() {

  const { getProfile } = useAccount(createClient())

  const data = await getProfile()

  const date = new Date(data.created_at).toLocaleDateString("pt-BR")
  
    return (
        <>
            <h3>Meu perfil</h3>
            {data && (
                <section className="flex flex-col gap-5">
                  <p>Conta criada em: {date}</p>
                  <Field key="name" field="Nome" data={data.name} column="name" />
                  <Field key="school_name" field="Instiuição de Ensino" data={data.school_name ? data.school_name : undefined} column="school_name" />
                  <Field key="user_email" field="Email" data={data.user_email ? data.user_email : undefined} column="user_email" />
                  <Field key="theme" field="Tema" data={data.theme ? data.theme : undefined} column="theme" />
                  <Button text="Alterar senha" href="/reset" />
                  {/*
                  <p>Logo da Instituição de Ensino:</p>
                  */}
                </section>
            )}
        </>
    )
}