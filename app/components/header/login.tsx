import Button from "../layout/button";

export default function Login () {

    return (
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center">
            <Button href="/login" text="Entrar" />
        </div>
    )
}