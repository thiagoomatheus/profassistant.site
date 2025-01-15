export default function ContainerWithBorder( { children, borderColor }: {
    children: React.ReactNode
    borderColor?: string
}) {
    return (
        <div className={`w-full sm:w-[55%] lg:w-[46%] lg:max-h-[750px] xl:max-h-[850px] flex flex-col gap-5 p-2 rounded-xl ${borderColor ? `border-2 border-${borderColor}` : "" } overflow-auto`}>
            {children}
        </div>
    )
}