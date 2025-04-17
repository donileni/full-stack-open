interface RadioButtonsProps<T extends string> {
    label: string
    buttons: T[]
    setSelection: React.Dispatch<React.SetStateAction<T | "">>
}

const RadioButtons = <T extends string>({ buttons, label, setSelection }: RadioButtonsProps<T>) => {
    return (
        <div>
            <span style={{ marginRight: "15px" }}>{label}</span>
            {buttons.map(button => (
                <label key={button} style={{ marginRight: "12px" }}>
                    {button}
                    <input key={button} type="radio" onChange={(event) => setSelection(event.target.value as T)} name={label} value={button} />
                </label>
                

            ))}

        </div>
        
    )
}

export default RadioButtons