export default function LabelBody( {children }: {
    children: React.ReactNode
}) {
    return <label className="flex flex-col justify-center items-center text-[8px] md:text-xs w-24 md:w-[100px] text-center font-normal">
                {children}
            </label>
}

