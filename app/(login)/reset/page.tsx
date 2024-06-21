import FormReset from "./components/formReset";

export default function Reset () {

    return (
        <>
            <h2>Insira o email cadastrado</h2>
            <p className="max-w-3xl text-center">Caso o email inserido seja válido e conste em nossa base de dados você receberá um email para redefinir sua senha.</p>
            <FormReset />
        </>
    )
}