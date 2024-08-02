export default function Fieldset ({legend, borderColor, children}: {
    legend: string,
    borderColor: string
    children: React.ReactNode
}) {
    return (
        <fieldset className={`p-2 flex flex-col border-2 border-${borderColor} rounded-lg gap-3`}>
            <legend className='m-2 font-bold text-orange-2'>{legend}</legend>
            {children}
        </fieldset>
    )
}