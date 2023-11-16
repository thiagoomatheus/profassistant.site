export default function Select ({ name, options, handleChange }: {
    name: string,
    options: {
        optionGroup?: string
        options: string[] | number[]
    }[]
    handleChange: (e: React.ChangeEvent) => void
}) {
    return (
        <select onChange={handleChange} className='border border-black' name={name} defaultValue={"default"} required>
            <option value={"default"} disabled>Selecione uma opção</option>
            {options.map(opt => {
                if (opt.optionGroup) {
                    return (
                        <optgroup key={opt.optionGroup}>{opt.optionGroup}
                            {opt.options.map(o => {
                                return <option key={o} value={o}>{o}</option>
                            })}
                        </optgroup>
                    )
                }
                return (
                    <>
                        {opt.options.map(o => {
                            return <option value={o}>{o}</option>
                        })}
                    </>
                )
            })}
        </select>
    )
}