import Country from "./country"

const Countries = (props) => {

    if (props.includedCountries.length > 10) {
        return (
            <div>To many matches, specify another filter</div>
        )
    }

    if (props.includedCountries.length === 1) {

        const country = props.includedCountries[0]

        return(
            <div>
                <Country key={country.name.common} name={country.name.common} capital={country.capital} area={country.area} 
                languages={country.languages} flag={country.flags}/>
            </div>
        )
    }
    
    return (
        <div>
            {props.includedCountries.map(country => 
                <Country key={country.name.common} name={country.name.common} number='multiple' capital={country.capital}
                area={country.area} languages={country.languages} flag={country.flags}/>)}
        </div>
    )
}

export default Countries