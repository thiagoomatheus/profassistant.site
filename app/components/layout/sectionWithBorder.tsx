export default function SectionWithBorder( { borderColor, children }: {
    borderColor: string
    children: React.ReactNode
} ) {
    return (
        <div className={`flex flex-col justify-start items-center gap-2 md:gap-5 p-2 rounded-xl w-full ${borderColor ? `border ${borderColor}` : ""} `}>
            {children}
        </div>
    )
}