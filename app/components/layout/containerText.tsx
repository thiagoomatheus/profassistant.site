export default function ContainerText({ children, aditionalCSS }: {
    children: React.ReactNode
    aditionalCSS?: string
}) {
    return (
        <div className={`flex flex-col justify-between items-center lg:items-start text-center max-w-xs mx-auto lg:m-0 ${aditionalCSS}`}>
            {children}
        </div>
    )
}