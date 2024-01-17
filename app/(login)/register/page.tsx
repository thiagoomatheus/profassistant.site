import Form from "../components/form";

export default async function Register () {
    return (
        <>
            <h2>Crie uma conta</h2>
            <Form btnText="Criar conta" register={true} />
        </>
    )
}