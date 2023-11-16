export default function Message ({ message }: {
    message: string
}) {
    return (
        <div className="absolute top-20">
            {message}
        </div>
    )
}