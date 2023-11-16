export default function Fieldset ({legend, children}: {
    legend: string,
    children: React.ReactNode
}) {
    return (
        <fieldset className='p-2 flex flex-col border border-black gap-3'>
            <legend className='m-2'>{legend}</legend>
            {children}
        </fieldset>
    )
}