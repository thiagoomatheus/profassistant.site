export default function Label ({ children, label }: {
    children: React.ReactNode,
    label: string
}) {
    return (
        <label>{label}
            {children}
        </label>
    )
}