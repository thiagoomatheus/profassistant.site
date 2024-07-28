import { getUser } from "@/app/(login)/lib/actions"
import Field from "../../components/field"
import Button from "@/app/components/layout/button"

export default async function Page() {

  const data = await getUser()

  const date = new Date(data!.created_at).toLocaleDateString("pt-BR")
  
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
          <Field key="phone" field="Celular" data={data.phone ? data.phone : undefined} column="phone" />
          <Button text="Alterar senha" href="/reset" />
        </section>
      )}
    </>
  )
}