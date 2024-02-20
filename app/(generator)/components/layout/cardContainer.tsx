export default function CardContainer( { children }: {
    children: React.ReactNode
}) {
    return (
        <div className="grid md:grid-cols-2 gap-5">
            {children}
        </div>
    )
}