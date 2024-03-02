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
                <section className="flex flex-col gap-3">
                  <p>Conta criada em: {date}</p>
                  <Field key="name" field="Nome" data={data.name} column="name" />
                  <Field key="school_name" field="Instiuição de Ensino" data={data.school_name ? data.school_name : undefined} column="school_name" />
                  {/* <p>Email:</p>
                  <p>Verificar email</p>
                  <p>Instituição de Ensino:</p>
                  <p>Logo da Instituição de Ensino:</p>
                  <p>Alterar senha:</p>
                  <p>Tema:</p> */}
                </section>
            )}
        </>
    )
}