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
            <option key={"default"} value={"default"} disabled>Selecione uma opção</option>
            {options.map((opt, i) => {
                if (opt.optionGroup) {
                    return (
                        <optgroup key={i}>{opt.optionGroup}
                            {opt.options.map((o, i) => {
                                return <option key={i} value={o}>{o}</option>
                            })}
                        </optgroup>
                    )
                }
                return (
                    <>
                        {opt.options.map((o, i) => {
                            return <option key={i} value={o}>{o}</option>
                        })}
                    </>
                )
            })}
        </select>
    )
}