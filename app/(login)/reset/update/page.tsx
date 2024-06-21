import FormUpdate from "./components/formUpdate";

export default function Update () {
    
    return (
        <>
            <h2>Redefina sua senha</h2>
            <p className="max-w-3xl text-center">Lembre-se: Sua senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere especial ($*&@#), um número e 8 caracteres.</p>
            <FormUpdate />
        </>
    )
}