const Countries = (props) => {

    if (props.includedCountries.length > 10) {
        return (
            <div>To many matches, specify another filter</div>
        )
    }

    if (props.includedCountries.length === 1) {
        return(
            <div>
                <div>
                    <h2>{props.includedCountries[0].name.common}</h2>
                    <div>capital {props.includedCountries[0].capital} </div>
                    <div>area {props.includedCountries[0].area} </div>
                </div>
            </div>
        )
    }
    
    return (
        <div>
            {props.includedCountries.map(country => country.name.common)}
        </div>
    )
}

export default Countries