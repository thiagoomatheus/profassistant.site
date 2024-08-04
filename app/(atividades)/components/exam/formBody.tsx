export default function FormBody({children}:{children: React.ReactNode}) {
    return <form className="flex flex-row flex-wrap gap-2 justify-center">
                {children}
            </form>
}