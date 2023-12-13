export default function ActionQuestion ({children}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-row gap-5">
            {children}
        </div>
    )
}