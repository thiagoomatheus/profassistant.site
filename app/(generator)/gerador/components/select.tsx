export default function Select ({ name, options}: {
    name: string,
    options: {
        optionGroup?: string
        options: string[] | number[]
    }[]
} & React.HTMLAttributes<HTMLSelectElement>) {
    return (
        <select name={name} defaultValue={"default"} required>
            <option key={"default"} value={"default"} disabled>Selecione uma opção</option>
            {options.map((opt, i) => {
                if (opt.optionGroup) {
                    return (
                        <optgroup key={i} label={opt.optionGroup}>
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